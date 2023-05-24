<script lang='ts'>
  import { COMMON_LABEL_CLASS, COMMON_VALUE_CLASS } from '@components/form/const';

  export let label = '';
  export let name: string;
  export let value: string;
  export let placeholder = '';
  export let required = false;
</script>

<label class={COMMON_LABEL_CLASS} for={name}>
  {label}</label>
<input type='text' bind:value {placeholder} {name} id={name}
       class={COMMON_VALUE_CLASS}
       {required}>
