export const personalInfo = {
  name: "Reeti Singh",
  tagline: "Automating the boring stuff so humans can do the creative stuff.",
  role: "Full-Stack Dev & Open-Source Advocate",
  shortBio: "I build things that make messy systems elegant. Final year B.Tech in Computer Science & Engineering at United Institute of Technology, Prayagraj.",
  email: "reetisingh861@gmail.com",
  phone: "+91 82713 77005",
  socials: {
    linkedin: "https://www.linkedin.com/in/reeti-singh-09748b291",
    github: "https://github.com/Reeti14",
    instagram: "https://www.instagram.com/__reetiiii?igsh=OWY4M3ZhY2p0N2Ru&utm_source=qr",
    wikimedia: "https://en.wikipedia.org/wiki/User:ReetiSingh14",
    phabricator: "https://phabricator.wikimedia.org/p/Reeti/",
    gerrit: "https://gerrit.wikimedia.org/r/q/reeti",
  }
};

export const experiences = [
  {
    id: "vetro",
    role: "Full-Stack SWE Intern",
    company: "VETRO GLOBALEDGE LLP",
    date: "Feb 2025 — Present",
    problem: "Warehouse logistics were plagued by manual tracking and inefficient SKU routing, leading to delayed fulfillment.",
    approach: "I containerized the entire WMS (Warehouse Management System) backend using Docker, standardizing the deployment environment. Then, I developed an automated SKU routing algorithm.",
    impact: "Delivered a robust automated SKU routing system that significantly streamlined warehouse logistics and reduced manual entry errors.",
    metrics: ["Docker Containerization", "Automated Routing"]
  },
  {
    id: "oki",
    role: "Research Intern",
    company: "Open Knowledge Initiatives, IIIT Hyderabad",
    date: "May 2025 — Jun 2025",
    problem: "Digitizing old manuscripts and documents was a heavily manual, time-consuming process prone to human error.",
    approach: "I engineered a custom Python pipeline integrating Google Vision AI for advanced OCR (Optical Character Recognition) capabilities, tailored for historical texts.",
    impact: "The new pipeline cut digitization time by an impressive 60%, allowing researchers to access text data much faster.",
    metrics: ["60% Faster Digitization", "Google Vision AI"]
  },
  {
    id: "wikimedia",
    role: "Open Source Engineer",
    company: "Wikimedia Foundation",
    date: "Feb 2025 — Present",
    problem: "MediaWiki's massive global ecosystem relies on continuous community contributions, but new developers often struggle with complex legacy systems.",
    approach: "I dove into the codebase, contributing technical patches via Gerrit and tracking bugs in Phabricator. I also focused on improving internationalization (i18n) technical documentation.",
    impact: "Authored i18n docs merged into MediaWiki core (cited in FY25-26 Language Usability Annual Summary) and maintained an 88% patch acceptance rate.",
    metrics: ["88% Acceptance Rate", "8/10 Tasks Merged"]
  },
  {
    id: "ping",
    role: "Automation Intern",
    company: "PING Networks",
    date: "Aug 2024 — Oct 2024",
    problem: "Recruitment teams were spending hours manually compiling and formatting applicant data into daily reports.",
    approach: "I built automated ETL (Extract, Transform, Load) pipelines using Python to gather data, clean it, and automatically generate formatted reports.",
    impact: "Reduced recruitment reporting time by 40%, freeing up the HR team to focus on interviewing rather than data entry.",
    metrics: ["40% Time Saved", "Python ETL"]
  }
];

export const projects = [
  {
    id: "link2logistics",
    title: "Link2Logistics",
    description: "A real-time logistics dashboard providing live tracking, fleet management, and dynamic route optimization for delivery operations.",
    tech: ["Next.js", "Firebase", "Tailwind CSS"],
    link: "https://www.link2logistics.com/",
    github: null
  },
  {
    id: "sentiment",
    title: "Sentiment Analysis Classifier",
    description: "An NLP-based machine learning model utilizing Naive Bayes to classify textual sentiment with high accuracy, designed for social media monitoring.",
    tech: ["Python", "NLP", "Naive Bayes"],
    link: null,
    github: "#" 
  },
  {
    id: "canecare",
    title: "CaneCare",
    description: "A CNN-powered disease detector for sugarcane crops. Uses a custom image classification pipeline built with TensorFlow and Keras to identify early signs of crop blight.",
    tech: ["TensorFlow", "Keras", "CNN"],
    link: null,
    github: "https://github.com/Reeti14/canecare"
  }
];

export const openSourceData = {
  quote: "For me, technology has never just been about writing code in isolation; it is about the people you build it with. My journey is deeply rooted in open-source philosophy and grassroots community building.",
  stats: [
    { label: "Acceptance Rate", value: 88, suffix: "%" },
    { label: "Tasks Merged", value: 8, suffix: "/10" },
    { label: "Core Repos", value: 6, suffix: "" },
    { label: "Global Edits", value: 1000, suffix: "+" },
  ],
  highlights: [
    "Authored i18n docs merged into MediaWiki core — cited in FY25-26 Language Usability Annual Summary",
    "88% patch acceptance rate across multiple core repositories",
    "1000+ edits globally on Wikimedia projects",
    "8 tasks merged out of 10 in different core and famous repos",
  ],
  handles: [
    {
      name: "Wikimedia",
      url: "https://en.wikipedia.org/wiki/User:ReetiSingh14",
      icon: "wikimedia",
    },
    {
      name: "Phabricator",
      url: "https://phabricator.wikimedia.org/p/Reeti/",
      icon: "phabricator",
    },
    {
      name: "Gerrit",
      url: "https://gerrit.wikimedia.org/r/q/reeti",
      icon: "gerrit",
    },
  ],
  roles: [
    {
      title: "Core Member",
      org: "GDG Prayagraj",
      desc: "Orchestrating regional initiatives, guiding strategic direction, and managing local tech ecosystem events."
    },
    {
      title: "Community Lead",
      org: "Women in Tech",
      desc: "Creating empowering environments where female developers can learn, network, and confidently thrive."
    },
    {
      title: "Envoy",
      org: "WikiClub Tech India",
      desc: "Bridging the gap between students and open-source opportunities, organized Wikipedia's 25th Birthday celebration."
    },
    {
      title: "Facilitator",
      org: "TFUG Prayagraj",
      desc: "Facilitating technical study jams for the local TensorFlow User Group."
    },
    {
      title: "Core Team Media",
      org: "TEDxUIT",
      desc: "Managed media and technical initiatives for the campus TEDx event."
    },
    {
      title: "Contributor",
      org: "Varanasi Documentation",
      desc: "Curated and uploaded media to open repositories during a photo walk at Ramnagar Fort."
    }
  ]
};
