/**
 * Seed script.
 *
 * Run with: npm run db:seed  (or `npx prisma db seed`)
 *
 * This does two things:
 *
 * 1. Creates a single AdminUser from ADMIN_EMAIL / ADMIN_PASSWORD env vars,
 *    so you have a working login the first time you start the dashboard.
 *
 * 2. Mirrors the site's CURRENT hardcoded content (from lib/constants.js
 *    and the component-level arrays in Hero/About/Portfolio/Transformations
 *    /FAQs) into the database, exactly as it exists today. This means the
 *    DB starts as a 1:1 copy of production — nothing changes on the public
 *    site when Phase 2 wires these tables in, because the content is
 *    identical to what's hardcoded right now.
 *
 * All existing image paths are seeded as MediaAsset rows pointing at the
 * current /images/*.jpg files (cloudinaryPublicId left null). Phase 3 can
 * re-upload these to Cloudinary and update the rows in place — nothing
 * about this structure needs to change to do that later.
 */

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function seedAdminUser() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.warn(
      "⚠️  ADMIN_EMAIL / ADMIN_PASSWORD not set in .env — skipping admin user creation.\n" +
        "   Set them and re-run `npm run db:seed` to create your login."
    );
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.adminUser.upsert({
    where: { email: email.toLowerCase().trim() },
    update: { hashedPassword },
    create: {
      email: email.toLowerCase().trim(),
      hashedPassword,
      name: "Site Admin",
    },
  });

  console.log(`✅ Admin user ready: ${email}`);
}

async function seedMediaAsset({ url, altText, resourceType = "image" }) {
  const existing = await prisma.mediaAsset.findFirst({ where: { url } });
  if (existing) return existing;

  return prisma.mediaAsset.create({
    data: { url, altText, resourceType },
  });
}

async function seedHero() {
  const existing = await prisma.heroContent.findFirst();
  if (existing) {
    console.log("↷ HeroContent already seeded, skipping.");
    return;
  }

  await prisma.heroContent.create({
    data: {
      badge: "Expert Services for Homes & Businesses",
      headingAccent: "Professional Painters",
      headingMain: "& Decorators in Birmingham",
      description:
        "Transform your property with Bilal Painting & Decorating, trusted painters and decorators in Birmingham. We specialise in interior and exterior painting, commercial decorating, and wallpaper installation, delivering premium finishes with reliable workmanship.",
      trustBadges: [
        "Free Quotations",
        "Fully Insured",
        "14+ Years Experience",
        "500+ Projects Completed",
      ],
    },
  });

  const images = [
    { src: "/images/room.jpg", alt: "Living room interior painting transformation by Bilal Painting & Decorating UK" },
    { src: "/images/paintroller.avif", alt: "Professional paint roller applying fresh paint to interior wall by Bilal Painting" },
    { src: "/images/paintboxes.jpg", alt: "Premium paint boxes and decorating supplies used by Bilal Painting UK" },
    { src: "/images/office.jpg", alt: "Commercial office decorating project completed by Bilal Painting & Decorating UK" },
  ];

  for (const [index, img] of images.entries()) {
    const media = await seedMediaAsset({ url: img.src, altText: img.alt });
    await prisma.heroImage.create({
      data: { order: index, altText: img.alt, mediaId: media.id },
    });
  }

  console.log("✅ HeroContent + images seeded.");
}

async function seedAbout() {
  const existing = await prisma.aboutContent.findFirst();
  if (existing) {
    console.log("↷ AboutContent already seeded, skipping.");
    return;
  }

  const media = await seedMediaAsset({
    url: "/images/room.jpg",
    altText: "Professional painting and decorating work in Birmingham",
  });

  await prisma.aboutContent.create({
    data: {
      badge: "About Bilal Painting & Decorating",
      heading: "Trusted Painters & Decorators in",
      headingAccent: "Birmingham",
      paragraph1:
        "For over 14 years, Bilal Painting & Decorating has been providing professional painting and decorating services across Birmingham. Using trusted paint brands, professional-grade materials, expert craftsmanship, and meticulous preparation, we deliver exceptional finishes backed by reliable service and complete customer satisfaction.",
      paragraph2:
        "We also provide specialist painting services for homeowners, landlords, letting agents, and property managers. Whether you're preparing a property for sale, refreshing a rental, or renovating your family home, our experienced painters deliver high-quality workmanship with minimal disruption and long-lasting results.",
      bulletPoints: [
        "Trusted paint brands & materials",
        "Meticulous surface preparation",
        "Minimal disruption to your routine",
        "Complete customer satisfaction",
      ],
      experienceYears: "14+",
      imageId: media.id,
    },
  });

  console.log("✅ AboutContent seeded.");
}

async function seedServices() {
  const count = await prisma.service.count();
  if (count > 0) {
    console.log("↷ Services already seeded, skipping.");
    return;
  }

  const services = [
    {
      slug: "interior",
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
      order: 0,
    },
    {
      slug: "exterior",
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
      order: 1,
    },
    {
      slug: "commercial",
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
      order: 2,
    },
    {
      slug: "wallpaper",
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
      order: 3,
    },
  ];

  for (const service of services) {
    await prisma.service.create({ data: { ...service, showOnHome: true } });
  }

  console.log("✅ Services seeded.");
}

async function seedWhyChooseUs() {
  const count = await prisma.whyChooseUsItem.count();
  if (count > 0) {
    console.log("↷ WhyChooseUsItem already seeded, skipping.");
    return;
  }

  const items = [
    {
      icon: "Award",
      title: "14+ Years of Experience",
      description:
        "Our experienced painters and decorators have successfully completed residential and commercial projects of all sizes with expert knowledge.",
      stat: "14+",
      statLabel: "Years",
      order: 0,
    },
    {
      icon: "Star",
      title: "Premium Quality Finishes",
      description:
        "We use trusted paint brands, professional-grade decorating materials, and meticulous preparation techniques to deliver durable finishes.",
      stat: "500+",
      statLabel: "Projects",
      order: 1,
    },
    {
      icon: "Clock",
      title: "Reliable & On-Time Service",
      description:
        "We value your time. Our team arrives on schedule, works efficiently, and completes every project within the agreed timeframe.",
      stat: "100%",
      statLabel: "Reliable",
      order: 2,
    },
    {
      icon: "ThumbsUp",
      title: "Customer Satisfaction",
      description:
        "Your satisfaction is our priority. We provide honest advice, transparent pricing, and quality workmanship. We don't consider a project complete until you're completely satisfied.",
      stat: "100%",
      statLabel: "Satisfaction",
      order: 3,
    },
  ];

  for (const item of items) {
    await prisma.whyChooseUsItem.create({ data: item });
  }

  console.log("✅ WhyChooseUsItem seeded.");
}

async function seedPortfolio() {
  const count = await prisma.portfolioImage.count();
  if (count > 0) {
    console.log("↷ PortfolioImage already seeded, skipping.");
    return;
  }

  const images = [
    { src: "/images/port-1.jpg", alt: "Modern living room interior painting project completed in Birmingham" },
    { src: "/images/port-2.jpg", alt: "Freshly painted exterior of a residential house in West Midlands" },
    { src: "/images/port-3.jpg", alt: "Commercial office space decorating and painting project" },
    { src: "/images/port-4.jpg", alt: "Elegant wallpaper installation and feature wall in a bedroom" },
  ];

  for (const [index, img] of images.entries()) {
    const media = await seedMediaAsset({ url: img.src, altText: img.alt });
    await prisma.portfolioImage.create({
      data: { altText: img.alt, order: index, mediaId: media.id },
    });
  }

  console.log("✅ PortfolioImage seeded.");
}

async function seedTransformations() {
  const count = await prisma.transformation.count();
  if (count > 0) {
    console.log("↷ Transformation already seeded, skipping.");
    return;
  }

  const projects = [
    {
      before: "/images/before-1.jpeg",
      after: "/images/after-1.jpg",
      title: "Living Room Makeover",
      description: "Dark to light – complete interior transformation",
      category: "Interior",
    },
    {
      before: "/images/before-2.jpg",
      after: "/images/after-2.jpg",
      title: "Exterior Refresh",
      description: "Weather-worn to weather-proof",
      category: "Exterior",
    },
    {
      before: "/images/before-3.jpeg",
      after: "/images/after-3.jpeg",
      title: "Office Space Revival",
      description: "Dated to dynamic – commercial makeover",
      category: "Commercial",
    },
    {
      before: "/images/before-4.jpg",
      after: "/images/after-4.jpg",
      title: "Bedroom Retreat",
      description: "Cosy to captivating",
      category: "Interior",
    },
  ];

  for (const [index, project] of projects.entries()) {
    const beforeMedia = await seedMediaAsset({
      url: project.before,
      altText: `Before ${project.title} by Bilal Painting & Decorating UK`,
    });
    const afterMedia = await seedMediaAsset({
      url: project.after,
      altText: `After ${project.title} by Bilal Painting & Decorating UK`,
    });

    await prisma.transformation.create({
      data: {
        title: project.title,
        description: project.description,
        category: project.category,
        order: index,
        beforeImageId: beforeMedia.id,
        afterImageId: afterMedia.id,
      },
    });
  }

  console.log("✅ Transformation seeded.");
}

async function seedFaqs() {
  const count = await prisma.faq.count();
  if (count > 0) {
    console.log("↷ Faq already seeded, skipping.");
    return;
  }

  const faqs = [
    {
      question: "What painting and decorating services do you offer?",
      answer:
        "We provide professional interior painting, exterior painting, commercial decorating, wallpaper installation, woodwork painting, and property maintenance services for homeowners and businesses across Birmingham and the surrounding areas.",
    },
    {
      question: "Do you offer free quotes?",
      answer:
        "Yes. We provide free, no-obligation quotations and site visits within 5 miles. We'll assess your project, discuss your requirements, and provide a transparent, competitive quote with no hidden costs.",
    },
    {
      question: "Are you fully insured?",
      answer:
        "Absolutely. Bilal Painting & Decorating is fully insured, giving you complete peace of mind throughout your painting or decorating project.",
    },
    {
      question: "What areas do you cover?",
      answer:
        "We proudly serve Birmingham and the surrounding areas, providing reliable painting and decorating services for residential and commercial properties.",
    },
    {
      question: "What type of paint do you use?",
      answer:
        "We use best-quality paints from trusted brands, including Dulux Trade, Crown Trade, Johnstone's Trade, Farrow & Ball, and other leading manufacturers, ensuring durable and professional-quality finishes.",
    },
    {
      question: "Do you provide commercial painting services?",
      answer:
        "Yes. We work with offices, retail shops, restaurants, schools, healthcare facilities, warehouses, landlords, and commercial property managers, delivering flexible painting solutions with minimal disruption to your business.",
    },
    {
      question: "How long will my painting project take?",
      answer:
        "Project duration depends on the size and complexity of the work. Smaller interior projects may take one to three days, while larger residential or commercial decorating projects may take longer. We'll provide a clear schedule before work begins.",
    },
    {
      question: "Do I need to prepare my property before you arrive?",
      answer:
        "We handle most of the preparation, including protecting furniture and flooring, filling cracks, sanding surfaces, and masking fixtures. We simply recommend removing valuable or fragile items before work starts.",
    },
    {
      question: "Why choose Bilal Painting & Decorating?",
      answer:
        "With over 14 years of experience, trusted paint brands, high-quality materials, skilled craftsmanship, and a commitment to customer satisfaction, we deliver reliable painting and decorating services that homeowners and businesses can trust.",
    },
    {
      question: "How can I book a painting consultation?",
      answer:
        "Simply call us, send a WhatsApp message, or complete our online contact form to arrange your free quotation. Our friendly team will discuss your project and schedule a convenient site visit.",
    },
  ];

  for (const [index, faq] of faqs.entries()) {
    await prisma.faq.create({ data: { ...faq, order: index } });
  }

  console.log("✅ Faq seeded.");
}

async function seedContactInfo() {
  const existing = await prisma.contactInfo.findFirst();
  if (existing) {
    console.log("↷ ContactInfo already seeded, skipping.");
    return;
  }

  await prisma.contactInfo.create({
    data: {
      phone: "+44 7722186708",
      phoneDisplay: "07722186708",
      email: "Bilal_naseer86@icloud.com",
      whatsapp: "447722186708",
      whatsappMessage:
        "Hello! I'd like to get a free quote for painting and decorating.",
      addressStreet: "23 Farnhurst Road",
      addressCity: "Birmingham",
      addressCounty: "West Midlands",
      addressPostcode: "B36 8HS",
      addressCountry: "United Kingdom",
      freeQuoteRadius: "5",
    },
  });

  console.log("✅ ContactInfo seeded.");
}

async function main() {
  console.log("🌱 Seeding database…\n");

  await seedAdminUser();
  await seedHero();
  await seedAbout();
  await seedServices();
  await seedWhyChooseUs();
  await seedPortfolio();
  await seedTransformations();
  await seedFaqs();
  await seedContactInfo();

  console.log("\n🌱 Seed complete. (No testimonials seeded — that section has no content yet.)");
}

main()
  .catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
