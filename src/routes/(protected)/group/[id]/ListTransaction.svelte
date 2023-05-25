<script lang='ts'>
  import Time from 'svelte-time';
  import Header from '@components/typography/Header.svelte';
  import { deleteTransaction, getAll } from '$lib/firebase/db/transaction';
  import type { Transaction } from '$lib/dto/transaction';
  import UserCard from '@components/user/UserCard.svelte';
  import Button from '@components/button/Button.svelte';
  import DebtAmount from './DebtAmount.svelte';

  export let groupId: string;
  if (!groupId) {
    throw new Error('Seriously? Why?');
  }

  let transactionRequest: Promise<Transaction[]> = getAll(groupId);

  async function deleteTransactionEvent(transactionId: string) {
    await deleteTransaction(transactionId);
    transactionRequest = getAll(groupId);
  }
</script>

<Header>Transactions</Header>
<ul>
  {#await transactionRequest}
    <li>Loading...</li>
  {:then transactions}
    {#each transactions as transaction (transaction.id)}
      <li class='py-2 flex gap-2 items-center'>
        <div>{transaction.description}</div>
        <div>₹{transaction.amount}
          Paid By
          <UserCard userAuthUid={transaction.paidById} />
        </div>
        <div>With</div>
        {#each transaction.paidForIds as paidFor}
          <div>
            <UserCard userAuthUid={paidFor} />
            <DebtAmount debt={transaction.debt} userAuthUid={paidFor} />
          </div>
        {/each}
        <div>
          <Time relative live timestamp={new Date(transaction.date.seconds * 1000)} />
        </div>
        <div>
          <Button on:click={() => deleteTransactionEvent(transaction.id)} category='danger' text='Delete' />
        </div>
      </li>
    {:else}
      <li>No transactions</li>
    {/each}
  {:catch error}
    <li>{error.message}</li>
  {/await}
</ul>
