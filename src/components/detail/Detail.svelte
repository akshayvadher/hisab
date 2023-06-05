<script lang='ts'>
  export let className = '';
</script>
<div class={`flex gap-16 ${className}`}>
  <slot />
</div>
