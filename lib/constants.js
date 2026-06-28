// ─── Business Information ────────────────────────────────────────────────────
export const BUSINESS = {
  name: "Bilal Painting & Decorating",
  tagline: "Premium Painting & Decorating Across the UK",
  phone: "+44 7722186708",
  phoneDisplay: "07722186708",
  email: "Bilal_naseer86@icloud.com",
 address: {
    street: "23 Farnhurst Road",
    city: "Birmingham",
    county: "West Midlands", // Ya null / "" (niche detail dekhein)
    postcode: "B36 8HS",
    country: "United Kingdom",
},
  whatsapp: "447722186708", // International format without +
  whatsappMessage: "Hello! I'd like to get a free quote for painting and decorating.",
  founded: "2012",
  projectsCompleted: "500+",
  yearsExperience: "14+",
  satisfactionRate: "98%",

   freeQuotePolicy: {
    enabled: true,
    radius: "5",
    unit: "miles",
    description: "Free site visit and no-obligation quote within 5 miles",
  },
};

// ─── Site Configuration ──────────────────────────────────────────────────────
export const SITE = {
  url: "https://bilalpaintinguk.co.uk",
  name: "Bilal Painting & Decorating | UK",
  description:
    "Bilal Painting,wallpaper & Decorating provides Professional painters and decorators in Birmingham, West Midlands. Interior painting, exterior painting, wallpaper installation and commercial decorating. Free quotes, reliable service and premium finishes.",
  keywords: [
    "painting and decorating UK",
    "painters and decorators Birmingham",
    "painters Birmingham",
    "decorators Birmingham",
    "Painters Birmingham",
    "Decorators Birmingham",
    "Painting Services Birmingham",
    "Residential Painter Birmingham",
    "Commercial Decorator Birmingham",
    "Wallpaper Hanging Birmingham",
    "Interior Decorator Birmingham",
    "Exterior Painter Birmingham",
    "professional decorators",
    "Bilal Painting Decorating",
  ],
  ogImage: "/images/og-image.jpg",
  twitterHandle: "@bilalpaintinguk",
};

// ─── Navigation Links ────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

// ─── Home Page — Services Overview ──────────────────────────────────────────
export const HOME_SERVICES = [
  {
    id: "interior",
    icon: "Home",
    title: "Interior Painting",
    description:
      "Transform your living spaces with our expert interior painting service. We use premium paints and precise techniques for a flawless finish every time.",
    href: "/services#interior",
  },
  {
    id: "exterior",
    icon: "Building2",
    title: "Exterior Painting",
    description:
      "Protect and beautify your property's exterior. Our weather-resistant coatings are designed for the UK climate, keeping your home looking fresh year-round.",
    href: "/services#exterior",
  },
  {
    id: "commercial",
    icon: "Briefcase",
    title: "Commercial Decorating",
    description:
      "Professional painting and decorating for offices, retail spaces, and commercial properties. Minimal disruption, maximum impact — on schedule and on budget.",
    href: "/services#commercial",
  },
  {
    id: "wallpaper",
    icon: "Layers",
    title: "Wallpaper Installation",
    description:
      "Expert wallpaper hanging for all types — feature walls, full rooms, and luxury vinyls. Perfect pattern matching and bubble-free results guaranteed.",
    href: "/services#wallpaper",
  },
];

// ─── Why Choose Us ───────────────────────────────────────────────────────────
export const WHY_CHOOSE_US = [
  {
    id: "experience",
    icon: "Award",
    title: "14+ Years of Experience",
    description:
      "Over a decade of professional painting and decorating across residential and commercial properties throughout the UK.",
    stat: "14+",
    statLabel: "Years",
  },
  {
    id: "quality",
    icon: "Star",
    title: "Premium Quality Finishes",
    description:
      "We use only top-tier paints and materials, ensuring a lasting, beautiful result that exceeds expectations every time.",
    stat: "500+",
    statLabel: "Projects",
  },
  {
    id: "reliability",
    icon: "Clock",
    title: "Always On Time",
    description:
      "We respect your schedule. Our team arrives on time, completes work within agreed timelines, and leaves your space spotless.",
    stat: "100%",
    statLabel: "On-Time",
  },
  {
    id: "satisfaction",
    icon: "ThumbsUp",
    title: "Customer Satisfaction",
    description:
      "Our 98% customer satisfaction rate speaks for itself. We're not finished until you're completely happy with the results.",
    stat: "98%",
    statLabel: "Satisfaction",
  },
];

// ─── Services Page — Full Service Cards ─────────────────────────────────────
export const SERVICES = [
  {
    id: "interior",
    icon: "Home",
    title: "Interior Painting",
    description:
      "Give your home a fresh new look with our professional interior painting service. From single rooms to full-house transformations, we handle every detail.",
    features: [
      "All room types including kitchens and bathrooms",
      "Premium emulsion, gloss, and eggshell finishes",
      "Careful furniture protection and full clean-up",
      "Colour consultation available on request",
      "Fast drying, low-VOC paints available",
    ],
    badge: "Most Popular",
  },
  {
    id: "exterior",
    icon: "Building2",
    title: "Exterior Painting",
    description:
      "Our exterior painting service protects your property from the harsh UK weather while dramatically improving kerb appeal and long-term value.",
    features: [
      "Masonry, render, timber, and UPVC surfaces",
      "Weatherproof and anti-fungal coatings",
      "Thorough surface preparation and priming",
      "Suitable for all property types",
      "Multi-year durability guarantees available",
    ],
    badge: null,
  },
  {
    id: "commercial",
    icon: "Briefcase",
    title: "Commercial Decorating",
    description:
      "We help businesses maintain a professional, welcoming environment. Our commercial decorating team works flexibly to minimise disruption to your operations.",
    features: [
      "Offices, retail, hospitality, and healthcare",
      "Out-of-hours and weekend scheduling available",
      "Colour scheme planning and design input",
      "Compliant with commercial health & safety standards",
      "Regular maintenance contracts available",
    ],
    badge: "Business Friendly",
  },
  {
    id: "wallpaper",
    icon: "Layers",
    title: "Wallpaper Installation",
    description:
      "Expert wallpaper installation for all types and styles. We ensure perfect seams, precise pattern matching, and a smooth, long-lasting finish.",
    features: [
      "Lining, paste-the-wall, and traditional wallpapers",
      "Feature walls, full rooms, alcoves, and stairwells",
      "Luxury vinyl and textured wallcoverings",
      "Careful wall preparation and sizing",
      "Removal of existing wallpaper available",
    ],
    badge: null,
  },
];
