<script lang="ts">
  // @ts-nocheck
  import { fade, slide } from "svelte/transition";
  import { t, locale, locales } from "$lib/i18n";
  import Tailwindcss from "./svgs/tailwindcss.svelte";
  import SvelteIcon from "./svgs/svelte.svelte";
  import JavaScript from "./svgs/javascript.svelte";
  import Laravel from "./svgs/laravel.svelte";
  import Nodejs from "./svgs/nodejs.svelte";
  import Html from "./svgs/html.svelte";
  import Css from "./svgs/css.svelte";
  import Email from "./svgs/email.svelte";
  import Linkedin from "./svgs/linkedin.svelte";
  import Github from "./svgs/github.svelte";
  import Location from "./svgs/location.svelte";
  import Linux from "./svgs/linux.svelte";
  import Mysql from "./svgs/mysql.svelte";
  import Mariadb from "./svgs/mariadb.svelte";
  import Lua from "./svgs/lua.svelte";
  import LanguageSelector from "./LanguageSelector.svelte";
  import { onMount } from "svelte";
  import BoxReveal from "./BoxReveal.svelte";
  import BlurIn from "./BlurIn.svelte";
  import WordsFadeIn from "./WordsFadeIn.svelte";
  import SlideTab from "./SlideTab.svelte";
  import { Menu, MoveUp, ChevronsDown } from "lucide-svelte";
  import Particles from "./Particles.svelte";

  let scrollY = 0;
  let activeSection = "home";
  let showBackToTop = false;
  let menuOpen = false;

  const toggleMenu = () => {
    menuOpen = !menuOpen;
  };

  const handleScroll = () => {
    scrollY = window.scrollY;
    showBackToTop = scrollY > 300;
    const sections = ["home", "about", "experience", "skills", "contact"];
    const sectionOffsets = sections.map((id) => ({
      id,
      offset: document.getElementById(id)?.offsetTop || 0,
    }));
    const current = sectionOffsets.find(
      (sec) => scrollY >= sec.offset - 100 && scrollY < sec.offset + 600
    );
    activeSection = current?.id || "home";
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  onMount(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const experiencesBase = [
    {
      title: "E-shop maintainer",
      company: "Daffys E-Shop",
      location: "Thessaloniki, Greece",
      date: "August 2021 - January 2022",
      descriptionKey: "experience.eshop_maintainer.description",
    },
    {
      title: "Greek Military Duty",
      company: "Greek Government",
      location: "Limnos, Greece",
      date: "May 2022 - January 2023",
      descriptionKey: "experience.military_duty.description",
    },
    {
      title: "Web Developer",
      company: "Freelancing",
      location: "Thessaloniki, Greece",
      date: "March 2023 - October 2023",
      descriptionKey: "experience.web_developer.description",
    },
    {
      title: "Full Stack Web Developer",
      company: "Infomax Insurance Brokers",
      location: "Thessaloniki, Greece",
      date: "October 2023 - Today",
      descriptionKey: "experience.full_stack_developer.description",
    },
    {
      title: "Gaming Servers Operator",
      company: "Gaming Multiverse",
      location: "",
      date: "February 2017 - Today",
      descriptionKey: "experience.gaming_servers_operator.description",
    },
  ];

  const skillsBase = [
    { icon: Lua, title: "Lua", descriptionKey: "skill.lua.description" },
    {
      icon: SvelteIcon,
      title: "SvelteKit",
      descriptionKey: "skill.sveltekit.description",
    },
    {
      icon: Tailwindcss,
      title: "TailwindCSS",
      descriptionKey: "skill.tailwindcss.description",
    },
    {
      icon: JavaScript,
      title: "JavaScript",
      descriptionKey: "skill.javascript.description",
    },
    {
      icon: Nodejs,
      title: "Node.js",
      descriptionKey: "skill.nodejs.description",
    },
    {
      icon: { component: Html, secondaryComponent: Css },
      title: "HTML & CSS",
      descriptionKey: "skill.html_css.description",
    },
    {
      icon: Linux,
      title: "Unix Systems",
      descriptionKey: "skill.unix_systems.description",
    },
    {
      icon: { component: Mariadb, secondaryComponent: Mysql },
      title: "MariaDB & MySQL",
      descriptionKey: "skill.mariadb_mysql.description",
    },
    {
      icon: Laravel,
      title: "PHP Laravel",
      descriptionKey: "skill.php_laravel.description",
    },
    {
      icon: Email,
      title: "Email System",
      descriptionKey: "skill.email_system.description",
    },
  ];

  const contactInfo = [
    {
      icon: Email,
      title: "Email",
      detail: "contact@pantelisxanthos.gr",
      link: null,
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      detail: "linkedin.com/in/PantelisXanthos",
      link: "https://www.linkedin.com/in/pantelis-xanthos-46a21150/",
    },
    {
      icon: Github,
      title: "GitHub",
      detail: "github.com/hardbaited",
      link: "https://github.com/hardbaited",
    },
    { icon: Location, title: "Location", detail: "Greece", link: null },
  ];

  $: experiences = experiencesBase.map((exp) => ({
    ...exp,
    description: $t(exp.descriptionKey),
  }));

  $: skills = skillsBase.map((skill) => ({
    ...skill,
    description: $t(skill.descriptionKey),
  }));
</script>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div
  class="font-poppins min-h-screen bg-gradient-to-br from-blue-900 via-teal-700 to-blue-600 text-white transition-colors duration-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700"
>
  <!-- Navigation -->
  <nav
    class="fixed top-0 w-full bg-blue-800 dark:bg-gray-800/80 shadow-lg z-20 backdrop-blur-md"
  >
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-center items-center"
    >
      <button
        class="sm:hidden text-teal-300 focus:outline-none"
        on:click={toggleMenu}
      >
        {#if menuOpen}✕{:else}<Menu />{/if}
      </button>
      <SlideTab />
      <LanguageSelector />
      {#if menuOpen}
        <div
          class="absolute top-full left-0 w-full bg-blue-800 dark:bg-gray-800/90 flex flex-col items-center space-y-4 py-4 sm:hidden"
          in:slide
        >
          {#each ["home", "about", "experience", "skills", "contact"] as section}
            <a
              href={`#${section}`}
              class="text-teal-100 hover:text-teal-300 transition-all duration-300 {activeSection ===
              section
                ? 'font-bold text-teal-300'
                : ''}"
              on:click={toggleMenu}
            >
              {$t(`nav.${section}`)}
            </a>
          {/each}
        </div>
      {/if}
    </div>
  </nav>

  <!-- Hero Section -->
  <section
    id="home"
    class="min-h-screen relative overflow-hidden flex flex-col justify-center items-center py-16 sm:py-24"
  >
    <Particles className="absolute inset-0" refresh={true} />
    <div class="text-center z-10 px-4 sm:px-6 flex flex-col items-center">
      <BoxReveal boxColor={"#14B8A6"} duration={0.6}>
        <h1
          class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-teal-300 drop-shadow-lg"
        >
          {$t("homepage.hello")}
        </h1>
      </BoxReveal>
      <BoxReveal boxColor={"#14B8A6"} duration={0.8}>
        <span
          class="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl text-white opacity-90"
          >Full-Stack Web Developer</span
        >
      </BoxReveal>
      <BoxReveal boxColor={"#14B8A6"} duration={1.2}>
        <a
          href="#contact"
          class="mt-6 sm:mt-8 inline-block bg-teal-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg hover:bg-teal-600 transition-transform duration-300 text-sm sm:text-base"
        >
          {$t("homepage.contactme")}
        </a>
      </BoxReveal>
    </div>

    <!-- ChevronDown with Scroll Down Text -->
    <div
      class="absolute bottom-6 transform -translate-x-1/2 text-teal-300 z-10 flex flex-col items-center animate-bounce"
    >
      <span class="text-sm sm:text-base mb-2">Scroll Down</span>
      <ChevronsDown class="w-8 h-8 sm:w-10 sm:h-10" />
    </div>
  </section>

  <!-- About Section -->
  <section
    id="about"
    class="py-16 sm:py-24 bg-opacity-90 bg-blue-800 dark:bg-gray-800 relative"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6 text-center">
      <BlurIn
        word={$t("homepage.introduction")}
        class="text-3xl sm:text-4xl font-bold text-teal-300 drop-shadow-md"
      />
      <div
        class="mt-8 sm:mt-12 space-y-6 text-base sm:text-lg leading-relaxed text-white opacity-90"
      >
        <p in:slide>{$t("homepage.introductionOne")}</p>
        <p in:slide={{ delay: 200 }}>{$t("homepage.introductionTwo")}</p>
        <p in:slide={{ delay: 400 }}>{$t("homepage.introductionThree")}</p>
      </div>
      <a
        href="/cv.pdf"
        download
        class="mt-8 sm:mt-10 inline-block bg-white text-blue-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold shadow-lg hover:bg-teal-100 hover:scale-105 transition-transform duration-300 text-sm sm:text-base"
      >
        {$t("homepage.viewMyCV")}
      </a>
    </div>
  </section>

  <!-- Experience Section -->
  <section
    id="experience"
    class="relative py-16 sm:py-24 bg-gradient-to-br from-teal-700 to-blue-900 dark:from-gray-800 dark:to-gray-900"
  >
    <Particles className="absolute inset-0 z-0" refresh={true} />
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <WordsFadeIn
        words={$t("homepage.experience")}
        class="text-3xl sm:text-4xl font-bold text-center text-teal-300 drop-shadow-md"
      />
      <div class="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {#each experiences as exp, i}
          <div
            class="bg-blue-800 dark:bg-gray-700 p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 z-10"
            in:slide={{ delay: i * 150 }}
          >
            <h3 class="text-xl sm:text-2xl font-semibold text-teal-300">
              {exp.title}
            </h3>
            <p class="text-white opacity-80 text-sm sm:text-base">
              {exp.company}, {exp.location}
            </p>
            <p class="text-teal-100 mt-2 text-sm sm:text-base">{exp.date}</p>
            <p class="mt-4 text-white opacity-90 text-sm sm:text-base">
              {exp.description}
            </p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Skills Section -->
  <section id="skills" class="py-16 sm:py-24 bg-blue-800 dark:bg-gray-800">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <BlurIn
        word={$t("homepage.skill")}
        class="text-3xl sm:text-4xl font-bold text-center text-teal-300 drop-shadow-md"
      />
      <div
        class="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
      >
        {#each skills as skill}
          <div
            class="bg-teal-900 dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col items-center text-center"
            in:fade={{ delay: skills.indexOf(skill) * 100 }}
          >
            {#if skill.icon.secondaryComponent}
              <div class="flex space-x-2 sm:space-x-4">
                <svelte:component
                  this={skill.icon.component}
                  class="w-10 h-10 sm:w-12 sm:h-12 text-teal-300"
                />
                <svelte:component
                  this={skill.icon.secondaryComponent}
                  class="w-10 h-10 sm:w-12 sm:h-12 text-teal-300"
                />
              </div>
            {:else}
              <svelte:component
                this={skill.icon}
                class="w-10 h-10 sm:w-12 sm:h-12 text-teal-300"
              />
            {/if}
            <h3 class="mt-4 text-lg sm:text-xl font-semibold text-teal-300">
              {skill.title}
            </h3>
            <p class="mt-2 text-white opacity-90 text-sm sm:text-base">
              {skill.description}
            </p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section
    id="contact"
    class="relative py-16 sm:py-24 bg-gradient-to-br from-blue-900 to-teal-700 dark:from-gray-900 dark:to-gray-800"
  >
    <Particles
      className="absolute inset-0 pointer-events-none z-0"
      refresh={true}
    />
    <div class="max-w-4xl mx-auto px-4 sm:px-6 text-center">
      <div class="text-3xl sm:text-4xl font-bold text-teal-300 drop-shadow-md">
        {$t("homepage.mycontactinfo")}
      </div>
      <div class="mt-8 sm:mt-12 space-y-6 sm:space-y-8">
        {#each contactInfo as info}
          <div
            class="bg-blue-800 dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-4 sm:gap-6 z-10 relative"
            in:fade={{ delay: contactInfo.indexOf(info) * 100 }}
          >
            <svelte:component
              this={info.icon}
              class="w-10 h-10 sm:w-12 sm:h-12 text-teal-300"
            />
            <div class="text-left">
              <h3 class="text-base sm:text-lg font-semibold text-teal-300">
                {info.title}
              </h3>
              {#if info.link}
                <a
                  href={info.link}
                  target="_blank"
                  class="text-white hover:text-teal-300 transition text-sm sm:text-base"
                >
                  {info.detail}
                </a>
              {:else}
                <p
                  class="text-white opacity-90 text-sm sm:text-base select-text"
                >
                  {info.detail}
                </p>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Back to Top Button -->
  {#if showBackToTop}
    <button
      on:click={scrollToTop}
      class="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 bg-teal-500 text-white p-3 sm:p-4 rounded-full shadow-lg hover:bg-teal-600 transition-all duration-300 text-sm sm:text-base"
      in:fade
    >
      <MoveUp />
    </button>
  {/if}

  <!-- Footer -->
  <footer class="py-6 sm:py-8 bg-blue-900 dark:bg-gray-900 text-center">
    <p class="text-teal-300 opacity-80 text-sm sm:text-base">
      Make web developing great again.
    </p>
  </footer>
</div>

<style>
  :global(body) {
    font-family: "Poppins", sans-serif;
    scroll-behavior: smooth;
  }
  :global(.bg-pattern) {
    background-size: 150px 150px;
    background-image: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.1) 1px,
      transparent 1px
    );
  }
  @media (max-width: 640px) {
    :global(.bg-pattern) {
      background-size: 100px 100px;
    }
  }
</style>
