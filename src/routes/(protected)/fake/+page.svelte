<script lang="ts" context="module">
  export interface FakeUserType extends User {
    fake?: boolean;
  }
</script>

<script lang="ts">
  import Button from '@components/button/Button.svelte';
  import { faker } from '@faker-js/faker';
  import type { User } from '$lib/dto/user';
  import { deleteUser, getAll, saveUser, update } from '$lib/firebase/db/user';
  import { onMount } from 'svelte';
  import { APP_TITLE } from '$lib/const';
  import Header from '@components/typography/Header.svelte';
  import UserItem from './UserItem.svelte';

  let users = [] as User[];

  async function deleteIt(e: CustomEvent) {
    const id = e.detail;
    await deleteUser(id);
    users = await getAll();
  }

  async function updateIt(e: CustomEvent) {
    const user = e.detail;
    await update(user);
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

<Header>Users</Header>
{#each users as user (user.authUid)}
  <UserItem {user} on:delete={deleteIt} on:update={updateIt} />
{/each}

<Button on:click={addUser} text="Add User" className="mt-4" />
