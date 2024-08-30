<script lang="ts">
  import "../app.css";
  import Home from "../components/Home.svelte";
</script>

<svelte:head>
  <!-- Import base css -->
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/svelte-hamburgers@3/dist/css/base.css"
  />

  <!-- Import spin css (spin is default type) -->
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/svelte-hamburgers@3/dist/css/types/spin.css"
  />

  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Roboto:wght@400;700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<body class=" w-screen h-screen bg-[#0B2447] select-none">
  <Home />
</body>
