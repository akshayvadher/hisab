<script lang='ts'>
  import type { Transaction } from '$lib/dto/transaction';
  import UserCard from '@components/user/UserCard.svelte';
  import Time from 'svelte-time';
  import DebtAmount from './DebtAmount.svelte';
  import Button from '@components/button/Button.svelte';
  import { createEventDispatcher } from 'svelte';
  import { authStore } from '$lib/stores/auth';
  import Photo from '@components/image/Photo.svelte';

  const { user } = $authStore;
  export let transaction: Transaction;

  const dispatch = createEventDispatcher();

  let showImage = false;
</script>

<li class='py-2 flex gap-2 items-center flex-wrap'>
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
    <button role='link' class='text-sm hover:text-teal-600 transition-all duration-300 dark:hover:text-teal-200'
            on:click={()=> showImage = !showImage}>{showImage ? '➖' : '➕'}
      Receipt
    </button>
  </div>
  {#if transaction.createdById === user.authUid}
    <div>
      <Button on:click={() => dispatch('deleteTransaction',transaction.id)} category='danger' text='Delete' />
    </div>
  {/if}
  {#if showImage}
    <div>
      <Photo src={transaction.doc} alt='Receipt' />
    </div>
  {/if}
</li>
