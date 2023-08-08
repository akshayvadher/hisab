<script lang="ts">
  import Header from "@components/typography/Header.svelte";
  import { deleteTransaction, getAll } from "$lib/firebase/db/transaction";
  import type { Transaction } from "$lib/dto/transaction";
  import TransactionItem from "./TransactionItem.svelte";
  import { authStore } from "$lib/stores/auth";
  import { round } from "$lib/interesting/math";
  import A from "@components/button/A.svelte";

  export let groupId: string;
  const { user } = $authStore;
  if (!groupId || !user) {
    throw new Error("Seriously? Why?");
  }

  let transactionRequest: Promise<Transaction[]> = getAll(groupId);

  let iSpent = 0;
  let iPaid = 0;
  let iGet = 0;
  let amIInvolved = false;
  transactionRequest.then((data) => {
    const debts = data.flatMap(transaction => transaction.debt);
    iSpent = round(debts.filter(debt => debt.paidForId === user.authUid).reduce((acc, debt) => acc + debt.amount, 0));
    iPaid = round(debts.filter(debt => debt.paidById === user.authUid).reduce((acc, debt) => acc + debt.amount, 0));
    iGet = iPaid - iSpent;
    amIInvolved = debts.findIndex(debt => debt.paidById === user.authUid || debt.paidForId === user.authUid) !== -1;
  });

  async function deleteTransactionEvent(event: CustomEvent<string>) {
    await deleteTransaction(event.detail);
    transactionRequest = getAll(groupId);
  }
</script>

<Header paddingTop>Summary</Header>
<div class="mt-2">
  I spent {iSpent} and I paid {iPaid} so I get {iGet}. Am I involved? {amIInvolved ? 'Yes' : 'No'}.
  {#if amIInvolved}
    Show my spend
    <A to={`/group/${groupId}/print`} text="Report" />
  {/if}
</div>
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
