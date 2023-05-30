<script lang='ts'>
  import { COMMON_LABEL_CLASS } from '@components/form/const';
  import FormGroup from '@components/form/FormGroup.svelte';
  import { uploadTransactionDoc } from '$lib/firebase/file';
  import { ulid } from 'ulid';

  export let label = '';
  export let name: string;
  export let value: string;
  export let placeholder = '';
  export let required = false;
  export let disabled = false;
  export let transactionId: string;

  let processing = false;
  let uploading = false;

  function fileUpload(e: InputEvent) {
    processing = true;
    const target = e.target as HTMLInputElement;
    if (!target.files || !target.files?.length) return;
    const file = target.files[0] as File;
    const reader = new FileReader();
    const MIMEType = file.type;
    reader.onload = async () => {
      const fileContent = reader.result as ArrayBuffer;
      uploading = true;
      value = await uploadTransactionDoc(transactionId, `${ulid()}_${file.name}`, fileContent, {
        contentType: MIMEType,
      });
      uploading = false;
      processing = false;
    };
    reader.readAsArrayBuffer(file);
  }
</script>

<FormGroup>
  <label class={COMMON_LABEL_CLASS} for={name}>
    {label}
    {#if processing}
      <div class='inline pl-2 text-xs text-gray-500 dark:text-gray-400'>(Processing...)</div>
    {:else if uploading}
      <div class='inline pl-2 text-xs text-gray-500 dark:text-gray-400'>(Uploading...)</div>
    {:else if value}
      <div class='inline pl-2 text-xs text-gray-500 dark:text-gray-400'>(Uploaded)</div>
    {/if}
  </label>
  <input type='file' bind:value {placeholder} {name} id={name}
         class='rounded-sm px-0.5 py-0.5 focus:outline outline-cyan-400 border border-cyan-400 dark:border-none text-md text-cyan-950 bg-gray-50 dark:bg-gray-700 dark:text-white md:w-2/3 w-full'
         {required} {disabled} on:change={fileUpload}>
</FormGroup>
