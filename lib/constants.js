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
    county: "West Midlands", 
    postcode: "B36 8HS",
    country: "United Kingdom",
  },
  whatsapp: "447722186708", 
  whatsappMessage: "Hello! I'd like to get a free quote for painting and decorating.",
  founded: "2012",
  projectsCompleted: "500+",
  yearsExperience: "14+",
  satisfactionRate: "100%", // SEO Updated

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
    "Trusted painters and decorators in Birmingham offering interior painting, exterior painting, commercial decorating and wallpaper installation. Free quotes, fully insured, 14+ years' experience. Call today!", // SEO Updated
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

// ─── Home Page — Services Overview (SEO Optimized) ───────────────────────────
export const HOME_SERVICES = [
  {
    id: "interior",
    icon: "Home",
    title: "Interior Painting",
    description:
      "Refresh your home with our professional interior painting services in Birmingham. Flawless finishes for living rooms, bedrooms, kitchens, and hallways.",
    href: "/services#interior",
  },
  {
    id: "exterior",
    icon: "Building2",
    title: "Exterior Painting",
    description:
      "Protect your property from the UK's weather with our expert exterior painting. We use high-performance weather-resistant coatings for lasting results.",
    href: "/services#exterior",
  },
  {
    id: "commercial",
    icon: "Briefcase",
    title: "Commercial Decorating",
    description:
      "Reliable commercial painting for offices, retail stores, and schools in Birmingham. Efficient service including out-of-hours to minimise disruption.",
    href: "/services#commercial",
  },
  {
    id: "wallpaper",
    icon: "Layers",
    title: "Wallpaper Installation",
    description:
      "Precision wallpaper installation for stunning interiors. Seamless joins and perfect pattern alignment for luxury vinyl, textured, and designer wallpapers.",
    href: "/services#wallpaper",
  },
];

// ─── Why Choose Us (SEO Optimized) ───────────────────────────────────────────
export const WHY_CHOOSE_US = [
  {
    id: "experience",
    icon: "Award",
    title: "14+ Years of Experience",
    description:
      "Our experienced painters and decorators have successfully completed residential and commercial projects of all sizes with expert knowledge.",
    stat: "14+",
    statLabel: "Years",
  },
  {
    id: "quality",
    icon: "Star",
    title: "Premium Quality Finishes",
    description:
      "We use trusted paint brands, professional-grade decorating materials, and meticulous preparation techniques to deliver durable finishes.",
    stat: "500+",
    statLabel: "Projects",
  },
  {
    id: "reliability",
    icon: "Clock",
    title: "Reliable & On-Time Service",
    description:
      "We value your time. Our team arrives on schedule, works efficiently, and completes every project within the agreed timeframe.",
    stat: "100%",
    statLabel: "Reliable",
  },
  {
    id: "satisfaction",
    icon: "ThumbsUp",
    title: "Customer Satisfaction",
    description:
      "Your satisfaction is our priority. We provide honest advice, transparent pricing, and quality workmanship. We don't consider a project complete until you're completely satisfied.",
    stat: "100%",
    statLabel: "Satisfaction",
  },
];

// ─── Services Page — Full Service Cards (SEO Optimized) ─────────────────────
export const SERVICES = [
  {
    id: "interior",
    icon: "Home",
    title: "Interior Painting",
    description:
      "Refresh your home with Bilal Painting & Decorating's professional interior painting services in Birmingham. Our experienced painters deliver flawless finishes for living rooms, bedrooms, kitchens, bathrooms, hallways, and home offices.",
    features: [
      "Interior wall, ceiling, woodwork, and trim painting",
      "Professional emulsion, eggshell, satin, gloss, and matt finishes",
      "Expert wall preparation, filling, sanding, and priming",
      "Low-VOC, eco-friendly paint options available",
      "Complete furniture protection and thorough clean-up",
      "Fully insured professional painters",
    ],
    badge: "Most Popular",
  },
  {
    id: "exterior",
    icon: "Building2",
    title: "Exterior Painting",
    description:
      "Protect your property from the UK's changing weather with our expert exterior painting and decorating services. We use high-performance weather-resistant coatings and professional preparation techniques.",
    features: [
      "Brick, render, masonry, timber, metal, and UPVC painting",
      "Weatherproof and anti-fungal protective coatings",
      "Crack repairs, filling, sanding, and priming",
      "Fascias, soffits, guttering, and window frames",
      "Long-lasting premium exterior paint systems",
      "Free property assessments and quotations",
    ],
    badge: null,
  },
  {
    id: "commercial",
    icon: "Briefcase",
    title: "Commercial Decorating",
    description:
      "Bilal Painting & Decorating provides professional commercial painting services in Birmingham for offices, retail stores, schools, healthcare facilities, and more. We work efficiently to minimise disruption.",
    features: [
      "Office painting and workplace decorating",
      "Out-of-hours and weekend scheduling",
      "Retail shops, healthcare, and educational facilities",
      "Commercial colour consultation",
      "Health & Safety compliant working practices",
      "Ongoing maintenance contracts available",
    ],
    badge: "Business Friendly",
  },
  {
    id: "wallpaper",
    icon: "Layers",
    title: "Wallpaper Installation",
    description:
      "Enhance your interiors with our professional wallpaper installation services. Our experienced specialists deliver seamless installation with perfect pattern alignment and exceptional attention to detail.",
    features: [
      "Feature walls and complete room installations",
      "Luxury vinyl, textured, and designer wallpapers",
      "Paste-the-wall and traditional wallpaper installation",
      "Pattern matching and seamless joins",
      "Wall preparation and surface smoothing",
      "Wallpaper removal and replacement",
    ],
    badge: null,
  },
];