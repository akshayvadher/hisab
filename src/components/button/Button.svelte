<script lang='ts'>

  export let text: string;
</script>

<button type='button'
        class='p-2 bg-blue-500 rounded-md text-white hover:bg-blue-600'
        on:click
>
  {text}
</button>
