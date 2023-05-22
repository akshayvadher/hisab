<script lang='ts'>
  import { goto } from '$app/navigation';
  import Button from '../../components/button/Button.svelte';
</script>
Landing page

<Button text='Login' on:click={()=>goto('/login')}></Button>
