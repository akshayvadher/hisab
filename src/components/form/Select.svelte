<script lang='ts'>
  import { COMMON_LABEL_CLASS, COMMON_VALUE_CLASS } from '@components/form/const';
  import type { Option } from '@components/form/dto';
  import FormGroup from '@components/form/FormGroup.svelte';

  export let label = '';
  export let name: string;
  export let value: string;
  export let placeholder = '';
  export let required = false;
  export let options: Option[] = [];
</script>

<FormGroup>
  <label class={COMMON_LABEL_CLASS} for={name}>
    {label}</label>
  <select bind:value {placeholder} {name} id={name}
          class={COMMON_VALUE_CLASS}
          {required}>
    {#each options as option}
      <option value={option.value}>{option.label}</option>
    {/each}
  </select>
</FormGroup>
