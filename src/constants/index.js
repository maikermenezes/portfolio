import {
  mobile,
  backend,
  web,
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
  citi,
  seedabit,
  facilit,
  storyVision,
  flashi,
  threejs,
  karina, 
  soph,
  jona,
  bea,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "Sobre mim",
  },
  {
    id: "experience",
    title: "Experiência",
  },
  {
    id: "work",
    title: "Trabalho",
  },
  {
    id: "contact",
    title: "Contatos",
  },
];

const services = [
  {
    title: "Desenvolvedor Web",
    icon: web,
  },
  {
    title: "Desenvolvedor React Native",
    icon: mobile,
  },
  {
    title: "Desenvolvedor Backend",
    icon: backend,
  },
  // {
  //   title: "",
  //   icon: creator,
  // },
];

const technologies = [
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
  // {
  //   name: "styled-components",
  //   icon: css,
  // },
  // {
  //   name: "material-ui",
  //   icon: css,
  // }
];

const experiences = [
  {
    title: "Desenvolvedor Front-end",
    company_name: "Seed a Bit (empresa júnior)",
    icon: seedabit,
    iconBg: "#E6DEDD",
    date: "Novembro 2020 - Setembro 2021",
    points: [
      "Desenvolvimento e manutenção de aplicações web com javascript puro e outras tecnologias relacionadas.",
      "Colaboração com times multi-disciplinares que incluiam designers, gerentes de produto e outros desenvolvedores usando Scrum.",
      "Implementação de design responsivo.",
      "Participação em revisão de código e passagem de feedbacks a outros desenvolvedores.",
    ],
  },
  {
    title: "Estágio em Desenvolvimento Web",
    company_name: "Facilit Technollgia SA",
    icon: facilit,
    iconBg: "#E6DEDD",
    date: "Abril 2021 - Outubro 2021",
    points: [
      "Desenvolvimento e manuteção de uma plataforma SaaS usando primariamente Angularjs, JQuery, Java, and outras tecnologias relacionadas.",
      "Responsável por algumas implementações de interfaces e novas funcionalidades.",
      "Implementação de design responsivo levando em consideração compatibilidade com múltiplas plataformas.",
      "Prover documentação para fluxos de trabalho e processos."
    ],
  },
  {
    title: "Desenvolvedor Full Stack",
    company_name: "CITi (empresa júnior)",
    icon: citi,
    iconBg: "#E6DEDD",
    date: "Dezembro 2021 - Dezembro 2022",
    points: [
      "Desenvolvimento de projetos para diversos clientes seguindo as melhores práticas de desenvolvimento assim como as tecnologias mais modernas do mercado.",
      "Trabalhando lado a lado com times de outras empresas.",
      "Participação ativa em análises de viabilidade de projetos e negociação com clientes.",
      "Participação em code reviews e provendo feedbacks para outros membros da equipe.",
      "Documentação de processos e fluxos de trabalho.",
      "Contribuí para o desenolvimento de uma plataforma de capacitação interna, assim como alguns treinamentos."
    ],
  },
  {
    title: "Líder de Desenvolvimento",
    company_name: "CITi (empresa júnior)",
    icon: citi,
    iconBg: "#E6DEDD",
    date: "Janeiro 2023 - Junho 2023",
    points: [
      "Responsável por providenciar treinamento apropriado para novos membros da equipe.",
      "Liderança de múltiplos times e projetos dentro da empresa.",
      "Frequente comunicação com stakeholders para garantir o sucesso de cada projeto.",
      "Responsável pelo planejamento tático e estratégico (usando OKR) do time de desenvolvimento, asism como a implementação de metodologias e ações para melhorar a performance do time.",
      "Participação em code review e provimento de feedback para desenvolvedores do time.",
    ],
  },
  {
    title: "Full stack Developer",
    company_name: "Facilit Technollgia SA",
    icon: facilit,
    iconBg: "#E6DEDD",
    date: "November 2021 - Atualmente",
    points: [
      "Responsável pela implementação de importantes funcionalidades de front-end em uma plataforma SaaS que são usadas por dezenas de milhares de clientes diáriamente.",
      "Responsável pela análise de viabilidade e implementação de uma migração tecnológica de Angularjs para React.",
      "Liderando a implementação de design systems.",
      "Participação ativa no planejamento e desenvolvimento de funcionalidades.",
      "Refatoração de funcionalidades legadas, juntamente com novas interfaces e manutenção.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
    "Maike foi uma das lideranças mais servidoras, presentes e dedicadas com quem já tive o privilégio de trabalhar. Com muita dedicação, disciplina, postura e empatia, era visível a sua vontade de fazer mais e melhor sempre, recebendo feedbacks e buscando o desenvolvimento da empresa e das pessoas colaboradoras.",
    // "Maike was one of the most serving, present and dedicated leaders I've ever the pleasure to work with. Aside from standing as a strong technical leader, he was always available to help the team and other areas of the company. With a great dedication, discipline, and empathy we could see his commitment to always do his best for the company and the team.",
    name: "Sophia Latache",
    designation: "CEO",
    company: "CITi",
    image: soph,
    preposition: "no"
  },
  {
    testimonial:
      "Maike é uma pessoa extremamente dedicada em tudo que se propõe a fazer. Suas hard skills sempre foram fundamentais para impactar nos projetos que atuou no CITi. Destaco também suas soft skills, pois é uma pessoa muito empática e que tem sempre uma escuta ativa forte, buscando não apenas entender as dores das pessoas ao redor, mas também propondo ações que as ajudem a se desenvolver. Além disso, é uma grande inspiração minha no que diz respeito a gestão do tempo e organização, habilidades essas que o fazem se destacar como pessoa e profissional",
    name: "Jonailton Pereira",
    designation: "Gerente Financeiro",
    company: "CITi",
    image: jona,
    preposition: "no"
  },
  {
    testimonial:
      "Maike é uma pessoa dinamica, que tem otimo capacidade de resolução de problemas, além de simplificar processos de uma maneira muito inteligente e agil. É alguém que integra e dinamiza toda a equipe de uma maneira fantastica.",
    name: "Beatriz Cordeiro",
    designation: "Colega de trabalho",
    company: "CITi (trainee)",
    image: bea,
    preposition: "no"
  },
  {
    testimonial:
      "Maike foi capaz de melhorar grandemente a performance do nosso site e entregar o projeto no prazo e com grande qualidade.",
    name: "Karina Amaral",
    designation: "Doutora em Biologia Animal (Cliente)",
    company: "SBEQ",
    image: karina, 
    preposition: "na"
  },
];

const socialLinks = {
  github: {
      name: "github",
      link: "https://github.com/maikermenezes",
      icon: "github",
  },
  linkedin:
  {
      name: "linkedin",
      link: "https://www.linkedin.com/in/maike-menezes-1638ba17a/",
      icon: "linkedin",
  }
}

const projects = [
  {
    name: "Story Vision",
    description:
      "Uma aplicação web que cria uma história baseada em uma descrição fornecida pelo usuário, retornando um conjunto de trechos da história com imagens associadas com cada trecho. ",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "OpenAI API",
        color: "green-text-gradient",
      },
      {
        name: "scss",
        color: "pink-text-gradient",
      },
    ],
    image: storyVision,
    source_code_link: "https://github.com/maikermenezes/story-vision",
  },
  {
    name: "flAshI",
    description:
      "Uma aplicação focada no aprendizado de idiomas que cria automaticamente flashcards baseados em uma palavra fornecida e retorna cartões para cada significado da palavra e imagens para ilustrá-los.",
    tags: [
      {
        name: "react_native",
        color: "blue-text-gradient",
      },
      {
        name: "node",
        color: "green-text-gradient",
      },
      {
        name: "OpenAI_API",
        color: "pink-text-gradient",
      },
    ],
    image: flashi,
    source_code_link: "https://github.com/maikermenezes/cria-comp-autoral",
  },
  // {
  //   name: "Story Vision",
  //   description:
  //     "Uma aplicação web que cria uma história baseada em uma descrição fornecida pelo usuário, retornando um conjunto de trechos da história com imagens associadas com cada trecho. ",
  //   tags: [
  //     {
  //       name: "react",
  //       color: "blue-text-gradient",
  //     },
  //     {
  //       name: "OpenAI API",
  //       color: "green-text-gradient",
  //     },
  //     {
  //       name: "scss",
  //       color: "pink-text-gradient",
  //     },
  //   ],
  //   image: storyVision,
  //   source_code_link: "https://github.com/maikermenezes/story-vision",
  // },
  
];

const contactText = {
  title: "Contato",
  description: "Envie-me um email",
  name: "Seu nome",
  namePlaceholder: "Qual seu nome?",
  email: "Seu email",
  emailPlaceholder: "Qual seu email?",
  message: "Sua mensagem",
  messagePlaceholder: "O que gostaria de dizer?",
  send: "Enviar",
  sending: "Enviando...",
  sent: "Enviado!",
  error: "Erro ao enviar mensagem. Por favor, tente novamente",
  success: "Obrigado pelo seu contato. Responderei assim que possível!",
}

const profileText = {
  title: "Minha descrição",
  subtitle: "Perfil",
  description: "Eu sou um desenvolvedor habilidoso com experiência em Typescript e Javascript. Tenho paixão por criar experiências de usuário bonitas, funcionais e intuitivas. Tenho grande facilidade em aprender e estou sempre procurando expandir meu minhas habilidades. Colaboro de perto com os clientes para criar soluções eficientes, escaláveis e fáceis de usar que resolvem problemas reais. Vamos trabalhar juntos para dar vida às suas ideias",
}

const heroText = {
  title: "Oi, eu sou ",
  name: "Maike",
  text1: "Eu desenvolvo ",
  // text2: [ "aplicações web", "aplicativos mobile", "aplicações backend"], 
  text2: "aplicações web, aplicativos mobile e aplicações backend", 
  text3: "Clique para próxima seção",
}

const experiencesText = {
  title: "Experiência",
  subtitle: "O que eu fiz até agora",
}

const feedbackText = {
  title: "Depoimentos",
  subtitle: "O que as pessoas dizem sobre mim",
}

const projectsText = {
  title: "Projetos",
  subtitle: "Um pouco do meu trabalho",
  description: "Aqui etão alguns projetos pessoais que mostram minhas habilidades e experiências por meio da solução de problemas reais. Cada projeto tem o link para o repositório no GitHub e um link para a aplicação em produção, quando aplicável. Todos eles refletem minha habilidade de resolver problemas, experiências com diferentes tecnologias e minha paixão pelo constante aprendizado.",
}

const langs = {

}


/* 
I'm a skilled software developer with experience in Typescript and Javascript. 
I have a passion for creating beautiful, functional and intuitive user experiences.
 I'm a quick learner and I'm always looking to expand my skillset.
  I collaborate closely with clients to create effiecient, scalable, and user friendly solutions that solve real-world problems. 
  Let's work together to bring your ideas to life

*/


export { projectsText, services, technologies, experiences, testimonials, projects, contactText, langs, profileText, heroText, experiencesText, feedbackText };