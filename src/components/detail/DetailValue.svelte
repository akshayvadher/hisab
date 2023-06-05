<script lang='ts'>
  export let label: string;
</script>
<div class='flex flex-col'>
  <div class='font-bold'>{label}</div>
  <slot />
</div>
