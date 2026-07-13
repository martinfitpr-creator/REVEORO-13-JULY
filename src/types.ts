export interface AgencyContent {
  whatsappNumber: string;
  agencyName: string;
  hero: {
    tagline: string;
    headline: string;
    subheadline: string;
    ctaText: string;
  };
  whyChooseUs: {
    sectionHeadline: string;
    sectionSubheadline: string;
    cards: Array<{
      id: string;
      title: string;
      description: string;
      icon: "layout" | "zap" | "target";
    }>;
    ctaText: string;
  };
  whatWeDo: {
    sectionHeadline: string;
    sectionSubheadline: string;
    cards: Array<{
      id: string;
      title: string;
      description: string;
      badge: string;
    }>;
  };
  process: {
    sectionHeadline: string;
    sectionSubheadline: string;
    steps: Array<{
      stepNumber: string;
      title: string;
      description: string;
    }>;
    ctaText: string;
  };
  socialProof: {
    headline: string;
    subheadline: string;
    metrics: Array<{
      id: string;
      value: string;
      label: string;
    }>;
    ctaText: string;
  };
  finalCta: {
    headline: string;
    subheadline: string;
    ctaText: string;
  };
}

export const defaultContent: AgencyContent = {
  whatsappNumber: "0713315825",
  agencyName: "revero",
  hero: {
    tagline: "NEXT-GEN WEB DEVELOMENT & DESIGN",
    headline: "Professional Websites That Turn Visitors Into Customers.",
    subheadline: "We design and build modern, high-converting websites for businesses that want to look credible, attract more leads, and grow online.",
    ctaText: "Chat on WhatsApp",
  },
  whyChooseUs: {
    sectionHeadline: "Why High-Growth Businesses Partner With Us",
    sectionSubheadline: "We don't just build sites that look beautiful; we construct digital assets engineered for maximum conversions.",
    cards: [
      {
        id: "why-1",
        title: "Custom website design tailored to your business",
        description: "Zero generic templates. Your website's layout, structure, and visual narrative are built specifically to command attention in your niche.",
        icon: "layout"
      },
      {
        id: "why-2",
        title: "Mobile-optimized and lightning-fast performance",
        description: "Engineered with modern frameworks for sub-second speeds. Your visitors stay engaged, and search engines rank you at the very top.",
        icon: "zap"
      },
      {
        id: "why-3",
        title: "Built to convert visitors into customers",
        description: "Strategic messaging, clear user journeys, and dynamic layouts intentionally designed to guide prospects toward action instantly.",
        icon: "target"
      },
    ],
    ctaText: "Get Your Website on WhatsApp",
  },
  whatWeDo: {
    sectionHeadline: "Crafted Solutions Built for Impact",
    sectionSubheadline: "Every business deserves a distinctive online presence. Here is how we make you stand out from the competition.",
    cards: [
      {
        id: "wwd-1",
        title: "Website Design",
        description: "Bespoke, visual identity system and UI layout optimized for premium clarity and trust.",
        badge: "UX / UI"
      },
      {
        id: "wwd-2",
        title: "Website Development",
        description: "Pristine, lightning-fast React implementation conforming to elite web standards.",
        badge: "CODE"
      },
      {
        id: "wwd-3",
        title: "Landing Pages",
        description: "Super-focused single layouts built specifically to maximize campaign marketing ROI.",
        badge: "LEAD GEN"
      },
      {
        id: "wwd-4",
        title: "Website Redesigns",
        description: "Elevate your existing digital infrastructure with premium modern design & speed upgrades.",
        badge: "RELOAD"
      },
      {
        id: "wwd-5",
        title: "Business Websites",
        description: "Complete modern websites establishing absolute corporate credibility and authority.",
        badge: "SME"
      },
      {
        id: "wwd-6",
        title: "Conversion Optimization",
        description: "In-depth user flow optimization targeting maximum engagement and lead acquisition rates.",
        badge: "ROI+"
      },
    ],
  },
  process: {
    sectionHeadline: "A Frictionless Path to Launch",
    sectionSubheadline: "No endless meetings, no multi-month waits. Just a streamlined collaborative workflow built around your speed.",
    steps: [
      {
        stepNumber: "01",
        title: "Message us on WhatsApp",
        description: "Click any button on this site to start an instant discussion. No complex forms; just real, high-quality agency support from day one.",
      },
      {
        stepNumber: "02",
        title: "We understand your business and goals",
        description: "Through quick text exchange or a call, we map out your target audience, value proposition, structure requirements, and branding style.",
      },
      {
        stepNumber: "03",
        title: "We design and launch your website",
        description: "We ship a gorgeous, mobile-responsive website optimized for your niche, integrate your conversions tracker, and take it live.",
      },
    ],
    ctaText: "Start Your Project",
  },
  socialProof: {
    headline: "Helping Businesses Build Their Online Presence",
    subheadline: "Establishing global digital authority with interactive tracking and transparent operating standards.",
    metrics: [
      { id: "stat-1", value: "98.7%", label: "Client Satisfaction" },
      { id: "stat-2", value: "120+", label: "Websites Launched" },
      { id: "stat-3", value: "4.1x", label: "Average Traffic Boost" },
      { id: "stat-4", value: "< 14 Days", label: "Average Turnaround" }
    ],
    ctaText: "Let's Talk on WhatsApp",
  },
  finalCta: {
    headline: "Ready for a Website That Works for Your Business?",
    subheadline: "Let's discuss your project on WhatsApp right now and see how we can turn your digital vision into a conversion machine.",
    ctaText: "Chat on WhatsApp",
  },
};
