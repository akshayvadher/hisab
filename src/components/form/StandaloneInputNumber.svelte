<script lang='ts'>
  import { STANDALONE_COMMON_VALUE_CLASS } from "@components/form/const";

  export let name: string;
  export let value: number;
  export let placeholder = '';
  export let required = false;
  export let disabled = false
</script>

<input type='number' bind:value {placeholder} {name} id={name}
       class={STANDALONE_COMMON_VALUE_CLASS}
       {required} {disabled}>
