import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Smartphone,
  ShoppingCart,
  Lock,
  Bot,
  TrendingUp,
  ArrowRight,
  ArrowUpRight,
  MessageSquare,
  Sparkles,
  ChevronDown,
  HelpCircle,
  Check
} from "lucide-react";
import { AgencyContent, defaultContent } from "./types";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import { useCurrency } from "@/hooks/use-currency";
import ContentEditor from "./components/ContentEditor";
import { LogoCloud } from "@/components/ui/logo-cloud-3";
import { TestimonialsColumns } from "@/components/ui/testimonials-columns-1";
import { Calendar } from "@/components/ui/calendar";
import { Text_03 } from "@/components/ui/wave-text";
import { MenuToggle } from "@/components/ui/menu-toggle";
import { NavHeader } from "@/components/ui/nav-header";
import { Pricing } from "@/components/ui/pricing";
import { Component as YellowGlowBackground } from "@/components/ui/background-components";
import { Component as BlueGlowBackground } from "@/components/ui/demo";
import { AuroraBackground } from "@/components/ui/aurora-background";

export default function App() {
  // Ultra-clean Custom History Router supporting '/' and '/pricing'
  const [activeView, setActiveView] = useState<"home" | "pricing" | "work">(() => {
    if (window.location.pathname === "/pricing") return "pricing";
    if (window.location.pathname === "/work") return "work";
    return "home";
  });

  // Mobile menu open state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Currency detection for pricing teaser section
  const { currency, isLoading: currencyLoading } = useCurrency();

  // Dynamic state for editable website content
  const [content, setContent] = useState<AgencyContent>(() => {
    try {
      const saved = localStorage.getItem("revero_agency_content");
      return saved ? JSON.parse(saved) : defaultContent;
    } catch {
      return defaultContent;
    }
  });

  // Keep localStorage updated
  useEffect(() => {
    localStorage.setItem("revero_agency_content", JSON.stringify(content));
  }, [content]);

  // Sync state with history actions (popstate)
  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname === "/pricing") setActiveView("pricing");
      else if (window.location.pathname === "/work") setActiveView("work");
      else setActiveView("home");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Custom Navigation function to change routes reactively
  const handleNavigate = (view: "home" | "pricing" | "work", sectionId?: string) => {
    setIsMobileMenuOpen(false);
    setActiveView(view);
    const path = view === "pricing" ? "/pricing" : view === "work" ? "/work" : "/";
    window.history.pushState(null, "", path);

    // Update document head attributes dynamically for superior SEO
    if (view === "pricing") {
      document.title = "Pricing | Revero Digital — Websites from R1,000 | South Africa";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          "content",
          "Transparent website pricing for South African businesses. Starter from R1,000 (71% off). Growth from R3,500 (50% off). Custom builds available. No hidden fees."
        );
      }
    } else {
      document.title = "Revero Digital | Professional Websites for South African Businesses";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          "content",
          "Revero Digital builds modern, high-converting websites for small and local businesses in South Africa. Starting from R1,000. Based in Sandton, Johannesburg."
        );
      }
    }

    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 150);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all custom text to original default values?")) {
      setContent(defaultContent);
    }
  };

  const handleCtaClick = () => {
    window.open(
      `https://wa.me/${content.whatsappNumber}?text=Hi%20Revero%2C%20I%27m%20interested%20in%20a%23website%20for%20my%20business.`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // Helper to map generic lucide icons
  const getServiceIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case "landing pages":
      case "globe":
        return <Globe className="w-5 h-5 text-black group-hover:scale-110 transition-transform" />;
      case "business websites":
      case "smartphone":
        return <Smartphone className="w-5 h-5 text-black group-hover:scale-110 transition-transform" />;
      case "e-commerce stores":
      case "shoppingcart":
        return <ShoppingCart className="w-5 h-5 text-black group-hover:scale-110 transition-transform" />;
      case "web applications":
      case "lock":
        return <Lock className="w-5 h-5 text-black group-hover:scale-110 transition-transform" />;
      case "ai & automation":
      case "bot":
        return <Bot className="w-5 h-5 text-black group-hover:scale-110 transition-transform" />;
      case "seo & growth":
      case "trendingup":
        return <TrendingUp className="w-5 h-5 text-black group-hover:scale-110 transition-transform" />;
      default:
        return <Globe className="w-5 h-5 text-black" />;
    }
  };

  const testimonials = [
    {
      text: "Revero built our website in under a week. We started getting WhatsApp inquiries from new customers within days of going live.",
      name: "Thabo M.",
      role: "Owner, TM Auto Repairs — Soweto, SA",
    },
    {
      text: "Our salon finally looks professional online. Clients book appointments directly from the site now. Best R1,000 we've ever spent.",
      name: "Naledi K.",
      role: "Owner, Naledi's Beauty Studio — Pretoria, SA",
    },
    {
      text: "They understood exactly what a small business in SA needs — simple, fast, and on Google. No bloated agency fees.",
      name: "Sipho D.",
      role: "Director, SD Logistics — Durban, SA",
    },
    {
      text: "We had zero online presence before Revero. Now we rank on the first page of Google for our services in Sandton.",
      name: "Ayanda P.",
      role: "Practice Manager, AP Physiotherapy — Sandton, SA",
    },
    {
      text: "Fast turnaround, clean design, and they actually answer their WhatsApp. Refreshing to work with.",
      name: "Zanele B.",
      role: "Founder, ZB Creative Studio — Cape Town, SA",
    },
    {
      text: "Our new site converts so much better than our old one. The mobile experience is night and day.",
      name: "Marcus T.",
      role: "CEO, TechFlow Solutions — Johannesburg, SA",
    },
    {
      text: "Revero delivered a clean, professional site that matches the quality of US agencies — at a fraction of the cost.",
      name: "David R.",
      role: "Owner, Premier Cleaning Co. — Atlanta, USA",
    },
    {
      text: "Working with a team in SA was seamless. They're efficient, creative, and incredibly responsive.",
      name: "Jennifer L.",
      role: "Founder, Lumen Skincare — New York, USA",
    },
    {
      text: "Top-tier quality and communication. Our new landing page has already doubled our lead conversion rate.",
      name: "Michael B.",
      role: "Director, BluePeak Consulting — Los Angeles, USA",
    },
  ];

  const pricingFaqs = [
    {
      q: "Do I pay anything monthly?",
      a: "No. All our packages are one-time payments. You only pay for hosting (typically R150–R250/month through a local provider) if you don't already have it — we'll guide you.",
    },
    {
      q: "How fast will my website be live?",
      a: "Starter sites: 24 hours. Growth sites: 3 days. Custom builds: scoped per project.",
    },
    {
      q: "Do I need to provide photos or content?",
      a: "Not necessarily. We source free professional photos via Unsplash for your industry. For Growth clients, we also write starter copy.",
    },
    {
      q: "Can I upgrade my plan later?",
      a: "Yes. You only pay the difference between plans. We make it seamless.",
    },
    {
      q: "Do you work with businesses outside South Africa?",
      a: "Yes — we work with clients in SA, Botswana, Lesotho, the UK, and the USA.",
    },
    {
      q: "What payment methods do you accept?",
      a: "EFT, PayShap, and card payments. US/UK clients can pay via PayPal or Wise.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-white text-black font-sans overflow-x-hidden selection:bg-black/10 selection:text-black" id="revero-agency">

      {/* Grid overlay background */}
      <div className="absolute inset-0 grid-overlay z-0 pointer-events-none" id="grid-sheet" />

      {/* Header and Pill Navigation Wrapper */}
      <header className="fixed top-0 w-full h-16 bg-white/80 backdrop-blur-md border-b border-[#E5E5E5] z-50 flex items-center justify-between px-6 select-none" id="navigation-bar">
        {/* Left Side: Brand wordmark + indicator dot */}
        <button
          onClick={() => handleNavigate("home")}
          className="flex items-center gap-2 cursor-pointer focus:outline-none"
        >
          <span className="text-lg font-black tracking-tight text-[#000000] lowercase font-sans flex items-baseline gap-0.5">
            {content.agencyName.toLowerCase()}
            <span className="inline-block w-1 h-1 rounded-full bg-neutral-400"></span>
          </span>
        </button>

        {/* Center: Desktop-only sliding Pill NavHeader */}
        <div className="hidden md:block">
          <NavHeader activeView={activeView} onNavigate={handleNavigate} />
        </div>

        {/* Right Side: CTA Button or Mobile Menu Toggle */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Direct Call link - No emojis, visible on all screens */}
          <div className="flex items-center text-xs font-sans">
            <a
              href="tel:+27713315825"
              className="text-neutral-800 hover:text-black transition-colors font-bold px-3 py-1.5 rounded-full hover:bg-neutral-100/80 font-mono text-xs sm:text-sm"
              title="Call 071 331 5825 directly"
            >
              <span>071 331 5825</span>
            </a>
          </div>

          <button
            onClick={handleCtaClick}
            className="hidden md:inline-flex items-center gap-1 bg-black hover:bg-neutral-800 text-white font-mono text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-full shadow-sm transition-all focus:outline"
          >
            <span>LET'S TALK</span>
            <ArrowUpRight size={12} />
          </button>

          {/* Mobile hamburger toggle */}
          <div className="block md:hidden border border-[#E5E5E5] p-2 rounded-full bg-white">
            <MenuToggle isOpen={isMobileMenuOpen} toggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
          </div>
        </div>
      </header>

      {/* Mobile navigation sliding drawer overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-16 bg-white z-40 flex flex-col items-center justify-center gap-8 text-center text-black"
            id="mobile-nav-panel"
          >
            {[
              { id: "home", label: "Home" },
              { id: "work", label: "Work" },
              { id: "services", label: "Services" },
              { id: "pricing", label: "Pricing" },
              { id: "testimonials", label: "Testimonials" },
              { id: "contact", label: "Contact" },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  if (link.id === "pricing") {
                    handleNavigate("pricing");
                  } else if (link.id === "work") {
                    handleNavigate("work");
                  } else {
                    handleNavigate("home", link.id === "home" ? undefined : link.id);
                  }
                }}
                className="text-2xl font-black uppercase tracking-widest text-black hover:text-[#6B6B6B] transition-colors font-sans cursor-pointer focus:outline-none"
              >
                {link.label}
              </button>
            ))}

            <button
              onClick={handleCtaClick}
              className="mt-4 bg-black text-white py-3 px-8 rounded-full text-sm font-mono font-bold uppercase tracking-widest flex items-center gap-2 cursor-pointer shadow-md"
            >
              <span>CHAT ON WHATSAPP</span>
              <MessageSquare size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* VIEW CONDITIONAL RENDERING */}
      {activeView === "home" ? (
        <div className="pt-16" id="home-view-container">
          {/* HERO SECTION */}
          <AuroraBackground className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white" id="home">
            <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col items-center justify-center text-center space-y-8 w-full">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                className="text-4xl sm:text-7xl font-black tracking-tight text-black max-w-4xl leading-tight font-sans uppercase"
              >
                STOP LOSING CLIENTS TO COMPETITORS WITH <Text_03 text="BETTER WEBSITES." className="font-black text-black" />
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
                className="text-[#6B6B6B] text-base md:text-lg max-w-2xl leading-relaxed"
              >
                {content.hero.subheadline}
              </motion.p>

              {/* CTA GRID */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
                className="flex flex-col sm:flex-row items-center gap-4 mt-4"
              >
                <button
                  onClick={handleCtaClick}
                  className="w-full sm:w-auto bg-black hover:bg-neutral-800 text-white font-mono text-xs font-bold uppercase tracking-widest px-8 py-4.5 rounded-full flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
                >
                  <span>CHAT ON WHATSAPP</span>
                  <ArrowRight size={14} />
                </button>
                <button
                  onClick={() => handleNavigate("pricing")}
                  className="w-full sm:w-auto bg-white hover:bg-neutral-50 text-black border-2 border-black font-mono text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-full flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <span>VIEW PRICING</span>
                </button>
              </motion.div>
            </div>

            {/* Bouncing scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce pointer-events-none z-10">
              <ChevronDown size={18} className="text-[#6B6B6B]" />
            </div>
          </AuroraBackground>

          {/* LOGO CLOUD SECTION */}
          <section className="relative z-10 py-12" id="logos">
            <LogoCloud />
          </section>

          {/* SERVICES SECTION */}
          <section className="relative z-10 max-w-6xl mx-auto px-6 py-24 space-y-16 border-t border-[#E5E5E5]/60" id="services">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-center space-y-3"
            >
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#6B6B6B] uppercase">SERVICES</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-black font-sans tracking-tight">
                What We <Text_03 text="Build" />
              </h2>
              <p className="text-[#6B6B6B] text-sm md:text-base max-w-2xl mx-auto">
                From simple landing pages to complex web apps — we've got you covered.
              </p>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.18
                  }
                }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              id="services-grid"
            >
              {content.whatWeDo.cards.map((card) => {
                const serviceIcons = ["Globe", "Smartphone", "ShoppingCart", "Lock", "Bot", "TrendingUp"];
                const iconComponent = getServiceIcon(card.title);
                return (
                  <motion.div
                    key={card.id}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
                    }}
                    className="p-8 bg-[#F5F5F5] border border-[#E5E5E5] rounded-2xl flex flex-col justify-between hover:bg-black hover:text-white group transition-all duration-300 select-none hover:scale-[1.02] shadow-sm cursor-pointer"
                    onClick={handleCtaClick}
                  >
                    <div>
                      <div className="w-10 h-10 bg-white border border-[#E5E5E5] rounded-xl flex items-center justify-center text-black mb-6">
                        {iconComponent}
                      </div>
                      <h3 className="text-lg font-bold mb-3">{card.title}</h3>
                      <p className="text-xs text-[#6B6B6B] group-hover:text-white/70 leading-relaxed">
                        {card.description}
                      </p>
                    </div>

                    <div className="pt-8 flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider uppercase">
                      <span>Learn More</span>
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </section>

          {/* HOME PAGE PRICING TEASER SECTION */}
          <section className="relative z-10 max-w-6xl mx-auto px-6 py-24 space-y-16 border-t border-b border-[#E5E5E5]/60" id="pricing-teaser">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-center space-y-3"
            >
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#6B6B6B] uppercase">TEASER</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-black font-sans tracking-tight">Simple, Transparent Pricing</h2>
              <p className="text-[#6B6B6B] text-sm md:text-base max-w-2xl mx-auto">Affordable websites built for South African businesses. No hidden fees.</p>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.22
                  }
                }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            >
              {/* Card 1 — STARTER */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="bg-[#F5F5F5] border border-[#E5E5E5] rounded-2xl p-8 hover:border-black transition-all flex flex-col justify-between shadow-sm relative"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                     <span className="text-[10px] font-mono font-bold tracking-widest text-[#6B6B6B] uppercase">01 / MODEL</span>
                    <span className="bg-black text-white text-[9px] font-mono font-bold tracking-wider rounded-full px-2.5 py-0.5 uppercase">60% OFF</span>
                  </div>
                  <h3 className="text-2xl font-black text-black">STARTER</h3>
                  <p className="text-xs text-[#6B6B6B]">Best for startups & simple landing showcases.</p>
                  
                  <div className="py-4 border-y border-[#E5E5E5]/60 flex items-baseline gap-2">
                    <span className="text-sm line-through text-[#6B6B6B] font-mono">{currencyLoading ? "…" : currency.format(currency.starterWas)}</span>
                    <span className="text-4xl font-black text-black">{currencyLoading ? "…" : currency.format(currency.starterPrice)}</span>
                  </div>
                  <p className="text-[10px] text-[#6B6B6B] font-mono">One-time payment.</p>
                </div>
                <button
                  onClick={() => handleNavigate("pricing")}
                  className="w-full mt-8 py-3 bg-[#000000] text-white hover:bg-neutral-800 transition-all rounded-full font-mono text-xs font-bold uppercase tracking-widest cursor-pointer"
                >
                  VIEW PACKAGE
                </button>
              </motion.div>

              {/* Card 2 — GROWTH */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="bg-[#F5F5F5] border-2 border-black rounded-2xl p-8 hover:scale-[1.01] transition-all flex flex-col justify-between shadow-md relative"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-black uppercase">02 / MODEL</span>
                    <span className="bg-black text-white text-[9px] font-mono font-bold tracking-wider rounded-full px-2.5 py-0.5 uppercase">56% OFF</span>
                  </div>
                  <h3 className="text-2xl font-black text-black">GROWTH</h3>
                  <p className="text-xs text-[#6B6B6B]">Most popular professional corporate business setups.</p>
                  
                  <div className="py-4 border-y border-[#E5E5E5]/60 flex items-baseline gap-2">
                    <span className="text-sm line-through text-[#6B6B6B] font-mono">{currencyLoading ? "…" : currency.format(currency.growthWas)}</span>
                    <span className="text-4xl font-black text-black">{currencyLoading ? "…" : currency.format(currency.growthPrice)}</span>
                  </div>
                  <p className="text-[10px] text-[#6B6B6B] font-mono">One-time payment.</p>
                </div>
                <button
                  onClick={() => handleNavigate("pricing")}
                  className="w-full mt-8 py-3.5 bg-black text-white hover:bg-neutral-800 transition-all rounded-full font-mono text-xs font-bold uppercase tracking-widest cursor-pointer"
                >
                  VIEW PACKAGE
                </button>
              </motion.div>

              {/* Card 3 — CUSTOM BUILD */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="bg-[#F5F5F5] border border-[#E5E5E5] rounded-2xl p-8 hover:border-black transition-all flex flex-col justify-between shadow-sm relative"
              >
                <div className="space-y-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#6B6B6B] uppercase">03 / SPECIALIST</span>
                  </div>
                  <h3 className="text-2xl font-black text-black">CUSTOM BUILD</h3>
                  <p className="text-xs text-[#6B6B6B]">For custom applications, booking engines & enterprise solutions.</p>
                  
                  <div className="py-4 border-y border-[#E5E5E5]/60 flex items-baseline">
                    <span className="text-3xl font-black text-black">Get a Quote</span>
                  </div>
                  <p className="text-[10px] text-[#6B6B6B] font-mono">Pay on milestone delivery.</p>
                </div>
                <button
                  onClick={handleCtaClick}
                  className="w-full mt-8 py-3 bg-[#F5F5F5] text-black border border-black/30 hover:bg-black hover:text-white transition-all rounded-full font-mono text-xs font-bold uppercase tracking-widest cursor-pointer"
                >
                  TALK TO FOUNDER
                </button>
              </motion.div>
            </motion.div>

            <div className="text-center pt-6">
              <button
                onClick={() => handleNavigate("pricing")}
                className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-widest text-black underline hover:text-[#6B6B6B] cursor-pointer"
              >
                <span>View all features →</span>
              </button>
            </div>
          </section>

          {/* TESTIMONIALS SECTION */}
          <section className="relative z-10 py-24 bg-white border-t border-[#E5E5E5]/60" id="testimonials">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-6xl mx-auto px-6 mb-16 space-y-4 text-center"
            >
              <div className="inline-flex items-center gap-2 border border-black/10 bg-[#F5F5F5] rounded-full px-4 py-1.5 shadow-sm">
                <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-black uppercase">
                  CLIENT RESULTS
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-black font-sans tracking-tight">
                What Our Clients <Text_03 text="Say" />
              </h2>
              <p className="text-[#6B6B6B] text-sm md:text-base max-w-2xl mx-auto font-medium">Real South African businesses. Real results.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <TestimonialsColumns testimonials={testimonials} />
            </motion.div>
          </section>

          {/* CALENDAR & CONTACT CONSOLE */}
          <section className="relative z-10 max-w-6xl mx-auto px-6 py-24 border-t border-[#E5E5E5]/60" id="contact">
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.3
                  }
                }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              {/* Left Column Text */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="space-y-8"
              >
                <div className="space-y-3">
                  <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#6B6B6B] uppercase block">
                    FREE CONSULTATION
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight text-black leading-tight">
                    Let's Talk About Your Business
                  </h2>
                  <p className="text-[#6B6B6B] text-sm md:text-base leading-relaxed">
                    Tell us about your goals and we'll recommend the right solution. No commitment required. Let's arrange a quick 30-minute text session or call!
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 border-t border-[#E5E5E5]/60 pt-8" id="stats-inline">
                  <div>
                    <h4 className="text-2xl font-black text-black">50+</h4>
                    <p className="text-[10px] text-[#6B6B6B] uppercase font-mono tracking-wider">Sites Built</p>
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-black">24-Hr</h4>
                    <p className="text-[10px] text-[#6B6B6B] uppercase font-mono tracking-wider">Avg. Delivery</p>
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-black">100%</h4>
                    <p className="text-[10px] text-[#6B6B6B] uppercase font-mono tracking-wider">SA-Based Team</p>
                  </div>
                </div>
              </motion.div>

              {/* Right Column Calendar Card */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="relative"
              >
                <Calendar />
              </motion.div>
            </motion.div>
          </section>

        </div>
      ) : activeView === "work" ? (
        /* WORK / PORTFOLIO PAGE */
        <div className="pt-24 bg-white min-h-screen" id="work-page-container">
          {/* Header */}
          <section className="relative z-10 max-w-6xl mx-auto px-6 text-center space-y-6 pt-12 pb-16">
            <div className="inline-flex items-center gap-2 border border-black/10 bg-[#F5F5F5] rounded-full px-4 py-1.5 shadow-sm">
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-black uppercase">Our Work</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-black leading-tight">
              Real Sites.<br />
              <span className="text-[#6B6B6B]">Real Clients.</span>
            </h1>
            <p className="text-[#6B6B6B] text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-medium">
              Explore live websites we've designed and built for businesses across South Africa and the USA. Every project is crafted for speed, conversions, and a premium first impression.
            </p>
          </section>

          {/* Portfolio Grid */}
          <section className="relative z-10 max-w-7xl mx-auto px-6 pb-24" id="portfolio-grid">
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.07 } }
              }}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[
                { url: "https://axelslandscapingdesign.com", name: "Axel's Landscaping", tag: "Landscaping & Design" },
                { url: "https://rdperezconstruction.com", name: "RD Perez Construction", tag: "Construction" },
                { url: "https://canosteelinc.com", name: "Cano Steel Inc.", tag: "Steel & Manufacturing" },
                { url: "https://clearandbrightsolutions.com", name: "Clear & Bright Solutions", tag: "Cleaning Services" },
                { url: "https://alexandersafetysolutions.com", name: "Alexander Safety", tag: "Safety Solutions" },
                { url: "https://rooferzcorp.com", name: "Rooferzco Corp", tag: "Roofing" },
                { url: "https://leongtoroofing.com", name: "Leong To Roofing", tag: "Roofing" },
                { url: "https://allcityjanitorialservice.com", name: "All City Janitorial", tag: "Janitorial Services" },
                { url: "https://patiencegas.netlify.app", name: "Patience Gas", tag: "Gas Supply" },
                { url: "https://patiencewigs.netlify.app", name: "Patience Wigs", tag: "Beauty & Wigs" },
                { url: "https://nrsdemo.netlify.app", name: "NRS Demo", tag: "Corporate" },
                { url: "https://delta-thatch.netlify.app", name: "Delta Thatch", tag: "Thatching & Construction" },
                { url: "https://coglancontruction.netlify.app", name: "Coglan Construction", tag: "Construction" },
              ].map((site, i) => {
                const domain = site.url.replace(/^https?:\/\//, "");
                return (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 24 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } }
                    }}
                    className="group relative flex flex-col rounded-2xl border border-[#E5E5E5] bg-[#F5F5F5] overflow-hidden shadow-sm hover:shadow-lg hover:border-black/20 transition-all duration-300"
                  >
                    {/* Live iframe preview */}
                    <div className="relative w-full bg-[#EBEBEB] overflow-hidden" style={{ height: "220px" }}>
                      <div className="absolute inset-0 scale-[0.5] origin-top-left" style={{ width: "200%", height: "200%" }}>
                        <iframe
                          src={site.url}
                          title={site.name}
                          loading="lazy"
                          scrolling="no"
                          className="w-full h-full border-0 pointer-events-none"
                          style={{ minHeight: "440px" }}
                        />
                      </div>
                      {/* Overlay to capture clicks for the link */}
                      <a
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 z-10"
                        aria-label={`Visit ${site.name}`}
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300 z-20 pointer-events-none" />
                      {/* Live badge */}
                      <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm border border-[#E5E5E5] rounded-full px-2.5 py-1 shadow-sm pointer-events-none">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[9px] font-mono font-bold text-black uppercase tracking-wider">Live</span>
                      </div>
                    </div>

                    {/* Card info */}
                    <div className="p-5 flex flex-col gap-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-sm font-black text-black tracking-tight">{site.name}</h3>
                          <p className="text-[10px] font-mono text-[#6B6B6B] uppercase tracking-wider mt-0.5">{site.tag}</p>
                        </div>
                        <a
                          href={site.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 w-7 h-7 rounded-full bg-black text-white flex items-center justify-center hover:bg-neutral-700 transition-colors"
                          aria-label={`Open ${site.name}`}
                        >
                          <ArrowUpRight size={12} />
                        </a>
                      </div>
                      <p className="text-[10px] font-mono text-[#9B9B9B] truncate">{domain}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </section>

          {/* CTA strip */}
          <section className="relative z-10 bg-black text-white py-20 text-center px-6" id="work-cta-strip">
            <div className="max-w-3xl mx-auto space-y-6">
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-white/50 uppercase">Want to be next?</span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                Let's build something great together.
              </h2>
              <p className="text-white/60 text-sm max-w-xl mx-auto">
                Chat with us on WhatsApp and we'll have your site live in as little as 3 days.
              </p>
              <div className="pt-4 flex items-center justify-center gap-4 flex-wrap">
                <button
                  onClick={handleCtaClick}
                  className="bg-white hover:bg-neutral-100 text-black py-4 px-8 rounded-full text-xs font-mono font-bold uppercase tracking-widest cursor-pointer shadow-md inline-flex items-center gap-2 transition-all"
                >
                  <span>CHAT ON WHATSAPP</span>
                  <ArrowRight size={13} />
                </button>
                <button
                  onClick={() => handleNavigate("pricing")}
                  className="border border-white/30 hover:border-white text-white py-4 px-8 rounded-full text-xs font-mono font-bold uppercase tracking-widest cursor-pointer inline-flex items-center gap-2 transition-all"
                >
                  <span>VIEW PRICING</span>
                </button>
              </div>
            </div>
          </section>
        </div>
      ) : (
        /* PRICING STANDALONE PAGE */
        <div className="pt-24 bg-white" id="pricing-page-container">
          
          {/* Header */}
          <section className="relative z-10 max-w-6xl mx-auto px-6 text-center space-y-6 pt-12 pb-16">
            <div className="inline-flex items-center gap-2 border border-black/10 bg-[#F5F5F5] rounded-full px-4 py-1.5 shadow-sm">
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-black uppercase">
                PRICING
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-black leading-tight">
              Honest Pricing.<br />
              <span className="text-[#6B6B6B]">No Hidden Fees.</span>
            </h1>

            <p className="text-[#6B6B6B] text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-medium">
              We believe every South African business deserves a great website. That's why we've made ours accessible.
            </p>
          </section>

          {/* Discount Bar */}
          <div className="w-full bg-black text-white py-3 px-6 text-center text-xs font-mono font-bold tracking-widest uppercase">
            🎉 Limited-time launch pricing — Up to 71% off. Lock in your rate before it ends.
          </div>

          {/* MAIN DYNAMIC PRICING SYSTEM PORTAL */}
          <section className="relative z-10 max-w-6xl mx-auto px-6 py-20" id="pricing-system-wrapper">
            <Pricing />
          </section>

          {/* TRUST STATS BAR */}
          <section className="relative z-10 max-w-4xl mx-auto px-6 py-12 border-t border-[#E5E5E5]/60">
            <div className="grid grid-cols-3 gap-6 text-center" id="trust-stats-bar">
              <div>
                <h4 className="text-2xl md:text-4xl font-black text-black">50+</h4>
                <p className="text-xs text-[#6B6B6B] font-mono uppercase tracking-wider mt-1">Websites Built</p>
              </div>
              <div>
                <h4 className="text-2xl md:text-4xl font-black text-black">3-Day</h4>
                <p className="text-xs text-[#6B6B6B] font-mono uppercase tracking-wider mt-1">Avg. Delivery</p>
              </div>
              <div>
                <h4 className="text-2xl md:text-4xl font-black text-black">SA</h4>
                <p className="text-xs text-[#6B6B6B] font-mono uppercase tracking-wider mt-1">Owned & Operated</p>
              </div>
            </div>
          </section>

          {/* DYNAMIC FAQ ACCORDION SECTION */}
          <section className="relative z-10 max-w-4xl mx-auto px-6 py-20 border-t border-[#E5E5E5]/60" id="pricing-faqs">
            <div className="text-center space-y-4 mb-16">
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#6B6B6B] uppercase">KNOWLEDGE BASE</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-black">Common Questions</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="faqs-grid">
              {pricingFaqs.map((faq, i) => (
                <div key={i} className="p-6 bg-[#F5F5F5] border border-[#E5E5E5] rounded-2xl space-y-2.5 shadow-sm text-black">
                  <h4 className="text-xs font-mono font-bold text-black uppercase tracking-wider flex items-center gap-2">
                    <HelpCircle size={13} className="text-[#6B6B6B]" />
                    <span>{faq.q}</span>
                  </h4>
                  <p className="text-xs text-[#6B6B6B] leading-relaxed pl-5 font-sans">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA STRIP (BOTTOM OF PRICING PAGE) */}
          <section className="relative z-10 bg-white text-black py-24 text-center px-6 border-t border-[#E5E5E5]/60" id="pricing-cta-strip">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight text-black">
                Not sure which plan is right for you?
              </h2>
              <p className="text-[#6B6B6B] text-sm max-w-xl mx-auto">
                Chat with us on WhatsApp and we'll help you decide — no pressure, no jargon.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleCtaClick}
                  className="bg-black hover:bg-neutral-800 text-white py-4 px-8 rounded-full text-xs font-mono font-bold uppercase tracking-widest cursor-pointer shadow-md inline-flex items-center gap-2 transition-all duration-200"
                >
                  <span>CHAT ON WHATSAPP</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </section>

        </div>
      )}

      {/* FOOTER */}
      <footer className="relative z-10 bg-[#F5F5F5] border-t border-[#E5E5E5] py-20 px-6 font-sans select-none text-black" id="site-footer">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-black mb-12">
          {/* Col 1 — Brand Column */}
          <div className="space-y-4">
            <span className="text-xl font-black tracking-tight lowercase flex items-baseline gap-0.5">
              {content.agencyName.toLowerCase()}
              <span className="inline-block w-1 h-1 rounded-full bg-neutral-400"></span>
            </span>
            <p className="text-xs text-[#6B6B6B] leading-relaxed max-w-xs">
              Web design & digital marketing agency based in Sandton, Johannesburg. We engineer premium digital platforms that convert.
            </p>
          </div>

          {/* Col 2 — Navigation Links Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest text-[#6B6B6B] uppercase">Navigation</h4>
            <div className="flex flex-col gap-2.5 text-xs text-black">
              <button onClick={() => handleNavigate("home")} className="text-left hover:underline cursor-pointer">Home</button>
              <button onClick={() => handleNavigate("work")} className="text-left hover:underline cursor-pointer">Work</button>
              <button onClick={() => handleNavigate("pricing")} className="text-left hover:underline cursor-pointer">Pricing</button>
              <button onClick={() => handleNavigate("home", "services")} className="text-left hover:underline cursor-pointer">Services</button>
              <button onClick={() => handleNavigate("home", "testimonials")} className="text-left hover:underline cursor-pointer">Testimonials</button>
              <button onClick={() => handleNavigate("home", "contact")} className="text-left hover:underline cursor-pointer">Contact</button>
            </div>
          </div>

          {/* Col 3 — Contact Columns */}
          <div className="space-y-4 font-sans">
            <h4 className="text-xs font-mono font-bold tracking-widest text-[#6B6B6B] uppercase">Get In Touch</h4>
            <div className="flex flex-col gap-2.5 text-xs text-[#6B6B6B] leading-relaxed">
              <p>📍 Sandton, Johannesburg, South Africa</p>
              <p>💬 WhatsApp: +27 71 331 5825</p>
              <p>📧 hello@reverodigital.co.za</p>
              <p>Instagram: @reverodigital</p>
            </div>
          </div>
        </div>

        {/* Bottom bar copyrights */}
        <div className="max-w-6xl mx-auto pt-8 border-t border-[#E5E5E5] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B6B6B]" id="footer-copyright-bar">
          <p>© 2025 Revero Digital. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* DEVELOPER CONTENT EDITOR CONTROL */}
      <ContentEditor
        content={content}
        onChange={setContent}
        onReset={handleReset}
      />

      {/* FLOATING WHATSAPP SIDE WIDGET */}
      <FloatingWhatsApp whatsappNumber={content.whatsappNumber} />

    </div>
  );
}
