<script lang='ts'>
  import { APP_TITLE } from '$lib/const';
  import AuthProtector from './AuthProtector.svelte';
</script>
<svelte:head>
  <title>{APP_TITLE}</title>
</svelte:head>
<div class='w-full h-screen p-2 bg-gray-700 text-white text-center'>
  <AuthProtector>
    <slot />
  </AuthProtector>
</div>
