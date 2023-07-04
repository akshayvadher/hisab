<script lang='ts'>
  export let className = '';
</script>
<div class={`flex gap-16 print:text-black ${className}`}>
  <slot />
</div>
