<script lang='ts'>
  export let to: string;
  export let text = '';
</script>
<a href={to} class='underline hover:text-teal-200 transition-all duration-300'>
  {#if text !== ''}
    {text}
  {:else}
    <slot />
  {/if}
</a>
