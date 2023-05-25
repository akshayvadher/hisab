<script lang='ts'>
  import { COMMON_LABEL_CLASS } from '@components/form/const';
  import FormGroup from '@components/form/FormGroup.svelte';
  import { uploadTransactionDoc } from '$lib/firebase/file';

  export let label = '';
  export let name: string;
  export let value: string;
  export let placeholder = '';
  export let required = false;
  export let disabled = false;
  export let transactionId: string;

  function fileUpload(e: InputEvent) {
    const target = e.target as HTMLInputElement;
    if (!target.files) return;
    const file = target.files[0] as File;
    const reader = new FileReader();
    const MIMEType = file.type;
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const binaryString = reader.result as string;
      const base64 = btoa(binaryString);
      const blob = b64toBlob(base64, MIMEType, 512);
      value = await uploadTransactionDoc(transactionId, file.name, blob);
    };
  }

  function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  }
</script>

<FormGroup>
  <label class={COMMON_LABEL_CLASS} for={name}>
    {label}</label>
  <input type='file' bind:value {placeholder} {name} id={name}
         class='rounded-sm px-0.5 py-0.5 focus:outline outline-cyan-400 border border-cyan-400 dark:border-none text-md text-cyan-950 bg-gray-50 dark:bg-gray-700 dark:text-white md:w-2/3 w-full'
         {required} {disabled} on:change={fileUpload}>
</FormGroup>
