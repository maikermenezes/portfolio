import {
    mobile,
    backend,
    creator,
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
    meta,
    starbucks,
    tesla,
    shopify,
    storyVision,
    flashi,
    threejs,
  } from "../assets";
  
  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "experience",
      title: "experience",
    },
    {
      id: "work",
      title: "Work",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];
  
  const services = [
    {
      title: "Web Developer",
      icon: web,
    },
    {
      title: "React Native Developer",
      icon: mobile,
    },
    {
      title: "Backend Developer",
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
      title: "Front-end Developer",
      company_name: "Seed a Bit (junior enterprise)",
      icon: starbucks,
      iconBg: "#383E56",
      date: "November 2020 - September 2021",
      points: [
        "Developing and maintaining web applications vanilla JS and other related technologies.",
        "Collaborating with cross-functional teams including designers, product managers, and other developers using Scrum.",
        "Implementing responsive design.",
        "Participating in code reviews and providing constructive feedback to other developers.",
      ],
    },
    {
      title: "Web Developer Intern",
      company_name: "Facilit Technollgia SA",
      icon: tesla,
      iconBg: "#E6DEDD",
      date: "April 2021 - October 2021",
      points: [
        "Developing and maintaining a SaaS platform using Angularjs, JQuery, Java ,and other related technologies.",
        "Responsible for some front-end implementations of new features.",
        "Implementing responsive design and ensuring cross-browser compatibility.",
        "Providing documentation for workflow and processes."
      ],
    },
    {
      title: "Full stack Developer",
      company_name: "CITi (junior enterprise)",
      icon: meta,
      iconBg: "#E6DEDD",
      date: "Dec 2021 - Dec 2022",
      points: [
        "Developing projects for various clients following the best practices of software development and using latest technologies.",
        "Working alongside teams from other companies to develop projects.",
        "Active participation in project viability analysis and negociation with clients.",
        "Participating in code reviews and providing constructive feedback to other developers.",
        "Providing documentation for workflow and processes.",
        "Contributed to the development of a new internal learning platform."
      ],
    },
    {
      title: "Tech Lead",
      company_name: "CITi (junior enterprise)",
      icon: meta,
      iconBg: "#E6DEDD",
      date: "Jan 2023 - June 2023",
      points: [
        "Responsible for providing proper training to new members of the team.",
        "Leading multiple projects and teams.",
        "Frequently communicating with stakeholders to ensure project success.",
        "Leading strategic and tactical planning (using OKR) and implementation of methodologies and actions to improve the teams' performance.",
        "Participating in code reviews and providing constructive feedback to other developers.",
      ],
    },
    {
      title: "Full stack Developer",
      company_name: "Facilit Technollgia SA",
      icon: shopify,
      iconBg: "#383E56",
      date: "November 2021 - Present",
      points: [
        "Responsible for major front-end implementations of new features that are used by thousands of users on a daily basis.",
        "In charge of the analysis and implementation of a technological migration from Angularjs to Reactjs.",
        "Leading the implementation of a new design system.",
        "Active participation in planning and feature development.",
        "Responsible for refactoring old features alongside a new interface and fixing bugs.",
      ],
    },
  ];
  
  const testimonials = [
    {
      testimonial:
      "Maike was one of the most serving, present and dedicated leaders I've ever the pleasure to work with. With a great dedication, discipline, and empathy we could see his commitment to always do his best for the company and the team.",
      // "Maike was one of the most serving, present and dedicated leaders I've ever the pleasure to work with. Aside from standing as a strong technical leader, he was always available to help the team and other areas of the company. With a great dedication, discipline, and empathy we could see his commitment to always do his best for the company and the team.",
      name: "Sophia Latache",
      designation: "CEO",
      company: "CITi",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      testimonial:
        "Maike is a very dynamic person with great problem solving skills and capable of inteligently simplifying complex processes.",
      name: "Beatriz Cordeiro",
      designation: "Co-worker",
      company: "CITi (trainee)",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      testimonial:
        "Maike was able to substantially improve the performance of our website and delived the project on time with amazing quality.",
      name: "Karina Amaral",
      designation: "Animal Biology Doctor (Client)",
      company: "SBEQ",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
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
        "Web application that creates a story based on a descriptions provided by the user and returns a set of images that represent the story with the corresponding text.",
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
        "Web application focused on language learning that automaticly creates flashcards based on a word provided and returns cards for each meaning of the word and images to illustrate them.",
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
    {
      name: "Story Vision",
      description:
        "Web application that creates a story based on a descriptions provided by the user and returns a set of images that represent the story with the corresponding text.",
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
    
  ];
  
  export { services, technologies, experiences, testimonials, projects };