<script lang='ts'>

  import { getUser } from '$lib/firebase/db/user';
  import Avatar from '@components/user/Avatar.svelte';

  export let userAuthUid: string;
  if (!userAuthUid) {
    throw new Error('Go to hell');
  }

  const userRequest = getUser(userAuthUid);

</script>

{#await userRequest}
  🕷️
{:then user}
  <div class='border-2 rounded-3xl border-emerald-400 hover:border-emerald-600 dark:border-emerald-600 dark:hover:border-emerald-400 inline-flex gap-1 w-fit items-center'>
    <div>
      <Avatar {user} />
    </div>
    <div class='px-1'>{user.name}</div>
  </div>
{:catch error}
  🚽 {error}
{/await}
