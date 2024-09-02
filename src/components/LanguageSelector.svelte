<script>
  import { t, locale, locales } from "$lib/i18n";
</script>

<div class="fixed top-0 right-0 m-4 z-50">
  <select
    bind:value={$locale}
    class="p-2 bg-transparent text-[#A5D7E8] uppercase"
  >
    {#each locales as l}
      <option class="uppercase text-[#0B2447]" value={l}>{l}</option>
    {/each}
  </select>
</div>
