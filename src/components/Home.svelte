<script lang="ts">
  import { fade } from "svelte/transition";
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

  const freezeLines = [2, 3, 12, 13, 14];

  const elements = [Html, SvelteIcon, Tailwindcss, JavaScript];

  const handleScroll = () => {
    scrollY = window.scrollY;
    const newVisibleLine = Math.min(20, Math.floor(scrollY / 500) + 1);
    if (newVisibleLine !== visibleLine) {
      visibleLine = newVisibleLine;
      console.log(visibleLine);
      if (freezeLines.includes(visibleLine)) {
        disableScroll();
      }
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
      line15 = 17;
      line16 = 18;
      line17 = 19;
    } else if (width >= 768 && width < 1024) {
      // Tablet
      line15 = 13;
      line16 = 14;
      line17 = 15;
    } else {
      // Desktop
      line15 = 12;
      line16 = 13;
      line17 = 14;
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

  const experiences = [
    {
      title: "Web Developer Intern",
      company: "Daffys E-Shop",
      location: "Thessaloniki, Greece",
      date: "August 2021 - January 2022",
      description:
        "Worked on front-end development, utilizing HTML, CSS, and JavaScript to build responsive websites. Collaborated with other developers to improve user interfaces and enhance user experience.",
    },
    {
      title: "Greek Military Duty",
      company: "Greek Goverment",
      location: "Limnos, Greece",
      date: "May 2022 - January 2023",
      description:
        "I have fulfilled my military service obligations to my country.",
    },
    {
      title: "Web Developer",
      company: "Freelancing",
      location: "Thessaloniki, Greece",
      date: "Martch 2023 - Octomber 2023",
      description:
        "I have collaborated with private clients to transform their web application concepts into reality, utilizing raw HTML, CSS, and JavaScript for the front-end, and Node.js for the back-end. Due to non-disclosure agreements, I am unable to share specific code or client names.",
    },
    {
      title: "Full Stack Web Developer - Software Engineer",
      company: "Infomax Insurance Brokers",
      location: "Thessaloniki, Greece",
      date: "Octomber 2023 - Today",
      description:
        "I am currently employed as a software engineer at Infomax, where I've had the opportunity to work with cutting-edge technologies like SvelteKit, TailwindCSS, and PHP Laravel. This role has allowed me to deepen my expertise in Svelte and experience firsthand what it’s like to be part of a dynamic team that prioritizes innovation and continuous improvement in application development.",
    },
  ];

  const skills = [
    {
      icon: Lua,
      title: "Lua",
      description:
        "Advanced in Lua programming, specializing in developing robust and efficient scripts for games.",
    },
    {
      icon: SvelteIcon,
      title: "SvelteKit",
      description:
        "Advanced experience in building modern, reactive web applications using SvelteKit.",
    },
    {
      icon: Tailwindcss,
      title: "TailwindCSS",
      description:
        "Proficient in crafting responsive and visually appealing UI using TailwindCSS.",
    },
    {
      icon: JavaScript,
      title: "JavaScript",
      description:
        "Extensive experience in building interactive front-end applications with JavaScript.",
    },
    {
      icon: Nodejs,
      title: "Node.js",
      description:
        "Strong proficiency in server-side development using Node.js.",
    },
    {
      icon: { component: Html, secondaryComponent: Css },
      title: "HTML & CSS",
      description:
        "Expert in building and styling web pages using HTML5 and CSS3.",
    },
    {
      icon: Linux,
      title: "Unix Systems",
      description:
        "Extensive experience in managing and maintaining Ubuntu-based Linux systems.",
    },
    {
      icon: { component: Mariadb, secondaryComponent: Mysql },
      title: "MariaDB & MySQL",
      description:
        "Extensive experience in managing and maintaining MariaDB & Mysql Instances.",
    },
    {
      icon: Laravel,
      title: "PHP Laravel",
      description:
        "intermediate in developing back-end systems with Laravel and PHP.",
    },
    {
      icon: Email,
      title: "Email System",
      description:
        "intermediate in creating mailcow docker instances to use for emails.",
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
</script>

<div class="">
  <div class="min-h-screen flex flex-col items-center justify-center">
    <div class="sticky top-0 w-full h-screen flex items-center justify-center">
      <div class="w-full relative">
        <h1
          class="absolute inset-0 flex items-center justify-center text-2xl text-[#576CBC] transition-opacity duration-500 text-center"
          class:opacity-0={visibleLine !== 1}
          class:opacity-100={visibleLine === 1}
        >
          Hello! 👋
        </h1>

        <h2
          class="absolute inset-0 flex items-center justify-center text-3xl text-[#576CBC] transition-opacity duration-500 text-center"
          class:opacity-0={visibleLine !== 2}
          class:opacity-100={visibleLine === 2}
        >
          Welcome to my website! 💻
        </h2>

        <h3
          class="absolute inset-0 flex items-center justify-center text-3xl text-[#576CBC] transition-opacity duration-500 text-center"
          class:opacity-0={visibleLine !== 3}
          class:opacity-100={visibleLine === 3}
        >
          I'm Pantelis and I'm a Full Stack web developer 🚀
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
        I have built this website with the latest technologies in mind
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
    <h3 class="text-[#A5D7E8]">Let me introduce myself.</h3>
    <p class="pt-6 mx-7">
      My full name is Panteleimon Xanthos, and I was born in April of 2001 in
      Greece.
      <br />
      <br />
      From a young age, I’ve always been drawn to technology, especially computers.
      This early interest led me to discover the world of programming, where I quickly
      found joy in solving problems and coming up with innovative solutions. As I
      continued to learn and grow, I specialized in web development, combining technical
      skills with creativity to build dynamic, engaging websites. Whether it’s front-end
      or back-end logic, I’m passionate about every aspect of web development and
      always eager to learn new technologies and improve my skills.
      <br />
      <br />
      Beyond programming, I have a deep love for gaming. Gaming has been a long-time
      hobby that not only provides entertainment but also sparks inspiration. It’s
      the perfect way to unwind and often serves as a great source of ideas for my
      work in technology and design. Whether I’m diving into an immersive RPG or
      competing in a fast-paced shooter, gaming plays a significant role in my life,
      complementing my passion for tech and creativity.
      <br />
      <br />
      I’m also passionate about traveling, as it gives me the opportunity to experience
      different cultures and broaden my horizons. So far, I’ve visited the UK, Italy,
      Bulgaria, North Macedonia, Austria, and Hungary. Of all the places I’ve been,
      Hungary stands out as my favorite destination. Looking ahead, my goal is to
      travel to the USA, where I’m excited to explore new places and experiences.
    </p>
  </div>

  <div
    class="bg-[#576CBC] h-44 shadow-lg shadow-[#19376D] flex flex-col justify-center items-center"
  >
    <h2 class="text-center text-[#0B2447] text-3xl font-semibold">
      My experience so far
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
      My Skill Set
    </h2>
  </div>

  <div
    class="mx-7 my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pt-20 pb-20 lg:px-96"
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
          Like what you saw? 😎
        </h1>

        <h2
          class="absolute inset-0 flex items-center justify-center text-3xl text-[#576CBC] transition-opacity duration-500 text-center"
          class:opacity-0={visibleLine !== line16}
          class:opacity-100={visibleLine === line16}
        >
          Feel free to contact me for any questions or offers! 📸
        </h2>

        <h3
          class="absolute inset-0 flex items-center justify-center text-3xl text-[#576CBC] transition-opacity duration-500 text-center"
          class:opacity-0={visibleLine !== line17}
          class:opacity-100={visibleLine === line17}
        >
          Bellow you are going to find my social links and my contact info! 👌
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
      My Contact Info
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
