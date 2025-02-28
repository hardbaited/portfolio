<script lang="ts">
  import { Motion } from "svelte-motion";
  import { t } from "$lib/i18n";
  import { onMount, afterUpdate } from "svelte";

  export let activeSection: string = "home"; // Bound to parent's activeSection

  let left = 0;
  let width = 0;
  let opacity = 1; // Default to visible for active section

  const navs = [
    { name: "home", link: "#home" },
    { name: "about", link: "#about" },
    { name: "experience", link: "#experience" },
    { name: "skills", link: "#skills" },
    { name: "contact", link: "#contact" },
  ];

  const updatePosition = (section: string) => {
    if (typeof document === "undefined") return; // Skip during SSR
    const activeNode = document.querySelector(
      `a[href="#${section}"]`
    )?.parentElement;
    if (activeNode) {
      const rect = activeNode.getBoundingClientRect();
      left = activeNode.offsetLeft; // Fixed typo from 'node' to 'activeNode'
      width = rect.width;
      opacity = 1;
    } else {
      opacity = 0;
    }
  };

  const positionMotion = (node: HTMLElement) => {
    const setPosition = () => {
      const rect = node.getBoundingClientRect();
      left = node.offsetLeft;
      width = rect.width;
      opacity = 1;
    };
    const handleClick = () => {
      const clickedSection = node
        .querySelector("a")
        ?.getAttribute("href")
        ?.substring(1);
      if (clickedSection && navs.some((nav) => nav.name === clickedSection)) {
        activeSection = clickedSection; // Update parent's activeSection
        setPosition();
      }
    };
    node.addEventListener("mouseenter", setPosition);
    node.addEventListener("click", handleClick);
    return {
      destroy() {
        node.removeEventListener("mouseenter", setPosition);
        node.removeEventListener("click", handleClick);
      },
    };
  };

  const updateTabPositionOnScroll = () => {
    if (typeof document === "undefined") return; // Skip during SSR
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    const sections = navs.map((nav) => ({
      id: nav.name,
      offset: document.getElementById(nav.name)?.offsetTop || 0,
      height: document.getElementById(nav.name)?.offsetHeight || 0,
    }));

    let currentSection;
    if (scrollY + windowHeight >= documentHeight - 100) {
      currentSection = "contact"; // Bottom of page = "contact"
    } else {
      currentSection =
        sections.find(
          (sec) =>
            scrollY >= sec.offset - 100 &&
            scrollY < sec.offset + sec.height - 100
        )?.id || "home";
    }

    if (currentSection !== activeSection) {
      activeSection = currentSection;
      updatePosition(currentSection);
    }
  };

  const handleHashChange = () => {
    if (typeof document === "undefined") return; // Skip during SSR
    const hash = window.location.hash.substring(1);
    if (hash && navs.some((nav) => nav.name === hash)) {
      activeSection = hash;
      updatePosition(hash);
    }
  };

  onMount(() => {
    updatePosition(activeSection); // Set initial position after mount
    window.addEventListener("scroll", updateTabPositionOnScroll);
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("scroll", updateTabPositionOnScroll);
      window.removeEventListener("hashchange", handleHashChange);
    };
  });

  // Reactively update position when activeSection changes
  $: if (typeof document !== "undefined") {
    updatePosition(activeSection);
  }
</script>

<div class="hidden sm:flex w-full justify-center">
  <ul
    class="relative mx-auto flex w-fit rounded-full bg-gradient-to-r from-blue-900 to-teal-700 dark:from-gray-900 dark:to-gray-800 border-2 border-teal-400/50 p-1 sm:p-2 shadow-lg backdrop-blur-md"
  >
    {#each navs as item}
      <li
        use:positionMotion
        class="relative z-10 block cursor-pointer px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-base font-semibold text-white hover:text-teal-300 transition-all duration-300 {activeSection ===
        item.name
          ? 'text-teal-300'
          : ''}"
      >
        <a href={item.link}>{$t(`nav.${item.name}`)}</a>
      </li>
    {/each}
    <Motion
      animate={{ left, width, opacity }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      let:motion
    >
      <li
        use:motion
        class="absolute z-0 h-6 sm:h-8 md:h-10 rounded-full bg-teal-400 shadow-[0_0_15px_#14B8A6,0_0_25px_#14B8A6] opacity-90"
      ></li>
    </Motion>
  </ul>
</div>

<style>
  ul {
    transition: all 0.3s ease;
  }
  li:hover {
    text-shadow:
      0 0 10px #14b8a6,
      0 0 20px #14b8a6;
  }
</style>
