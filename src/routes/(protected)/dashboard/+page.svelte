<script>
  import { APP_TITLE } from '$lib/const';
  import { getAuthContext } from '$lib/context/auth';
  import Avatar from '@components/image/Avatar.svelte';

  let user = getAuthContext();
</script>

<svelte:head>
  <title>{APP_TITLE} | Dashboard</title>
</svelte:head>
Dashboard

Welcome {user.name}

<Avatar {user} />
