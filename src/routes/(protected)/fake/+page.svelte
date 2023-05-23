<script lang='ts'>
  import Button from '@components/button/Button.svelte';
  import { faker } from '@faker-js/faker';
  import type { User } from '$lib/dto/user';
  import { deleteUser, getAll, saveUser } from '$lib/firebase/db/user';
  import { onMount } from 'svelte';
  import Avatar from '@components/image/Avatar.svelte';
  import { Trash2 } from 'lucide-svelte';
  import { APP_TITLE } from '$lib/const';

  let users = [] as User[];

  interface FakeUserType extends User {
    fake: boolean;
  }

  async function deleteIt(id: string) {
    await deleteUser(id);
    users = await getAll();
  }

  async function addUser() {
    const user: FakeUserType = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      authUid: faker.string.uuid(),
      photoUrl: faker.image.avatar(),
      providerUid: faker.string.uuid(),
      fake: true,
    };
    await saveUser(user);
    users = await getAll();
  }

  onMount(async () => {
    users = await getAll();
  });

</script>

<svelte:head>
  <title>{APP_TITLE} | Users</title>
</svelte:head>

<div class='text-2xl'>Users</div>
{#each users as user (user.authUid)}
  <div class='py-2 border-cyan-400 border-t flex items-center gap-2'>
    <Avatar {user} />
    <p class='text-lg font-bold'>{user.name}</p>
    <p class='text-sm text-gray-500'>{user.email}</p>
    {#if user.fake }
      <Button on:click={()=>deleteIt(user.authUid)} category='danger'>
        <Trash2 />
        Delete
      </Button>
    {/if}
  </div>
{/each}

<Button on:click={addUser} text='Add User' />
