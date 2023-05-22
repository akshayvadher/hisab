<script lang='ts'>
  import '../../app.css';
  import { APP_TITLE } from '$lib/const';
</script>
<svelte:head>
  <title>{APP_TITLE}</title>
</svelte:head>
<div class='w-full h-screen p-2 bg-gray-700 text-white text-center'>
  <slot />
</div>
