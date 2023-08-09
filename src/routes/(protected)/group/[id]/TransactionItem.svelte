<script lang='ts'>
  import { parse } from 'date-fns'
  import type { Transaction } from '$lib/dto/transaction';
  import UserCard from '@components/user/UserCard.svelte';
  import Time from 'svelte-time';
  import DebtAmount from './DebtAmount.svelte';
  import Button from '@components/button/Button.svelte';
  import { createEventDispatcher } from 'svelte';
  import { authStore } from '$lib/stores/auth';
  import Photo from '@components/image/Photo.svelte';
  import { DATE_FORMAT } from "$lib/const";
  import Currency from '@components/format/Currency.svelte';

  const { user } = $authStore;
  if(!user) throw new Error('User not found');
  export let transaction: Transaction;

  const dispatch = createEventDispatcher();

  let showImage = false;
</script>

<li class='py-2 flex gap-2 items-center flex-wrap border-b dark:border-gray-600'>
  <div>{transaction.description}</div>
  <div><Currency number={transaction.amount} />
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
    <Time relative live timestamp={parse(transaction.date, DATE_FORMAT, new Date())} />
  </div>
  <div>
    <button role='link' class='text-sm hover:text-teal-600 transition-all duration-300 dark:hover:text-teal-200'
            on:click={()=> showImage = !showImage}>{showImage ? '➖' : '➕'}
      Receipt
    </button>
  </div>
  {#if transaction.createdById === user.authUid || user.email === 'akshay@incubyte.co'}
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
