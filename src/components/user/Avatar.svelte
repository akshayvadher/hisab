<script lang='ts'>
  import type { User } from '$lib/dto/user';
  import { getDoc, PROFILE_PHOTO_PATH } from '$lib/firebase/file';


  export let user: User;

  let url;
  $: {
    if (user?.photoUrl) {
      let photoUrl = user.photoUrl;
      if (photoUrl.startsWith('https://')) {
        url = photoUrl;
      } else if (photoUrl.startsWith(PROFILE_PHOTO_PATH)) {
        getDoc(photoUrl).then(_url => url = _url);
      }
    }
  }
</script>
{#if url}
  <img src={url} alt={`user ${user.name} profile photo`} class='h-8 rounded-3xl inline' />
{:else}
  <span class='text-2xl'>🦉</span>
{/if}
