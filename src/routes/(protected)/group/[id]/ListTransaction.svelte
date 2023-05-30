<script lang='ts'>
  import Header from '@components/typography/Header.svelte';
  import { deleteTransaction, getAll } from '$lib/firebase/db/transaction';
  import type { Transaction } from '$lib/dto/transaction';
  import TransactionItem from './TransactionItem.svelte';

  export let groupId: string;
  if (!groupId) {
    throw new Error('Seriously? Why?');
  }

  let transactionRequest: Promise<Transaction[]> = getAll(groupId);

  async function deleteTransactionEvent(event: CustomEvent<string>) {
    await deleteTransaction(event.detail);
    transactionRequest = getAll(groupId);
  }
</script>

<Header paddingTop>Transactions</Header>
<ul>
  {#await transactionRequest}
    <li>Loading...</li>
  {:then transactions}
    {#each transactions as transaction (transaction.id)}
      <TransactionItem {transaction} on:deleteTransaction={deleteTransactionEvent} />
    {:else}
      <li>No transactions</li>
    {/each}
  {:catch error}
    <li>{error.message}</li>
  {/await}
</ul>
