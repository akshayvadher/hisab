<script lang='ts'>
  import { fade } from 'svelte/transition';
  import { getDoc, TRANSACTION_DOC_PATH } from '$lib/firebase/file';


  export let src: string;
  export let alt: string;
  export let className = '';

  let big = false;

  let url;
  $: {
    if (src) {
      if (src.startsWith('https://')) {
        url = src;
      } else if (src.startsWith(TRANSACTION_DOC_PATH)) {
        getDoc(src).then(_url => url = _url);
      }
    }
  }
</script>
{#if url}
  <img src={url} {alt} class={`rounded-md inline transition-all cursor-pointer ${className}`}
       class:h-80={!big}
       class:h-auto={big}
       on:click={() => big = !big}
       on:keypress={() => big = !big}
       transition:fade|global />
{:else}
  <span class='text-2xl'>👽</span>
{/if}
