<script lang='ts'>
  import { APP_TITLE } from '$lib/const';
  import AuthProtector from './AuthProtector.svelte';
  import Nav from '@components/nav/Nav.svelte';
</script>

<svelte:head>
  <title>{APP_TITLE}</title>
</svelte:head>

<div class='w-full h-screen p-2'>
  <AuthProtector>
    <Nav />
    <main class='p-4 sm:ml-64'>
      <slot />
    </main>
  </AuthProtector>
</div>
