<script>
  import { APP_TITLE } from '$lib/const';
  import Avatar from '@components/image/Avatar.svelte';
  import { authStore } from '$lib/stores/auth';

  let { user } = $authStore;
</script>

<svelte:head>
  <title>{APP_TITLE} | Me</title>
</svelte:head>

Me

<dl>
  <dt>Name</dt>
  <dd>{user.name}</dd>
  <dt>Email</dt>
  <dd>{user.email}</dd>
</dl>

<Avatar {user} />
