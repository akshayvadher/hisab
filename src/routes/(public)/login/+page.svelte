<script lang='ts'>
  import { goto } from '$app/navigation';
  import TiVendorMicrosoft from 'svelte-icons/ti/TiVendorMicrosoft.svelte';
  import Button from '@components/button/Button.svelte';
</script>

<Button on:click={()=>goto('/dashboard')} className='flex justify-center'>
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
