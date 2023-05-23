<script lang='ts'>
  import { onAuthStateChanged } from 'firebase/auth';
  import { onMount } from 'svelte';
  import TiVendorMicrosoft from 'svelte-icons/ti/TiVendorMicrosoft.svelte';
  import Button from '@components/button/Button.svelte';
  import { login } from '$lib/firebase/auth';
  import { goto } from '$app/navigation';
  import { APP_TITLE } from '$lib/const';
  import { firebaseAuth } from '$lib/firebase/firebase';

  async function doLogin() {
    await login();
  }

  onMount(async () => {
    onAuthStateChanged(firebaseAuth, async (result) => {
      if (result) {
        await goto('/dashboard');
      }
    });
  });
</script>

<svelte:head>
  <title>{APP_TITLE} | Login</title>
</svelte:head>

<Button on:click={doLogin} className='inline-flex justify-center transition-all duration-300 text-xl'>
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
