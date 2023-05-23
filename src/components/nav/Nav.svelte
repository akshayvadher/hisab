<script lang='ts'>
  import A from '@components/button/A.svelte';
  import { onMount } from 'svelte';
  import { groupStore } from '$lib/stores/group';
  import { getAll } from '$lib/firebase/db/group';

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

<aside id='default-sidebar'
       class='fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0'
       aria-label='Sidebar'>
  <div class='h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800'>
    <ul class='space-y-2 font-medium'>
      <li><A to='/dashboard' text='Dashboard' /></li>
      <li><A to='/me' text='Me' /></li>
      {#each extraRoutes as route}
        <li><A to={route.url} text={`Group / ${route.title}`} /></li>
      {/each}
      <li><A to='/group/add' text='+ Add Group' /></li>
      <li><A to='/fake' text='Fake' /></li>
      <li class='pt-10'>
        <button role='link'
                class='underline hover:text-teal-600 transition-all duration-300 dark:hover:text-teal-200'
                on:click={toggle}>
          {isDark ? 'Light' : 'Dark'}
        </button>
      </li>
      <li><A to='/logout' text='Logout' /></li>
    </ul>
  </div>
</aside>
