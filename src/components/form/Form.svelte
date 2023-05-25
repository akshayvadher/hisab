<script lang='ts'>
  import { slide } from 'svelte/transition';
  import { quartInOut } from 'svelte/easing';
  import Button from '@components/button/Button.svelte';

  export let submitText = 'Submit';
</script>

<form on:submit|preventDefault transition:slide={{easing: quartInOut}}>
  <slot />
  <Button type='submit' text={submitText} />
</form>
