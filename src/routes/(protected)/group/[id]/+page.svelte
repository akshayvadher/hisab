<script lang='ts'>
  import Header from '@components/typography/Header.svelte';
  import AddTransaction from './AddTransaction.svelte';
  import ListTransaction from './ListTransaction.svelte';
  import { ulid } from 'ulid';

  /** @type {import('./$types').PageData} */
  export let data;

  let change: string = ulid(); // TODO better strategy for re render
</script>

<Header>{data.group.name}</Header>
{#key data.id}
  <AddTransaction groupId={data.id} bind:change={change} />
  {#key change}
    <ListTransaction groupId={data.id} />
  {/key}
{/key}
