<script lang='ts'>
  import Form from '@components/form/Form.svelte';
  import Input from '@components/form/Input.svelte';
  import Header from '@components/typography/Header.svelte';
  import Select from '@components/form/Select.svelte';
  import MultiSelect from '@components/form/MultiSelect.svelte';
  import type { Transaction } from '$lib/dto/transaction';
  import { getAll } from '$lib/firebase/db/user';
  import { authStore } from '$lib/stores/auth';
  import { ulid } from 'ulid';
  import { save } from '$lib/firebase/db/transaction';

  export let groupId: string;
  export let change: string;

  let showForm = false;

  const { user } = $authStore;
  if (!user || !groupId || !user.authUid) {
    throw new Error('User not logged in or invalid group id');
  }
  const newTransaction = () => {
    const t: Transaction = {
      id: ulid(),
      amount: 100,
      description: '',
      date: new Date(),
      groupId,
      paidById: user.authUid,
      paidFor: [user.authUid],
      splitOption: 'equal',
      category: 'general',
    };
    return t;
  };
  let transaction: Transaction = newTransaction();

  const usersRequest = getAll();


  async function saveTransaction() {
    await save(transaction);
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
      <MultiSelect name='paidFor' label='Paid For' bind:value={transaction.paidFor}
                   options={users.map(u=>{return {value: u.authUid, label: u.name}})} required></MultiSelect>
    {:catch error}
      {error}
    {/await}
    <Select name='splitOption' label='Split Option' bind:value={transaction.splitOption}
            options={[{value: 'equal', label: 'Equal'}]} required></Select>
    <Select name='category' label='Category' bind:value={transaction.category}
            options={[{value: 'general', label: 'General'}]} required></Select>
    <div>Files</div>
  </Form>
{/if}
