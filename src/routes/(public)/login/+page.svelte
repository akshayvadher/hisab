<script lang='ts'>
  import TiVendorMicrosoft from 'svelte-icons/ti/TiVendorMicrosoft.svelte';
  import Button from '@components/button/Button.svelte';
  import { login } from '$lib/firebase/auth';
  import { goto } from '$app/navigation';

  async function doLogin() {
    await login();
    await goto('/dashboard');
  }
</script>

<Button on:click={doLogin} className='inline-flex justify-center'>
  <div>
    <TiVendorMicrosoft />
  </div>
  Login
</Button>

<style>
    div {
        display: inline-flex;
        height: 1.5rem;
    }
</style>
