<script lang='ts'>
  export let text = '';
  export let className = '';
</script>

<button type='button'
        class={`p-2 bg-blue-500 rounded-md text-white hover:bg-blue-600 ${className}`}
        on:click
>
  {#if text !== ''}
    {text}
  {:else}
    <slot />
  {/if}
</button>
