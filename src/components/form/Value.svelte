<script lang='ts'>
  import { COMMON_LABEL_CLASS } from '@components/form/const';
  import FormGroup from '@components/form/FormGroup.svelte';

  export let label = '';
  export let name: string;
  export let value: string;
</script>

<FormGroup>
  <label class={COMMON_LABEL_CLASS} for={name}>
    {label}</label>
  <span  id={name}
         class='text-md px-2 py-1 text-cyan-950 dark:text-cyan-200 md:w-2/3 w-full'
  >{value}</span>
</FormGroup>
