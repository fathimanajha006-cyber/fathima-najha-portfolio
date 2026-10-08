export const portfolioData = {
  profile: {
    name: "Fathima Najha K",
    title: "Computer Science Engineer",
    role: "Creative Developer & Systems Enthusiast",
    callsign: "FATHIMA.OS",
    tagline: "Exploring technology, one system at a time.",
    subtagline: "Building ideas in code.",
    location: "Calicut, Kerala, India",
    institution: "AWH Engineering College, Kuttikkattoor",
    email: "fathimanajha006@gmail.com",
    github: "https://github.com/fathimanajha006-cyber",
    githubHandle: "fathimanajha006-cyber",
    linkedin: "https://linkedin.com/in/fathima-najha-37ab5132b",
    linkedinHandle: "fathima-najha-37ab5132b",
    summary:
      "Computer Science Engineering student and aspiring software/web developer with a passion for architecting resilient web platforms, algorithmic efficiency, and futuristic digital experiences.",
    interests: [
      { name: "Software Development", desc: "Core algorithms, clean architecture, backend microservices, and system performance.", tag: "SYS_CORE" },
      { name: "Web Development", desc: "Interactive full-stack web applications, responsive UIs, and real-time state synchronization.", tag: "WEB_ENG" },
      { name: "Creative Technology", desc: "WebGL, 3D interactive graphics, data visualization, and immersive human-computer interfaces.", tag: "CREATIVE_3D" }
    ],
    strengths: [
      { name: "Quick Learner", metric: "HIGH", detail: "Rapidly absorbs novel frameworks, paradigms, and system design patterns." },
      { name: "Problem Solving", metric: "ANALYTICAL", detail: "Deconstructs complex bottlenecks into modular, testable algorithmic steps." },
      { name: "Teamwork", metric: "COLLAB", detail: "Thrives in agile sprint teams, cross-functional hackathons, and peer code reviews." },
      { name: "Communication Skills", metric: "ARTICULATE", detail: "Clearly conveys architectural specs and documentation to technical and non-technical peers." },
      { name: "Adaptability", metric: "FLEXIBLE", detail: "Effortlessly navigates changing project scopes, tech stacks, and real-time demands." },
      { name: "Time Management", metric: "OPTIMIZED", detail: "Prioritizes milestones, sprint deliverables, and academic excellence with disciplined precision." }
    ],
    languages: [
      { name: "English", level: "Professional Working Proficiency", code: "ENG" },
      { name: "Malayalam", level: "Native / Mother Tongue", code: "MAL" },
      { name: "Hindi", level: "Working Fluency", code: "HIN" },
      { name: "Arabic", level: "Foundational & Reading Fluency", code: "ARA" }
    ]
  },

  projects: [
    {
      id: "agriqueue",
      title: "AGRIQUEUE",
      subtitle: "Smart Farm Procurement Management System",
      category: "Full-Stack & Agri-Tech AI",
      status: "PRODUCTION / HACKATHON READY",
      stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Python"],
      summary:
        "A hackathon-ready smart farm procurement system engineered to eradicate congestions, long waiting hours, and unnecessary travel for farmers at agricultural procurement centers.",
      features: [
        { title: "Smart Slot Booking", desc: "Farmers schedule arrival windows dynamically based on real-time center processing capacity." },
        { title: "Digital Token Engine", desc: "Generates tamper-proof QR tokens with live SMS/Web dispatch to verify farmer identity and cargo." },
        { title: "Live Queue Tracking", desc: "Real-time WebSocket queue monitoring so farmers only arrive when their batch is called." },
        { title: "Procurement Status Updates", desc: "Instant quality grading, weighing weighbridge data logs, and direct payment clearance status." },
        { title: "AI Demand Forecasting", desc: "Python-powered machine learning model forecasting seasonal mandi demand and storage saturation." }
      ],
      flowNodes: [
        { id: "farmer", label: "FARMER", sub: "User Access Point", color: "#00ffcc" },
        { id: "slot", label: "SLOT BOOKING", sub: "Capacity Balancer", color: "#38bdf8" },
        { id: "token", label: "DIGITAL TOKEN", sub: "Encrypted QR Pass", color: "#818cf8" },
        { id: "queue", label: "LIVE QUEUE", sub: "Real-time Telemetry", color: "#c084fc" },
        { id: "procure", label: "PROCUREMENT", sub: "Weighing & Quality", color: "#f43f5e" },
        { id: "forecast", label: "AI DEMAND FORECAST", sub: "Predictive Analytics", color: "#fbbf24" }
      ],
      metrics: {
        waitReduction: "74%",
        activeSlots: "1,420+",
        procurementAccuracy: "99.4%",
        mandiThroughput: "+3.2x"
      }
    },
    {
      id: "io-comparison",
      title: "I/O DATA TRANSFER COMPARISON",
      subtitle: "Computer Architecture & Systems Simulation",
      category: "Systems Engineering",
      status: "SIMULATION ENGINE",
      stack: ["C", "Computer Architecture", "Hardware Abstraction", "Systems Programming"],
      summary:
        "An interactive low-level computer architecture simulator visualizing and evaluating data transfer paradigms between CPU, Memory (RAM), and Peripheral I/O devices.",
      modes: [
        {
          id: "programmed",
          name: "PROGRAMMED I/O",
          tag: "POLLING / BUSY-WAIT",
          cpuLoad: "100%",
          transferSpeed: "Low (1.2 MB/s)",
          efficiency: "24%",
          desc: "The CPU repeatedly checks the status register in a tight polling loop until the device is ready. Wastes massive CPU cycles doing busy-waiting; every single byte must travel through CPU registers (Accumulator).",
          path: "I/O Device → CPU Accumulator → Memory (RAM)"
        },
        {
          id: "interrupt",
          name: "INTERRUPT-DRIVEN I/O",
          tag: "IRQ VECTORED",
          cpuLoad: "32%",
          transferSpeed: "Medium (4.8 MB/s)",
          efficiency: "68%",
          desc: "The CPU issues a read command and context-switches to execute other threads. When the I/O device is ready, it asserts an IRQ interrupt pin. CPU handles Interrupt Service Routine (ISR) to transfer byte, then resumes.",
          path: "I/O Device asserts IRQ → CPU Context Switch (ISR) → Memory"
        },
        {
          id: "dma",
          name: "DIRECT MEMORY ACCESS (DMA)",
          tag: "CYCLE STEALING / BURST",
          cpuLoad: "2%",
          transferSpeed: "Ultra High (48.0 MB/s)",
          efficiency: "98%",
          desc: "The CPU sets up the DMA Controller with base address and byte count, then yields bus control. The DMAC independently orchestrates high-speed burst block transfers directly between device and RAM without CPU bottleneck.",
          path: "I/O Device ⟷ DMA Controller ⟷ Memory (RAM) [CPU Unaffected]"
        }
      ],
      hardwareNodes: [
        { id: "cpu", label: "CPU CORE", spec: "Registers, ALU, Control Unit", color: "#00ffcc" },
        { id: "bus", label: "SYSTEM BUS", spec: "32-bit Address / Data / Control", color: "#38bdf8" },
        { id: "memory", label: "MAIN MEMORY", spec: "DDR RAM Storage Blocks", color: "#c084fc" },
        { id: "device", label: "I/O DEVICE", spec: "Disk / High-Speed Sensor", color: "#f43f5e" }
      ]
    }
  ],

  techLab: {
    categories: [
      { id: "all", label: "ALL MODULES" },
      { id: "programming", label: "LANGUAGES" },
      { id: "web", label: "WEB STACK" },
      { id: "tools", label: "DEV TOOLS" }
    ],
    skills: [
      {
        name: "C",
        category: "programming",
        type: "Language",
        color: "#3b82f6",
        badge: "SYS_LEVEL",
        desc: "Foundational low-level systems programming, pointers, memory allocation, struct architecture, and low-level I/O simulation algorithms.",
        keyConcepts: ["Pointers & Memory Management", "Data Structures", "System Calls", "Hardware Interfacing"]
      },
      {
        name: "Python",
        category: "programming",
        type: "Language",
        color: "#38bdf8",
        badge: "AI_AUTOMATION",
        desc: "Scripting, machine learning data pipelines, automated testing, predictive modeling in AgriQueue, and computational algorithms.",
        keyConcepts: ["Data Science & ML", "Automated Scripts", "NumPy & Pandas", "Backend Microservices"]
      },
      {
        name: "Java",
        category: "programming",
        type: "Language",
        color: "#f97316",
        badge: "OOP_CORE",
        desc: "Object-oriented software architecture, inheritance hierarchies, abstract classes, multi-threading, and enterprise software design patterns.",
        keyConcepts: ["OOP Principles", "JVM Architecture", "Collections Framework", "Exception Handling"]
      },
      {
        name: "JavaScript",
        category: "programming",
        type: "Language",
        color: "#eab308",
        badge: "FULL_STACK",
        desc: "Modern ES6+ asynchronous programming, event loops, DOM manipulation, interactive 3D WebGL integration, and client-server synchronization.",
        keyConcepts: ["Async / Await & Promises", "Closures & Prototypes", "DOM APIs", "Event-Driven Engine"]
      },
      {
        name: "HTML5",
        category: "web",
        type: "Web Tech",
        color: "#f43f5e",
        badge: "MARKUP",
        desc: "Semantic document architecture, canvas rendering context, audio/video APIs, accessibility standards (ARIA), and SEO best practices.",
        keyConcepts: ["Semantic DOM", "Canvas 2D/3D Context", "Web Components", "A11y Standards"]
      },
      {
        name: "CSS3",
        category: "web",
        type: "Web Tech",
        color: "#06b6d4",
        badge: "STYLING",
        desc: "Advanced responsive layouts, CSS Grid, Flexbox, hardware-accelerated animations, custom cyber themes, and viewport media queries.",
        keyConcepts: ["CSS Grid & Flexbox", "Keyframe Animations", "Custom Properties (Vars)", "Cyber Glassmorphism"]
      },
      {
        name: "React.js",
        category: "web",
        type: "Web Tech",
        color: "#22d3ee",
        badge: "FRONTEND",
        desc: "Declarative component-driven interfaces, custom React hooks, state management, virtual DOM reconciliation, and interactive single-page architectures.",
        keyConcepts: ["Functional Components", "Custom Hooks", "State Management", "Component Lifecycles"]
      },
      {
        name: "Node.js & Express",
        category: "web",
        type: "Web Tech",
        color: "#10b981",
        badge: "BACKEND",
        desc: "Event-driven asynchronous backend servers, RESTful API architecture, routing middleware, authentication, and database connectivity.",
        keyConcepts: ["Express Middleware", "RESTful Endpoints", "Non-blocking I/O", "JSON Token Auth"]
      },
      {
        name: "GitHub",
        category: "tools",
        type: "Developer Tool",
        color: "#a855f7",
        badge: "VCS",
        desc: "Distributed version control, branch management, merge conflict resolution, pull request collaboration, and project repository governance.",
        keyConcepts: ["Git Flow & Branching", "Merge & Rebase", "Pull Requests", "CI/CD Actions"]
      },
      {
        name: "VS Code",
        category: "tools",
        type: "Developer Tool",
        color: "#0284c7",
        badge: "IDE",
        desc: "High-productivity coding environment, integrated terminal, multi-target debugging, linting suites, and custom developer workflows.",
        keyConcepts: ["Debugging Suite", "IntelliSense", "Task Automation", "Workspace Configs"]
      },
      {
        name: "Microsoft Office",
        category: "tools",
        type: "Productivity",
        color: "#dc2626",
        badge: "DOCUMENTATION",
        desc: "Technical engineering reporting, structured data analysis, research slide presentations, and academic documentation publishing.",
        keyConcepts: ["Technical Reports", "Data Modeling in Excel", "Slide Decks", "System Schematics"]
      }
    ]
  },

  experience: [
    {
      company: "JHF IT Innovation Pvt Ltd",
      role: "COGNI LEARN — Intern",
      period: "Present / Active",
      location: "India",
      type: "Internship",
      color: "#00ffcc",
      desc: "Gaining hands-on practical exposure and industry-oriented experience in software development lifecycles, enterprise engineering methodologies, and real-world system deployments.",
      highlights: [
        "Collaborated on software engineering workflows and industry coding standards",
        "Engaged in technical problem solving, agile sprints, and module prototyping",
        "Enhanced knowledge of full-stack delivery and client requirements mapping"
      ]
    },
    {
      company: "Genzee Technologies LLP",
      role: "APP DEVELOPMENT INTERN",
      period: "June 2025",
      location: "India",
      type: "Internship",
      color: "#38bdf8",
      desc: "Immersive mobile and web application development internship focusing on practical app development sessions, mobile architecture, and modern industry workflows.",
      highlights: [
        "Participated in rigorous app development training and hands-on coding practicals",
        "Mastered mobile application architectural paradigms and interactive UI layouts",
        "Adopted industry best practices for modular code structure and state management",
        "Accelerated technical analytical capabilities and real-time debugging efficiency"
      ]
    }
  ],

  achievements: [
    {
      id: "sih-2026",
      title: "SMART INDIA INTERNAL HACKATHON 2026",
      award: "3RD PRIZE",
      institution: "AWH Engineering College",
      year: "2026",
      color: "#f59e0b",
      badgeType: "GOLD TROPHY",
      desc: "Secured 3rd Prize in the competitive internal college edition of Smart India Hackathon 2026, building and pitching an innovative technological solution evaluated on innovation, architectural feasibility, and societal impact."
    },
    {
      id: "tink-her-hack",
      title: "TINK-HER-HACK 3.0 WOMEN'S HACKATHON",
      award: "Participant & Prototyper",
      institution: "IEDC, AWH Engineering College",
      year: "2024",
      color: "#ec4899",
      badgeType: "HACKATHON BADGE",
      desc: "Active participant in the premier Tink-Her-Hack 3.0 Women's Hackathon organized by IEDC, designing and pitching collaborative creative technology solutions under rapid sprint constraints."
    }
  ],

  certifications: [
    {
      id: "cert-genzee-app",
      title: "App Development Intern Certificate",
      issuer: "Genzee Technologies LLP",
      year: "2025",
      type: "Internship Certification",
      color: "#00ffcc"
    },
    {
      id: "cert-tink-her",
      title: "Tink-Her-Hack 3.0 Certificate",
      issuer: "IEDC, AWH Engineering College",
      year: "2024",
      type: "Hackathon Credential",
      color: "#ec4899"
    },
    {
      id: "cert-quiz-flutter",
      title: "National Level Technical Quiz – App Development (Flutter)",
      issuer: "Genzee Technologies",
      year: "2025",
      type: "National Level Assessment",
      color: "#38bdf8"
    },
    {
      id: "cert-github",
      title: "Intro to GitHub Workshop",
      issuer: "IEDC AWH",
      year: "2024",
      type: "Technical Workshop",
      color: "#a855f7"
    },
    {
      id: "cert-level-up-ai",
      title: "Level Up With AI Workshop",
      issuer: "IEEE Student Branch AWH",
      year: "2024",
      type: "AI & Innovation Training",
      color: "#10b981"
    },
    {
      id: "cert-figma",
      title: "Figma Poster Design Workshop",
      issuer: "IEDC AWH",
      year: "2024",
      type: "Design & UX Workshop",
      color: "#f43f5e"
    },
    {
      id: "cert-career-orientation",
      title: "Career Options and Industry Orientation for Engineers",
      issuer: "Genzee Technologies",
      year: "2025",
      type: "Industry Immersion",
      color: "#eab308"
    },
    {
      id: "cert-build-genai",
      title: "AI for Students: Build Your Own Generative AI Model",
      issuer: "AI Educational Initiative",
      year: "2025",
      type: "Generative AI Workshop",
      color: "#06b6d4"
    },
    {
      id: "cert-ipr-infra",
      title: "Workshop on Powering AI with Modern Infrastructure",
      issuer: "IPR Solution Limited",
      year: "10 Sep 2026",
      type: "Enterprise Infrastructure Workshop",
      color: "#6366f1"
    }
  ],

  education: [
    {
      degree: "B.Tech in Computer Science & Engineering",
      institution: "AWH Engineering College, Kuttikkattoor, Calicut",
      university: "APJ Abdul Kalam Technological University (KTU)",
      period: "2025 – 2028",
      score: "CGPA: 7.41 / 10",
      status: "Currently Pursuing",
      color: "#00ffcc",
      highlights: [
        "Core focus on Data Structures, Algorithms, Operating Systems, Database Management Systems, and Software Engineering",
        "Active member of IEDC and technical event organizer",
        "Hands-on hackathon projects and engineering laboratory excellence"
      ]
    },
    {
      degree: "Higher Secondary Education (+2)",
      institution: "Sevamandir Post Basic HSS, Ramanattukara",
      period: "2022 – 2024",
      score: "96%",
      status: "Completed with High Distinction",
      color: "#38bdf8",
      highlights: [
        "Science & Mathematics Stream",
        "Achieved outstanding 96% academic record with consistent honors",
        "Built solid foundations in analytical mathematics and scientific logic"
      ]
    },
    {
      degree: "Secondary School Leaving Certificate (10th)",
      institution: "Sevamandir Post Basic HSS",
      period: "Completed",
      score: "98%",
      status: "Completed with High Honors",
      color: "#a855f7",
      highlights: [
        "Achieved extraordinary 98% distinction",
        "Active leadership in school co-curricular clubs and science exhibitions"
      ]
    }
  ],

  districts: [
    { id: "explore", label: "EXPLORE", name: "CITY OVERVIEW", subtitle: "Orbit the 3D Metropolis", icon: "Compass" },
    { id: "identity", label: "IDENTITY", name: "DIGITAL IDENTITY", subtitle: "Holographic Persona Dossier", icon: "User" },
    { id: "projects", label: "PROJECTS", name: "PROJECT DISTRICT", subtitle: "Interactive Systems & Sims", icon: "Code2" },
    { id: "lab", label: "TECH LAB", name: "TECH LAB", subtitle: "Holographic Skill Matrix", icon: "Cpu" },
    { id: "experience", label: "EXPERIENCE", name: "EXPERIENCE TOWER", subtitle: "Career & Internships", icon: "Briefcase" },
    { id: "vault", label: "VAULT", name: "ACHIEVEMENT VAULT", subtitle: "Trophies & Credentials", icon: "Trophy" },
    { id: "archive", label: "ARCHIVE", name: "EDUCATION ARCHIVE", subtitle: "Academic Transcripts", icon: "GraduationCap" },
    { id: "terminal", label: "TERMINAL", name: "COMMUNICATION TERMINAL", subtitle: "Encrypted Transmission", icon: "Radio" }
  ]
};
