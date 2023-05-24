<script lang='ts'>
  import Header from '@components/typography/Header.svelte';
  import { getAll } from '$lib/firebase/db/transaction';
  import type { Transaction } from '$lib/dto/transaction';

  export let groupId: string;

  let transactionRequest: Promise<Transaction[]> = getAll(groupId);
</script>

<Header>Transactions</Header>
<ul>
  {#await transactionRequest}
    <li>Loading...</li>
  {:then transactions}
    {#each transactions as transaction}
      <li>{transaction.description} {transaction.amount}</li>
    {/each}
  {:catch error}
    <li>{error.message}</li>
  {/await}
</ul>
