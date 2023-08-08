<script lang='ts'>
  import { COMMON_LABEL_CLASS, COMMON_VALUE_CLASS } from '@components/form/const';
  import FormGroup from '@components/form/FormGroup.svelte';

  export let label = '';
  export let name: string;
  export let value: string;
  export let placeholder = '';
  export let required = false;
  export let disabled = false
</script>

<FormGroup>
  <label class={COMMON_LABEL_CLASS} for={name}>
    {label}</label>
  <input type='datetime-local' bind:value {placeholder} {name} id={name}
         class={COMMON_VALUE_CLASS}
         {required} {disabled}>
</FormGroup>
