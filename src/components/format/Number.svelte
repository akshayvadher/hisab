<script lang="ts" context="module">
  export interface NumberFormatProps extends Intl.NumberFormatOptions {
    locale: string;
  }
</script>
<script lang="ts">
  export let number: null | number | string;
  export let props: NumberFormatProps;
  export let defaultProps = {
    locale: "en-In",
    style:,
  };

  $: formattedNumber = number.toLocaleString(props.locale, {
    notation: "compact",
    compactDisplay: "short"
  });
</script>

<span>{formattedNumber}</span>
