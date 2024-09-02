<script lang="ts">
  import { fade } from "svelte/transition";
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
  import ArrowDown from "./svgs/ArrowDown.svelte";
  import Linux from "./svgs/linux.svelte";
  import Mysql from "./svgs/mysql.svelte";
  import Mariadb from "./svgs/mariadb.svelte";
  import Lua from "./svgs/lua.svelte";
  import LanguageSelector from "./LanguageSelector.svelte";
  import { onMount } from "svelte";

  let scrollY = 0;
  let visibleLine = 1;
  let fadeInTechnologyContainer = false;
  let activeIndex = -1;
  const cycleInterval = 2000;
  let interval: number | undefined;
  let line15 = 15;
  let line16 = 16;
  let line17 = 17;

  const elements = [Html, SvelteIcon, Tailwindcss, JavaScript];

  const handleScroll = () => {
    scrollY = window.scrollY;
    const newVisibleLine = Math.min(20, Math.floor(scrollY / 500) + 1);
    if (newVisibleLine !== visibleLine) {
      visibleLine = newVisibleLine;
    }
    fadeInTechnologyContainer = scrollY > window.innerHeight;
  };

  const disableScroll = () => {
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      document.body.style.overflow = "";
    }, 1000);
  };

  const calculateVisibleLines = (width: number) => {
    if (width < 768) {
      // Mobile
      line15 = 18;
      line16 = 19;
      line17 = 20;
    } else if (width >= 768 && width < 1024) {
      // Tablet
      line15 = 13;
      line16 = 14;
      line17 = 15;
    } else {
      // Desktop
      line15 = 13;
      line16 = 14;
      line17 = 15;
    }
  };

  onMount(() => {
    window.addEventListener("scroll", handleScroll);
    calculateVisibleLines(window.innerWidth);

    if (window.innerWidth <= 768) {
      interval = setInterval(() => {
        activeIndex = (activeIndex + 1) % elements.length;
      }, cycleInterval);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  });

  const experiencesBase = [
    {
      title: "Web Developer Intern",
      company: "Daffys E-Shop",
      location: "Thessaloniki, Greece",
      date: "August 2021 - January 2022",
      descriptionKey: "experience.web_developer_intern.description",
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
      title: "Full Stack Web Developer - Software Engineer",
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
    {
      icon: Lua,
      title: "Lua",
      descriptionKey: "skill.lua.description",
    },
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
    {
      icon: Location,
      title: "Location",
      detail: "Greece",
      link: null,
    },
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

<LanguageSelector />

<div class="">
  <div class="min-h-screen flex flex-col items-center justify-center">
    <div class="sticky top-0 w-full h-screen flex items-center justify-center">
      <div class="w-full relative">
        <h1
          class="absolute inset-0 flex items-center justify-center text-2xl text-[#576CBC] transition-opacity duration-500 text-center"
          class:opacity-0={visibleLine !== 1}
          class:opacity-100={visibleLine === 1}
        >
          {$t("homepage.hello")}! 👋
        </h1>

        <h2
          class="absolute inset-0 flex items-center justify-center text-3xl text-[#576CBC] transition-opacity duration-500 text-center"
          class:opacity-0={visibleLine !== 2}
          class:opacity-100={visibleLine === 2}
        >
          {$t("homepage.welcome")}! 💻
        </h2>

        <h3
          class="absolute inset-0 flex items-center justify-center text-3xl text-[#576CBC] transition-opacity duration-500 text-center"
          class:opacity-0={visibleLine !== 3}
          class:opacity-100={visibleLine === 3}
        >
          {$t("homepage.intro")} 🚀
        </h3>
      </div>
    </div>

    {#if visibleLine === 1}
      <div
        class="sticky bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <ArrowDown class="w-12 h-12 animate-bounce text-[#576CBC]" />
        <p class="text-[#576CBC] text-sm mt-2">Scroll down</p>
      </div>
    {/if}
    <div class="h-[130vh]"></div>
  </div>

  {#if fadeInTechnologyContainer}
    <div
      class="bg-[#576CBC] h-96 shadow-lg shadow-[#19376D] flex flex-col justify-center items-center"
      in:fade={{ duration: 2000 }}
    >
      <h2 class="text-lg text-center text-[#0B2447]">
        {$t("homepage.builtinfo")}
      </h2>

      <div class="flex pt-4 space-x-4">
        {#each elements as Element, index}
          <div
            class="transition-transform transform duration-300 hover:scale-125"
            class:scale-125={activeIndex === index && window.innerWidth <= 768}
          >
            <Element class="w-12 h-12" />
          </div>
        {/each}
      </div>
    </div>
  {/if}

  <div
    class="text-[#576CBC] text-center items-center flex flex-col justify-center pt-28 pb-28 lg:px-96"
  >
    <h3 class="text-[#A5D7E8]">{$t("homepage.introduction")}</h3>
    <p class="pt-6 mx-7">
      {$t("homepage.introductionOne")}
      <br />
      <br />
      {$t("homepage.introductionTwo")}
      <br />
      <br />
      {$t("homepage.introductionThree")}
      <br />
      <br />
      {$t("homepage.introductionFour")}
    </p>
  </div>

  <div
    class="bg-[#576CBC] h-44 shadow-lg shadow-[#19376D] flex flex-col justify-center items-center"
  >
    <h2 class="text-center text-[#0B2447] text-3xl font-semibold">
      {$t("homepage.experience")}
    </h2>
  </div>

  <div
    class="mx-7 my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 pt-20 pb-20 lg:px-96"
  >
    {#each experiences as experiences}
      <div
        class="bg-white shadow-lg shadow-[#576CBC] rounded-lg p-6 lg:hover:scale-110 transition"
      >
        <h3 class="text-[#0B2447] text-xl font-bold">{experiences.title}</h3>
        <p class="text-[#576CBC] font-semibold">
          {experiences.company}, {experiences.location}
        </p>
        <p class="text-gray-600 mt-2">{experiences.date}</p>
        <p class="text-gray-700 mt-4">{experiences.description}</p>
      </div>
    {/each}
  </div>

  <div
    class="bg-[#576CBC] h-44 shadow-lg shadow-[#19376D] flex flex-col justify-center items-center"
  >
    <h2 class="text-center text-[#0B2447] text-3xl font-semibold">
      {$t("homepage.skill")}
    </h2>
  </div>

  <div
    class="mx-7 my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-20 pb-20 lg:px-96"
  >
    {#each skills as skill}
      <div
        class="bg-white shadow-lg shadow-[#576CBC] rounded-lg p-6 flex flex-col items-center text-center lg:hover:scale-110 transition"
      >
        {#if skill.icon.secondaryComponent}
          <div class="flex justify-center items-center">
            <svelte:component this={skill.icon.component} class="w-12 h-12" />
            <svelte:component
              this={skill.icon.secondaryComponent}
              class="w-11 h-11"
            />
          </div>
        {:else}
          <svelte:component this={skill.icon} class="w-12 h-12" />
        {/if}
        <h3 class="text-[#0B2447] text-xl font-bold">{skill.title}</h3>
        <p class="text-gray-700 mt-2">{skill.description}</p>
      </div>
    {/each}
  </div>

  <div class="min-h-screen flex flex-col items-center justify-center">
    <div class="sticky top-0 w-full h-screen flex items-center justify-center">
      <div class="w-full relative">
        <h1
          class="absolute inset-0 flex items-center justify-center text-2xl text-[#576CBC] transition-opacity duration-500 text-center"
          class:opacity-0={visibleLine !== line15}
          class:opacity-100={visibleLine === line15}
        >
          {$t("homepage.like")} 😎
        </h1>

        <h2
          class="absolute inset-0 flex items-center justify-center text-3xl text-[#576CBC] transition-opacity duration-500 text-center"
          class:opacity-0={visibleLine !== line16}
          class:opacity-100={visibleLine === line16}
        >
          {$t("homepage.contactme")}! 📸
        </h2>

        <h3
          class="absolute inset-0 flex items-center justify-center text-3xl text-[#576CBC] transition-opacity duration-500 text-center"
          class:opacity-0={visibleLine !== line17}
          class:opacity-100={visibleLine === line17}
        >
          {$t("homepage.findmysocials")}! 👌
        </h3>
      </div>
    </div>

    {#if visibleLine === line15}
      <div
        class="sticky bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <ArrowDown class="w-12 h-12 animate-bounce text-[#576CBC]" />
        <p class="text-[#576CBC] text-sm mt-2">Scroll</p>
      </div>
    {/if}
    <div class="h-[130vh]"></div>
  </div>

  <div
    class="bg-[#576CBC] h-44 shadow-lg shadow-[#19376D] flex flex-col justify-center items-center"
  >
    <h2 class="text-center text-[#0B2447] text-3xl font-semibold">
      {$t("homepage.mycontactinfo")}
    </h2>
  </div>

  <div class="flex w-full justify-center">
    <div class="mx-7 my-10 space-y-6 pt-16 pb-16 lg:w-[25rem] md:w-[29rem]">
      {#each contactInfo as info}
        <div
          class="bg-white shadow-md rounded-lg p-6 flex items-center gap-4 lg:hover:scale-110 transition"
        >
          <svelte:component this={info.icon} class="w-12 h-12" />
          <div>
            <h3 class="text-[#0B2447] text-xl font-bold">{info.title}</h3>
            {#if info.link}
              <p class="text-gray-700">
                <a
                  href={info.link}
                  target="_blank"
                  class="text-[#576CBC] underline"
                >
                  {info.detail}
                </a>
              </p>
            {:else}
              <p class="text-gray-700 select-text">{info.detail}</p>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
