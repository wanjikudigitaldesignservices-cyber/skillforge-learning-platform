export const initialCourses = [
  {
    id: "COURSE-301",
    title: "Full-Stack AI Engineering & Agentic Workflow Systems",
    tutor: "Dr. Ethan Mwangi",
    tutorRole: "Senior AI Systems Architect",
    tutorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    category: "AI & Software Engineering",
    rating: 4.9,
    studentsCount: 3820,
    price: 89,
    subscriptionTier: "Pro All-Access",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    description: "Master autonomous AI agents, tool routing, LangChain, MCP server construction, and enterprise LLM production deployments.",
    lessons: [
      {
        id: "L-1",
        title: "1. Introduction to Agentic LLM Architectures",
        duration: "18:40",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        summary: "Understand autonomous agent loops, sensory memory, tool calling protocols and error recovery mechanisms."
      },
      {
        id: "L-2",
        title: "2. Constructing Custom MCP Protocol Servers",
        duration: "24:15",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        summary: "Build JSON-RPC over STDIO and SSE servers to expose databases and APIs to AI agents."
      },
      {
        id: "L-3",
        title: "3. Vector Indexing, Hybrid Search & RAG Pipelines",
        duration: "31:00",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        summary: "Embeddings, chunking algorithms, reranking filters, and metadata filtering in production."
      }
    ],
    materials: [
      { name: "Fullstack_AI_Agent_Blueprint_2026.pdf", size: "14.2 MB", type: "PDF Guide" },
      { name: "MCP_Server_Starter_Boilerplate.zip", size: "3.8 MB", type: "Source Code" },
      { name: "Enterprise_Vector_Search_Cheatsheet.pdf", size: "2.1 MB", type: "Cheatsheet" }
    ],
    quiz: {
      title: "Module 1 Mastery Certification Quiz",
      questions: [
        {
          id: "Q1",
          question: "What is the primary function of the Model Context Protocol (MCP)?",
          options: [
            "A protocol for standardized communication between AI models and local/remote tool servers",
            "A replacement for SQL queries in relational databases",
            "A JavaScript framework for frontend web rendering",
            "A CSS library for styling responsive interfaces"
          ],
          correct: 0,
          explanation: "MCP provides an open, standardized specification for connecting LLMs to external data sources and execution tools seamlessly."
        },
        {
          id: "Q2",
          question: "Why is semantic chunking preferred over fixed-token chunking in enterprise RAG?",
          options: [
            "It saves GPU memory during model training",
            "It preserves sentence boundaries and cohesive thoughts across passages",
            "It eliminates the need for vector embeddings entirely",
            "It only works on English language documents"
          ],
          correct: 1,
          explanation: "Semantic chunking respects conceptual units, preventing critical contextual meaning from being cut off arbitrarily mid-sentence."
        }
      ]
    }
  },
  {
    id: "COURSE-302",
    title: "Modern React 19, Next.js & Server Action Masterclass",
    tutor: "Sarah Chebet",
    tutorRole: "Principal Frontend Engineer",
    tutorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    category: "Web Development",
    rating: 4.85,
    studentsCount: 5210,
    price: 69,
    subscriptionTier: "Pro All-Access",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
    description: "Deep dive into React 19 hooks (useActionState, useOptimistic), streaming SSR, React Compiler, and zero-runtime Tailwind CSS v4 styling.",
    lessons: [
      {
        id: "L-201",
        title: "1. React 19 Foundations & New Compiler Deep Dive",
        duration: "21:30",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        summary: "Discover how React Compiler eliminates manual useMemo and useCallback hooks forever."
      },
      {
        id: "L-202",
        title: "2. Server Actions, Optimistic UI & Form Handling",
        duration: "28:45",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        summary: "Handling mutation states natively without heavyweight external state machines."
      }
    ],
    materials: [
      { name: "React19_Migration_Roadmap.pdf", size: "8.5 MB", type: "PDF Guide" },
      { name: "NextJS_Production_Boilerplate.zip", size: "5.4 MB", type: "Source Code" }
    ],
    quiz: {
      title: "React 19 & Next.js Architecture Quiz",
      questions: [
        {
          id: "RQ1",
          question: "What is the key benefit of React 19's useOptimistic hook?",
          options: [
            "It allows the UI to immediately reflect user interactions before server confirmation",
            "It automatically compiles TypeScript to WebAssembly",
            "It caches HTTP requests directly in the browser cookie",
            "It replaces the DOM with virtual WebGL canvas"
          ],
          correct: 0,
          explanation: "useOptimistic lets developers render anticipated server state immediately for instant perceived performance."
        }
      ]
    }
  },
  {
    id: "COURSE-303",
    title: "Cloud Native Microservices with Kubernetes & Go",
    tutor: "Victor Kiprono",
    tutorRole: "Cloud Platform Lead at CloudForge",
    tutorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    category: "DevOps & Cloud",
    rating: 4.95,
    studentsCount: 2640,
    price: 99,
    subscriptionTier: "Pro All-Access",
    thumbnail: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=800&q=80",
    description: "Architect ultra-resilient distributed services using Go, gRPC, Docker, Helm charts, and production Kubernetes clusters.",
    lessons: [
      {
        id: "L-301",
        title: "1. High Performance Go Microservice Architecture",
        duration: "25:10",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
        summary: "Concurrency patterns, worker pools, channels, and zero-allocation serialization."
      }
    ],
    materials: [
      { name: "Kubernetes_Production_Runbook.pdf", size: "11.2 MB", type: "PDF Guide" },
      { name: "Go_gRPC_Microservices_Kit.zip", size: "6.9 MB", type: "Source Code" }
    ],
    quiz: {
      title: "Distributed Systems & K8s Assessment",
      questions: [
        {
          id: "KQ1",
          question: "Which Kubernetes object provides load balancing and stable network identity across dynamic pods?",
          options: [
            "Kubernetes Service",
            "ConfigMap",
            "PersistentVolumeClaim",
            "DaemonSet"
          ],
          correct: 0,
          explanation: "A Service defines a logical set of pods and a policy by which to access them, acting as an internal load balancer."
        }
      ]
    }
  }
];

export const initialTutorEarnings = {
  totalRevenue: 41250,
  monthlyRecurring: 12480,
  activeSubscribers: 1420,
  payoutStatus: "Ready for Settlement",
  topPerformingCourse: "Full-Stack AI Engineering & Agentic Workflow Systems",
  recentSales: [
    { id: "ORD-991", student: "Kevin Maina", course: "Full-Stack AI Engineering", amount: 89, date: "2026-10-18" },
    { id: "ORD-990", student: "Beatrice Wanjiru", course: "Monthly All-Access Pass", amount: 29, date: "2026-10-18" },
    { id: "ORD-989", student: "Daniel Kiptoo", course: "Modern React 19 Masterclass", amount: 69, date: "2026-10-17" },
    { id: "ORD-988", student: "Grace Ndung'u", course: "Monthly All-Access Pass", amount: 29, date: "2026-10-17" }
  ]
};
