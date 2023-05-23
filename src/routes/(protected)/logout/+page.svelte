<script lang='ts'>
  import { logout } from '$lib/firebase/auth';
  import { onMount } from 'svelte';
  import { authStore } from '$lib/stores/auth';
  import { goto } from '$app/navigation';
  import { APP_TITLE } from '$lib/const';

  onMount(async () => {
    await logout();
    $authStore = {
      user: null,
      isAuthenticated: false,
    };
    await goto('/');
  });
</script>

<svelte:head>
  <title>{APP_TITLE} | Logging out</title>
</svelte:head>

Logging you out...
