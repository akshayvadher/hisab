<script>
  import A from '@components/button/A.svelte';
</script>

<aside id='default-sidebar'
       class='fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0'
       aria-label='Sidebar'>
  <div class='h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800'>
    <ul class='space-y-2 font-medium'>
      <li><A to='/dashboard' text='Dashboard' /></li>
      <li><A to='/me' text='Me' /></li>
      <li><A to='/logout' text='Logout' /></li>
      <li><A to='/fake' text='Fake' /></li>
    </ul>
  </div>
</aside>
