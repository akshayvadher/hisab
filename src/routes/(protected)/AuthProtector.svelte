<script lang='ts'>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { onAuthStateChanged } from 'firebase/auth';
  import { firebaseAuth } from '$lib/firebase/firebase';
  import { getUser } from '$lib/firebase/db/user';
  import { authStore } from '$lib/stores/auth';

  let checkingAuth = true;
  onMount(async () => {
    onAuthStateChanged(firebaseAuth, async (result) => {
      if (result) {
        const user = await getUser(result.uid);
        $authStore = { isAuthenticated: true, user };
      } else {
        await goto('/login');
      }
      checkingAuth = false;
    });
  });
</script>

{#if checkingAuth}
  Checking Auth Info
{:else}
  {#if $authStore.isAuthenticated}
    <slot />
  {:else}
    Not authenticated
  {/if}
{/if}
