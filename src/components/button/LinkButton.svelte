<script lang='ts'>
  export let text = '';
</script>
<button class='underline hover:text-teal-400 transition-all duration-300 dark:hover:text-teal-200'
        on:click>
  {#if text !== ''}
    {text}
  {:else}
    <slot />
  {/if}
</button>
