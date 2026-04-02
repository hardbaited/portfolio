<script lang="ts">
  import { onMount } from "svelte";
  import {
    MoveUp,
    ExternalLink,
    ArrowUpRight,
    Menu,
    X,
    Moon,
    Sun,
  } from "lucide-svelte";
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
  import Cloudflare from "./svgs/cloudflare.svelte";

  let menuOpen = false;
  let showBackToTop = false;
  let activeSection = "home";
  let darkMode = true;
  let showCV = false;

  const roles = ["Full-Stack Web Developer", "IT Engineer"];
  let roleIndex = 0;
  let currentRole = roles[0];
  let roleTimer: any;

  const sections = [
    "home",
    "about",
    "projects",
    "experience",
    "skills",
    "contact",
  ];
  const navLabel: Record<string, string> = {
    home: "Home",
    about: "About",
    projects: "Projects",
    experience: "Experience",
    skills: "Skills",
    contact: "Contact",
  };

  const handleScroll = () => {
    const y = window.scrollY;
    showBackToTop = y > 320;
    for (const id of sections) {
      const el = document.getElementById(id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom >= 120) {
        activeSection = id;
        break;
      }
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const openCV = () => (showCV = true);
  const closeCV = () => (showCV = false);

  function toggleDark() {
    darkMode = !darkMode;
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("px-theme", darkMode ? "dark" : "light");
  }

  $: if (typeof document !== "undefined")
    document.body.classList.toggle("modal-open", showCV);

  onMount(() => {
    const saved = localStorage.getItem("px-theme");
    darkMode = saved ? saved === "dark" : true;
    document.documentElement.classList.toggle("dark", darkMode);
    roleTimer = setInterval(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      currentRole = roles[roleIndex];
    }, 2800);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCV();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      clearInterval(roleTimer);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const projects = [
    {
      title: "Gaming Multiverse",
      blurb: "My unofficial gaming brand",
      tags: ["Lua", "Servers", "Scripts"],
      links: [
        { label: "Visit website", href: "https://www.gamingmultiverse.gr" },
      ],
    },
    {
      title: "Portfolio Code",
      blurb: "Code of this Website",
      tags: ["SvelteKit", "Html", "Tailwind CSS"],
      links: [
        {
          label: "View on GitHub",
          href: "https://github.com/hardbaited/portfolio",
        },
      ],
    },
    {
      title: "Customer Data App",
      blurb: "Customer data hub concept.",
      tags: ["SvelteKit", "DaisyUI"],
      links: [
        {
          label: "View on GitHub",
          href: "https://github.com/hardbaited/CustomerData",
        },
      ],
    },
  ];

  const experience = [
    {
      title: "E-shop maintainer",
      company: "Daffys E-Shop",
      location: "Thessaloniki",
      date: "Aug 2021 – Jan 2022",
      desc: "Maintained a local e-commerce site, adding products and managing the company WordPress.",
    },
    {
      title: "Greek Military Duty",
      company: "Greek Government",
      location: "Limnos",
      date: "May 2022 – Jan 2023",
      desc: "Completed national military service.",
    },
    {
      title: "Web Developer",
      company: "Freelancing",
      location: "Thessaloniki",
      date: "Mar 2023 – Oct 2023",
      desc: "Built custom web apps (HTML/CSS/JS front-end, Node.js back-end) under NDAs for private clients.",
    },
    {
      title: "Full-Stack Web Developer / IT Engineer",
      company: "Infomax Insurance Brokers",
      location: "Thessaloniki",
      date: "Oct 2023 – Mar 2026",
      desc: "I was employed as a software engineer at Infomax, where I had the opportunity to work with cutting-edge technologies like SvelteKit, TailwindCSS, and PHP Laravel. This role allowed me to deepen my expertise in Svelte and experience firsthand what it was like to be part of a dynamic team that prioritized innovation and continuous improvement in application development.",
    },
    {
      title: "WordPress Site Maintainer",
      company: "Prasines Skepseis",
      location: "Thessaloniki",
      date: "Oct 2023 – Mar 2026",
      desc: "I was also maintaining the website of Prasines Skepseis using WordPress.",
    },
    {
      title: "Gaming Servers Operator",
      company: "Gaming Multiverse",
      location: "",
      date: "Feb 2017 – Today",
      desc: "Developing Lua scripts and custom systems for FiveM/RedM, focusing on performance and player experience.",
    },
  ];

  const skills = [
    { icon: Lua, label: "Lua" },
    { icon: SvelteIcon, label: "SvelteKit" },
    { icon: Tailwindcss, label: "TailwindCSS" },
    { icon: JavaScript, label: "JavaScript" },
    { icon: Nodejs, label: "Node.js" },
    { icon: Html, label: "HTML" },
    { icon: Css, label: "CSS" },
    { icon: Linux, label: "Unix Systems" },
    { icon: Mariadb, label: "MariaDB" },
    { icon: Mysql, label: "MySQL" },
    { icon: Laravel, label: "Laravel" },
    { icon: Cloudflare, label: "Cloudflare" },
  ];

  const contacts = [
    {
      icon: Email,
      title: "Email",
      detail: "contact@pantelisxanthos.gr",
      href: "mailto:contact@pantelisxanthos.gr",
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      detail: "linkedin.com/PantelisXanthos",
      href: "https://www.linkedin.com/in/pantelis-xanthos-46a21150/",
    },
    {
      icon: Github,
      title: "GitHub",
      detail: "github.com/hardbaited",
      href: "https://github.com/hardbaited",
    },
    { icon: Location, title: "Location", detail: "Greece", href: undefined },
  ];
</script>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class="root">
  <!-- ── Navigation ─────────────────────────────────── -->
  <header class="nav-wrap">
    <nav class="nav-inner">
      <a href="#home" class="nav-logo">
        <span class="logo-name">Pantelis Xanthos</span>
      </a>

      <ul class="nav-links">
        {#each sections as s}
          <li>
            <a
              href={`#${s}`}
              class="nav-item {activeSection === s ? 'nav-item--active' : ''}"
              >{navLabel[s]}</a
            >
          </li>
        {/each}
      </ul>
    </nav>

    {#if menuOpen}
      <div class="mobile-menu">
        {#each sections as s}
          <a
            href={`#${s}`}
            on:click={() => (menuOpen = false)}
            class="mobile-link {activeSection === s
              ? 'mobile-link--active'
              : ''}">{navLabel[s]}</a
          >
        {/each}
      </div>
    {/if}
  </header>

  <!-- ══════════════════════════════════════════════════
       01  HERO
  ══════════════════════════════════════════════════ -->
  <section id="home" class="hero">
    <div class="container">
      <div class="hero-grid">
        <!-- Left -->
        <div class="hero-copy">
          <p class="hero-eyebrow">
            <span
              class="mono text-[11px] tracking-widest text-amber-400/80 uppercase"
              >Available for freelance</span
            >
          </p>

          <h1 class="hero-name">
            Hello,<br />I'm <em>Pantelis</em>
          </h1>

          <div class="hero-role">
            <span class="role-bar"></span>
            <span class="role-text">{currentRole}</span>
          </div>

          <p class="hero-bio">
            My full name is Panteleimon Xanthos, born in April 2001 in Greece.
          </p>

          <div class="hero-ctas">
            <a href="#contact" class="btn-primary">Contact me</a>
            <button type="button" on:click={openCV} class="btn-outline"
              >View my CV</button
            >
          </div>

          <div class="hero-socials">
            <a
              href="https://github.com/hardbaited"
              target="_blank"
              class="social-link">GitHub</a
            >
            <span class="social-dot">·</span>
            <a
              href="https://www.linkedin.com/in/pantelis-xanthos-46a21150/"
              target="_blank"
              class="social-link">LinkedIn</a
            >
            <span class="social-dot">·</span>
            <a href="mailto:contact@pantelisxanthos.gr" class="social-link"
              >Email</a
            >
          </div>
        </div>

        <!-- Right: photo -->
        <div class="hero-visual">
          <div class="photo-wrap">
            <img
              src="/IMG_0513.jpeg"
              alt="Pantelis Xanthos"
              class="photo-img"
            />
            <div class="photo-accent"></div>
          </div>
          <div class="hero-tags">
            <span class="htag">Web Developer</span>
            <span class="htag">IT Engineer</span>
            <span class="htag">Computers 💘</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ══════════════════════════════════════════════════
       02  ABOUT
  ══════════════════════════════════════════════════ -->
  <section id="about" class="section">
    <div class="container">
      <div class="section-heading">
        <span class="sec-num mono">02</span>
        <h2 class="sec-title">Let me introduce<br />myself</h2>
      </div>

      <div class="about-grid">
        <div class="about-bio">
          <p>
            From a young age, I've always been drawn to technology, especially
            computers. This early interest led me to discover the world of
            programming, where I quickly found joy in solving problems and
            coming up with innovative solutions.
          </p>
          <p>
            As I continued to learn and grow, I specialized in web development,
            combining technical skills with creativity to build dynamic,
            engaging websites. Whether it's front-end or back-end logic, I'm
            passionate about every aspect of web development and always eager to
            learn new technologies and improve my skills.
          </p>
          <p>
            Outside of web development, I'm deeply into computers and hardware.
            I built my first gaming PC at 15 and still enjoy optimizing and
            upgrading my setup. I'm experienced with technical troubleshooting
            and use Ubuntu daily for development, server management, and
            operational tasks.
          </p>
          <p>
            From 2023 to 2026, I've been responsible for developing the
            Infomax.gr website with Svelte and TailwindCSS and the company's IT
            support. My work includes maintaining infrastructure, running
            automated daily backups, and providing hands-on help with employee
            workstations ensuring smooth, interruption-free workflows across the
            team.
          </p>
          <p>
            I self-host this website and Gaming Multiverse on one of my machines
            running Ubuntu 24.04, where I manage deployment, NGINX
            configuration, and DNS setup through Cloudflare.
          </p>
        </div>
        <aside class="about-aside">
          <div class="info-card">
            <span class="info-label mono">Currently</span>
            <span class="info-value">Freelancer</span>
          </div>
          <div class="info-card">
            <span class="info-label mono">Open to</span>
            <span class="info-value">Freelance &amp; collaborations</span>
          </div>
          <div class="info-card">
            <span class="info-label mono">Based in</span>
            <span class="info-value">Thessaloniki, Greece</span>
          </div>
        </aside>
      </div>
    </div>
  </section>

  <!-- ══════════════════════════════════════════════════
       03  PROJECTS
  ══════════════════════════════════════════════════ -->
  <section id="projects" class="section">
    <div class="container">
      <div class="section-heading">
        <span class="sec-num mono">03</span>
        <h2 class="sec-title">Featured projects</h2>
      </div>

      <ol class="project-list">
        {#each projects as p, i}
          <li class="project-item">
            <div class="project-top">
              <div class="project-left">
                <span class="project-num mono"
                  >{String(i + 1).padStart(2, "0")}</span
                >
                <div>
                  <h3 class="project-title">{p.title}</h3>
                  <p class="project-blurb">{p.blurb}</p>
                </div>
              </div>
              <div class="project-right">
                {#each p.links as link}
                  <a href={link.href} target="_blank" class="project-link">
                    {link.label}
                    <ArrowUpRight class="w-3.5 h-3.5" />
                  </a>
                {/each}
              </div>
            </div>
            <div class="project-tags">
              {#each p.tags as tag}<span class="ptag mono">{tag}</span>{/each}
            </div>
          </li>
        {/each}
      </ol>
    </div>
  </section>

  <!-- ══════════════════════════════════════════════════
       04  EXPERIENCE
  ══════════════════════════════════════════════════ -->
  <section id="experience" class="section">
    <div class="container">
      <div class="section-heading">
        <span class="sec-num mono">04</span>
        <h2 class="sec-title">My experience so far</h2>
      </div>

      <div class="exp-list">
        {#each experience as e, i}
          <div class="exp-item {i === 3 ? 'exp-item--featured' : ''}">
            <div class="exp-meta">
              <span class="exp-date mono">{e.date}</span>
              {#if e.location}<span class="exp-loc mono">{e.location}</span
                >{/if}
            </div>
            <div class="exp-body">
              <h3 class="exp-title">{e.title}</h3>
              <p class="exp-company">{e.company}</p>
              <p class="exp-desc">{e.desc}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- ══════════════════════════════════════════════════
       05  SKILLS
  ══════════════════════════════════════════════════ -->
  <section id="skills" class="section">
    <div class="container">
      <div class="section-heading">
        <span class="sec-num mono">05</span>
        <h2 class="sec-title">My Skill Set</h2>
      </div>

      <div class="skills-list">
        {#each skills as s}
          <div class="skill-row">
            <svelte:component this={s.icon} class="w-6 h-6 shrink-0" />
            <span class="skill-name">{s.label}</span>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- ══════════════════════════════════════════════════
       06  CONTACT
  ══════════════════════════════════════════════════ -->
  <section id="contact" class="section section--last">
    <div class="container">
      <div class="section-heading">
        <span class="sec-num mono">06</span>
        <h2 class="sec-title">My Contact Info</h2>
      </div>

      <p class="contact-sub">
        If you have a project in mind, want to collaborate, or just say hi sent
        me an email. I usually reply within a day.
      </p>

      <div class="contact-list">
        {#each contacts as c}
          <a
            href={c.href}
            target={c.href && !c.href.startsWith("mailto")
              ? "_blank"
              : undefined}
            class="contact-row {!c.href ? 'no-link' : ''}"
          >
            <span class="contact-type mono">{c.title}</span>
            <span class="contact-value">{c.detail}</span>
            {#if c.href}
              <ArrowUpRight class="w-4 h-4 contact-go" />
            {/if}
          </a>
        {/each}
      </div>
    </div>
  </section>

  <!-- ── Footer ─────────────────────────────────────── -->
  <footer class="site-footer">
    <div class="container footer-inner">
      <span class="mono text-xs">Crafted With 💘 By Pantelis Xanthos</span>
      <div class="footer-links">
        <a href="#home">Home</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </div>
    </div>
  </footer>

  <!-- ── Back to top ────────────────────────────────── -->
  {#if showBackToTop}
    <button on:click={scrollToTop} class="back-top" aria-label="Back to top">
      <MoveUp class="w-4 h-4" />
    </button>
  {/if}

  <!-- ── CV Modal ───────────────────────────────────── -->
  {#if showCV}
    <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
    <div class="modal-backdrop" on:click={closeCV}></div>
    <div role="dialog" aria-modal="true" class="modal">
      <div class="modal-header">
        <span class="modal-title">My CV</span>
        <button type="button" on:click={closeCV} class="icon-btn"
          ><X class="w-4 h-4" /></button
        >
      </div>
      <iframe src="/cv.pdf" title="CV preview" class="modal-frame"></iframe>
    </div>
  {/if}
</div>

<style>
  /* ── Reset & base ───────────────────────────────── */
  :global(html) {
    scroll-behavior: smooth;
  }
  :global(body) {
    overflow-x: hidden;
    margin: 0;
  }
  :global(body.modal-open) {
    overflow: hidden;
  }

  /* ── Design tokens ──────────────────────────────── */
  .root {
    --bg: #0c0c0c;
    --bg-raised: #111111;
    --border: #1e1e1e;
    --border-hi: #2c2c2c;
    --amber: #f59e0b;
    --amber-dim: rgba(245, 158, 11, 0.15);
    --amber-glow: rgba(245, 158, 11, 0.08);
    --text: #f0efe9;
    --text-2: #a09e96;
    --text-3: #555550;

    background: var(--bg);
    color: var(--text);
    font-family: "Inter", sans-serif;
    font-size: 16px;
    line-height: 1.6;
    min-height: 100vh;
  }

  /* Light mode */
  :global(html:not(.dark)) .root {
    --bg: #f7f7f3;
    --bg-raised: #ffffff;
    --border: #e5e5e0;
    --border-hi: #d0d0ca;
    --amber: #d97706;
    --amber-dim: rgba(217, 119, 6, 0.1);
    --amber-glow: rgba(217, 119, 6, 0.05);
    --text: #111110;
    --text-2: #5a5a55;
    --text-3: #b0b0a8;
  }

  .mono {
    font-family: "JetBrains Mono", monospace;
  }

  .container {
    max-width: 1080px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  /* ── Scrollbar ──────────────────────────────────── */
  :global(::-webkit-scrollbar) {
    width: 5px;
  }
  :global(::-webkit-scrollbar-track) {
    background: transparent;
  }
  :global(::-webkit-scrollbar-thumb) {
    background: var(--border-hi);
    border-radius: 4px;
  }
  :global(::-webkit-scrollbar-thumb:hover) {
    background: var(--amber);
  }
  :global(*) {
    scrollbar-width: thin;
    scrollbar-color: #2c2c2c transparent;
  }

  /* ── Navigation ─────────────────────────────────── */
  .nav-wrap {
    position: sticky;
    top: 0;
    z-index: 50;
    background: rgba(12, 12, 12, 0.92);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
  }
  :global(html:not(.dark)) .nav-wrap {
    background: rgba(247, 247, 243, 0.92);
  }

  .nav-inner {
    max-width: 1080px;
    margin: 0 auto;
    padding: 0 1.5rem;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .nav-logo {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    text-decoration: none;
    flex-shrink: 0;
  }
  .logo-mark {
    font-family: "Space Grotesk", sans-serif;
    font-weight: 700;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
    color: var(--bg);
    background: var(--amber);
    width: 28px;
    height: 28px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .logo-name {
    font-family: "Space Grotesk", sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    color: var(--text);
    letter-spacing: -0.01em;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  @media (max-width: 700px) {
    .nav-links {
      display: none;
    }
  }

  .nav-item {
    padding: 0.375rem 0.75rem;
    border-radius: 6px;
    font-size: 0.8125rem;
    color: var(--text-2);
    text-decoration: none;
    transition:
      color 0.15s,
      background 0.15s;
    font-family: "Space Grotesk", sans-serif;
    font-weight: 500;
  }
  .nav-item:hover {
    color: var(--text);
    background: var(--border);
  }
  .nav-item--active {
    color: var(--amber) !important;
  }

  .nav-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .icon-btn {
    width: 34px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 7px;
    border: 1px solid var(--border);
    background: transparent;
    color: var(--text-2);
    cursor: pointer;
    transition: all 0.15s;
  }
  .icon-btn:hover {
    border-color: var(--border-hi);
    color: var(--text);
  }

  .menu-btn {
    display: none;
  }
  @media (max-width: 700px) {
    .menu-btn {
      display: flex;
    }
  }

  .mobile-menu {
    border-top: 1px solid var(--border);
    padding: 0.75rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    max-width: 1080px;
    margin: 0 auto;
  }
  .mobile-link {
    display: block;
    padding: 0.5rem 0.75rem;
    border-radius: 6px;
    font-size: 0.875rem;
    color: var(--text-2);
    text-decoration: none;
    font-family: "Space Grotesk", sans-serif;
    font-weight: 500;
    transition:
      color 0.15s,
      background 0.15s;
  }
  .mobile-link:hover {
    color: var(--text);
    background: var(--border);
  }
  .mobile-link--active {
    color: var(--amber);
  }

  /* ── Hero ───────────────────────────────────────── */
  .hero {
    padding: 6rem 0 5rem;
    min-height: calc(100vh - 60px);
    display: flex;
    align-items: center;
  }
  .hero-grid {
    display: grid;
    grid-template-columns: 1fr 360px;
    gap: 4rem;
    align-items: center;
  }
  @media (max-width: 860px) {
    .hero-grid {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
    .hero-visual {
      order: -1;
    }
  }

  .hero-copy {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .hero-eyebrow {
    margin: 0;
  }

  .hero-name {
    font-family: "Space Grotesk", sans-serif;
    font-weight: 700;
    font-size: clamp(3rem, 7vw, 5.5rem);
    line-height: 1;
    letter-spacing: -0.03em;
    color: var(--text);
    margin: 0;
  }
  .hero-name em {
    font-style: normal;
    color: var(--amber);
  }

  .hero-role {
    display: flex;
    align-items: center;
    gap: 0.875rem;
  }
  .role-bar {
    display: block;
    width: 15px;
    height: 2px;
    background: var(--amber);
    flex-shrink: 0;
  }
  .role-text {
    font-family: "Space Grotesk", sans-serif;
    font-size: 1rem;
    font-weight: 500;
    color: var(--text-2);
    animation: roleFade 0.4s ease;
  }
  @keyframes roleFade {
    from {
      opacity: 0;
      transform: translateY(4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .hero-bio {
    color: var(--text-2);
    font-size: 0.9375rem;
    max-width: 440px;
    margin: 0;
  }

  .hero-ctas {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    padding: 0.625rem 1.375rem;
    border-radius: 7px;
    background: var(--amber);
    color: #0c0c0c;
    font-family: "Space Grotesk", sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    text-decoration: none;
    transition: all 0.2s;
  }
  .btn-primary:hover {
    background: #fbbf24;
    transform: translateY(-1px);
  }

  .btn-outline {
    display: inline-flex;
    align-items: center;
    padding: 0.625rem 1.375rem;
    border-radius: 7px;
    background: transparent;
    border: 1px solid var(--border-hi);
    color: var(--text);
    font-family: "Space Grotesk", sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  .btn-outline:hover {
    border-color: var(--amber);
    color: var(--amber);
    transform: translateY(-1px);
  }

  .hero-socials {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
  }
  .social-link {
    font-size: 0.8125rem;
    color: var(--text-3);
    text-decoration: none;
    transition: color 0.15s;
    font-family: "Space Grotesk", sans-serif;
  }
  .social-link:hover {
    color: var(--text);
  }
  .social-dot {
    color: var(--text-3);
  }

  /* Photo */
  .hero-visual {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
  }
  .photo-wrap {
    position: relative;
    width: 260px;
    height: 260px;
    flex-shrink: 0;
  }
  .photo-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px;
    display: block;
    position: relative;
    z-index: 1;
    filter: grayscale(15%);
  }
  .photo-accent {
    position: absolute;
    inset: -6px;
    border-radius: 20px;
    border: 2px solid var(--amber);
    z-index: 0;
    opacity: 0.5;
    transform: translate(6px, 6px);
  }
  .hero-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
  }
  .htag {
    padding: 0.3rem 0.75rem;
    border-radius: 999px;
    border: 1px solid var(--border-hi);
    font-size: 0.75rem;
    color: var(--text-2);
    font-family: "JetBrains Mono", monospace;
    background: var(--bg-raised);
  }

  /* ── Sections ───────────────────────────────────── */
  .section {
    padding: 6rem 0;
    border-top: 1px solid var(--border);
  }
  .section--last {
    padding-bottom: 7rem;
  }

  .section-heading {
    display: flex;
    align-items: baseline;
    gap: 1.25rem;
    margin-bottom: 3rem;
  }
  .sec-num {
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    color: var(--text-3);
    flex-shrink: 0;
    padding-top: 0.35em;
  }
  .sec-title {
    font-family: "Space Grotesk", sans-serif;
    font-weight: 700;
    font-size: clamp(1.875rem, 3.5vw, 2.75rem);
    letter-spacing: -0.025em;
    line-height: 1.1;
    color: var(--text);
    margin: 0;
  }

  /* ── About ──────────────────────────────────────── */
  .about-grid {
    display: grid;
    grid-template-columns: 1fr 240px;
    gap: 4rem;
    align-items: start;
  }
  @media (max-width: 700px) {
    .about-grid {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }
  }

  .about-bio {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .about-bio p {
    margin: 0;
    color: var(--text-2);
    font-size: 0.9375rem;
    line-height: 1.75;
  }

  .about-aside {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  .info-card {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 1rem 0;
    border-bottom: 1px solid var(--border);
  }
  .info-card:first-child {
    border-top: 1px solid var(--border);
  }
  .info-label {
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    color: var(--text-3);
    text-transform: uppercase;
  }
  .info-value {
    font-family: "Space Grotesk", sans-serif;
    font-weight: 600;
    font-size: 0.9375rem;
    color: var(--text);
  }

  /* ── Projects ───────────────────────────────────── */
  .project-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .project-item {
    padding: 1.75rem 0;
    border-bottom: 1px solid var(--border);
    transition: background 0.2s;
  }
  .project-item:first-child {
    border-top: 1px solid var(--border);
  }

  .project-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1.5rem;
    margin-bottom: 1rem;
  }
  @media (max-width: 600px) {
    .project-top {
      flex-direction: column;
      gap: 0.75rem;
    }
  }

  .project-left {
    display: flex;
    align-items: flex-start;
    gap: 1.25rem;
  }

  .project-num {
    font-size: 0.7rem;
    color: var(--amber);
    letter-spacing: 0.08em;
    padding-top: 0.3rem;
    flex-shrink: 0;
  }
  .project-title {
    font-family: "Space Grotesk", sans-serif;
    font-weight: 600;
    font-size: 1.125rem;
    letter-spacing: -0.01em;
    color: var(--text);
    margin: 0 0 0.25rem;
  }
  .project-blurb {
    font-size: 0.875rem;
    color: var(--text-2);
    margin: 0;
  }

  .project-right {
    flex-shrink: 0;
  }
  .project-link {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.8125rem;
    font-family: "Space Grotesk", sans-serif;
    font-weight: 500;
    color: var(--amber);
    text-decoration: none;
    border: 1px solid var(--amber-dim);
    padding: 0.375rem 0.75rem;
    border-radius: 6px;
    transition: all 0.15s;
    background: var(--amber-glow);
  }
  .project-link:hover {
    background: var(--amber-dim);
  }

  .project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding-left: 2.5rem;
  }
  .ptag {
    font-size: 0.7rem;
    letter-spacing: 0.06em;
    color: var(--text-3);
    border: 1px solid var(--border);
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
  }

  /* ── Experience ─────────────────────────────────── */
  .exp-list {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  .exp-item {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 2rem;
    padding: 1.75rem 0;
    border-bottom: 1px solid var(--border);
  }
  .exp-item:first-child {
    border-top: 1px solid var(--border);
  }
  .exp-item--featured .exp-title {
    color: var(--amber);
  }
  @media (max-width: 700px) {
    .exp-item {
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }
  }

  .exp-meta {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding-top: 0.15rem;
  }
  .exp-date {
    font-size: 0.75rem;
    letter-spacing: 0.04em;
    color: var(--text-2);
  }
  .exp-loc {
    font-size: 0.7rem;
    letter-spacing: 0.04em;
    color: var(--text-3);
  }

  .exp-title {
    font-family: "Space Grotesk", sans-serif;
    font-weight: 600;
    font-size: 1rem;
    letter-spacing: -0.01em;
    color: var(--text);
    margin: 0 0 0.125rem;
  }
  .exp-company {
    font-size: 0.8125rem;
    color: var(--text-2);
    margin: 0 0 0.75rem;
    font-family: "Space Grotesk", sans-serif;
    font-weight: 500;
  }
  .exp-desc {
    font-size: 0.875rem;
    color: var(--text-2);
    line-height: 1.7;
    margin: 0;
  }

  /* ── Skills ─────────────────────────────────────── */
  .skills-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border-top: 1px solid var(--border);
  }
  @media (max-width: 600px) {
    .skills-list {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .skill-row {
    display: flex;
    align-items: center;
    gap: 0.875rem;
    padding: 1rem 0.75rem;
    border-bottom: 1px solid var(--border);
    border-right: 1px solid var(--border);
    cursor: default;
    transition: background 0.15s;
  }
  .skill-row:hover {
    background: var(--bg-raised);
  }
  .skill-row:hover .skill-name {
    color: var(--amber);
  }

  .skill-name {
    font-family: "Space Grotesk", sans-serif;
    font-weight: 500;
    font-size: 0.9375rem;
    color: var(--text);
    transition: color 0.15s;
  }

  /* ── Contact ────────────────────────────────────── */
  .contact-sub {
    color: var(--text-2);
    font-size: 0.9375rem;
    max-width: 440px;
    margin: -1.5rem 0 2.5rem 0;
    /* Offset slightly from section heading */
    padding-left: calc(0.7rem + 1.25rem + 1.25rem); /* sec-num width + gap */
  }
  @media (max-width: 600px) {
    .contact-sub {
      padding-left: 0;
      margin-top: -1rem;
    }
  }

  .contact-list {
    border-top: 1px solid var(--border);
    max-width: 640px;
  }
  .contact-row {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 1.25rem 0;
    border-bottom: 1px solid var(--border);
    text-decoration: none;
    color: inherit;
    transition: none;
  }
  .contact-row.no-link {
    cursor: default;
  }

  .contact-type {
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-3);
    width: 80px;
    flex-shrink: 0;
  }
  .contact-value {
    font-family: "Space Grotesk", sans-serif;
    font-weight: 500;
    font-size: 1rem;
    color: var(--text);
    flex: 1;
    transition: color 0.15s;
  }
  .contact-row:hover .contact-value {
    color: var(--amber);
  }
  .contact-go {
    color: var(--text-3);
    flex-shrink: 0;
    transition:
      color 0.15s,
      transform 0.15s;
  }
  .contact-row:hover .contact-go {
    color: var(--amber);
    transform: translate(2px, -2px);
  }

  /* ── Footer ─────────────────────────────────────── */
  .site-footer {
    border-top: 1px solid var(--border);
    padding: 2rem 0;
    color: var(--text-3);
    font-size: 0.8125rem;
  }
  .footer-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .footer-links {
    display: flex;
    gap: 1.5rem;
  }
  .footer-links a {
    color: var(--text-3);
    text-decoration: none;
    font-size: 0.8125rem;
    transition: color 0.15s;
    font-family: "Space Grotesk", sans-serif;
    font-weight: 500;
  }
  .footer-links a:hover {
    color: var(--text);
  }

  /* ── Back to top ─────────────────────────────────── */
  .back-top {
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    z-index: 40;
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background: var(--amber);
    color: #0c0c0c;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: none;
    box-shadow: 0 4px 16px rgba(245, 158, 11, 0.25);
    transition:
      transform 0.15s,
      box-shadow 0.15s;
  }
  .back-top:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(245, 158, 11, 0.35);
  }

  /* ── Modal ──────────────────────────────────────── */
  .modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 50;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(4px);
  }
  .modal {
    position: fixed;
    z-index: 51;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: min(95vw, 900px);
    height: 82vh;
    background: var(--bg-raised);
    border: 1px solid var(--border-hi);
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5);
  }
  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.875rem 1.25rem;
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
  }
  .modal-title {
    font-family: "Space Grotesk", sans-serif;
    font-weight: 600;
    font-size: 0.9375rem;
    color: var(--text);
  }
  .modal-frame {
    width: 100%;
    height: 100%;
    border: none;
  }
</style>
