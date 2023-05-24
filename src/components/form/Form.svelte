<script lang='ts'>
  import Button from '@components/button/Button.svelte';

  export let submitText = 'Submit';
</script>

<form on:submit|preventDefault>
  <slot />
  <Button type='submit' text={submitText} />
</form>
