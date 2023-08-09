<script lang="ts">

  export let number: string | number | undefined;
  export let locale = 'en-IN';
  export let currency = 'INR';

  $: printableNumber = typeof number === 'string' ? parseFloat(number) : number;
  $: formattedNumber = !printableNumber ? '' : new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(printableNumber)

</script>

{formattedNumber}