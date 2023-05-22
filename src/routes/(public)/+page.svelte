<script lang='ts'>
  import { goto } from '$app/navigation';
  import Button from '../../components/button/Button.svelte';
</script>
<div class='flex justify-center align-middle'>
  <h1 class='text-3xl'>Hisab</h1>
  <Button text='Login' on:click={()=>goto('/login')}></Button>
</div>
