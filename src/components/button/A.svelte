<script lang='ts'>
  export let to: string;
  export let text = '';
</script>
<a href={to} class='underline hover:text-teal-600 transition-all duration-300 dark:hover:text-teal-200'>
  {#if text !== ''}
    {text}
  {:else}
    <slot />
  {/if}
</a>
