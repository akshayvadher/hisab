<script lang='ts'>
  export let text = '';
  export let className = '';
  export let type: 'button' | 'submit' = 'button';
  export let category: 'primary' | 'secondary' | 'danger' = 'primary';
</script>

<button {type}
        class={`py-1 px-2 rounded-sm text-white transition-all duration-300 inline-flex gap-2 ${className}`}
        class:bg-rose-400={category === 'danger'}
        class:hover:bg-rose-600={category === 'danger'}
        class:bg-blue-500={category === 'primary'}
        class:hover:bg-blue-600={category === 'primary'}
        on:click
>
  {#if text !== ''}
    {text}
  {:else}
    <slot />
  {/if}
</button>
