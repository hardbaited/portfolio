import { c as create_ssr_component, b as compute_rest_props, d as spread, f as escape_attribute_value, h as escape_object, a as subscribe, i as each, j as add_attribute, e as escape, v as validate_component, m as missing_component } from "../../chunks/ssr.js";
import { d as derived, w as writable } from "../../chunks/index.js";
const translations = {
  en: {
    "homepage.hello": "Hello",
    "homepage.welcome": "Welcome to my website",
    "homepage.intro": "I'm Pantelis and I'm a Full Stack web developer",
    "homepage.builtinfo": "I have built this website with the latest technologies in mind",
    "homepage.introduction": "Let me introduce myself.",
    "homepage.introductionPartOne": "Let me introduce myself.",
    "homepage.introductionOne": "My full name is Panteleimon Xanthos, and I was born in April of 2001 in Greece.",
    "homepage.introductionTwo": "From a young age, I’ve always been drawn to technology, especially computers. This early interest led me to discover the world of programming, where I quickly found joy in solving problems and coming up with innovative solutions. As I continued to learn and grow, I specialized in web development, combining technical skills with creativity to build dynamic, engaging websites. Whether it’s front-end or back-end logic, I’m passionate about every aspect of web development and always eager to learn new technologies and improve my skills.",
    "homepage.introductionThree": "Beyond programming, I have a deep love for gaming. Gaming has been a long-time hobby that not only provides entertainment but also sparks inspiration. It’s the perfect way to unwind and often serves as a great source of ideas for my work in technology and design. Whether I’m diving into an immersive RPG or competing in a fast-paced shooter, gaming plays a significant role in my life, complementing my passion for tech and creativity.",
    "homepage.introductionFour": "I’m also passionate about traveling, as it gives me the opportunity to experience different cultures and broaden my horizons. So far, I’ve visited the UK, Italy, Bulgaria, North Macedonia, Austria, and Hungary. Of all the places I’ve been, Hungary stands out as my favorite destination. Looking ahead, my goal is to travel to the USA, where I’m excited to explore new places and experiences.",
    "homepage.experience": "My experience so far",
    "homepage.skill": "My Skill Set",
    "homepage.like": "Like what you saw?",
    "homepage.contactme": "Feel free to contact me for any questions or offers",
    "homepage.findmysocials": "Bellow you are going to find my social links and my contact info",
    "homepage.mycontactinfo": "My Contact Info",
    "experience.web_developer_intern.description": "Worked on front-end development, utilizing HTML, CSS, and JavaScript to build responsive websites. Collaborated with other developers to improve user interfaces and enhance user experience.",
    "experience.military_duty.description": "I have fulfilled my military service obligations to my country.",
    "experience.web_developer.description": "I have collaborated with private clients to transform their web application concepts into reality, utilizing raw HTML, CSS, and JavaScript for the front-end, and Node.js for the back-end. Due to non-disclosure agreements, I am unable to share specific code or client names.",
    "experience.full_stack_developer.description": "I am currently employed as a software engineer at Infomax, where I've had the opportunity to work with cutting-edge technologies like SvelteKit, TailwindCSS, and PHP Laravel. This role has allowed me to deepen my expertise in Svelte and experience firsthand what it’s like to be part of a dynamic team that prioritizes innovation and continuous improvement in application development.",
    "experience.gaming_servers_operator.description": "I began my journey into server development at the age of 16, quickly honing my skills in various programming languages and frameworks. Over the years, I have worked extensively with Lua, HTML, CSS, JavaScript, Svelte, MySQL/MariaDB, and TailwindCSS to create high-quality scripts and custom features for FiveM and RedM servers. My work has consistently focused on enhancing the gaming experience through innovative and efficient server-side development, ensuring smooth performance and engaging content for players.",
    "skill.lua.description": "Advanced in Lua programming, specializing in developing robust and efficient scripts for games.",
    "skill.sveltekit.description": "Advanced experience in building modern, reactive web applications using SvelteKit.",
    "skill.tailwindcss.description": "Proficient in crafting responsive and visually appealing UI using TailwindCSS.",
    "skill.javascript.description": "Extensive experience in building interactive front-end applications with JavaScript.",
    "skill.nodejs.description": "Strong proficiency in server-side development using Node.js.",
    "skill.html_css.description": "Expert in building and styling web pages using HTML5 and CSS3.",
    "skill.unix_systems.description": "Extensive experience in managing and maintaining Ubuntu-based Linux systems.",
    "skill.mariadb_mysql.description": "Extensive experience in managing and maintaining MariaDB & MySQL instances.",
    "skill.php_laravel.description": "Intermediate in developing back-end systems with Laravel and PHP.",
    "skill.email_system.description": "Intermediate in creating mailcow docker instances for email management."
  },
  gr: {
    "homepage.hello": "Γειά σας",
    "homepage.welcome": "Καλως ήρθατε στην ιστοσελίδα μου",
    "homepage.intro": "Είμαι ο Παντελής και είμαι ένας Full Stack developer",
    "homepage.builtinfo": "Έχω δημιουργήσει αυτόν τον ιστότοπο με τις πιο σύγχρονες τεχνολογίες",
    "homepage.introduction": "Ας σας συστηθώ.",
    "homepage.introductionPartOne": "Ας σας συστηθώ.",
    "homepage.introductionOne": "Το όνομά μου είναι Παντελεήμων Ξανθός και γεννήθηκα τον Απρίλιο του 2001 στην Ελλάδα.",
    "homepage.introductionTwo": "Από μικρή ηλικία, πάντα με τραβούσε η τεχνολογία, και ιδιαίτερα οι υπολογιστές. Αυτή η πρώιμη ενδιαφέρον μου με οδήγησε να ανακαλύψω τον κόσμο του προγραμματισμού, όπου γρήγορα βρήκα χαρά στην επίλυση προβλημάτων και στην αναζήτηση καινοτόμων λύσεων. Καθώς συνέχισα να μαθαίνω και να εξελίσσομαι, εξειδικεύτηκα στην ανάπτυξη ιστοσελίδων, συνδυάζοντας τεχνικές δεξιότητες με δημιουργικότητα για να κατασκευάζω δυναμικές και ελκυστικές ιστοσελίδες. Είτε πρόκειται για front-end είτε για back-end λογική, είμαι παθιασμένος με κάθε πτυχή της ανάπτυξης ιστοσελίδων και πάντα πρόθυμος να μάθω νέες τεχνολογίες και να βελτιώσω τις δεξιότητές μου.",
    "homepage.introductionThree": "Πέρα από τον προγραμματισμό, έχω μια βαθιά αγάπη για το gaming. Το gaming είναι ένα χόμπι που ασχολούμαι εδώ και πολύ καιρό, το οποίο δεν προσφέρει μόνο διασκέδαση αλλά και έμπνευση. Είναι ο ιδανικός τρόπος να χαλαρώσω και συχνά αποτελεί εξαιρετική πηγή ιδεών για τη δουλειά μου στην τεχνολογία και τον σχεδιασμό. Είτε παίζω ένα RPG με πλούσια ιστορία είτε ανταγωνίζομαι σε ένα γρήγορο shooter, το gaming παίζει σημαντικό ρόλο στη ζωή μου, συμπληρώνοντας το πάθος μου για την τεχνολογία και τη δημιουργικότητα.",
    "homepage.introductionFour": "Είμαι επίσης παθιασμένος με τα ταξίδια, καθώς μου δίνουν την ευκαιρία να γνωρίσω διαφορετικές κουλτούρες και να διευρύνω τους ορίζοντές μου. Μέχρι στιγμής, έχω επισκεφθεί το Ηνωμένο Βασίλειο, την Ιταλία, τη Βουλγαρία, τη Βόρεια Μακεδονία, την Αυστρία και την Ουγγαρία. Από όλα τα μέρη που έχω επισκεφθεί, η Ουγγαρία ξεχωρίζει ως ο αγαπημένος μου προορισμός. Κοιτώντας το μέλλον, στόχος μου είναι να ταξιδέψω στις ΗΠΑ, όπου ανυπομονώ να εξερευνήσω νέα μέρη και εμπειρίες.",
    "homepage.experience": "Η εμπειρία μου μέχρι τώρα",
    "homepage.skill": "Οι δεξιότητές μου",
    "homepage.like": "Σας άρεσε αυτό που είδατε;",
    "homepage.contactme": "Μη διστάσετε να με επικοινωνήσετε για οποιεσδήποτε ερωτήσεις ή προτάσεις",
    "homepage.findmysocials": "Παρακάτω θα βρείτε τα socials μου και τα στοιχεία επικοινωνίας μου",
    "homepage.mycontactinfo": "Τα στοιχεία επικοινωνίας μου",
    "experience.web_developer_intern.description": "Δούλεψα στην ανάπτυξη του front-end, χρησιμοποιώντας HTML, CSS και JavaScript για να δημιουργήσω responsive ιστοσελίδες. Συνεργάστηκα με άλλους προγραμματιστές για τη βελτίωση των διεπαφών χρήστη και την ενίσχυση της εμπειρίας χρήστη.",
    "experience.military_duty.description": "Έχω εκπληρώσει τις στρατιωτικές μου υποχρεώσεις προς τη χώρα μου.",
    "experience.web_developer.description": "Συνεργάστηκα με ιδιώτες πελάτες για να μετατρέψω τις ιδέες τους για web εφαρμογές σε πραγματικότητα, χρησιμοποιώντας raw HTML, CSS, και JavaScript για το front-end, και Node.js για το back-end. Λόγω συμφωνιών μη αποκάλυψης, δεν μπορώ να μοιραστώ συγκεκριμένο κώδικα ή ονόματα πελατών.",
    "experience.full_stack_developer.description": "Αυτή τη στιγμή εργάζομαι ως software engineer στην Infomax, όπου έχω την ευκαιρία να δουλεύω με προηγμένες τεχνολογίες όπως SvelteKit, TailwindCSS, και PHP Laravel. Αυτός ο ρόλος μου επέτρεψε να εμβαθύνω την εξειδίκευσή μου στο Svelte και να ζήσω από πρώτο χέρι τι σημαίνει να είσαι μέλος μιας δυναμικής ομάδας που δίνει προτεραιότητα στην καινοτομία και τη συνεχή βελτίωση στην ανάπτυξη εφαρμογών.",
    "experience.gaming_servers_operator.description": "Ξεκίνησα το ταξίδι μου στον τομέα της ανάπτυξης servers στην ηλικία των 16, βελτιώνοντας γρήγορα τις δεξιότητές μου σε διάφορες γλώσσες προγραμματισμού και frameworks. Με τα χρόνια, έχω δουλέψει εκτενώς με Lua, HTML, CSS, JavaScript, Svelte, MySQL/MariaDB, και TailwindCSS για να δημιουργήσω υψηλής ποιότητας scripts και προσαρμοσμένες λειτουργίες για τους servers FiveM και RedM. Η δουλειά μου επικεντρώνεται πάντα στη βελτίωση της gaming εμπειρίας μέσω καινοτόμου και αποτελεσματικής ανάπτυξης server-side, εξασφαλίζοντας ομαλή απόδοση και ενδιαφέρον περιεχόμενο για τους παίκτες.",
    "skill.lua.description": "Προχωρημένο επίπεδο προγραμματισμού Lua, με εξειδίκευση στην ανάπτυξη αξιόπιστων και αποδοτικών scripts για παιχνίδια.",
    "skill.sveltekit.description": "Προχωρημένη εμπειρία στην κατασκευή σύγχρονων, αντιδραστικών web εφαρμογών με τη χρήση του SvelteKit.",
    "skill.tailwindcss.description": "Εξειδίκευση στη δημιουργία responsive και οπτικά ελκυστικών διεπαφών χρήστη με χρήση του TailwindCSS.",
    "skill.javascript.description": "Εκτεταμένη εμπειρία στην κατασκευή διαδραστικών front-end εφαρμογών με τη χρήση του JavaScript.",
    "skill.nodejs.description": "Ισχυρή γνώση ανάπτυξης server-side με τη χρήση του Node.js.",
    "skill.html_css.description": "Εξειδίκευση στην κατασκευή και διαμόρφωση ιστοσελίδων με τη χρήση HTML5 και CSS3.",
    "skill.unix_systems.description": "Εκτεταμένη εμπειρία στη διαχείριση και συντήρηση συστημάτων Linux βασισμένων στο Ubuntu.",
    "skill.mariadb_mysql.description": "Εκτεταμένη εμπειρία στη διαχείριση και συντήρηση των instances MariaDB και MySQL.",
    "skill.php_laravel.description": "Μεσαίο επίπεδο στην ανάπτυξη back-end συστημάτων με τη χρήση του Laravel και PHP.",
    "skill.email_system.description": "Μεσαίο επίπεδο στη δημιουργία docker instances mailcow για τη διαχείριση email."
  }
};
const locale = writable("en");
const locales = Object.keys(translations);
function translate(locale2, key, vars) {
  if (!key) throw new Error("no key provided to $t()");
  if (!locale2) throw new Error(`no translation for key "${key}"`);
  let text = translations[locale2][key];
  if (!text) throw new Error(`no translation found for ${locale2}.${key}`);
  Object.keys(vars).map((k) => {
    const regex = new RegExp(`{{${k}}}`, "g");
    text = text.replace(regex, vars[k]);
  });
  return text;
}
const t = derived(
  locale,
  ($locale) => (key, vars = {}) => translate($locale, key, vars)
);
const Tailwindcss = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: class_name = "h-5 w-5 flex-shrink-0" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && class_name !== void 0) $$bindings.class(class_name);
  return `<svg${spread(
    [
      { fill: "#19376D" },
      { viewBox: "0 0 24.00 24.00" },
      { xmlns: "http://www.w3.org/2000/svg" },
      { "xml:space": "preserve" },
      { stroke: "#19376D" },
      { "stroke-width": "0.00024000000000000003" },
      { transform: "matrix(1, 0, 0, 1, 0, 0)" },
      {
        class: escape_attribute_value(class_name)
      },
      escape_object($$restProps)
    ],
    {}
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.036c-2.667 0-4.333 1.325-5 3.976 1-1.325 2.167-1.822 3.5-1.491.761.189 1.305.738 1.906 1.345C13.387 10.855 14.522 12 17 12c2.667 0 4.333-1.325 5-3.976-1 1.325-2.166 1.822-3.5 1.491-.761-.189-1.305-.738-1.907-1.345-.98-.99-2.114-2.134-4.593-2.134zM7 12c-2.667 0-4.333 1.325-5 3.976 1-1.326 2.167-1.822 3.5-1.491.761.189 1.305.738 1.907 1.345.98.989 2.115 2.134 4.594 2.134 2.667 0 4.333-1.325 5-3.976-1 1.325-2.167 1.822-3.5 1.491-.761-.189-1.305-.738-1.906-1.345C10.613 13.145 9.478 12 7 12z"></path></g></svg>`;
});
const Svelte = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: class_name = "h-5 w-5 flex-shrink-0" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && class_name !== void 0) $$bindings.class(class_name);
  return `<svg${spread(
    [
      { viewBox: "0 0 16 16" },
      { fill: "none" },
      { xmlns: "http://www.w3.org/2000/svg" },
      {
        class: escape_attribute_value(class_name)
      },
      escape_object($$restProps)
    ],
    {}
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.438 2.94656C13.0222 3.84625 13.0826 4.82176 12.784 5.56064C12.2332 5.04017 11.5732 4.66735 10.8806 4.48388C10.8888 4.33095 10.8504 4.17412 10.7606 4.03584C10.535 3.68845 10.0705 3.58972 9.72314 3.81532L8.0472 4.90369C8.04673 4.90399 8.04627 4.90429 8.0458 4.9046L5.52979 6.53851C5.1824 6.76411 5.08367 7.22861 5.30926 7.57599C5.53486 7.92338 5.99936 8.02212 6.34675 7.79652L8.86347 6.16214C8.86323 6.16229 8.86371 6.16198 8.86347 6.16214C9.81822 5.54278 11.3592 5.87563 12.2475 7.24351C13.1361 8.61173 12.813 10.1553 11.8583 10.7753L6.82625 14.0431C5.87156 14.6631 4.33001 14.3304 3.44148 12.9622C2.85722 12.0625 2.79684 11.087 3.09545 10.3481C3.64623 10.8686 4.30624 11.2414 4.99882 11.4249C4.99062 11.5778 5.02903 11.7347 5.11882 11.8729C5.34442 12.2203 5.80892 12.3191 6.15631 12.0935L10.3497 9.37027C10.697 9.14467 10.7958 8.68017 10.5702 8.33279C10.3446 7.9854 9.88009 7.88666 9.5327 8.11226L7.01644 9.74634C7.01652 9.74629 7.01635 9.7464 7.01644 9.74634C6.06172 10.3661 4.52038 10.0334 3.63192 8.66527C2.74339 7.29705 3.06648 5.75348 4.02117 5.13349L9.0532 1.86566C10.0079 1.24567 11.5494 1.57834 12.438 2.94656ZM13.7667 6.88194C14.7218 5.56301 14.6705 3.63028 13.696 2.1296C12.4789 0.255528 10.0607 -0.577139 8.23624 0.607651L3.20422 3.87549C1.52381 4.96675 1.20205 7.21441 2.11271 9.02685C1.15769 10.3458 1.20893 12.2785 2.18348 13.7792C3.40052 15.6533 5.81879 16.4859 7.64321 15.3011L12.6752 12.0333C14.3556 10.942 14.6774 8.69437 13.7667 6.88194Z" fill="#19376D"></path></g></svg>`;
});
const Javascript = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: class_name = "h-5 w-5 flex-shrink-0" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && class_name !== void 0) $$bindings.class(class_name);
  return `<svg${spread(
    [
      { viewBox: "0 0 32 32" },
      { version: "1.1" },
      { xmlns: "http://www.w3.org/2000/svg" },
      {
        "xmlns:xlink": "http://www.w3.org/1999/xlink"
      },
      { fill: "#19376D" },
      {
        class: escape_attribute_value(class_name)
      },
      escape_object($$restProps)
    ],
    {}
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#19376D" d="M9.633 7.968h3.751v10.514c0 4.738-2.271 6.392-5.899 6.392-0.888 0-2.024-0.148-2.764-0.395l0.42-3.036c0.518 0.173 1.185 0.296 1.925 0.296 1.58 0 2.567-0.716 2.567-3.282v-10.489zM16.641 20.753c0.987 0.518 2.567 1.037 4.171 1.037 1.728 0 2.641-0.716 2.641-1.826 0-1.012-0.79-1.629-2.789-2.32-2.764-0.987-4.59-2.517-4.59-4.961 0-2.838 2.394-4.985 6.293-4.985 1.9 0 3.258 0.37 4.245 0.839l-0.839 3.011c-0.642-0.321-1.851-0.79-3.455-0.79-1.629 0-2.419 0.765-2.419 1.604 0 1.061 0.913 1.53 3.085 2.369 2.937 1.086 4.294 2.616 4.294 4.985 0 2.789-2.122 5.158-6.688 5.158-1.9 0-3.776-0.518-4.714-1.037l0.765-3.085z"></path></g></svg>`;
});
const Laravel = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: class_name = "h-5 w-5 flex-shrink-0" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && class_name !== void 0) $$bindings.class(class_name);
  return `<svg${spread(
    [
      { fill: "#19376D" },
      { viewBox: "0 0 32 32" },
      { version: "1.1" },
      { xmlns: "http://www.w3.org/2000/svg" },
      {
        class: escape_attribute_value(class_name)
      },
      escape_object($$restProps)
    ],
    {}
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title>laravel</title><path d="M13.143 23.585l10.46-5.97-4.752-2.736-10.453 6.019zM24.084 11.374l-4.757-2.736v5.417l4.758 2.737zM24.559 5.078l-4.756 2.736 4.756 2.736 4.755-2.737zM9.911 18.928l2.76-1.589v-11.934l-4.758 2.738v11.934zM7.437 1.846l-4.756 2.737 4.756 2.737 4.753-2.737zM2.204 5.406v18.452l10.464 6.022v-5.471l-5.472-3.096c-0.018-0.013-0.032-0.027-0.051-0.039-0.014-0.013-0.030-0.023-0.044-0.034l-0.001-0.003c-0.015-0.015-0.028-0.031-0.039-0.049l-0.001-0.001c-0.014-0.013-0.025-0.028-0.035-0.045l-0.001-0.001h-0.003c-0.008-0.015-0.016-0.035-0.024-0.055l-0.001-0.004c-0.007-0.015-0.015-0.032-0.022-0.051l-0.001-0.003c-0.004-0.020-0.008-0.045-0.010-0.070l-0-0.002c-0.003-0.015-0.006-0.033-0.008-0.051l-0-0.001v-12.759l-2.757-1.59zM24.085 23.857v-5.422l-10.464 5.974v5.47zM29.789 14.055v-5.417l-4.756 2.737v5.417zM30.725 7.69c0.011 0.038 0.018 0.081 0.018 0.126v0 6.513c-0 0.176-0.095 0.329-0.237 0.411l-0.002 0.001-5.468 3.149v6.241c-0 0.175-0.095 0.328-0.236 0.411l-0.002 0.001-11.416 6.57c-0.024 0.013-0.052 0.025-0.081 0.033l-0.003 0.001-0.030 0.013c-0.036 0.011-0.078 0.017-0.121 0.017s-0.085-0.006-0.125-0.018l0.003 0.001c-0.015-0.004-0.027-0.009-0.039-0.016l0.001 0.001c-0.031-0.011-0.057-0.021-0.082-0.033l0.004 0.002-11.413-6.57c-0.144-0.084-0.239-0.237-0.239-0.412v0-19.548c0-0.044 0.007-0.087 0.019-0.127l-0.001 0.003c0.004-0.015 0.013-0.025 0.018-0.040 0.009-0.029 0.019-0.053 0.030-0.076l-0.001 0.003c0.008-0.016 0.018-0.030 0.029-0.042l-0 0 0.042-0.057 0.047-0.034c0.018-0.015 0.034-0.030 0.052-0.043h0.001l5.708-3.285c0.068-0.040 0.15-0.064 0.237-0.064s0.169 0.024 0.239 0.065l-0.002-0.001 5.71 3.285c0.019 0.013 0.035 0.027 0.051 0.042l-0-0 0.048 0.034c0.016 0.018 0.025 0.038 0.042 0.057 0.012 0.012 0.022 0.026 0.031 0.041l0.001 0.001c0.010 0.020 0.020 0.044 0.029 0.069l0.001 0.004 0.016 0.040c0.011 0.035 0.018 0.076 0.018 0.118 0 0.002 0 0.004-0 0.006v-0 12.208l4.756-2.737v-6.241c0-0.001 0-0.002 0-0.002 0-0.043 0.006-0.085 0.017-0.125l-0.001 0.003c0.004-0.013 0.013-0.025 0.016-0.040 0.010-0.030 0.020-0.054 0.032-0.078l-0.002 0.004c0.009-0.015 0.023-0.025 0.032-0.042 0.015-0.019 0.027-0.038 0.042-0.054 0.014-0.013 0.029-0.025 0.045-0.035l0.001-0.001c0.018-0.013 0.033-0.029 0.052-0.040h0.001l5.708-3.286c0.068-0.040 0.15-0.064 0.237-0.064s0.169 0.024 0.239 0.065l-0.002-0.001 5.708 3.286c0.020 0.013 0.034 0.027 0.053 0.039 0.015 0.013 0.032 0.023 0.046 0.035 0.016 0.018 0.028 0.038 0.043 0.056 0.011 0.012 0.021 0.026 0.030 0.040l0.001 0.001c0.012 0.022 0.022 0.047 0.030 0.073l0.001 0.003c0.008 0.012 0.014 0.025 0.019 0.039l0 0.001z"></path></g></svg>`;
});
const Nodejs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: class_name = "h-5 w-5 flex-shrink-0" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && class_name !== void 0) $$bindings.class(class_name);
  return `<svg${spread(
    [
      { fill: "#19376D" },
      { version: "1.1" },
      { xmlns: "http://www.w3.org/2000/svg" },
      {
        "xmlns:xlink": "http://www.w3.org/1999/xlink"
      },
      { viewBox: "0 0 512 512" },
      { "enable-background": "new 0 0 512 512" },
      { "xml:space": "preserve" },
      {
        class: escape_attribute_value(class_name)
      },
      escape_object($$restProps)
    ],
    {}
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><g id="5151e0c8492e5103c096af88a51f17e3"><path display="inline" d="M482.585,147.869v216.113c0,14.025-7.546,27.084-19.672,34.143L275.665,506.241 c-5.989,3.474-12.782,5.259-19.719,5.259c-6.838,0-13.649-1.785-19.639-5.259l-62.521-36.99c-9.326-5.207-4.775-7.059-1.692-8.128 c12.454-4.322,14.973-5.318,28.268-12.863c1.387-0.793,3.216-0.483,4.647,0.343l48.031,28.519c1.741,0.981,4.2,0.981,5.801,0 l187.263-108.086c1.744-0.996,2.862-2.983,2.862-5.053V147.869c0-2.117-1.118-4.094-2.906-5.163L258.874,34.716 c-1.726-1.01-4.03-1.01-5.768,0L65.962,142.736c-1.818,1.04-2.965,3.079-2.965,5.133v216.113c0,2.069,1.146,4.009,2.954,4.99 l51.299,29.654c27.829,13.903,44.875-2.485,44.875-18.956V166.309c0-3.017,2.423-5.396,5.439-5.396h23.747 c2.969,0,5.429,2.378,5.429,5.396v213.362c0,37.146-20.236,58.454-55.452,58.454c-10.816,0-19.347,0-43.138-11.713l-49.098-28.287 c-12.133-6.995-19.638-20.117-19.638-34.143V147.869c0-14.043,7.505-27.15,19.638-34.135L236.308,5.526 c11.85-6.701,27.608-6.701,39.357,0l187.248,108.208C475.039,120.748,482.585,133.826,482.585,147.869z M321.171,343.367 c-55.88,0-68.175-14.048-72.294-41.836c-0.477-2.966-3.018-5.175-6.063-5.175h-27.306c-3.382,0-6.096,2.703-6.096,6.104 c0,35.56,19.354,77.971,111.759,77.971c66.906,0,105.269-26.339,105.269-72.343c0-45.623-30.827-57.76-95.709-66.35 c-65.579-8.678-72.243-13.147-72.243-28.508c0-12.661,5.643-29.581,54.216-29.581c43.374,0,59.365,9.349,65.94,38.576 c0.579,2.755,3.083,4.765,5.923,4.765h27.409c1.7,0,3.315-0.73,4.47-1.943c1.158-1.28,1.773-2.947,1.611-4.695 c-4.241-50.377-37.713-73.844-105.354-73.844c-60.209,0-96.118,25.414-96.118,68.002c0,46.217,35.729,59,93.5,64.702 c69.138,6.782,74.504,16.883,74.504,30.488C384.589,333.299,365.655,343.367,321.171,343.367z"></path></g></g></svg>`;
});
const Html = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: class_name = "h-5 w-5 flex-shrink-0" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && class_name !== void 0) $$bindings.class(class_name);
  return `<svg${spread(
    [
      { fill: "#19376D" },
      { viewBox: "0 0 32 32" },
      { version: "1.1" },
      { xmlns: "http://www.w3.org/2000/svg" },
      {
        class: escape_attribute_value(class_name)
      },
      escape_object($$restProps)
    ],
    {}
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title>html5</title><path d="M11.677 13.196l-0.289-3.387 12.536 0.004 0.287-3.268-16.421-0.004 0.87 9.983h11.374l-0.406 4.27-3.627 1.002-3.683-1.009-0.234-2.63h-3.252l0.411 5.198 6.757 1.807 6.704-1.798 0.927-10.166h-11.954zM2.914 1.045h26.172l-2.38 26.874-10.734 3.037-10.673-3.038z"></path></g></svg>`;
});
const Css = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: class_name = "h-5 w-5 flex-shrink-0" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && class_name !== void 0) $$bindings.class(class_name);
  return `<svg${spread(
    [
      { fill: "#19376D" },
      { version: "1.1" },
      { xmlns: "http://www.w3.org/2000/svg" },
      {
        "xmlns:xlink": "http://www.w3.org/1999/xlink"
      },
      { viewBox: "0 0 512 512" },
      { "enable-background": "new 0 0 512 512" },
      { "xml:space": "preserve" },
      {
        class: escape_attribute_value(class_name)
      },
      escape_object($$restProps)
    ],
    {}
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><g id="c133de6af664cd4f011a55de6b001b19"><path display="inline" d="M483.111,0.501l-42.59,461.314l-184.524,49.684L71.47,461.815L28.889,0.501H483.111z M397.29,94.302 H255.831H111.866l6.885,55.708h137.08h7.7l-7.7,3.205l-132.07,55.006l4.38,54.453l127.69,0.414l68.438,0.217l-4.381,72.606 l-64.058,18.035v-0.057l-0.525,0.146l-61.864-15.617l-3.754-45.07h-0.205H132.1h-0.202l7.511,87.007l116.423,34.429v-0.062 l0.21,0.062l115.799-33.802l15.021-172.761h-131.03h-0.323l0.323-0.14l135.83-58.071L397.29,94.302z"></path></g></g></svg>`;
});
const Email = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: class_name = "h-5 w-5 flex-shrink-0" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && class_name !== void 0) $$bindings.class(class_name);
  return `<svg${spread(
    [
      { viewBox: "0 0 24 24" },
      { fill: "none" },
      { xmlns: "http://www.w3.org/2000/svg" },
      {
        class: escape_attribute_value(class_name)
      },
      escape_object($$restProps)
    ],
    {}
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M14.5 9.50012H9.5M3.02832 10.0001L10.2246 14.8167C10.8661 15.2444 11.1869 15.4582 11.5336 15.5413C11.8399 15.6147 12.1593 15.6147 12.4657 15.5413C12.8124 15.4582 13.1332 15.2444 13.7747 14.8167L20.971 10.0001M10.2981 4.06892L4.49814 7.71139C3.95121 8.05487 3.67775 8.2266 3.4794 8.45876C3.30385 8.66424 3.17176 8.90317 3.09111 9.16112C3 9.45256 3 9.77548 3 10.4213V16.8001C3 17.9202 3 18.4803 3.21799 18.9081C3.40973 19.2844 3.71569 19.5904 4.09202 19.7821C4.51984 20.0001 5.0799 20.0001 6.2 20.0001H17.8C18.9201 20.0001 19.4802 20.0001 19.908 19.7821C20.2843 19.5904 20.5903 19.2844 20.782 18.9081C21 18.4803 21 17.9202 21 16.8001V10.4213C21 9.77548 21 9.45256 20.9089 9.16112C20.8282 8.90317 20.6962 8.66424 20.5206 8.45876C20.3223 8.2266 20.0488 8.05487 19.5019 7.71139L13.7019 4.06891C13.0846 3.68129 12.776 3.48747 12.4449 3.41192C12.152 3.34512 11.848 3.34512 11.5551 3.41192C11.224 3.48747 10.9154 3.68129 10.2981 4.06892Z" stroke="#19376D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>`;
});
const Linkedin = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: class_name = "h-5 w-5 flex-shrink-0" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && class_name !== void 0) $$bindings.class(class_name);
  return `<svg${spread(
    [
      { viewBox: "0 0 20 20" },
      { version: "1.1" },
      { xmlns: "http://www.w3.org/2000/svg" },
      {
        "xmlns:xlink": "http://www.w3.org/1999/xlink"
      },
      {
        class: escape_attribute_value(class_name)
      },
      escape_object($$restProps),
      { fill: "#19376D" }
    ],
    {}
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title>linkedin [#19376D]</title><desc>Created with Sketch.</desc><defs></defs><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Dribbble-Light-Preview" transform="translate(-180.000000, -7479.000000)" fill="#19376D"><g id="icons" transform="translate(56.000000, 160.000000)"><path d="M144,7339 L140,7339 L140,7332.001 C140,7330.081 139.153,7329.01 137.634,7329.01 C135.981,7329.01 135,7330.126 135,7332.001 L135,7339 L131,7339 L131,7326 L135,7326 L135,7327.462 C135,7327.462 136.255,7325.26 139.083,7325.26 C141.912,7325.26 144,7326.986 144,7330.558 L144,7339 L144,7339 Z M126.442,7323.921 C125.093,7323.921 124,7322.819 124,7321.46 C124,7320.102 125.093,7319 126.442,7319 C127.79,7319 128.883,7320.102 128.883,7321.46 C128.884,7322.819 127.79,7323.921 126.442,7323.921 L126.442,7323.921 Z M124,7339 L129,7339 L129,7326 L124,7326 L124,7339 Z" id="linkedin-[#19376D]"></path></g></g></g></g></svg>`;
});
const Github = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: class_name = "h-5 w-5 flex-shrink-0" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && class_name !== void 0) $$bindings.class(class_name);
  return `<svg${spread(
    [
      { viewBox: "0 0 24 24" },
      { fill: "none" },
      { xmlns: "http://www.w3.org/2000/svg" },
      {
        class: escape_attribute_value(class_name)
      },
      escape_object($$restProps)
    ],
    {}
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M4.0744 2.9938C4.13263 1.96371 4.37869 1.51577 5.08432 1.15606C5.84357 0.768899 7.04106 0.949072 8.45014 1.66261C9.05706 1.97009 9.11886 1.97635 10.1825 1.83998C11.5963 1.65865 13.4164 1.65929 14.7213 1.84164C15.7081 1.97954 15.7729 1.97265 16.3813 1.66453C18.3814 0.651679 19.9605 0.71795 20.5323 1.8387C20.8177 2.39812 20.8707 3.84971 20.6494 5.04695C20.5267 5.71069 20.5397 5.79356 20.8353 6.22912C22.915 9.29385 21.4165 14.2616 17.8528 16.1155C17.5801 16.2574 17.3503 16.3452 17.163 16.4167C16.5879 16.6363 16.4133 16.703 16.6247 17.7138C16.7265 18.2 16.8491 19.4088 16.8973 20.4002C16.9844 22.1922 16.9831 22.2047 16.6688 22.5703C16.241 23.0676 15.6244 23.076 15.2066 22.5902C14.9341 22.2734 14.9075 22.1238 14.9075 20.9015C14.9075 19.0952 14.7095 17.8946 14.2417 16.8658C13.6854 15.6415 14.0978 15.185 15.37 14.9114C17.1383 14.531 18.5194 13.4397 19.2892 11.8146C20.0211 10.2698 20.1314 8.13501 18.8082 6.83668C18.4319 6.3895 18.4057 5.98446 18.6744 4.76309C18.7748 4.3066 18.859 3.71768 18.8615 3.45425C18.8653 3.03823 18.8274 2.97541 18.5719 2.97541C18.4102 2.97541 17.7924 3.21062 17.1992 3.49805L16.2524 3.95695C16.1663 3.99866 16.07 4.0147 15.975 4.0038C13.5675 3.72746 11.2799 3.72319 8.86062 4.00488C8.76526 4.01598 8.66853 3.99994 8.58215 3.95802L7.63585 3.49882C7.04259 3.21087 6.42482 2.97541 6.26317 2.97541C5.88941 2.97541 5.88379 3.25135 6.22447 4.89078C6.43258 5.89203 6.57262 6.11513 5.97101 6.91572C5.06925 8.11576 4.844 9.60592 5.32757 11.1716C5.93704 13.1446 7.4295 14.4775 9.52773 14.9222C10.7926 15.1903 11.1232 15.5401 10.6402 16.9905C10.26 18.1319 10.0196 18.4261 9.46707 18.4261C8.72365 18.4261 8.25796 17.7821 8.51424 17.1082C8.62712 16.8112 8.59354 16.7795 7.89711 16.5255C5.77117 15.7504 4.14514 14.0131 3.40172 11.7223C2.82711 9.95184 3.07994 7.64739 4.00175 6.25453C4.31561 5.78028 4.32047 5.74006 4.174 4.83217C4.09113 4.31822 4.04631 3.49103 4.0744 2.9938Z" fill="#19376D"></path><path d="M3.33203 15.9454C3.02568 15.4859 2.40481 15.3617 1.94528 15.6681C1.48576 15.9744 1.36158 16.5953 1.66793 17.0548C1.8941 17.3941 2.16467 17.6728 2.39444 17.9025C2.4368 17.9449 2.47796 17.9858 2.51815 18.0257C2.71062 18.2169 2.88056 18.3857 3.05124 18.5861C3.42875 19.0292 3.80536 19.626 4.0194 20.6962C4.11474 21.1729 4.45739 21.4297 4.64725 21.5419C4.85315 21.6635 5.07812 21.7352 5.26325 21.7819C5.64196 21.8774 6.10169 21.927 6.53799 21.9559C7.01695 21.9877 7.53592 21.998 7.99999 22.0008C8.00033 22.5527 8.44791 23.0001 8.99998 23.0001C9.55227 23.0001 9.99998 22.5524 9.99998 22.0001V21.0001C9.99998 20.4478 9.55227 20.0001 8.99998 20.0001C8.90571 20.0001 8.80372 20.0004 8.69569 20.0008C8.10883 20.0026 7.34388 20.0049 6.67018 19.9603C6.34531 19.9388 6.07825 19.9083 5.88241 19.871C5.58083 18.6871 5.09362 17.8994 4.57373 17.2891C4.34391 17.0194 4.10593 16.7834 3.91236 16.5914C3.87612 16.5555 3.84144 16.5211 3.80865 16.4883C3.5853 16.265 3.4392 16.1062 3.33203 15.9454Z" fill="#19376D"></path></g></svg>`;
});
const Location = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: class_name = "h-5 w-5 flex-shrink-0" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && class_name !== void 0) $$bindings.class(class_name);
  return `<svg${spread(
    [
      { viewBox: "0 0 24 24" },
      { fill: "none" },
      { xmlns: "http://www.w3.org/2000/svg" },
      {
        class: escape_attribute_value(class_name)
      },
      escape_object($$restProps)
    ],
    {}
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="#19376D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" stroke="#19376D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>`;
});
const ArrowDown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: class_name = "h-5 w-5 flex-shrink-0" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && class_name !== void 0) $$bindings.class(class_name);
  return `<svg${spread(
    [
      { viewBox: "0 0 24 24" },
      { fill: "none" },
      { xmlns: "http://www.w3.org/2000/svg" },
      { stroke: "#576CBC" },
      {
        class: escape_attribute_value(class_name)
      },
      escape_object($$restProps)
    ],
    {}
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.25C12.4142 3.25 12.75 3.58579 12.75 4L12.75 18.1893L17.4697 13.4697C17.7626 13.1768 18.2374 13.1768 18.5303 13.4697C18.8232 13.7626 18.8232 14.2374 18.5303 14.5303L12.5303 20.5303C12.3897 20.671 12.1989 20.75 12 20.75C11.8011 20.75 11.6103 20.671 11.4697 20.5303L5.46967 14.5303C5.17678 14.2374 5.17678 13.7626 5.46967 13.4697C5.76256 13.1768 6.23744 13.1768 6.53033 13.4697L11.25 18.1893L11.25 4C11.25 3.58579 11.5858 3.25 12 3.25Z" fill="#576CBC"></path></g></svg>`;
});
const Linux = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: class_name = "h-5 w-5 flex-shrink-0" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && class_name !== void 0) $$bindings.class(class_name);
  return `<svg${spread(
    [
      { fill: "#19376D" },
      { viewBox: "0 0 32 32" },
      { version: "1.1" },
      { xmlns: "http://www.w3.org/2000/svg" },
      {
        class: escape_attribute_value(class_name)
      },
      escape_object($$restProps)
    ],
    {}
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title>linux</title><path d="M14.923 8.080c-0.025 0.072-0.141 0.061-0.207 0.082-0.059 0.031-0.107 0.085-0.175 0.085-0.062 0-0.162-0.025-0.17-0.085-0.012-0.082 0.11-0.166 0.187-0.166 0.050-0.024 0.108-0.037 0.169-0.037 0.056 0 0.109 0.011 0.157 0.032l-0.003-0.001c0.022 0.009 0.038 0.030 0.038 0.055 0 0.003-0 0.005-0.001 0.008l0-0v0.025h0.004zM15.611 8.080v-0.027c-0.008-0.025 0.016-0.052 0.036-0.062 0.046-0.020 0.1-0.032 0.157-0.032 0.061 0 0.119 0.014 0.17 0.038l-0.002-0.001c0.079 0 0.2 0.084 0.187 0.169-0.007 0.061-0.106 0.082-0.169 0.082-0.069 0-0.115-0.054-0.176-0.085-0.065-0.023-0.182-0.010-0.204-0.081zM16.963 10.058c-0.532 0.337-1.161 0.574-1.835 0.666l-0.024 0.003c-0.606-0.035-1.157-0.248-1.607-0.588l0.007 0.005c-0.192-0.167-0.35-0.335-0.466-0.419-0.205-0.167-0.18-0.416-0.092-0.416 0.136 0.020 0.161 0.167 0.249 0.25 0.12 0.082 0.269 0.25 0.45 0.416 0.397 0.328 0.899 0.541 1.45 0.583l0.009 0.001c0.654-0.057 1.249-0.267 1.763-0.592l-0.016 0.010c0.244-0.169 0.556-0.417 0.81-0.584 0.195-0.17 0.186-0.334 0.349-0.334 0.16 0.020 0.043 0.167-0.184 0.415-0.246 0.188-0.527 0.381-0.818 0.56l-0.044 0.025zM8.017 21.397h0.012c0.069 0 0.137 0.007 0.203 0.019l-0.007-0.001c0.544 0.14 0.992 0.478 1.273 0.931l0.005 0.009 1.137 2.079 0.004 0.004c0.457 0.773 0.948 1.442 1.497 2.059l-0.011-0.013c0.49 0.52 0.82 1.196 0.909 1.946l0.002 0.016v0.008c-0.012 0.817-0.613 1.491-1.396 1.616l-0.009 0.001c-0.2 0.031-0.432 0.048-0.667 0.048-0.857 0-1.659-0.233-2.347-0.64l0.021 0.012c-1.053-0.441-2.275-0.714-3.555-0.752l-0.015-0c-0.372-0.025-0.696-0.215-0.901-0.496l-0.002-0.003c-0.054-0.174-0.085-0.374-0.085-0.582 0-0.35 0.088-0.679 0.244-0.966l-0.005 0.011v-0.005l0.003-0.004c0.041-0.188 0.065-0.405 0.065-0.627 0-0.274-0.036-0.539-0.104-0.791l0.005 0.021c-0.041-0.15-0.065-0.323-0.065-0.502 0-0.242 0.043-0.473 0.123-0.687l-0.004 0.014c0.2-0.417 0.495-0.5 0.862-0.666 0.438-0.133 0.819-0.334 1.151-0.593l-0.008 0.006h0.002v-0.003c0.32-0.335 0.556-0.751 0.835-1.047 0.195-0.249 0.492-0.41 0.827-0.42l0.002-0zM21.531 21.336c-0.001 0.017-0.001 0.038-0.001 0.059 0 0.743 0.449 1.381 1.091 1.658l0.012 0.005c0.048 0.003 0.104 0.005 0.16 0.005 0.831 0 1.575-0.371 2.075-0.957l0.003-0.004 0.264-0.012c0.053-0.008 0.114-0.012 0.176-0.012 0.341 0 0.652 0.132 0.883 0.348l-0.001-0.001 0.004 0.004c0.249 0.301 0.422 0.673 0.487 1.082l0.002 0.013c0.055 0.505 0.238 0.96 0.517 1.34l-0.005-0.008c0.416 0.356 0.705 0.85 0.793 1.411l0.002 0.013 0.004-0.009v0.022l-0.004-0.015c-0.019 0.327-0.231 0.495-0.622 0.744-1.184 0.497-2.201 1.158-3.077 1.968l0.007-0.006c-0.608 0.792-1.501 1.339-2.523 1.486l-0.021 0.002c-0.074 0.010-0.16 0.016-0.247 0.016-0.768 0-1.428-0.464-1.716-1.126l-0.005-0.012-0.006-0.004c-0.093-0.286-0.146-0.615-0.146-0.956 0-0.416 0.079-0.813 0.224-1.178l-0.008 0.022c0.234-0.668 0.435-1.466 0.568-2.288l0.011-0.083c0.016-0.812 0.104-1.593 0.258-2.35l-0.014 0.083c0.085-0.518 0.381-0.954 0.794-1.225l0.007-0.004 0.056-0.027zM18.8 10.142c0.6 2.147 1.339 4.002 2.247 5.757l-0.079-0.167c0.613 1.090 1.090 2.355 1.363 3.695l0.014 0.084c0.009-0 0.020-0 0.031-0 0.217 0 0.427 0.029 0.627 0.084l-0.017-0.004c0.11-0.395 0.173-0.848 0.173-1.316 0-1.426-0.587-2.716-1.533-3.639l-0.001-0.001c-0.275-0.25-0.29-0.419-0.154-0.419 0.971 0.91 1.689 2.078 2.045 3.394l0.012 0.051c0.089 0.329 0.14 0.707 0.14 1.097 0 0.351-0.041 0.693-0.119 1.020l0.006-0.030c0.074 0.038 0.16 0.067 0.251 0.083l0.006 0.001c1.29 0.667 1.766 1.172 1.537 1.921v-0.054c-0.075-0.004-0.15 0-0.225 0h-0.020c0.189-0.584-0.227-1.031-1.331-1.53-1.143-0.5-2.057-0.42-2.212 0.581-0.011 0.049-0.019 0.106-0.022 0.165l-0 0.003c-0.073 0.030-0.16 0.058-0.25 0.078l-0.011 0.002c-0.508 0.336-0.87 0.859-0.989 1.469l-0.002 0.014c-0.148 0.695-0.241 1.5-0.256 2.323l-0 0.012v0.004c-0.091 0.637-0.23 1.207-0.418 1.753l0.020-0.066c-0.983 0.804-2.251 1.29-3.634 1.29-1.13 0-2.184-0.325-3.073-0.887l0.024 0.014c-0.146-0.253-0.313-0.472-0.503-0.667l0.001 0.001c-0.097-0.16-0.211-0.297-0.342-0.415l-0.002-0.001c0.207-0 0.407-0.031 0.596-0.088l-0.015 0.004c0.18-0.085 0.318-0.232 0.391-0.412l0.002-0.005c0.018-0.093 0.029-0.199 0.029-0.308 0-0.445-0.175-0.848-0.461-1.146l0.001 0.001c-0.619-0.761-1.359-1.395-2.196-1.88l-0.038-0.020c-0.671-0.388-1.179-0.995-1.43-1.722l-0.007-0.022c-0.093-0.318-0.147-0.684-0.147-1.062 0-0.353 0.047-0.695 0.134-1.021l-0.006 0.027c0.377-1.314 0.921-2.461 1.62-3.496l-0.028 0.043c0.134-0.081 0.046 0.169-0.51 1.217-0.474 0.713-0.757 1.59-0.757 2.533 0 0.84 0.224 1.627 0.616 2.306l-0.012-0.022c0.052-1.309 0.345-2.537 0.834-3.659l-0.025 0.065c1.055-1.902 1.854-4.111 2.275-6.452l0.020-0.131c0.060 0.045 0.271 0.169 0.361 0.252 0.272 0.166 0.475 0.416 0.737 0.581 0.267 0.26 0.633 0.42 1.035 0.42 0.021 0 0.042-0 0.063-0.001l-0.003 0c0.049 0.004 0.094 0.008 0.137 0.008 0.459-0.009 0.887-0.132 1.259-0.342l-0.013 0.007c0.362-0.167 0.65-0.417 0.925-0.5h0.006c0.535-0.145 0.983-0.454 1.3-0.869l0.004-0.006zM15.301 7.465c0.003 0 0.006-0 0.009-0 0.569 0 1.094 0.187 1.517 0.503l-0.007-0.005c0.378 0.234 0.814 0.433 1.275 0.574l0.040 0.010h0.004c0.246 0.11 0.449 0.281 0.594 0.494l0.003 0.005v-0.164c0.046 0.092 0.074 0.201 0.074 0.316 0 0.098-0.020 0.191-0.055 0.276l0.002-0.005c-0.288 0.507-0.755 0.884-1.313 1.048l-0.016 0.004v0.002c-0.335 0.169-0.626 0.416-0.968 0.581-0.35 0.21-0.771 0.334-1.222 0.334-0.015 0-0.030-0-0.045-0l0.002 0c-0.022 0.001-0.048 0.002-0.074 0.002-0.174 0-0.342-0.031-0.496-0.089l0.010 0.003c-0.159-0.087-0.29-0.169-0.417-0.257l0.014 0.010c-0.227-0.199-0.477-0.39-0.739-0.565l-0.026-0.016v-0.006h-0.006c-0.375-0.199-0.67-0.504-0.852-0.876l-0.005-0.012c-0.027-0.067-0.042-0.145-0.042-0.226 0-0.218 0.112-0.41 0.281-0.522l0.002-0.001c0.28-0.169 0.475-0.339 0.604-0.42 0.13-0.092 0.179-0.127 0.22-0.164h0.002v-0.004c0.268-0.339 0.623-0.599 1.032-0.746l0.016-0.005c0.174-0.050 0.374-0.079 0.581-0.081h0.001zM13.589 5.333h0.045c0.188 0.004 0.361 0.067 0.501 0.17l-0.002-0.002c0.179 0.159 0.325 0.352 0.425 0.57l0.004 0.011c0.113 0.245 0.183 0.53 0.191 0.83l0 0.003v0.005c0.004 0.046 0.006 0.099 0.006 0.152 0 0.063-0.003 0.126-0.009 0.188l0.001-0.008v0.1c-0.037 0.009-0.070 0.022-0.104 0.030-0.191 0.079-0.352 0.163-0.505 0.258l0.014-0.008c0.008-0.055 0.012-0.118 0.012-0.182 0-0.053-0.003-0.106-0.009-0.158l0.001 0.006v-0.019c-0.018-0.154-0.054-0.295-0.107-0.428l0.004 0.011c-0.041-0.132-0.113-0.244-0.207-0.333l-0-0c-0.055-0.050-0.128-0.081-0.209-0.081-0.007 0-0.014 0-0.021 0.001l0.001-0h-0.026c-0.103 0.011-0.189 0.075-0.232 0.163l-0.001 0.002c-0.077 0.093-0.13 0.208-0.15 0.334l-0 0.004c-0.023 0.086-0.035 0.185-0.035 0.287 0 0.044 0.002 0.088 0.007 0.131l-0-0.005v0.019c0.016 0.154 0.052 0.296 0.104 0.428l-0.004-0.011c0.042 0.132 0.113 0.245 0.207 0.335l0 0c0.012 0.012 0.026 0.022 0.042 0.030l0.001 0c-0.083 0.053-0.155 0.109-0.221 0.171l0.001-0.001c-0.045 0.040-0.1 0.070-0.161 0.084l-0.003 0.001c-0.123-0.147-0.237-0.312-0.335-0.486l-0.008-0.016c-0.113-0.245-0.183-0.529-0.194-0.83l-0-0.004c-0.004-0.048-0.006-0.104-0.006-0.161 0-0.241 0.039-0.473 0.11-0.69l-0.004 0.016c0.074-0.258 0.195-0.481 0.356-0.671l-0.002 0.003c0.127-0.15 0.313-0.245 0.522-0.25h0.001zM17.291 5.259h0.016c0.001 0 0.002 0 0.004 0 0.275 0 0.527 0.093 0.729 0.249l-0.003-0.002c0.229 0.177 0.413 0.4 0.542 0.655l0.005 0.011c0.121 0.266 0.196 0.575 0.207 0.901l0 0.004c0-0.025 0.007-0.050 0.007-0.075v0.131l-0.005-0.026-0.005-0.030c-0.003 0.32-0.071 0.622-0.193 0.897l0.006-0.014c-0.062 0.163-0.152 0.303-0.266 0.419l0-0c-0.030-0.018-0.067-0.035-0.104-0.050l-0.006-0.002c-0.135-0.042-0.253-0.099-0.36-0.169l0.005 0.003c-0.077-0.032-0.169-0.060-0.264-0.081l-0.011-0.002c0.081-0.076 0.156-0.157 0.225-0.243l0.004-0.005c0.063-0.148 0.102-0.319 0.11-0.499l0-0.003v-0.025c0-0.008 0-0.016 0-0.025 0-0.17-0.028-0.333-0.080-0.485l0.003 0.011c-0.063-0.159-0.14-0.296-0.232-0.421l0.004 0.005c-0.087-0.088-0.202-0.148-0.331-0.165l-0.003-0h-0.020c-0.001 0-0.003-0-0.004-0-0.132 0-0.25 0.065-0.322 0.164l-0.001 0.001c-0.116 0.113-0.204 0.253-0.254 0.41l-0.002 0.007c-0.063 0.147-0.104 0.318-0.112 0.496l-0 0.003v0.024c0.002 0.12 0.011 0.236 0.027 0.349l-0.002-0.015c-0.241-0.084-0.547-0.169-0.759-0.252-0.012-0.073-0.020-0.159-0.022-0.247l-0-0.003v-0.025c-0.001-0.020-0.001-0.043-0.001-0.066 0-0.324 0.069-0.631 0.194-0.908l-0.006 0.014c0.106-0.279 0.293-0.508 0.532-0.663l0.005-0.003c0.204-0.156 0.462-0.25 0.742-0.25h0zM16.63 1.004c-0.194 0-0.394 0.010-0.6 0.026-5.281 0.416-3.88 6.007-3.961 7.87-0.050 1.426-0.534 2.729-1.325 3.792l0.013-0.018c-1.407 1.602-2.555 3.474-3.351 5.523l-0.043 0.127c-0.258 0.685-0.408 1.476-0.408 2.302 0 0.285 0.018 0.566 0.052 0.841l-0.003-0.033c-0.056 0.046-0.103 0.102-0.136 0.166l-0.001 0.003c-0.325 0.335-0.562 0.75-0.829 1.048-0.283 0.217-0.615 0.388-0.975 0.494l-0.021 0.005c-0.464 0.139-0.842 0.442-1.075 0.841l-0.005 0.009c-0.104 0.212-0.165 0.461-0.165 0.725 0 0.010 0 0.019 0 0.029l-0-0.001c0.002 0.238 0.026 0.469 0.073 0.693l-0.004-0.023c0.056 0.219 0.088 0.471 0.088 0.73 0 0.17-0.014 0.337-0.041 0.5l0.002-0.018c-0.167 0.313-0.264 0.685-0.264 1.080 0 0.278 0.048 0.544 0.137 0.791l-0.005-0.016c0.273 0.388 0.686 0.662 1.164 0.749l0.011 0.002c1.274 0.107 2.451 0.373 3.561 0.78l-0.094-0.030c0.698 0.415 1.539 0.66 2.436 0.66 0.294 0 0.582-0.026 0.862-0.077l-0.029 0.004c0.667-0.151 1.211-0.586 1.504-1.169l0.006-0.013c0.734-0.004 1.537-0.336 2.824-0.417 0.873-0.072 1.967 0.334 3.22 0.25 0.037 0.159 0.086 0.298 0.148 0.429l-0.006-0.013 0.004 0.004c0.384 0.804 1.19 1.35 2.124 1.35 0.081 0 0.161-0.004 0.24-0.012l-0.010 0.001c1.151-0.17 2.139-0.768 2.813-1.623l0.007-0.009c0.843-0.768 1.827-1.401 2.905-1.853l0.067-0.025c0.432-0.191 0.742-0.585 0.81-1.059l0.001-0.007c-0.059-0.694-0.392-1.299-0.888-1.716l-0.004-0.003v-0.121l-0.004-0.004c-0.214-0.33-0.364-0.722-0.421-1.142l-0.002-0.015c-0.053-0.513-0.278-0.966-0.615-1.307l0 0h-0.004c-0.074-0.067-0.154-0.084-0.235-0.169-0.066-0.047-0.148-0.076-0.237-0.080l-0.001-0c0.195-0.602 0.308-1.294 0.308-2.013 0-0.94-0.193-1.835-0.541-2.647l0.017 0.044c-0.704-1.672-1.619-3.111-2.732-4.369l0.014 0.017c-1.105-1.082-1.828-2.551-1.948-4.187l-0.001-0.021c0.033-2.689 0.295-7.664-4.429-7.671z"></path></g></svg>`;
});
const Mysql = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: class_name = "h-5 w-5 flex-shrink-0" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && class_name !== void 0) $$bindings.class(class_name);
  return `<svg${spread(
    [
      { fill: "#19376D" },
      { viewBox: "0 0 24 24" },
      { xmlns: "http://www.w3.org/2000/svg" },
      {
        class: escape_attribute_value(class_name)
      },
      escape_object($$restProps)
    ],
    {}
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="m24.129 23.412-.508-.484c-.251-.331-.518-.624-.809-.891l-.005-.004q-.448-.407-.931-.774-.387-.266-1.064-.641c-.371-.167-.661-.46-.818-.824l-.004-.01-.048-.024c.212-.021.406-.06.592-.115l-.023.006.57-.157c.236-.074.509-.122.792-.133h.006c.298-.012.579-.06.847-.139l-.025.006q.194-.048.399-.109t.351-.109v-.169q-.145-.217-.351-.496c-.131-.178-.278-.333-.443-.468l-.005-.004q-.629-.556-1.303-1.076c-.396-.309-.845-.624-1.311-.916l-.068-.04c-.246-.162-.528-.312-.825-.435l-.034-.012q-.448-.182-.883-.399c-.097-.048-.21-.09-.327-.119l-.011-.002c-.117-.024-.217-.084-.29-.169l-.001-.001c-.138-.182-.259-.389-.355-.609l-.008-.02q-.145-.339-.314-.651-.363-.702-.702-1.427t-.651-1.452q-.217-.484-.399-.967c-.134-.354-.285-.657-.461-.942l.013.023c-.432-.736-.863-1.364-1.331-1.961l.028.038c-.463-.584-.943-1.106-1.459-1.59l-.008-.007c-.509-.478-1.057-.934-1.632-1.356l-.049-.035q-.896-.651-1.96-1.282c-.285-.168-.616-.305-.965-.393l-.026-.006-1.113-.278-.629-.048q-.314-.024-.629-.024c-.148-.078-.275-.171-.387-.279-.11-.105-.229-.204-.353-.295l-.01-.007c-.605-.353-1.308-.676-2.043-.93l-.085-.026c-.193-.113-.425-.179-.672-.179-.176 0-.345.034-.499.095l.009-.003c-.38.151-.67.458-.795.84l-.003.01c-.073.172-.115.371-.115.581 0 .368.13.705.347.968l-.002-.003q.544.725.834 1.14.217.291.448.605c.141.188.266.403.367.63l.008.021c.056.119.105.261.141.407l.003.016q.048.206.121.448.217.556.411 1.14c.141.425.297.785.478 1.128l-.019-.04q.145.266.291.52t.314.496c.065.098.147.179.241.242l.003.002c.099.072.164.185.169.313v.001c-.114.168-.191.369-.217.586l-.001.006c-.035.253-.085.478-.153.695l.008-.03c-.223.666-.351 1.434-.351 2.231 0 .258.013.512.04.763l-.003-.031c.06.958.349 1.838.812 2.6l-.014-.025c.197.295.408.552.641.787.168.188.412.306.684.306.152 0 .296-.037.422-.103l-.005.002c.35-.126.599-.446.617-.827v-.002c.048-.474.12-.898.219-1.312l-.013.067c.024-.063.038-.135.038-.211 0-.015-.001-.03-.002-.045v.002q-.012-.109.133-.206v.048q.145.339.302.677t.326.677c.295.449.608.841.952 1.202l-.003-.003c.345.372.721.706 1.127 1.001l.022.015c.212.162.398.337.566.528l.004.004c.158.186.347.339.56.454l.01.005v-.024h.048c-.039-.087-.102-.157-.18-.205l-.002-.001c-.079-.044-.147-.088-.211-.136l.005.003q-.217-.217-.448-.484t-.423-.508q-.508-.702-.969-1.467t-.871-1.555q-.194-.387-.375-.798t-.351-.798c-.049-.099-.083-.213-.096-.334v-.005c-.006-.115-.072-.214-.168-.265l-.002-.001c-.121.206-.255.384-.408.545l.001-.001c-.159.167-.289.364-.382.58l-.005.013c-.141.342-.244.739-.289 1.154l-.002.019q-.072.641-.145 1.318l-.048.024-.024.024c-.26-.053-.474-.219-.59-.443l-.002-.005q-.182-.351-.326-.69c-.248-.637-.402-1.374-.423-2.144v-.009c-.009-.122-.013-.265-.013-.408 0-.666.105-1.308.299-1.91l-.012.044q.072-.266.314-.896t.097-.871c-.05-.165-.143-.304-.265-.41l-.001-.001c-.122-.106-.233-.217-.335-.335l-.003-.004q-.169-.244-.326-.52t-.278-.544c-.165-.382-.334-.861-.474-1.353l-.022-.089c-.159-.565-.336-1.043-.546-1.503l.026.064c-.111-.252-.24-.47-.39-.669l.006.008q-.244-.326-.436-.617-.244-.314-.484-.605c-.163-.197-.308-.419-.426-.657l-.009-.02c-.048-.097-.09-.21-.119-.327l-.002-.011c-.011-.035-.017-.076-.017-.117 0-.082.024-.159.066-.223l-.001.002c.011-.056.037-.105.073-.145.039-.035.089-.061.143-.072h.002c.085-.055.188-.088.3-.088.084 0 .165.019.236.053l-.003-.001c.219.062.396.124.569.195l-.036-.013q.459.194.847.375c.298.142.552.292.792.459l-.018-.012q.194.121.387.266t.411.291h.339q.387 0 .822.037c.293.023.564.078.822.164l-.024-.007c.481.143.894.312 1.286.515l-.041-.019q.593.302 1.125.641c.589.367 1.098.743 1.577 1.154l-.017-.014c.5.428.954.867 1.38 1.331l.01.012c.416.454.813.947 1.176 1.464l.031.047c.334.472.671 1.018.974 1.584l.042.085c.081.154.163.343.234.536l.011.033q.097.278.217.57.266.605.57 1.221t.57 1.198l.532 1.161c.187.406.396.756.639 1.079l-.011-.015c.203.217.474.369.778.422l.008.001c.368.092.678.196.978.319l-.047-.017c.143.065.327.134.516.195l.04.011c.212.065.396.151.565.259l-.009-.005c.327.183.604.363.868.559l-.021-.015q.411.302.822.57.194.145.651.423t.484.52c-.114-.004-.249-.007-.384-.007-.492 0-.976.032-1.45.094l.056-.006c-.536.072-1.022.203-1.479.39l.04-.014c-.113.049-.248.094-.388.129l-.019.004c-.142.021-.252.135-.266.277v.001c.061.076.11.164.143.26l.002.006c.034.102.075.19.125.272l-.003-.006c.119.211.247.393.391.561l-.004-.005c.141.174.3.325.476.454l.007.005q.244.194.508.399c.161.126.343.25.532.362l.024.013c.284.174.614.34.958.479l.046.016c.374.15.695.324.993.531l-.016-.011q.291.169.58.375t.556.399c.073.072.137.152.191.239l.003.005c.091.104.217.175.36.193h.003v-.048c-.088-.067-.153-.16-.184-.267l-.001-.004c-.025-.102-.062-.191-.112-.273l.002.004zm-18.576-19.205q-.194 0-.363.012c-.115.008-.222.029-.323.063l.009-.003v.024h.048q.097.145.244.326t.266.351l.387.798.048-.024c.113-.082.2-.192.252-.321l.002-.005c.052-.139.082-.301.082-.469 0-.018 0-.036-.001-.054v.003c-.045-.044-.082-.096-.108-.154l-.001-.003-.081-.182c-.053-.084-.127-.15-.214-.192l-.003-.001c-.094-.045-.174-.102-.244-.169z"></path></g></svg>`;
});
const Mariadb = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: class_name = "h-5 w-5 flex-shrink-0" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && class_name !== void 0) $$bindings.class(class_name);
  return `<svg${spread(
    [
      { fill: "#19376D" },
      { viewBox: "0 0 32 32" },
      { version: "1.1" },
      { xmlns: "http://www.w3.org/2000/svg" },
      {
        class: escape_attribute_value(class_name)
      },
      escape_object($$restProps)
    ],
    {}
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title>mariadb</title><path d="M29.942 6.518c-0.597 0.293-1.3 0.465-2.042 0.465-0.017 0-0.034-0-0.051-0l0.003 0c-0.543 0-1.064 0.096-1.546 0.271l0.032-0.010c-1.052 0.391-1.916 1.082-2.513 1.969l-0.012 0.018c-0.495 0.693-1.011 1.505-1.487 2.343l-0.074 0.142c-0.382 0.63-0.759 1.169-1.168 1.681l0.024-0.031c-0.701 0.866-1.6 1.545-2.63 1.971l-0.044 0.016c-1.369 0.617-3.070 1.245-4.818 1.767l-0.308 0.079c-1.341 0.441-2.665 0.922-2.958 1.080-1.109 0.603-2.030 1.418-2.737 2.398l-0.016 0.024c-1.253 1.65-1.215 1.641-3.801 1.183q-0.421-0.051-0.844-0.079c-0.12-0.026-0.258-0.041-0.399-0.041-0.483 0-0.925 0.173-1.268 0.461l0.003-0.003-0.284 0.269 0.221 0.11c0.268 0.167 0.496 0.331 0.714 0.508l-0.013-0.010c0.202 0.167 0.426 0.328 0.661 0.473l0.026 0.015c0.089 0.041 0.164 0.084 0.236 0.131l-0.007-0.004c-0.078 0.169-0.173 0.314-0.287 0.443l0.002-0.002c-0.544 0.726-0.741 1.088-0.717 1.31 0.024 0.205 0.040 0.212 0.537 0.212 0.027 0.001 0.059 0.001 0.091 0.001 0.533 0 1.043-0.096 1.515-0.271l-0.030 0.010c1.352-0.551 2.496-1.138 3.582-1.809l-0.103 0.059c0.704-0.485 1.508-0.922 2.358-1.271l0.086-0.031c0.102-0.025 0.442-0.087 0.742-0.142 0.42-0.055 0.906-0.087 1.4-0.087 0.647 0 1.282 0.054 1.899 0.159l-0.067-0.009c0.135 0.016 0.466 0.056 0.75 0.080 0.208 0.014 0.402 0.048 0.587 0.1l-0.020-0.005c0.033 0.015 0.592 0.046 1.247 0.070 1.167 0.032 1.38 0.009 1.625-0.236 0.256-0.353 0.467-0.761 0.613-1.199l0.009-0.032c0.261-0.804 0.521-1.151 0.457-0.615-0.1 1.117-0.418 2.14-0.912 3.055l0.021-0.042c-0.351 0.662-0.738 1.234-1.179 1.758l0.012-0.015c-0.402 0.434-0.394 0.45 0.11 0.394 0.991-0.155 1.876-0.516 2.641-1.039l-0.022 0.014c1.225-0.975 2.167-2.255 2.717-3.727l0.019-0.059c0.134-0.337 0.275-0.275 0.229 0.104-0.016 0.117-0.047 0.394-0.071 0.622l-0.039 0.41 0.441-0.252c1.245-0.867 2.178-2.107 2.644-3.555l0.014-0.049c0.473-1.33 0.936-2.995 1.294-4.699l0.047-0.269c0.106-0.524 0.223-0.961 0.363-1.387l-0.024 0.085c0.092-0.425 0.305-0.791 0.599-1.071l0.001-0.001c0.37-0.353 0.768-0.684 1.189-0.987l0.033-0.023c0.63-0.358 1.134-0.87 1.473-1.486l0.010-0.020c0.16-0.307 0.254-0.671 0.254-1.057 0-0.227-0.033-0.447-0.093-0.655l0.004 0.016c-0.165-0.252-0.355-0.245-0.954 0.008z"></path></g></svg>`;
});
const Lua = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: class_name = "h-5 w-5 flex-shrink-0" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && class_name !== void 0) $$bindings.class(class_name);
  return `<svg${spread(
    [
      { viewBox: "0 0 16 16" },
      { fill: "none" },
      { xmlns: "http://www.w3.org/2000/svg" },
      {
        class: escape_attribute_value(class_name)
      },
      escape_object($$restProps)
    ],
    {}
  )}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M3.259 12.714a5.727 5.727 0 008.147 0 5.845 5.845 0 000-8.217 5.727 5.727 0 00-8.147 0 5.845 5.845 0 000 8.217zm-1.111 1.12c-2.864-2.887-2.864-7.57 0-10.457a7.289 7.289 0 0110.369 0c2.863 2.888 2.863 7.57 0 10.457a7.289 7.289 0 01-10.37 0zM15.54 2.705a1.562 1.562 0 01-2.222 0 1.594 1.594 0 010-2.24 1.562 1.562 0 012.222 0 1.594 1.594 0 010 2.24z" fill="#19376D"></path><path d="M11.844 8.673a3.124 3.124 0 01-4.444 0 3.188 3.188 0 010-4.481 3.124 3.124 0 014.444 0 3.188 3.188 0 010 4.481zM8.51 7.553a1.562 1.562 0 002.222 0 1.594 1.594 0 000-2.24 1.562 1.562 0 00-2.222 0 1.594 1.594 0 000 2.24z" fill="#19376D"></path></g></svg>`;
});
const LanguageSelector = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_locale;
  $$unsubscribe_locale = subscribe(locale, (value) => value);
  $$unsubscribe_locale();
  return `<div class="fixed top-0 right-0 m-4 z-50"><select class="p-2 bg-transparent text-[#A5D7E8] uppercase">${each(locales, (l) => {
    return `<option class="uppercase text-[#0B2447]"${add_attribute("value", l, 0)}>${escape(l)}</option>`;
  })}</select></div>`;
});
const Home = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let experiences;
  let skills;
  let $t, $$unsubscribe_t;
  $$unsubscribe_t = subscribe(t, (value) => $t = value);
  const experiencesBase = [
    {
      title: "Web Developer Intern",
      company: "Daffys E-Shop",
      location: "Thessaloniki, Greece",
      date: "August 2021 - January 2022",
      descriptionKey: "experience.web_developer_intern.description"
    },
    {
      title: "Greek Military Duty",
      company: "Greek Government",
      location: "Limnos, Greece",
      date: "May 2022 - January 2023",
      descriptionKey: "experience.military_duty.description"
    },
    {
      title: "Web Developer",
      company: "Freelancing",
      location: "Thessaloniki, Greece",
      date: "March 2023 - October 2023",
      descriptionKey: "experience.web_developer.description"
    },
    {
      title: "Full Stack Web Developer - Software Engineer",
      company: "Infomax Insurance Brokers",
      location: "Thessaloniki, Greece",
      date: "October 2023 - Today",
      descriptionKey: "experience.full_stack_developer.description"
    },
    {
      title: "Gaming Servers Operator",
      company: "Gaming Multiverse",
      location: "",
      date: "February 2017 - Today",
      descriptionKey: "experience.gaming_servers_operator.description"
    }
  ];
  const skillsBase = [
    {
      icon: Lua,
      title: "Lua",
      descriptionKey: "skill.lua.description"
    },
    {
      icon: Svelte,
      title: "SvelteKit",
      descriptionKey: "skill.sveltekit.description"
    },
    {
      icon: Tailwindcss,
      title: "TailwindCSS",
      descriptionKey: "skill.tailwindcss.description"
    },
    {
      icon: Javascript,
      title: "JavaScript",
      descriptionKey: "skill.javascript.description"
    },
    {
      icon: Nodejs,
      title: "Node.js",
      descriptionKey: "skill.nodejs.description"
    },
    {
      icon: { component: Html, secondaryComponent: Css },
      title: "HTML & CSS",
      descriptionKey: "skill.html_css.description"
    },
    {
      icon: Linux,
      title: "Unix Systems",
      descriptionKey: "skill.unix_systems.description"
    },
    {
      icon: {
        component: Mariadb,
        secondaryComponent: Mysql
      },
      title: "MariaDB & MySQL",
      descriptionKey: "skill.mariadb_mysql.description"
    },
    {
      icon: Laravel,
      title: "PHP Laravel",
      descriptionKey: "skill.php_laravel.description"
    },
    {
      icon: Email,
      title: "Email System",
      descriptionKey: "skill.email_system.description"
    }
  ];
  const contactInfo = [
    {
      icon: Email,
      title: "Email",
      detail: "contact@pantelisxanthos.gr",
      link: null
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      detail: "linkedin.com/in/PantelisXanthos",
      link: "https://www.linkedin.com/in/pantelis-xanthos-46a21150/"
    },
    {
      icon: Github,
      title: "GitHub",
      detail: "github.com/hardbaited",
      link: "https://github.com/hardbaited"
    },
    {
      icon: Location,
      title: "Location",
      detail: "Greece",
      link: null
    }
  ];
  experiences = experiencesBase.map((exp) => ({
    ...exp,
    description: $t(exp.descriptionKey)
  }));
  skills = skillsBase.map((skill) => ({
    ...skill,
    description: $t(skill.descriptionKey)
  }));
  $$unsubscribe_t();
  return `${validate_component(LanguageSelector, "LanguageSelector").$$render($$result, {}, {}, {})} <div class=""><div class="min-h-screen flex flex-col items-center justify-center"><div class="sticky top-0 w-full h-screen flex items-center justify-center"><div class="w-full relative"><h1 class="${[
    "absolute inset-0 flex items-center justify-center text-2xl text-[#576CBC] transition-opacity duration-500 text-center",
    " opacity-100"
  ].join(" ").trim()}">${escape($t("homepage.hello"))}! 👋</h1> <h2 class="${[
    "absolute inset-0 flex items-center justify-center text-3xl text-[#576CBC] transition-opacity duration-500 text-center",
    "opacity-0 "
  ].join(" ").trim()}">${escape($t("homepage.welcome"))}! 💻</h2> <h3 class="${[
    "absolute inset-0 flex items-center justify-center text-3xl text-[#576CBC] transition-opacity duration-500 text-center",
    "opacity-0 "
  ].join(" ").trim()}">${escape($t("homepage.intro"))} 🚀</h3></div></div> ${`<div class="sticky bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">${validate_component(ArrowDown, "ArrowDown").$$render(
    $$result,
    {
      class: "w-12 h-12 animate-bounce text-[#576CBC]"
    },
    {},
    {}
  )} <p class="text-[#576CBC] text-sm mt-2" data-svelte-h="svelte-180zm2d">Scroll down</p></div>`} <div class="h-[130vh]"></div></div> ${``} <div class="text-[#576CBC] text-center items-center flex flex-col justify-center pt-28 pb-28 lg:px-96"><h3 class="text-[#A5D7E8]">${escape($t("homepage.introduction"))}</h3> <p class="pt-6 mx-7">${escape($t("homepage.introductionOne"))} <br> <br> ${escape($t("homepage.introductionTwo"))} <br> <br> ${escape($t("homepage.introductionThree"))} <br> <br> ${escape($t("homepage.introductionFour"))}</p></div> <div class="bg-[#576CBC] h-44 shadow-lg shadow-[#19376D] flex flex-col justify-center items-center"><h2 class="text-center text-[#0B2447] text-3xl font-semibold">${escape($t("homepage.experience"))}</h2></div> <div class="mx-7 my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 pt-20 pb-20 lg:px-96">${each(experiences, (experiences2) => {
    return `<div class="bg-white shadow-lg shadow-[#576CBC] rounded-lg p-6 lg:hover:scale-110 transition"><h3 class="text-[#0B2447] text-xl font-bold">${escape(experiences2.title)}</h3> <p class="text-[#576CBC] font-semibold">${escape(experiences2.company)}, ${escape(experiences2.location)}</p> <p class="text-gray-600 mt-2">${escape(experiences2.date)}</p> <p class="text-gray-700 mt-4">${escape(experiences2.description)}</p> </div>`;
  })}</div> <div class="bg-[#576CBC] h-44 shadow-lg shadow-[#19376D] flex flex-col justify-center items-center"><h2 class="text-center text-[#0B2447] text-3xl font-semibold">${escape($t("homepage.skill"))}</h2></div> <div class="mx-7 my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-20 pb-20 lg:px-96">${each(skills, (skill) => {
    return `<div class="bg-white shadow-lg shadow-[#576CBC] rounded-lg p-6 flex flex-col items-center text-center lg:hover:scale-110 transition">${skill.icon.secondaryComponent ? `<div class="flex justify-center items-center">${validate_component(skill.icon.component || missing_component, "svelte:component").$$render($$result, { class: "w-12 h-12" }, {}, {})} ${validate_component(skill.icon.secondaryComponent || missing_component, "svelte:component").$$render($$result, { class: "w-11 h-11" }, {}, {})} </div>` : `${validate_component(skill.icon || missing_component, "svelte:component").$$render($$result, { class: "w-12 h-12" }, {}, {})}`} <h3 class="text-[#0B2447] text-xl font-bold">${escape(skill.title)}</h3> <p class="text-gray-700 mt-2">${escape(skill.description)}</p> </div>`;
  })}</div> <div class="min-h-screen flex flex-col items-center justify-center"><div class="sticky top-0 w-full h-screen flex items-center justify-center"><div class="w-full relative"><h1 class="${[
    "absolute inset-0 flex items-center justify-center text-2xl text-[#576CBC] transition-opacity duration-500 text-center",
    "opacity-0 "
  ].join(" ").trim()}">${escape($t("homepage.like"))} 😎</h1> <h2 class="${[
    "absolute inset-0 flex items-center justify-center text-3xl text-[#576CBC] transition-opacity duration-500 text-center",
    "opacity-0 "
  ].join(" ").trim()}">${escape($t("homepage.contactme"))}! 📸</h2> <h3 class="${[
    "absolute inset-0 flex items-center justify-center text-3xl text-[#576CBC] transition-opacity duration-500 text-center",
    "opacity-0 "
  ].join(" ").trim()}">${escape($t("homepage.findmysocials"))}! 👌</h3></div></div> ${``} <div class="h-[130vh]"></div></div> <div class="bg-[#576CBC] h-44 shadow-lg shadow-[#19376D] flex flex-col justify-center items-center"><h2 class="text-center text-[#0B2447] text-3xl font-semibold">${escape($t("homepage.mycontactinfo"))}</h2></div> <div class="flex w-full justify-center"><div class="mx-7 my-10 space-y-6 pt-16 pb-16 lg:w-[25rem] md:w-[29rem]">${each(contactInfo, (info) => {
    return `<div class="bg-white shadow-md rounded-lg p-6 flex items-center gap-4 lg:hover:scale-110 transition">${validate_component(info.icon || missing_component, "svelte:component").$$render($$result, { class: "w-12 h-12" }, {}, {})} <div><h3 class="text-[#0B2447] text-xl font-bold">${escape(info.title)}</h3> ${info.link ? `<p class="text-gray-700"><a${add_attribute("href", info.link, 0)} target="_blank" class="text-[#576CBC] underline">${escape(info.detail)}</a> </p>` : `<p class="text-gray-700 select-text">${escape(info.detail)}</p>`}</div> </div>`;
  })}</div></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-1127h6y_START --><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/svelte-hamburgers@3/dist/css/base.css"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/svelte-hamburgers@3/dist/css/types/spin.css"><link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Roboto:wght@400;700&display=swap" rel="stylesheet"><!-- HEAD_svelte-1127h6y_END -->`, ""} <body class="w-screen h-screen bg-[#0B2447] select-none">${validate_component(Home, "Home").$$render($$result, {}, {}, {})}</body>`;
});
export {
  Page as default
};
