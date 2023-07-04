<script lang='ts'>
  import { onMount } from 'svelte';
  import Header from '@components/typography/Header.svelte';
  import LinkButton from '@components/button/LinkButton.svelte';
  import { getAll } from '$lib/firebase/db/transaction';
  import type { Transaction } from '$lib/dto/transaction';
  import { authStore } from '$lib/stores/auth';
  import { round } from '$lib/interesting/math';
  import { APP_TITLE } from '$lib/const';
  import Time from 'svelte-time';
  import { PrinterIcon } from 'lucide-svelte';
  import Detail from '@components/detail/Detail.svelte';
  import DetailValue from '@components/detail/DetailValue.svelte';
  import Photo from '@components/image/Photo.svelte';

  export let data;
  const { user } = $authStore;
  if (!data.id || !user || !user.authUid) {
    throw new Error('Seriously? Why?');
  }

  let transactions: Transaction[] = [];
  let printIndexes = [];

  $: transactionsToPrint = transactions.filter((t) => printIndexes.includes(t.id));
  $: myDebts = transactionsToPrint.flatMap(transaction => transaction.debt);
  $: iSpent = round(myDebts.filter(debt => debt.paidForId === user.authUid).reduce((acc, debt) => acc + debt.amount, 0));
  $: amIInvolved = myDebts.findIndex(debt => debt.paidById === user.authUid || debt.paidForId === user.authUid) !== -1;
  $: maxDate = new Date(Math.max(...transactionsToPrint.map(transaction => transaction.date.seconds * 1000)));
  $: minDate = new Date(Math.min(...transactionsToPrint.map(transaction => transaction.date.seconds * 1000)));

  onMount(async () => {
    const allTransactions = await getAll(data.id);
    setOwnTransactionsOnly(allTransactions);
  });
  const setOwnTransactionsOnly = (allTransactions: Transaction[]) => {
    transactions = allTransactions.filter(transaction => transaction.debt.find(debt => debt.paidForId === user.authUid));
    transactions.forEach((t) => printIndexes.push(t.id));
  };
</script>

<svelte:head>
  <title>{APP_TITLE} | Report</title>
</svelte:head>

<div class='print:hidden'>
  <Header paddingTop>Note</Header>
  <p class='mt-2'>Print works best in light mode (Dark Mode print is work in progress)</p>
  <p class='mt-2'>And for some weird reasons, Print works best in Edge not in Chrome</p>
  {#if amIInvolved}
    <LinkButton on:click={()=>window.print()} className='mt-2'>
      <PrinterIcon />
      Print
    </LinkButton>
  {/if}
</div>

<Header paddingTop>Summary</Header>
<Detail className='mt-2'>
  <DetailValue label='Name'>{user.name}</DetailValue>
  <DetailValue label='Amount'>₹{iSpent}</DetailValue>
  <DetailValue label='Duration'>
    <div>
      <Time timestamp={minDate} />
      -
      <Time timestamp={maxDate} />
    </div>
  </DetailValue>
</Detail>
<table
  class='border-collapse border border-slate-400 dark:border-gray-400 print:w-full mt-2 print:mt-10 print:text-black w-full md:w-2/3'>
  <thead>
  <tr>
    <th class='print:hidden'></th>
    <th>Description</th>
    <th>Amount</th>
    <th>Date</th>
  </tr>
  </thead>
  <tbody>
  {#each transactions as transaction (transaction.id)}
    <tr class:print:hidden={!printIndexes.includes(transaction.id)}>
      <td class='print:hidden w-1'><input type='checkbox' bind:group={printIndexes} value={transaction.id} /></td>
      <td>{transaction.description}</td>
      <td class='text-right'>₹{transaction.debt.find(d => d.paidForId === user.authUid)?.amount}</td>
      <td>
        <Time timestamp={new Date(transaction.date.seconds * 1000)} />
      </td>
    </tr>
  {/each}
  </tbody>
</table>
<div class='break-after-page'></div>
<Header paddingTop className='print:hidden'>Detail</Header>
{#each transactionsToPrint as transaction (transaction.id)}
  <Detail className='mt-2'>
    <DetailValue label='Description'>{transaction.description}</DetailValue>
    <DetailValue label='Amount'>₹{transaction.debt.find(d => d.paidForId === user.authUid)?.amount}</DetailValue>
    <DetailValue label='Date'>
      <Time timestamp={new Date(transaction.date.seconds * 1000)} />
    </DetailValue>
  </Detail>
  <Photo src={transaction.doc} alt='Receipt' className='mt-2 print:max-w-screen print:w-auto print:max-h-screen print:h-auto' />
  <div class='break-after-page'></div>
{:else}
  <div>No transactions</div>
{/each}

<style>
    td, th {
        padding: 0.5rem;
        text-align: left;
        @apply border border-gray-400;
    }

    td.text-right {
        text-align: right;
    }
</style>
