<script lang='ts'>
  import type { Debt } from '$lib/dto/transaction';

  export let debt: Debt[];
  export let userAuthUid: string;
  if (!userAuthUid || !debt || debt.length === 0) {
    throw new Error('userAuthUid or debt is not defined');
  }
  let amount = debt.find((d) => d.paidForId === userAuthUid)?.amount;
</script>
₹{amount}
