export type Tone = "emerald" | "cyan" | "amber" | "slate";

export type ProjectLink = {
  label: string;
  href: string;
  kind: "github" | "live" | "npm" | "docs" | "article";
};

export type Project = {
  name: string;
  shortDescription: string;
  longDescription: string;
  stage: string;
  stageTone: Tone;
  demoState: string;
  maturity: string;
  role: string;
  nextStep: string;
  updatedAt: string;
  featured: boolean;
  tags: string[];
  links: ProjectLink[];
  evidence: string[];
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type Certificate = {
  title: string;
  platform: string;
  issuer: string;
  completedAt: string;
  duration: string;
};

export type ContactItem = {
  label: string;
  value: string;
  href: string;
  kind: "email" | "github" | "linkedin" | "location";
  external: boolean;
};

export type ProcessStep = {
  command: string;
  title: string;
  description: string;
  output: string;
};

export type Article = {
  title: string;
  href: string;
  source: "dev.to";
  publishedAt: string;
  topic: string;
  note: string;
};

export type GrowthTone = "active" | "queued" | "continuous";

export type GrowthItem = {
  title: string;
  status: string;
  statusTone: GrowthTone;
  description: string;
};

export type Principle = {
  title: string;
  description: string;
};

export const profile = {
  name: "Tuncay Ölmez",
  siteName: "setrathex.com.tr",
  title: "Yazılım Geliştirici Stajyer Adayı",
  statusBadge: "Staj ve proje iş birliklerine açık",
  location: "Samsun, Türkiye",
  education:
    "Ondokuz Mayıs Üniversitesi Bilgisayar Programcılığı 1. sınıf öğrencisi",
  expectedGraduation: "2027",
  gpa: "3.13",
  gpaScale: "GPA / 4.00",
  heroSummary:
    "Web uygulamaları, geliştirici araçları ve Python otomasyon projeleri geliştiriyorum. Projelerde kapsamı net tutmaya, test etmeye, dokümante etmeye ve neyin gerçekten çalıştığını açık göstermeye odaklanıyorum.",
  positioning: {
    label: "Yazılım geliştirici stajyer adayı",
    statement:
      "Fikirleri küçük fazlara bölüp test edilebilir çıktılara dönüştürmeye odaklanıyorum.",
    focus: "web · CLI araçları · otomasyon",
  },
  about: [
    "OMÜ Bilgisayar Programcılığı öğrencisiyim. Web, geliştirici araçları ve otomasyon projeleri üzerine çalışıyorum.",
    "Projelerimde fikir aşamasından çalışan prototipe kadar kapsam çıkarma, modüllere bölme, test etme ve dokümante etme sürecine odaklanıyorum.",
    "Şu anda next-secure-check'i yayınlanabilir bir CLI aracına dönüştürmeye, mevcut projelerimi yayına almaya ve SQL, algoritma, debugging temellerimi güçlendirmeye çalışıyorum.",
  ],
  principles: [
    {
      title: "Açık durum",
      description:
        "Her projede çalışan, geliştirilmekte olan ve planlanan kısımları ayrı gösteriyorum.",
    },
    {
      title: "Test ve dokümantasyon",
      description:
        "README, progress notları, test çıktıları ve sıradaki adımı görünür tutuyorum.",
    },
    {
      title: "Gelişim odağı",
      description:
        "SQL, algoritma, debugging ve test yazma becerilerimi projeler üzerinden güçlendiriyorum.",
    },
  ] satisfies Principle[],
  cv: {
    tr: {
      label: "Özgeçmiş (TR)",
      fileName: "tuncay-olmez-cv-tr.pdf",
      href: "/cv/tuncay-olmez-cv-tr.pdf",
    },
    en: {
      label: "Resume (EN)",
      fileName: "tuncay-olmez-cv-en.pdf",
      href: "/cv/tuncay-olmez-cv-en.pdf",
    },
  },
  terminalDemo: {
    command: "focus --web --cli --automation",
    output: "Çalışan Modül · Test · Dokümantasyon",
  },
} as const;

export const processSteps: ProcessStep[] = [
  {
    command: "araştırma",
    title: "Araştırma",
    description:
      "Bilmediğim teknik konuları çıkarır, farklı AI modelleriyle alternatif çözüm yollarını tartışırım.",
    output: "Riskler · Varsayımlar · Öğrenilecek Konular",
  },
  {
    command: "prd",
    title: "PRD",
    description:
      "Hedef kullanıcıyı, MVP kapsamını, non-goal'ları ve kabul kriterlerini tek dokümanda toplarım.",
    output: "MVP · Kapsam Dışı · Kabul Kriterleri",
  },
  {
    command: "yol haritası",
    title: "Yol Haritası",
    description:
      "PRD'yi fazlara böler; her faz için test, doğrulama ve çıkış kapısı belirlerim.",
    output: "Faz Planı · Test Planı · Çıkış Kapıları",
  },
  {
    command: "uygulama",
    title: "Uygulama & Test",
    description:
      "Her fazı ayrı uygular, test eder, çıkan hataları progress/README notlarıyla takip ederim.",
    output: "Çalışan Modül · Testler · Sıradaki Adım",
  },
];

export const projects: Project[] = [
  {
    name: "next-secure-check",
    shortDescription:
      "Next.js projelerinde yaygın güvenlik hatalarını deterministik kural motoru ile tarayan açık kaynak CLI aracı.",
    longDescription:
      ".env sızıntısı, hardcoded secret, unsafe API route, rate limit eksikleri, XSS riski ve security header kontrolleri içerir.",
    stage: "CLI MVP",
    stageTone: "emerald",
    demoState: "npm yayını bekliyor",
    maturity: "Çalışan CLI MVP",
    role: "Ürün kapsamı, kural seti tasarımı, CLI akışı, test ve dokümantasyon",
    nextStep: "npm Yayını · Örnek Tarama Raporu · Kural Dokümanları",
    updatedAt: "Mayıs 2026",
    featured: true,
    tags: ["TypeScript", "Node.js", "pnpm", "Vitest", "GitHub Actions"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/SetraTheXX/next-secure-check",
        kind: "github",
      },
    ],
    evidence: [
      "CLI tarama akışı ve temel kural seti tamamlandı.",
      "GitHub Actions entegrasyonu çalışıyor.",
      "npm yayını ve örnek tarama raporları sıradaki adım.",
    ],
  },
  {
    name: "Nihongo Learn",
    shortDescription:
      "Türkçe konuşanlar için Japonca öğrenme MVP'si.",
    longDescription:
      "Hiragana çalışma akışı, SM-2 tekrar algoritması, quiz, XP/streak ve yerel ilerleme takibi içeren Japonca öğrenme uygulaması.",
    stage: "Yerel MVP",
    stageTone: "cyan",
    demoState: "Henüz yayında değil; kaynak kod GitHub’da mevcut",
    maturity: "Yerel MVP",
    role: "Frontend, öğrenme akışı, state yönetimi ve Supabase planı",
    nextStep: "Vercel Yayını · Kimlik Doğrulama Temizliği · Örnek Veri · Kullanıcı Testleri",
    updatedAt: "Nisan 2026",
    featured: true,
    tags: ["Next.js 14", "TypeScript", "Tailwind CSS", "Zustand", "Supabase planı"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/SetraTheXX/nihongo-learn",
        kind: "github",
      },
    ],
    evidence: [
      "Kod lokalde çalışıyor.",
      "Henüz yayında değil; kaynak kod GitHub’da mevcut.",
      "Supabase auth/sync ve kullanıcı testleri sıradaki adım.",
    ],
  },
  {
    name: "KriptoVoidBot",
    shortDescription:
      "MEXC üzerinde ATR tabanlı grid stratejisini paper trading odağında test eden Python otomasyon projesi.",
    longDescription:
      "Canlı finansal başarı iddiası yok; loglama, risk kontrolü ve çalışma düzeni pratiği olarak sunuluyor.",
    stage: "Paper trading",
    stageTone: "amber",
    demoState: "Rapor bekliyor",
    maturity: "Paper trading / geliştirme aşaması",
    role: "Bot mimarisi, paper trading akışı, bildirim ve sunucu çalışma düzeni",
    nextStep: "Backtest Raporu · Risk Limitleri · Yayına Alma Notları",
    updatedAt: "Mart 2026",
    featured: false,
    tags: ["Python", "asyncio", "ccxt", "SQLite", "Telegram Bot API", "Oracle Cloud"],
    links: [],
    evidence: [
      "Temel modüller çalışıyor.",
      "Simülasyon/test odağı korunuyor.",
      "Risk limitleri ve hata toleransı dokümante ediliyor.",
    ],
  },
  {
    name: "BioVoid",
    shortDescription:
      "Protein yapılarında gizli bağlanma cepleri / cryptic pocket bölgeleri için araştırma prototipi.",
    longDescription:
      "NMA, Voronoi boşluk analizi, hidrofobik filtre ve docking adımlarını tek akışta dener.",
    stage: "Araştırma prototipi",
    stageTone: "cyan",
    demoState: "Rapor / demo bekliyor",
    maturity: "Araştırma prototipi",
    role: "Pipeline planlama, metrik takibi, deney akışı ve modülleştirme",
    nextStep: "Tekrarlanabilir Demo · Metrik Tablosu · Örnek Dataset",
    updatedAt: "Mart 2026",
    featured: false,
    tags: ["Python", "Biopython", "ProDy", "SciPy", "FastAPI", "SQLite"],
    links: [],
    evidence: [
      "CLI, dashboard ve batch analiz akışı geliştirildi.",
      "Recall, overlap, FPR ve MD metrikleri takip edildi.",
      "Tekrarlanabilir demo ve örnek dataset sıradaki adım.",
    ],
  },
  {
    name: "Pagonic",
    shortDescription:
      "ZIP parsing, benchmark denemeleri ve küçük test öncelikli çekirdek planı üzerine arşivlenmiş öğrenme projesi.",
    longDescription:
      "İlk sürüm tamamlandı; ölçüm hataları ve Python limitleri sonrası daha küçük bir Rust/C++ çekirdeğiyle yeniden planlandı.",
    stage: "Arşivlendi",
    stageTone: "slate",
    demoState: "Retrospektif var",
    maturity: "Arşivlenmiş öğrenme projesi",
    role: "Teknik araştırma, benchmark okuma, retrospektif ve yeniden mimari planı",
    nextStep: "Küçük ZIP32 Çekirdeği · Test Öncelikli Benchmark · Stabil CLI Öncesi GUI Yok",
    updatedAt: "Ekim 2025",
    featured: false,
    tags: ["Python", "ZIP", "benchmark", "test", "retrospektif", "yeniden yazım planı"],
    links: [
      {
        label: "Retrospektif oku",
        href: "https://dev.to/setrathexx/pagonic-my-10-month-journey-to-build-a-winrar-alternative-5436",
        kind: "article",
      },
    ],
    evidence: [
      "ZIP parser/writer ve benchmark denemeleri yapıldı.",
      "Yanlış ölçüm ve scope problemleri retrospektifte değerlendirildi.",
      "Daha küçük test öncelikli çekirdek hedefiyle yeniden planlandı.",
    ],
  },
];

export const skills: SkillGroup[] = [
  {
    title: "Aktif kullandıklarım",
    items: [
      "Python — otomasyon / backend",
      "TypeScript — web projeleri",
      "Next.js / React — frontend MVP",
      "Git / GitHub — repo ve GitHub Actions",
      "SQLite — loglama ve basit veri saklama",
    ],
  },
  {
    title: "Projelerde temas ettiklerim",
    items: [
      "Supabase — auth/sync planı",
      "FastAPI — API ve dashboard prototipleri",
      "Oracle Cloud — temel yayına alma",
      "PM2 / Nginx — temel sunucu düzeni",
      "Docker — temel kullanım",
    ],
  },
  {
    title: "Geliştirdiğim temeller",
    items: [
      "SQL — sorgu, join, veri modelleme",
      "Algoritma ve veri yapıları — düzenli çalışma",
      "Debugging — hata kaynağı izleme",
      "Test yazma — pytest / Vitest mantığı",
      "Kod okuma — AI çıktısını anlama ve sadeleştirme",
    ],
  },
];

export const aiTooling =
  "AI araçları: Claude Code, Cursor, Codex CLI, GitHub Copilot — araştırma, kod üretimi, inceleme ve dokümantasyon desteği için kullanıyorum.";

export const articles: Article[] = [
  {
    title: "AI Destekli Yazılım Geliştirme Mümkün mü?",
    href: "https://dev.to/setrathexx/-is-100-ai-assisted-software-development-possible-a-real-experience-4l60",
    source: "dev.to",
    publishedAt: "Jun 20, 2025",
    topic: "Çalışma yöntemi",
    note: "Plan → Generate → Test → Improve döngüsünü ve AI bağımlılığı riskini anlatan başlangıç yazısı.",
  },
  {
    title: "Sıfırdan ZIP Handler Geliştirmek",
    href: "https://dev.to/setrathexx/how-we-built-our-own-zip-handler-from-scratch-complete-technical-journey-pagonic-project-319k",
    source: "dev.to",
    publishedAt: "Jul 4, 2025",
    topic: "Teknik yolculuk",
    note: "ZIP handler mimarisi, modülerleşme, benchmark ve optimizasyon kararlarını belgeliyor.",
  },
  {
    title: "AI ile Daha Akıllı ZIP Engine Denemesi",
    href: "https://dev.to/setrathexx/how-i-built-a-smarter-zip-engine-with-ai-my-day-9-10-journey-pagonic-project-262m",
    source: "dev.to",
    publishedAt: "Jun 26, 2025",
    topic: "Debug ve benchmark",
    note: "Beklenen hız artışının gelmediği noktada autopsy raporu, rollback ve Cursor'a geçiş gibi gerçekçi dersleri gösteriyor.",
  },
  {
    title: "Pagonic Retrospektifi",
    href: "https://dev.to/setrathexx/pagonic-my-10-month-journey-to-build-a-winrar-alternative-5436",
    source: "dev.to",
    publishedAt: "Oct 15, 2025",
    topic: "Retrospektif",
    note: "Python prototipin neden tamamlanmadığını, nelerin öğrenildiğini ve neden daha küçük bir çekirdeğe dönüleceğini anlatıyor.",
  },
];

export const growthPlan: GrowthItem[] = [
  {
    title: "SQL kursu",
    status: "Sırada",
    statusTone: "queued",
    description:
      "Veri modelleme, kompleks sorgular ve ilişkisel veritabanı mantığını projelere entegre etmek için sıradaki gelişim başlığı olarak planladım.",
  },
  {
    title: "Algoritma ve veri yapıları",
    status: "Aktif",
    statusTone: "active",
    description:
      "Problem çözme yaklaşımımı sistematikleştirmek ve kodun veri akışı karmaşıklığını edge case analizleriyle daha bilinçli yönetmek için pratik yapıyorum.",
  },
  {
    title: "Debugging ve teknik sahiplik",
    status: "Sürekli",
    statusTone: "continuous",
    description:
      "Hata kaynağını izole etme, performans darboğazlarını analiz etme ve geliştirilen kodun sorumluluğunu uçtan uca üstlenme kültürünü benimsiyorum.",
  },
];

export const certificates: Certificate[] = [
  {
    title: "Etik Hacker Olma Kursu",
    platform: "Udemy",
    issuer: "Atıl Samancıoğlu",
    completedAt: "Mart 2026",
    duration: "30.5 saat",
  },
  {
    title: "Etik Hacker | Ağ Saldırıları ve Güvenliği 2025",
    platform: "Udemy",
    issuer: "Hexa Academy",
    completedAt: "Mart 2026",
    duration: "9.5 saat",
  },
  {
    title: "The Complete Coding Course - Cursor, Claude Code",
    platform: "Udemy",
    issuer: "Brendan",
    completedAt: "Mart 2026",
    duration: "12 saat",
  },
];

export const contact: ContactItem[] = [
  {
    label: "Mail",
    value: "tuncay123454@gmail.com",
    href: "mailto:tuncay123454@gmail.com",
    kind: "email",
    external: false,
  },
  {
    label: "GitHub",
    value: "github.com/SetraTheXX",
    href: "https://github.com/SetraTheXX",
    kind: "github",
    external: true,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/tuncayolmez",
    href: "https://www.linkedin.com/in/tuncayolmez/",
    kind: "linkedin",
    external: true,
  },
  {
    label: "Konum",
    value: "Samsun, Türkiye",
    href: "#contact",
    kind: "location",
    external: false,
  },
];

export const portfolio = {
  profile,
  processSteps,
  projects,
  skills,
  aiTooling,
  articles,
  growthPlan,
  certificates,
  contact,
} as const;

export type Locale = "tr" | "en";

export const profileEn = {
  ...profile,
  title: "Software Developer Internship Candidate",
  statusBadge: "Open to internships and project collaborations",
  location: "Samsun, Turkey",
  education:
    "First-year Computer Programming student at Ondokuz Mayis University",
  heroSummary:
    "I build web applications, developer tools, and Python automation projects. I focus on keeping scope clear, testing, documenting, and showing what actually works.",
  positioning: {
    label: "Software developer internship candidate",
    statement:
      "I focus on breaking ideas into small phases and turning them into testable outputs.",
    focus: "web · CLI tools · automation",
  },
  about: [
    "I am a Computer Programming student at OMU. I work on web, developer tooling, and automation projects.",
    "In my projects, I focus on moving from an idea to a working prototype through scope definition, modular planning, testing, and documentation.",
    "Right now I am turning next-secure-check into a publishable CLI tool, preparing my projects for release, and strengthening SQL, algorithms, and debugging fundamentals.",
  ],
  principles: [
    {
      title: "Clear status",
      description:
        "I separate what works, what is in progress, and what is planned in each project.",
    },
    {
      title: "Testing and documentation",
      description:
        "I keep README files, progress notes, test output, and next steps visible.",
    },
    {
      title: "Growth focus",
      description:
        "I strengthen SQL, algorithms, debugging, and test writing through real projects.",
    },
  ] satisfies Principle[],
  terminalDemo: {
    command: "focus --web --cli --automation",
    output: "Working Module · Test · Documentation",
  },
} as const;

export const processStepsEn: ProcessStep[] = [
  {
    command: "research",
    title: "Research",
    description:
      "I identify unfamiliar technical topics and compare alternative solution paths with different AI models.",
    output: "Risks · Assumptions · Topics to Learn",
  },
  {
    command: "prd",
    title: "PRD",
    description:
      "I collect the target user, MVP scope, non-goals, and acceptance criteria in one document.",
    output: "MVP · Out of Scope · Acceptance Criteria",
  },
  {
    command: "roadmap",
    title: "Roadmap",
    description:
      "I split the PRD into phases and define tests, validation, and exit gates for each phase.",
    output: "Phase Plan · Test Plan · Exit Gates",
  },
  {
    command: "implementation",
    title: "Implementation & Test",
    description:
      "I implement each phase separately, test it, and track issues with progress and README notes.",
    output: "Working Module · Tests · Next Step",
  },
];

export const projectsEn: Project[] = [
  {
    ...projects[0],
    shortDescription:
      "An open-source CLI tool that scans common security mistakes in Next.js projects with a deterministic rule engine.",
    longDescription:
      "It reports basic risks such as .env leaks, hardcoded secrets, unsafe API routes, missing rate limits, XSS risks, and missing security headers.",
    demoState: "npm release pending",
    maturity: "Working CLI MVP",
    role: "Product scope, rule set design, CLI flow, tests, and documentation",
    nextStep: "npm Release · Sample Scan Report · Rule Documentation",
    updatedAt: "May 2026",
    evidence: [
      "CLI scan flow and core rule set are complete.",
      "GitHub Actions integration works.",
      "npm release and sample scan reports are the next step.",
    ],
  },
  {
    ...projects[1],
    shortDescription:
      "A Japanese learning MVP for Turkish speakers.",
    longDescription:
      "A Japanese learning app with hiragana practice flow, SM-2 review algorithm, quiz, XP/streak, and local progress tracking.",
    stage: "Local MVP",
    demoState: "Not live yet; source code available on GitHub",
    maturity: "Local MVP",
    role: "Frontend, learning flow, state management, and Supabase plan",
    nextStep: "Vercel Release · Auth Cleanup · Sample Data · User Tests",
    updatedAt: "April 2026",
    tags: ["Next.js 14", "TypeScript", "Tailwind CSS", "Zustand", "Supabase plan"],
    evidence: [
      "The code runs locally.",
      "Not live yet; source code available on GitHub.",
      "Supabase auth/sync and user tests are the next step.",
    ],
  },
  {
    ...projects[2],
    shortDescription:
      "A Python automation project that tests an ATR-based grid strategy on MEXC with a paper trading focus.",
    longDescription:
      "It makes no live financial performance claim; it is presented as practice in logging, risk control, and runtime discipline.",
    demoState: "Report pending",
    maturity: "Paper trading / development stage",
    role: "Bot architecture, paper trading flow, notifications, and server runtime setup",
    nextStep: "Backtest Report · Risk Limits · Release Notes",
    updatedAt: "March 2026",
    evidence: [
      "Core modules are running.",
      "Simulation and testing remain the focus.",
      "Risk limits and fault tolerance are being documented.",
    ],
  },
  {
    ...projects[3],
    shortDescription:
      "A research prototype for hidden binding pockets / cryptic pocket regions in protein structures.",
    longDescription:
      "It tries NMA, Voronoi void analysis, hydrophobic filtering, and docking steps in one flow.",
    stage: "Research prototype",
    demoState: "Report / demo pending",
    maturity: "Research prototype",
    role: "Pipeline planning, metric tracking, experiment flow, and modularization",
    nextStep: "Reproducible Demo · Metrics Table · Sample Dataset",
    updatedAt: "March 2026",
    evidence: [
      "CLI, dashboard, and batch analysis flow were developed.",
      "Recall, overlap, FPR, and MD metrics were tracked.",
      "A reproducible demo and sample dataset are the next step.",
    ],
  },
  {
    ...projects[4],
    shortDescription:
      "An archived learning project around ZIP parsing, benchmark experiments, and a smaller test-first core plan.",
    longDescription:
      "The first version was completed; after measurement mistakes and Python limits, it was replanned around a smaller Rust/C++ core.",
    stage: "Archived",
    demoState: "Retrospective available",
    maturity: "Archived learning project",
    role: "Technical research, benchmark reading, retrospective, and re-architecture plan",
    nextStep: "Small ZIP32 Core · Test-First Benchmark · No GUI Before Stable CLI",
    updatedAt: "Oct 2025",
    tags: ["Python", "ZIP", "benchmark", "test", "retrospective", "rewrite plan"],
    links: [
      {
        label: "Read retrospective",
        href: projects[4].links[0].href,
        kind: "article",
      },
    ],
    evidence: [
      "ZIP parser/writer and benchmark experiments were built.",
      "Wrong measurement and scope issues were reviewed in the retrospective.",
      "The project was replanned around a smaller test-first core.",
    ],
  },
];

export const skillsEn: SkillGroup[] = [
  {
    title: "Actively using",
    items: [
      "Python — automation / backend",
      "TypeScript — web projects",
      "Next.js / React — frontend MVP",
      "Git / GitHub — repositories and GitHub Actions",
      "SQLite — logging and simple data storage",
    ],
  },
  {
    title: "Touched in projects",
    items: [
      "Supabase — auth/sync plan",
      "FastAPI — API and dashboard prototypes",
      "Oracle Cloud — basic deployment",
      "PM2 / Nginx — basic server setup",
      "Docker — basic usage",
    ],
  },
  {
    title: "Fundamentals I am building",
    items: [
      "SQL — queries, joins, data modeling",
      "Algorithms and data structures — regular study",
      "Debugging — tracing the source of errors",
      "Test writing — pytest / Vitest mindset",
      "Code reading — understanding and simplifying AI output",
    ],
  },
];

export const aiToolingEn =
  "AI tools: Claude Code, Cursor, Codex CLI, GitHub Copilot — used for research, code generation, review, and documentation support.";

export const articlesEn: Article[] = [
  {
    ...articles[0],
    title: "Is AI-Assisted Software Development Possible?",
    topic: "Workflow",
    note: "A starter article about the Plan → Generate → Test → Improve loop and the risk of AI dependency.",
  },
  {
    ...articles[1],
    title: "Building a ZIP Handler From Scratch",
    topic: "Technical journey",
    note: "Documents ZIP handler architecture, modularization, benchmark work, and optimization decisions.",
  },
  {
    ...articles[2],
    title: "A Smarter ZIP Engine Experiment With AI",
    topic: "Debug and benchmark",
    note: "Shows realistic lessons around an autopsy report, rollback, and moving to Cursor when the expected speedup did not arrive.",
  },
  {
    ...articles[3],
    title: "Pagonic Retrospective",
    topic: "Retrospective",
    note: "Explains why the Python prototype was not completed, what was learned, and why the project returns to a smaller core.",
  },
];

export const growthPlanEn: GrowthItem[] = [
  {
    title: "SQL course",
    status: "Queued",
    statusTone: "queued",
    description:
      "I have planned this as my next growth focus to integrate data modeling, complex queries, and relational database fundamentals into projects.",
  },
  {
    title: "Algorithms and data structures",
    status: "Active",
    statusTone: "active",
    description:
      "I practice to systematize my problem-solving approach and manage data-flow complexity with more deliberate edge-case analysis.",
  },
  {
    title: "Debugging and technical ownership",
    status: "Ongoing",
    statusTone: "continuous",
    description:
      "I embrace the habit of isolating root causes, analyzing performance bottlenecks, and taking end-to-end ownership of the code I build.",
  },
];

export const certificatesEn: Certificate[] = [
  {
    ...certificates[0],
    title: "Becoming an Ethical Hacker Course",
    completedAt: "March 2026",
    duration: "30.5 hours",
  },
  {
    ...certificates[1],
    title: "Ethical Hacker | Network Attacks and Security 2025",
    completedAt: "March 2026",
    duration: "9.5 hours",
  },
  {
    ...certificates[2],
    completedAt: "March 2026",
    duration: "12 hours",
  },
];

export const contactEn: ContactItem[] = [
  {
    ...contact[0],
    label: "Email",
  },
  {
    ...contact[1],
  },
  {
    ...contact[2],
  },
  {
    ...contact[3],
    label: "Location",
    value: "Samsun, Turkey",
  },
];

export const portfolioEn = {
  profile: profileEn,
  processSteps: processStepsEn,
  projects: projectsEn,
  skills: skillsEn,
  aiTooling: aiToolingEn,
  articles: articlesEn,
  growthPlan: growthPlanEn,
  certificates: certificatesEn,
  contact: contactEn,
} as const;

export const portfolioByLocale = {
  tr: portfolio,
  en: portfolioEn,
} as const;

export const uiCopyByLocale = {
  tr: {
    htmlLang: "tr",
    navigation: [
      { label: "Projeler", href: "#projects" },
      { label: "Hakkımda", href: "#about" },
      { label: "Yöntem", href: "#method" },
      { label: "Yazılar", href: "#writing" },
      { label: "Beceriler", href: "#skills" },
      { label: "İletişim", href: "#contact" },
    ],
    language: {
      trLabel: "🇹🇷 TR",
      enLabel: "🇬🇧 EN",
      trAria: "Türkçeye geç",
      enAria: "Switch to English",
    },
    hero: {
      breadcrumb: "Setrathex / Kısa Özet",
      projectMetric: "Proje",
      articleMetric: "Teknik Yazı",
      projectsButton: "Projeler",
      contactButton: "İletişim",
      cvButton: "CV İndir",
      cvAria: "CV indirme seçeneklerini aç",
      cvOptions: ["Turkish CV", "English CV"],
    },
    focusPanel: {
      eyebrow: "Odak Alanları",
      title: "Şu an odaklandığım işler",
      description:
        "Küçük ama çalışan araçlar, test edilebilir MVP'ler ve açık proje notları üretiyorum.",
      openGoal:
        "Açık hedef: next-secure-check'i yayınlanabilir CLI aracına dönüştürmek.",
      areas: [
        { title: "Web uygulamaları", description: "Next.js, React, TypeScript" },
        { title: "Geliştirici araçları", description: "CLI, otomasyon, proje akışı" },
        { title: "Test ve dokümantasyon", description: "README, test çıktısı, durum notları" },
      ],
    },
    projectCard: {
      status: "Durum",
      role: "Rolüm",
      nextStep: "Sıradaki adım:",
      read: "oku",
    },
    sections: {
      projects: {
        eyebrow: "/Projeler",
        title: "Öne Çıkan Projeler",
        description:
          "Çalışan, geliştirilen ve planlanan kısımları ayrı gösterdiğim seçili projeler.",
        otherEyebrow: "/Diğer Projeler",
        otherTitle: "Araştırma ve Öğrenme Projeleri",
        otherDescription:
          "Deneysel, araştırma veya teknik öğrenme amacı taşıyan projeler.",
      },
      about: {
        eyebrow: "/Hakkımda",
        title: "Hakkımda",
        description:
          "Ne üzerinde çalıştığımı, nasıl öğrendiğimi ve şu an hangi becerileri güçlendirdiğimi özetliyorum.",
        location: "Konum",
        education: "Eğitim",
      },
      method: {
        eyebrow: "/Yöntem",
        title: "Çalışma Yöntemi",
        description:
          "Projeye doğrudan kodla başlamadan önce kapsam, risk, test ve teslim adımlarını netleştiriyorum.",
      },
      writing: {
        eyebrow: "/Yazılar",
        title: "Teknik Yazılar ve Retrospektifler",
        description:
          "AI destekli geliştirme, benchmark hataları, rollback kararları ve Pagonic sürecinde öğrendiklerimi yazıya döktüm.",
      },
      skills: {
        eyebrow: "/Beceriler",
        title: "Teknik Alanlar",
        description:
          "Uzmanlık listesi değil; projelerimde kullandığım, temas ettiğim ve şu an güçlendirdiğim alanlar.",
      },
      education: {
        eyebrow: "/Eğitim",
        title: "Eğitim ve Gelişim",
        description:
          "Akademik durum, temel güvenlik farkındalığı ve kısa gelişim başlıkları.",
        university: "Ondokuz Mayıs Üniversitesi",
        degree:
          "Bilgisayar Programcılığı. Beklenen mezuniyet:",
        securityTitle: "Güvenlik farkındalığı",
        securityDescription:
          "Etik hacking ve ağ güvenliği eğitimleriyle temel güvenlik farkındalığı kazandım.",
        certificates: "Sertifikalar",
      },
      contact: {
        eyebrow: "/iletişim",
        title: "İletişim",
        description:
          "Staj görüşmeleri ve proje iş birlikleri için en kısa yollar.",
        availabilityTitle: "Staj ve proje iş birliklerine açık",
        availabilityDescription:
          "Web uygulamaları, otomasyon ve geliştirici araçları üzerine çalışabileceğim staj ve proje fırsatlarına açığım.",
      },
    },
    footer: {
      tagline: "Samsun / Türkiye",
    },
    commandMenu: {
      trigger: "Hızlı Menü",
      shortcut: "Ctrl K",
      placeholder: "Ne aramak istersiniz? (Projeler, CV, İletişim...)",
      noResults: "Böyle bir sonuç bulamadım.",
      pageGroup: "Sayfa İçi",
      actionsGroup: "Aksiyonlar",
      projects: "Projeler",
      about: "Hakkımda",
      email: "E-posta Gönder",
      cvLabels: ["Özgeçmiş (TR) İndir", "Resume (EN) Download"],
    },
  },
  en: {
    htmlLang: "en",
    navigation: [
      { label: "Projects", href: "#projects" },
      { label: "About", href: "#about" },
      { label: "Method", href: "#method" },
      { label: "Writing", href: "#writing" },
      { label: "Skills", href: "#skills" },
      { label: "Contact", href: "#contact" },
    ],
    language: {
      trLabel: "🇹🇷 TR",
      enLabel: "🇬🇧 EN",
      trAria: "Switch to Turkish",
      enAria: "Switch to English",
    },
    hero: {
      breadcrumb: "Setrathex / Short Summary",
      projectMetric: "Projects",
      articleMetric: "Technical Articles",
      projectsButton: "Projects",
      contactButton: "Contact",
      cvButton: "Download CV",
      cvAria: "Open CV download options",
      cvOptions: ["Turkish CV", "English CV"],
    },
    focusPanel: {
      eyebrow: "Focus Areas",
      title: "What I am focused on now",
      description:
        "I produce small but working tools, testable MVPs, and open project notes.",
      openGoal:
        "Open goal: turn next-secure-check into a publishable CLI tool.",
      areas: [
        { title: "Web applications", description: "Next.js, React, TypeScript" },
        { title: "Developer tools", description: "CLI, automation, project flow" },
        { title: "Testing and documentation", description: "README, test output, status notes" },
      ],
    },
    projectCard: {
      status: "Status",
      role: "My role",
      nextStep: "Next step:",
      read: "read",
    },
    sections: {
      projects: {
        eyebrow: "/Projects",
        title: "Featured Projects",
        description:
          "Selected projects where I separate working, in-progress, and planned parts.",
        otherEyebrow: "/Other Projects",
        otherTitle: "Research and Learning Projects",
        otherDescription:
          "Projects built for experimentation, research, or technical learning.",
      },
      about: {
        eyebrow: "/About",
        title: "About",
        description:
          "A short summary of what I work on, how I learn, and which skills I am strengthening now.",
        location: "Location",
        education: "Education",
      },
      method: {
        eyebrow: "/Method",
        title: "Working Method",
        description:
          "Before jumping into code, I clarify scope, risk, testing, and delivery steps.",
      },
      writing: {
        eyebrow: "/Writing",
        title: "Technical Articles and Retrospectives",
        description:
          "I write about AI-assisted development, benchmark mistakes, rollback decisions, and lessons from Pagonic.",
      },
      skills: {
        eyebrow: "/Skills",
        title: "Technical Areas",
        description:
          "Not an expertise checklist; these are areas I use, touch, and strengthen through projects.",
      },
      education: {
        eyebrow: "/Education",
        title: "Education and Growth",
        description:
          "Academic status, basic security awareness, and short growth topics.",
        university: "Ondokuz Mayis University",
        degree:
          "Computer Programming. Expected graduation:",
        securityTitle: "Security awareness",
        securityDescription:
          "I built basic security awareness through ethical hacking and network security courses.",
        certificates: "Certificates",
      },
      contact: {
        eyebrow: "/contact",
        title: "Contact",
        description:
          "The shortest paths for internship conversations and project collaborations.",
        availabilityTitle: "Open to internships and project collaborations",
        availabilityDescription:
          "I am open to internship and project opportunities where I can work on web applications, automation, and developer tools.",
      },
    },
    footer: {
      tagline: "Samsun / Turkey",
    },
    commandMenu: {
      trigger: "Quick Menu",
      shortcut: "Ctrl K",
      placeholder: "What do you want to find? (Projects, CV, Contact...)",
      noResults: "No matching result found.",
      pageGroup: "On-page",
      actionsGroup: "Actions",
      projects: "Projects",
      about: "About",
      email: "Send Email",
      cvLabels: ["Download Turkish CV", "Download Resume (EN)"],
    },
  },
} as const;

export function resolveLocale(lang?: string | string[]): Locale {
  const value = Array.isArray(lang) ? lang[0] : lang;
  return value === "en" ? "en" : "tr";
}

export function getProjectLinkState(project: Project) {
  return {
    hasLinks: project.links.length > 0,
    primaryLink: project.links[0] ?? null,
  };
}
