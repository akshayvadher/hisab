<script lang='ts'>
  import { authStore } from '$lib/stores/auth';
  import { setAuthContext } from '$lib/context/auth';
  import { goto } from '$app/navigation';

  let { isAuthenticated, user } = $authStore;
  if (isAuthenticated && user) {
    setAuthContext(user);
  } else {
    goto('/login');
  }

</script>

{#if isAuthenticated}
  <slot />
{:else}
  Not authenticated
{/if}
