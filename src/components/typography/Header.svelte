<script lang='ts'>
  export let className = '';
  export let paddingTop = false;
</script>
<h1 class={`text-2xl pb-2 border-b border-b-gray-400 ${className}`}
    class:pt-2={paddingTop}>
  <slot />
</h1>
