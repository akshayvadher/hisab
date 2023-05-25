<script>
  import { APP_TITLE } from '$lib/const';
  import Avatar from '@components/user/Avatar.svelte';
  import { authStore } from '$lib/stores/auth';
  import Header from '@components/typography/Header.svelte';

  let { user } = $authStore;
</script>

<svelte:head>
  <title>{APP_TITLE} | Dashboard</title>
</svelte:head>

<Header>Dashboard</Header>

<div class='mt-4'>
  Welcome {user.name}
  <Avatar {user} />
</div>
