<script lang="ts">
  import { format } from 'date-fns';
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
  import DateTimeLocal from '@components/form/DateTimeLocal.svelte';
  import { DATE_FORMAT } from '$lib/const';
  import InputNumber from "@components/form/InputNumber.svelte";
  import Value from '@components/form/Value.svelte';

  export let groupId: string;
  export let change: string;

  let showForm = false;
  let calculationError: string | null = null;
  let amountMap: { [key: string]: number } = {};

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
      date: format(new Date(), DATE_FORMAT),
      groupId,
      paidById: user.authUid,
      paidForIds: [user.authUid],
      createdById: user.authUid,
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
    let debt = transaction.paidForIds.map((paidForId) => {
      return {
        paidForId,
        amount:
          transaction.splitOption === 'equal'
            ? round(transaction.amount / transaction.paidForIds.length)
            : amountMap[paidForId],
        paidById: transaction.paidById,
      };
    });

    transaction.amount = parseFloat(String(transaction.amount)); // Wierd javascript + browser thing. It converts to string sometimes.
    const total = debt.reduce((acc, curr) => acc + curr.amount, 0);
    console.log('total', total, transaction.amount, debt)
    if (total !== transaction.amount) {
      // cases like 10/3 is 3.33 so total is 9.99 so adding that 0.01 to any of the debt
      if (transaction.amount - total < 1) {
        debt[0].amount = round(debt[0].amount + round(transaction.amount - total));
        const total2 = debt.map((d) => d.amount).reduce((acc, curr) => acc + curr, 0);
        if (total2 !== transaction.amount) {
          calculationError =
            'All hell broke loose again. Stupid javascript floating point total is not matching.';
          throw new Error('All hell broke loose again');
        }
      } else {
        calculationError = 'All hell broke loose. Individual amount and total is not matching.'
        throw new Error('All hell broke loose');
      }
    }
    return debt;
  }

  async function saveTransaction() {
    const debt = injectDebt();
    const transactionToSave = { ...transaction, debt };
    await save(transactionToSave);
    amountMap = {};
    transaction = newTransaction();
    change = ulid();
  }
</script>

<Header paddingTop
  >Add transaction
  <button
    role="link"
    class="text-sm hover:text-teal-600 transition-all duration-300 dark:hover:text-teal-200"
    on:click={() => (showForm = !showForm)}
    >{showForm ? '➖' : '➕'}
    Form
  </button>
</Header>
{#if showForm}
  <Form submitText="+ Transaction" on:submit={saveTransaction}>
    <Input name="description" label="Description" bind:value={transaction.description} required />
    <InputNumber name="amount" label="Amount" bind:value={transaction.amount} required />
    <DateTimeLocal name="date" label="Date" bind:value={transaction.date} required />
    {#await usersRequest}
      Loading users...
    {:then users}
      <Select
        name="paidBy"
        label="Paid By"
        bind:value={transaction.paidById}
        options={users.map((u) => {
          return { value: u.authUid, label: u.name };
        })}
        required
      ></Select>
      <MultiSelect
        name="paidFor"
        label="Paid For"
        bind:value={transaction.paidForIds}
        options={users.map((u) => {
          return { value: u.authUid, label: u.name };
        })}
        required
      ></MultiSelect>
      <Select
        name="splitOption"
        label="Split Option"
        bind:value={transaction.splitOption}
        options={[
          { value: 'equal', label: 'Equal' },
          { value: 'amount', label: 'Amount' },
        ]}
        required
      ></Select>

      {#each transaction.paidForIds as paidForId}
        {#if transaction.splitOption === 'amount'}
          <InputNumber
            name="amount"
            label={`Amount for ${users.find((u) => u.authUid === paidForId)?.name}`}
            bind:value={amountMap[paidForId]}
            required
          />
        {:else}
          <Value name='amount' label={`Amount for ${users.find((u) => u.authUid === paidForId)?.name}`} value={`₹${round(transaction.amount / transaction.paidForIds.length)}`} />
        {/if}
      {/each}
      {#if transaction.splitOption === 'amount' && Object.entries(amountMap).map((k) => k[1]).reduce((acc, curr) => acc + curr, 0) !== transaction.amount}
        <div class="text-red-500">Total amount is not matching by {Object.entries(amountMap).map((k) => k[1]).reduce((acc, curr) => acc + curr, 0) - transaction.amount}</div>
      {/if}
    {:catch error}
      {error}
    {/await}
    <Select
      name="category"
      label="Category"
      bind:value={transaction.category}
      options={[{ value: 'general', label: 'General' }]}
      required
    ></Select>
    <File
      name="doc"
      label="Doc"
      bind:value={transaction.doc}
      transactionId={transaction.id}
      required
    />
    {#if calculationError}
      <div class="text-red-500">{calculationError}</div>
    {/if}
  </Form>
{/if}
