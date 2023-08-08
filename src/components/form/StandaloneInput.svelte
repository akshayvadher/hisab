<script lang='ts'>
  import { STANDALONE_COMMON_VALUE_CLASS } from "@components/form/const";

  export let name: string;
  export let value: string;
  export let placeholder = '';
  export let required = false;
  export let disabled = false
</script>

<input type='text' bind:value {placeholder} {name} id={name}
       class={STANDALONE_COMMON_VALUE_CLASS}
       {required} {disabled}>
