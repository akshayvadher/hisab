<script lang="ts">
  import Avatar from '@components/user/Avatar.svelte';
  import Button from '@components/button/Button.svelte';
  import { Trash2, PencilIcon } from 'lucide-svelte';
  import type { FakeUserType } from './+page.svelte';
  import { createEventDispatcher } from 'svelte';
  import StandaloneInput from '@components/form/StandaloneInput.svelte';

  export let user: FakeUserType;

  const dispatch = createEventDispatcher();

  let editMode = false;
</script>

<div class="py-2 border-b-gray-400 border-b flex items-center gap-2">
  <Avatar {user} />
  <p class="text-lg font-bold">
    {#if editMode}
      <StandaloneInput bind:value={user.name} name="name" />
    {:else}
      {user.name}
    {/if}
  </p>
  <p class="text-sm text-gray-500">{user.email}</p>
  {#if user.fake}
    <Button
      on:click={() => {
        if (!editMode) {
          editMode = true;
        } else {
          dispatch('update', user);
          editMode = false;
        }
      }}
    >
      <PencilIcon />
      Update
    </Button>
    <Button on:click={() => dispatch('delete', user.authUid)} category="danger">
      <Trash2 />
      Delete
    </Button>
  {/if}
</div>
