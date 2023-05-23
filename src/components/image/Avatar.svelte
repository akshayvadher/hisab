<script lang='ts'>
  import type { User } from '$lib/dto/user';
  import { getProfilePhotoUrl } from '$lib/firebase/file';


  export let user: User;

  let url;
  $: {
    if (user?.photoUrl) {
      let photoUrl = user.photoUrl;
      if (photoUrl.startsWith('https://')) {
        url = photoUrl;
      } else if (photoUrl.startsWith('profilePhotos')) {
        getProfilePhotoUrl(photoUrl).then(_url => url = _url);
      }
    }
  }
</script>
{#if url}
  <img src={url} alt={`user ${user.name} profile photo`} class='h-8 rounded-sm inline' />
{:else}
  <span class='text-2xl'>🦉</span>
{/if}
