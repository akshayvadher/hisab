<script lang='ts'>
  export let text = '';
  export let className = '';
</script>
<button
  class={`inline-flex gap-2 underline hover:text-teal-400 transition-all duration-300 dark:hover:text-teal-200 ${className}`}
  on:click>
  {#if text !== ''}
    {text}
  {:else}
    <slot />
  {/if}
</button>
