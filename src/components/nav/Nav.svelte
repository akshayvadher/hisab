<script lang='ts'>
  import A from '@components/button/A.svelte';
  import { onMount } from 'svelte';
  import { groupStore } from '$lib/stores/group';
  import { getAll } from '$lib/firebase/db/group';
  import LinkButton from '@components/button/LinkButton.svelte';

  let isDark = false;

  function toggle() {
    isDark = !isDark;
    localStorage.setItem('isDark', String(isDark));
    document.body.classList.toggle('dark', isDark);
  }

  $: extraRoutes = $groupStore.map(g => ({
    title: g.name,
    url: `/group/${g.id}`,
  }));

  onMount(async () => {
    isDark = localStorage.getItem('isDark') === 'true';
    document.body.classList.toggle('dark', isDark);

    $groupStore = await getAll();
  });

</script>

<aside
  class='fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 print:hidden'
  aria-label='Sidebar'>
  <div class='h-full px-3 py-4 overflow-y-auto bg-slate-100 dark:bg-gray-800'>
    <ul class='space-y-2 font-medium'>
      <li><A to='/dashboard' text='Dashboard' /></li>
      <li><A to='/me' text='Me' /></li>
      {#each extraRoutes as route}
        <li><A to={route.url} text={`Group / ${route.title}`} /></li>
      {/each}
      <li><A to='/group/add' text='+ Add Group' /></li>
      <li><A to='/fake' text='Fake' /></li>
      <li class='pt-10'>
        <LinkButton
          on:click={toggle}>
          {isDark ? 'Light' : 'Dark'}
        </LinkButton>
      </li>
      <li><A to='/logout' text='Logout' /></li>
    </ul>
  </div>
</aside>
