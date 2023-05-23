<script lang='ts'>
  import { logout } from '$lib/firebase/auth';
  import { onMount } from 'svelte';
  import { authStore } from '$lib/stores/auth';
  import { goto } from '$app/navigation';

  onMount(async () => {
    await logout();
    $authStore = {
      user: null,
      isAuthenticated: false,
    };
    await goto('/');
  });
</script>
Logging you out...
