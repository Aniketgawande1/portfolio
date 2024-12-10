import {
  algorithms,
  devnotes,
  oscs,
  landing,
  news,
  wheather,
} from "../assets";

export const navLinks = [
  {
    id: "hero",
    title: "Hero",
  },
  {
    id: "portfolio",
    title: "Portfolio",
  },
  {
    id: "experience",
    title: "Experience",
  },
  // {
  //   id: "contact",
  //   title: "Contact",
  // },
];

const experiences = [
  {
    title: "Linux operating os",
    date: "2024 present",
    details: [
      "<span style='color: white;'>I have experience with Ubuntu Linux OS, proficient in using command-line operations, file management, and system configuration. I am familiar with package management tools like APT, and I have worked with networking, troubleshooting, and software installation in Ubuntu environments.</span>"
    ],
  },
  {
    title: "Postman API",
    date: "2024 present",
    details: [" <span style='color: white;'>I am certified in Postman API, demonstrating my proficiency in API testing, development, automation, and workflow management. This certification validates my ability to efficiently design, test, and optimize APIs, ensuring seamless backend integration and smooth communication between systems. </span>"
      
    ],
  },
];

const portfolio = [
  {
    name: "Github  Repo",
    description:
      "My GitHub repository showcases my skills in coding, development projects, and problem-solving, demonstrating my expertise in various technologies.",
    image: oscs,
  },
  {
    name: "Amazon clone",
    description:
      "An Amazon clone is an e-commerce platform replica with product browsing, cart, search, authentication, and payment features using modern technologie.",
    image: devnotes,
  },
  {
    name: "Visually Understanding Algorithms",
    description:
      "This CSS creates a clean card design with a subtle black shadow, adding depth and an interactive hover effect",
    image: algorithms,
  },
  {
    name: "News App Using the React and news API",
    description:
      "A news app delivers real-time news updates, categories, and personalized content using APIs, featuring a user-friendly design and responsive interface.",
    image: news,
  },
  {
    name: "Wheather App Using The Wheather API",
    description:
      "A weather app provides real-time weather updates, forecasts, temperature, humidity, and location-based weather conditions using APIs and modern design.",
    image: wheather,
  },
  {
    name: "Using the Basic Web Dev landing Page",
    description:
      "A responsive landing page using HTML, CSS, and JavaScript featuring a hero section, navigation, animations, and a modern design",
    image: landing,
  },
];

export { experiences, portfolio };

