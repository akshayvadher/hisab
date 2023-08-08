<script lang='ts'>
  export let to: string;
  export let text = '';
</script>
<a href={to} target={to.startsWith('http') ? '_blank' : null}
   class='underline hover:text-teal-400 transition-all duration-300 dark:hover:text-teal-200'>
  {#if text !== ''}
    {text}
  {:else}
    <slot />
  {/if}
</a>
