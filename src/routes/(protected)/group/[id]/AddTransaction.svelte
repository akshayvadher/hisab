<script lang='ts'>
  import Form from '@components/form/Form.svelte';
  import Input from '@components/form/Input.svelte';
  import Header from '@components/typography/Header.svelte';
  import Select from '@components/form/Select.svelte';
  import MultiSelect from '@components/form/MultiSelect.svelte';
  import File from '@components/form/File.svelte';
  import type { Debt, Transaction } from '$lib/dto/transaction';
  import { getAll } from '$lib/firebase/db/user';
  import { authStore } from '$lib/stores/auth';
  import { ulid } from 'ulid';
  import { save } from '$lib/firebase/db/transaction';
  import { round } from '$lib/interesting/math';

  export let groupId: string;
  export let change: string;

  let showForm = false;
  let calculationError: string | null = null;

  const { user } = $authStore;
  if (!user || !groupId || !user.authUid) {
    throw new Error('User not logged in or invalid group id');
  }
  const newTransaction = () => {
    calculationError = null;
    const t: Transaction = {
      id: ulid(),
      amount: 100,
      description: '',
      date: new Date(),
      groupId,
      paidById: user.authUid,
      paidForIds: [user.authUid],
      splitOption: 'equal',
      category: 'general',
      debt: [],
      doc: '',
    };
    return t;
  };
  let transaction: Transaction = newTransaction();

  const usersRequest = getAll();

  function injectDebt(): Debt[] {
    // TODO this can go either in server or firebase function
    let debt = transaction.paidForIds.map(paidForId => {
      return {
        paidForId,
        amount: round(transaction.amount / transaction.paidForIds.length),
        paidById: transaction.paidById,
      };
    });

    transaction.amount = parseFloat(String(transaction.amount)); // Wierd javascript + browser thing. It converts to string sometimes.
    const total = debt.reduce((acc, curr) => acc + curr.amount, 0);
    if (total !== transaction.amount) {
      // cases like 10/3 is 3.33 so total is 9.99 so adding that 0.01 to any of the debt
      if (transaction.amount - total < 1) {
        debt[0].amount = round(debt[0].amount + round(transaction.amount - total));
        const total2 = debt.map(d => d.amount).reduce((acc, curr) => acc + curr, 0);
        if (total2 !== transaction.amount) {
          calculationError = 'All hell broke loose again. Stupid javascript floating point total is not matching.';
          throw new Error('All hell broke loose again');
        }
      } else {
        calculationError = 'All hell broke loose';
        throw new Error('All hell broke loose');
      }
    }
    return debt;
  }

  async function saveTransaction() {
    const debt = injectDebt();
    const transactionToSave = { ...transaction, debt };
    await save(transactionToSave);
    transaction = newTransaction();
    change = ulid();
  }

</script>

<Header>Add transaction
  <button role='link' class='text-sm hover:text-teal-600 transition-all duration-300 dark:hover:text-teal-200'
          on:click={()=> showForm = !showForm}>{showForm ? '➖' : '➕'}
    Form
  </button>
</Header>
{#if showForm}
  <Form submitText='+ Transaction' on:submit={saveTransaction}>
    <Input name='description' label='Description' bind:value={transaction.description} required />
    <Input name='amount' label='Amount' bind:value={transaction.amount} required />
    <Input name='date' label='Date' bind:value={transaction.date} required disabled />
    {#await usersRequest}
      Loading users...
    {:then users}
      <Select name='paidBy' label='Paid By' bind:value={transaction.paidById}
              options={users.map(u=>{return {value: u.authUid, label: u.name}})}
              required></Select>
      <MultiSelect name='paidFor' label='Paid For' bind:value={transaction.paidForIds}
                   options={users.map(u=>{return {value: u.authUid, label: u.name}})} required></MultiSelect>
    {:catch error}
      {error}
    {/await}
    <Select name='splitOption' label='Split Option' bind:value={transaction.splitOption}
            options={[{value: 'equal', label: 'Equal'}]} required></Select>
    <Select name='category' label='Category' bind:value={transaction.category}
            options={[{value: 'general', label: 'General'}]} required></Select>
    <File name='doc' label='Doc' bind:value={transaction.doc} transactionId={transaction.id} required />
    {#if calculationError}
      <div class='text-red-500'>{calculationError}</div>
    {/if}
  </Form>
{/if}
