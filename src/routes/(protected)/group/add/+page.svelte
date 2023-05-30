<script lang='ts'>
  import { deleteGroup, getAll, save } from '$lib/firebase/db/group';
  import Button from '@components/button/Button.svelte';
  import { authStore } from '$lib/stores/auth';
  import { ulid } from 'ulid';
  import { groupStore } from '$lib/stores/group';
  import { Trash2 } from 'lucide-svelte';
  import { APP_TITLE } from '$lib/const';
  import Header from '@components/typography/Header.svelte';

  const { user } = $authStore;

  let groupRequest = getAll();
  let newGroupName: string;

  async function createGroup() {
    if (!user?.authUid) {
      throw new Error('User not logged in');
    }
    await save({ name: newGroupName, createdAt: new Date(), createdById: user.authUid, id: ulid() });
    await reFetch();
    newGroupName = '';
  }

  async function eventDeleteGroup(id) {
    await deleteGroup(id);
    await reFetch();
  }

  async function reFetch() {
    groupRequest = getAll();
    $groupStore = await getAll(); // I know this is duplicate, I am yet to think how to solve this
  }
</script>

<svelte:head>
  <title>{APP_TITLE} | Manage Groups</title>
</svelte:head>

{#await groupRequest}
  Loading groups
{:then groups}
  <Header>Groups</Header>
  <ul class='pt-2'>
    {#each groups as group}
      <li class='py-2 border-b-gray-400 border-b flex items-center gap-2'>
        {group.name}
        {#if group.createdById === user?.authUid}
          <Button on:click={()=>eventDeleteGroup(group.id)} category='danger'>
            <Trash2 />
            Delete
          </Button>
        {/if}
      </li>
    {/each}
  </ul>
{:catch error}
  <p>{error.message}</p>
{/await}

<form class='pt-4' on:submit|preventDefault={createGroup}>
  <input type='text' bind:value={newGroupName} placeholder='New Group Name'
         class='rounded-sm focus:outline outline-cyan-400 border border-cyan-400 dark:border-none text-md px-2 py-1 text-cyan-950'
         required>
  <Button type='submit'>Create Group</Button>
</form>
