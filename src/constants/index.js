import {
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  threejs,
  citi,
  seedabit,
  facilit,
  germinar,
  conectaOng,
  soundrangers,
  moves,
  karina,
  soph,
  jona,
  bea,
} from "../assets";

export const CAREER_START_YEAR = 2020;

export const navLinks = {
  pt: [
    { id: "about", title: "Sobre" },
    { id: "experience", title: "Experiência" },
    { id: "work", title: "Projetos" },
    { id: "testimonials", title: "Depoimentos" },
    { id: "contact", title: "Contato" },
  ],
  en: [
    { id: "about", title: "About" },
    { id: "experience", title: "Experience" },
    { id: "work", title: "Work" },
    { id: "testimonials", title: "Testimonials" },
    { id: "contact", title: "Contact" },
  ],
};

export const socialLinks = [
  { name: "GitHub", link: "https://github.com/maikermenezes", icon: "github" },
  { name: "LinkedIn", link: "https://www.linkedin.com/in/maike-menezes-1638ba17a/", icon: "linkedin" },
];

export const ui = {
  pt: {
    menu: "Menu",
    close: "Fechar",
    loading: "Carregando experiência",
    viewProject: "Ver",
    backToTop: "Voltar ao topo",
    builtWith: "Desenhado & desenvolvido por Maike Menezes",
    localTime: "Horário local",
  },
  en: {
    menu: "Menu",
    close: "Close",
    loading: "Loading experience",
    viewProject: "View",
    backToTop: "Back to top",
    builtWith: "Designed & built by Maike Menezes",
    localTime: "Local time",
  },
};

export const heroText = {
  pt: {
    available: "Disponível para novos projetos",
    greeting: "Olá, eu sou o Maike —",
    line1: "Engenheiro de",
    line2: "Software",
    lead: "Eu desenvolvo",
    roles: ["aplicações web", "aplicativos mobile", "sistemas backend", "design systems"],
    description:
      "Transformo ideias em produtos digitais rápidos, bonitos e escaláveis — da interface ao servidor.",
    ctaPrimary: "Ver projetos",
    ctaSecondary: "Vamos conversar",
    scroll: "Role para explorar",
    location: "Brasil · Trabalho remoto",
  },
  en: {
    available: "Available for new projects",
    greeting: "Hi, I'm Maike —",
    line1: "Software",
    line2: "Engineer",
    lead: "I build",
    roles: ["web applications", "mobile apps", "backend systems", "design systems"],
    description:
      "I turn ideas into fast, beautiful and scalable digital products — from the interface to the server.",
    ctaPrimary: "See my work",
    ctaSecondary: "Let's talk",
    scroll: "Scroll to explore",
    location: "Brazil · Working remotely",
  },
};

export const profileText = {
  pt: {
    eyebrow: "Sobre mim",
    title: "Código com propósito, interfaces com alma.",
    description:
      "Sou um desenvolvedor de software com experiência em TypeScript e JavaScript. Tenho paixão por criar experiências de usuário bonitas, funcionais e intuitivas. Aprendo rápido e estou sempre buscando expandir minhas habilidades. Colaboro de perto com clientes para criar soluções eficientes, escaláveis e fáceis de usar que resolvem problemas reais. Vamos trabalhar juntos para dar vida às suas ideias.",
    stats: [
      { suffix: "+", label: "anos construindo produtos", key: "years" },
      { value: 10, suffix: "k+", label: "usuários diários impactados" },
      { value: 5, suffix: "", label: "cargos em 3 empresas" },
    ],
    currently: "Atualmente",
    currentRole: "Full Stack Developer",
    currentCompany: "Facilit Tecnologia",
    servicesTitle: "O que eu faço",
    snippetTitle: "maike.config.ts",
  },
  en: {
    eyebrow: "About me",
    title: "Code with purpose, interfaces with soul.",
    description:
      "I'm a software developer experienced in TypeScript and JavaScript. I have a passion for creating beautiful, functional and intuitive user experiences. I'm a quick learner and always looking to expand my skillset. I collaborate closely with clients to build efficient, scalable and user-friendly solutions that solve real-world problems. Let's work together to bring your ideas to life.",
    stats: [
      { suffix: "+", label: "years shipping products", key: "years" },
      { value: 10, suffix: "k+", label: "daily users impacted" },
      { value: 5, suffix: "", label: "roles across 3 companies" },
    ],
    currently: "Currently",
    currentRole: "Full Stack Developer",
    currentCompany: "Facilit Tecnologia",
    servicesTitle: "What I do",
    snippetTitle: "maike.config.ts",
  },
};

export const services = {
  pt: [
    {
      title: "Desenvolvimento Web",
      icon: "web",
      description: "SPAs e plataformas SaaS em React com foco em performance, acessibilidade e animações que encantam.",
    },
    {
      title: "Apps Mobile",
      icon: "mobile",
      description: "Aplicativos multiplataforma com React Native, experiência nativa e uma única base de código.",
    },
    {
      title: "Backend & APIs",
      icon: "backend",
      description: "APIs Node.js robustas, bancos de dados e integrações — incluindo IA — prontas para escalar.",
    },
  ],
  en: [
    {
      title: "Web Development",
      icon: "web",
      description: "React SPAs and SaaS platforms focused on performance, accessibility and delightful motion.",
    },
    {
      title: "Mobile Apps",
      icon: "mobile",
      description: "Cross-platform apps with React Native — native feel, one codebase.",
    },
    {
      title: "Backend & APIs",
      icon: "backend",
      description: "Robust Node.js APIs, databases and integrations — AI included — built to scale.",
    },
  ],
};

export const technologies = [
  { name: "TypeScript", icon: typescript },
  { name: "JavaScript", icon: javascript },
  { name: "React", icon: reactjs },
  { name: "React Native", icon: reactjs },
  { name: "Redux", icon: redux },
  { name: "Node.js", icon: nodejs },
  { name: "Three.js", icon: threejs },
  { name: "Tailwind", icon: tailwind },
  { name: "MongoDB", icon: mongodb },
  { name: "Docker", icon: docker },
  { name: "HTML5", icon: html },
  { name: "CSS3", icon: css },
  { name: "Git", icon: git },
  { name: "Figma", icon: figma },
];

export const experiencesText = {
  pt: { eyebrow: "Trajetória", title: "Experiência", subtitle: "O que eu fiz até agora" },
  en: { eyebrow: "Journey", title: "Experience", subtitle: "What I've done so far" },
};

export const experiences = {
  pt: [
    {
      title: "Desenvolvedor Full Stack",
      company_name: "Facilit Tecnologia",
      icon: facilit,
      date: "Nov 2021 — Atual",
      current: true,
      points: [
        "Responsável pela implementação de funcionalidades de front-end cruciais em uma plataforma SaaS usada diariamente por dezenas de milhares de clientes.",
        "Responsável pela análise de viabilidade e implementação da migração tecnológica de AngularJS para React.",
        "À frente da implementação de design systems.",
        "Participação ativa no planejamento e desenvolvimento de novas funcionalidades.",
        "Refatoração de funcionalidades legadas, novas interfaces e manutenção.",
      ],
      tags: ["React", "TypeScript", "AngularJS", "Design Systems"],
    },
    {
      title: "Líder de Desenvolvimento",
      company_name: "CITi (empresa júnior)",
      icon: citi,
      date: "Jan 2023 — Jun 2023",
      points: [
        "Treinamento e onboarding de novos membros da equipe.",
        "Liderança de múltiplos times e projetos dentro da empresa.",
        "Comunicação frequente com stakeholders para garantir o sucesso de cada projeto.",
        "Planejamento tático e estratégico (OKR) do time de desenvolvimento, com metodologias e ações para melhorar a performance do time.",
        "Code review e feedback para os desenvolvedores do time.",
      ],
      tags: ["Liderança", "OKR", "Code Review"],
    },
    {
      title: "Desenvolvedor Full Stack",
      company_name: "CITi (empresa júnior)",
      icon: citi,
      date: "Dez 2021 — Dez 2022",
      points: [
        "Desenvolvimento de projetos para diversos clientes seguindo boas práticas e tecnologias modernas.",
        "Trabalho lado a lado com times de outras empresas.",
        "Participação em análises de viabilidade de projetos e negociação com clientes.",
        "Code reviews e feedback para outros membros da equipe.",
        "Documentação de processos e fluxos de trabalho.",
        "Contribuí para o desenvolvimento de uma plataforma de capacitação interna, assim como treinamentos.",
      ],
      tags: ["React", "Node.js", "Clientes"],
    },
    {
      title: "Estágio em Desenvolvimento Web",
      company_name: "Facilit Tecnologia",
      icon: facilit,
      date: "Abr 2021 — Out 2021",
      points: [
        "Desenvolvimento e manutenção de uma plataforma SaaS usando principalmente AngularJS, jQuery e Java.",
        "Implementação de interfaces e novas funcionalidades.",
        "Design responsivo com compatibilidade entre múltiplas plataformas.",
        "Documentação de fluxos de trabalho e processos.",
      ],
      tags: ["AngularJS", "jQuery", "Java"],
    },
    {
      title: "Desenvolvedor Front-end",
      company_name: "Seed a Bit (empresa júnior)",
      icon: seedabit,
      date: "Nov 2020 — Set 2021",
      points: [
        "Desenvolvimento e manutenção de aplicações web com JavaScript puro e tecnologias relacionadas.",
        "Colaboração com times multidisciplinares — designers, gerentes de produto e desenvolvedores — usando Scrum.",
        "Implementação de design responsivo.",
        "Code review e feedback para outros desenvolvedores.",
      ],
      tags: ["JavaScript", "Scrum", "Responsivo"],
    },
  ],
  en: [
    {
      title: "Full Stack Developer",
      company_name: "Facilit Tecnologia",
      icon: facilit,
      date: "Nov 2021 — Present",
      current: true,
      points: [
        "Responsible for implementing crucial front-end features in a SaaS platform used daily by tens of thousands of customers.",
        "Led the feasibility analysis and implementation of the technology migration from AngularJS to React.",
        "Leading the implementation of design systems.",
        "Active participation in planning and developing new features.",
        "Refactoring legacy features, building new interfaces and maintenance.",
      ],
      tags: ["React", "TypeScript", "AngularJS", "Design Systems"],
    },
    {
      title: "Tech Lead",
      company_name: "CITi (junior enterprise)",
      icon: citi,
      date: "Jan 2023 — Jun 2023",
      points: [
        "Training and onboarding of new team members.",
        "Leadership of multiple teams and projects within the company.",
        "Frequent communication with stakeholders to ensure the success of each project.",
        "Tactical and strategic planning (OKR) of the development team, plus methodologies and actions to improve team performance.",
        "Code review and feedback for team developers.",
      ],
      tags: ["Leadership", "OKR", "Code Review"],
    },
    {
      title: "Full Stack Developer",
      company_name: "CITi (junior enterprise)",
      icon: citi,
      date: "Dec 2021 — Dec 2022",
      points: [
        "Built projects for multiple clients following best practices and modern technologies.",
        "Worked side by side with teams from other companies.",
        "Took part in project feasibility analysis and client negotiation.",
        "Code reviews and feedback for other team members.",
        "Documentation of processes and workflows.",
        "Contributed to an internal training platform, as well as several trainings.",
      ],
      tags: ["React", "Node.js", "Clients"],
    },
    {
      title: "Web Development Intern",
      company_name: "Facilit Tecnologia",
      icon: facilit,
      date: "Apr 2021 — Oct 2021",
      points: [
        "Development and maintenance of a SaaS platform using primarily AngularJS, jQuery and Java.",
        "Implemented interfaces and new features.",
        "Responsive design with cross-platform compatibility.",
        "Documentation of workflows and processes.",
      ],
      tags: ["AngularJS", "jQuery", "Java"],
    },
    {
      title: "Front-end Developer",
      company_name: "Seed a Bit (junior enterprise)",
      icon: seedabit,
      date: "Nov 2020 — Sep 2021",
      points: [
        "Development and maintenance of web applications with vanilla JavaScript and related technologies.",
        "Collaborated with multidisciplinary teams — designers, product managers and developers — using Scrum.",
        "Implementation of responsive design.",
        "Code review and feedback for other developers.",
      ],
      tags: ["JavaScript", "Scrum", "Responsive"],
    },
  ],
};

export const projectsText = {
  pt: {
    eyebrow: "Trabalhos selecionados",
    title: "Projetos",
    description:
      "Produtos reais em produção — de plataformas de dados e educação a apps mobile e projetos com impacto social.",
    links: { live: "Visitar site", store: "Google Play", code: "Código", internal: "Acesso interno · link privado" },
  },
  en: {
    eyebrow: "Selected work",
    title: "Projects",
    description:
      "Real products in production — from data and education platforms to mobile apps and social-impact projects.",
    links: { live: "Visit site", store: "Google Play", code: "Source", internal: "Internal access · private link" },
  },
};

// linkType: "live" | "store" | "code" | "internal" — controls the CTA label and icon.
// "internal" projects have no public link: the card isn't clickable and shows a private-access badge.
const projectLinks = {
  soundrangers: { link: "https://report-soundrangers.vercel.app/login?next=%2F", linkType: "live", host: "report-soundrangers.vercel.app" },
  moves: { link: "https://play.google.com/store/apps/details?id=com.movesbrasil&hl=pt_BR", linkType: "store", host: "play.google.com" },
  germinar: { link: null, linkType: "internal", host: "germinar · intranet" },
  conectaOng: { link: "https://conecta-ong-cad.vercel.app/", linkType: "live", host: "conecta-ong-cad.vercel.app" },
};

export const projects = {
  pt: [
    {
      name: "SoundRangers",
      year: "2026",
      category: "Web · Plataforma de dados",
      description:
        "Ferramenta interna de relatórios de royalties musicais: importa CSVs de plataformas e concilia cada reprodução, reivindicação e pagamento, mostrando os ganhos de cada criador em todo o catálogo.",
      tags: ["Dashboard", "Importação de CSV", "Conciliação", "Autenticação"],
      image: soundrangers,
      ...projectLinks.soundrangers,
    },
    {
      name: "Move's",
      category: "Mobile · Turismo acessível",
      description:
        "App de turismo inclusivo para pessoas com mobilidade reduzida: informações detalhadas de acessibilidade em atrações, restaurantes, hotéis e transportes, além de locais pet-friendly e suas regras.",
      tags: ["Android", "Acessibilidade", "Busca & filtros"],
      image: moves,
      ...projectLinks.moves,
    },
    {
      name: "Germinar · Jogos Digitais",
      category: "Web · Educação · Projeto social",
      description:
        "Plataforma de jogos educativos do Programa Germinar, projeto social da Gerdau. Os jogos são organizados em três níveis de aprendizado para ensinar de forma divertida.",
      tags: ["Jogos educativos", "Níveis de aprendizado", "Impacto social"],
      image: germinar,
      ...projectLinks.germinar,
    },
    {
      name: "Conecta ONG",
      category: "Web · Projeto universitário · CIn-UFPE",
      description:
        "Conecta pessoas a ONGs verificadas perto delas: filtro por causa, localização aproximada, doação direta via PIX e inscrição como voluntário — além do cadastro e verificação de documentos das ONGs.",
      tags: ["Geolocalização", "Filtros por causa", "PIX", "Acessibilidade"],
      image: conectaOng,
      ...projectLinks.conectaOng,
    },
  ],
  en: [
    {
      name: "SoundRangers",
      year: "2026",
      category: "Web · Data platform",
      description:
        "Internal music-royalty reporting tool: imports platform CSVs and reconciles every play, claim and payout, showing each creator's earnings across the whole catalog.",
      tags: ["Dashboard", "CSV import", "Reconciliation", "Auth"],
      image: soundrangers,
      ...projectLinks.soundrangers,
    },
    {
      name: "Move's",
      category: "Mobile · Accessible tourism",
      description:
        "Inclusive tourism app for people with reduced mobility: detailed accessibility info for attractions, restaurants, hotels and transport, plus pet-friendly places and their rules.",
      tags: ["Android", "Accessibility", "Search & filters"],
      image: moves,
      ...projectLinks.moves,
    },
    {
      name: "Germinar · Digital Games",
      category: "Web · Education · Social project",
      description:
        "Educational games platform for Programa Germinar, Gerdau's social project. Games are organized into three learning levels to teach in a fun way.",
      tags: ["Educational games", "Learning levels", "Social impact"],
      image: germinar,
      ...projectLinks.germinar,
    },
    {
      name: "Conecta ONG",
      category: "Web · University project · CIn-UFPE",
      description:
        "Connects people with verified NGOs near them: filter by cause, approximate location, direct PIX donations and volunteer sign-up — plus NGO registration with document verification.",
      tags: ["Geolocation", "Cause filters", "PIX", "Accessibility"],
      image: conectaOng,
      ...projectLinks.conectaOng,
    },
  ],
};

export const feedbackText = {
  pt: { eyebrow: "Depoimentos", title: "O que dizem sobre mim" },
  en: { eyebrow: "Testimonials", title: "What people say" },
};

export const testimonials = {
  pt: [
    {
      testimonial:
        "Maike foi uma das lideranças mais servidoras, presentes e dedicadas com quem já tive o privilégio de trabalhar. Com muita dedicação, disciplina, postura e empatia, era visível a sua vontade de fazer mais e melhor sempre, recebendo feedbacks e buscando o desenvolvimento da empresa e das pessoas colaboradoras.",
      name: "Sophia Latache",
      designation: "CEO",
      company: "CITi",
      image: soph,
      preposition: "no",
    },
    {
      testimonial:
        "Maike é uma pessoa extremamente dedicada em tudo que se propõe a fazer. Suas hard skills sempre foram fundamentais para impactar nos projetos que atuou no CITi. Destaco também suas soft skills, pois é uma pessoa muito empática e que tem sempre uma escuta ativa forte, buscando não apenas entender as dores das pessoas ao redor, mas também propondo ações que as ajudem a se desenvolver. Além disso, é uma grande inspiração minha no que diz respeito a gestão do tempo e organização, habilidades essas que o fazem se destacar como pessoa e profissional.",
      name: "Jonailton Pereira",
      designation: "Gerente Financeiro",
      company: "CITi",
      image: jona,
      preposition: "no",
    },
    {
      testimonial:
        "Maike é uma pessoa dinâmica, que tem ótima capacidade de resolução de problemas, além de simplificar processos de uma maneira muito inteligente e ágil. É alguém que integra e dinamiza toda a equipe de uma maneira fantástica.",
      name: "Beatriz Cordeiro",
      designation: "Colega de trabalho",
      company: "CITi (trainee)",
      image: bea,
      preposition: "no",
    },
    {
      testimonial:
        "Maike foi capaz de melhorar grandemente a performance do nosso site e entregar o projeto no prazo e com grande qualidade.",
      name: "Karina Amaral",
      designation: "Doutora em Biologia Animal (Cliente)",
      company: "SBEQ",
      image: karina,
      preposition: "na",
    },
  ],
  en: [
    {
      testimonial:
        "Maike was one of the most serving, present and dedicated leaders I've ever had the privilege of working with. With a lot of dedication, discipline, posture and empathy, his desire to do more and better was visible, receiving feedback and seeking the development of the company and the employees.",
      name: "Sophia Latache",
      designation: "CEO",
      company: "CITi",
      image: soph,
      preposition: "at",
    },
    {
      testimonial:
        "Maike is an extremely dedicated person in everything he proposes to do. His hard skills have always been fundamental to impact the projects he worked on at CITi. I also highlight his soft skills, as he is a very empathetic person and has a strong active listening, seeking not only to understand the pains of the people around him, but also proposing actions that help them to develop. In addition, he is a great inspiration of mine when it comes to time management and organization, skills that make him stand out as a person and professional.",
      name: "Jonailton Pereira",
      designation: "Financial Manager",
      company: "CITi",
      image: jona,
      preposition: "at",
    },
    {
      testimonial:
        "Maike is a dynamic person, who has great problem solving skills, as well as simplifying processes in a very intelligent and agile way. He is someone who integrates and streamlines the entire team in a fantastic way.",
      name: "Beatriz Cordeiro",
      designation: "Colleague",
      company: "CITi (trainee)",
      image: bea,
      preposition: "at",
    },
    {
      testimonial:
        "Maike was able to greatly improve the performance of our website and deliver the project on time and with great quality.",
      name: "Karina Amaral",
      designation: "PhD in Animal Biology (Client)",
      company: "SBEQ",
      image: karina,
      preposition: "at",
    },
  ],
};

export const contactText = {
  pt: {
    eyebrow: "Contato",
    title1: "Vamos construir",
    title2: "algo incrível",
    description:
      "Tem um projeto em mente, uma vaga ou só quer trocar uma ideia? Mande uma mensagem — respondo rapidinho.",
    name: "Seu nome",
    email: "Seu email",
    message: "Conte sobre seu projeto",
    send: "Enviar mensagem",
    sending: "Enviando...",
    sent: "Mensagem enviada!",
    error: "Erro ao enviar. Tente novamente.",
    success: "Obrigado pelo contato. Responderei assim que possível!",
    socials: "Redes",
  },
  en: {
    eyebrow: "Contact",
    title1: "Let's build",
    title2: "something great",
    description:
      "Got a project in mind, a role to fill or just want to chat? Drop me a message — I reply fast.",
    name: "Your name",
    email: "Your email",
    message: "Tell me about your project",
    send: "Send message",
    sending: "Sending...",
    sent: "Message sent!",
    error: "Something went wrong. Please try again.",
    success: "Thanks for reaching out. I'll reply as soon as possible!",
    socials: "Socials",
  },
};
