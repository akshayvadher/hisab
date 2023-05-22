<script lang='ts'>
  import { goto } from '$app/navigation';
  import Button from '@components/button/Button.svelte';
</script>
Login page


<Button text='Home' on:click={()=>goto('/dashboard')} />
