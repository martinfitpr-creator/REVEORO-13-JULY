import React, { useState } from "react";
import { ArrowRight, MessageSquare, Globe, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCurrency, ALL_CURRENCIES, CurrencyCode } from "@/hooks/use-currency";

const CURRENCY_LABELS: Record<CurrencyCode, string> = {
  ZAR: "🇿🇦 ZAR",
  USD: "🇺🇸 USD",
  GBP: "🇬🇧 GBP",
  EUR: "🌍 EUR",
};

export function Pricing() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { currency, isLoading, overrideCurrency } = useCurrency();

  const starterWhatsApp = "https://wa.me/27713315825?text=Hi%20Revero%2C%20I%27d%20like%20the%20Starter%20website%20package.";
  const growthWhatsApp = "https://wa.me/27713315825?text=Hi%20Revero%2C%20I%27d%20like%20the%20Growth%20website%20package.";
  const customWhatsApp = "https://wa.me/27713315825?text=Hi%20Revero%2C%20I%27d%20like%20a%20quote%20for%20a%20custom%20build.";

  const plans = [
    {
      name: "STARTER",
      badge: "60% OFF — Limited Time",
      wasPrice: currency.format(currency.starterWas),
      nowPrice: currency.format(currency.starterPrice),
      desc: "Best for startups & new businesses needing a clean web presence.",
      cta: "Get Started",
      link: starterWhatsApp,
      features: [
        "Mobile-responsive design",
        "Up to 5 pages (Home, About, Services, etc.)",
        "Contact form with email notifications",
        "Google Maps integration",
        "Basic on-page SEO styling",
        "WhatsApp click-to-chat button",
        "Social media link integration",
        "24-hour delivery guaranteed",
        "Free domain setup assistance",
        "1 round of revisions included",
      ],
    },
    {
      name: "GROWTH",
      badge: "56% OFF — Most Popular",
      wasPrice: currency.format(currency.growthWas),
      nowPrice: currency.format(currency.growthPrice),
      desc: "Best for established businesses looking to gain leads and rank high.",
      cta: "Deploy Growth Package",
      link: growthWhatsApp,
      isPopular: true,
      features: [
        "Everything in Starter package",
        "Up to 10 professionally framed pages",
        "Custom animations (Framer Motion)",
        "Advanced SEO (Schema, sitemap, robots)",
        "Google Analytics 4 integration",
        "Page speed & Core Web Vitals optimized",
        "Blog or News module (up to 5 posts)",
        "Testimonials & customer reviews section",
        "Google Business Profile optimization",
        "Social media feed integration",
        "2 rounds of reviews included",
        "3-day premium delivery guaranteed",
        "Priority 48-hour response support",
        "Professional photo sourcing from Unsplash",
      ],
    },
    {
      name: "CUSTOM BUILD",
      badge: "Tailored to Fit",
      wasPrice: null,
      nowPrice: "Let's Talk",
      desc: "For interactive custom apps, full storefronts & custom systems.",
      cta: "Get a Custom Quote",
      link: customWhatsApp,
      features: [
        "E-Commerce store (Stripe / PayFast / Yoco)",
        "User logins & membership systems",
        "Interactive web apps & portals",
        "Online booking & calendar systems",
        "Client portals & gated downloads",
        "Headless CMS integration (Sanity / Prismic)",
        "Third-party API integrations",
        "AI-powered assistants & automation",
        "Robust database backend structure",
        "Complete source code ownership",
        "Dedicated project manager assistance",
        "Milestone-based payment structures",
      ],
    },
  ];

  return (
    <div className="space-y-12" id="full-pricing-portal">

      {/* Currency Selector */}
      <div className="flex items-center justify-center">
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            id="currency-selector-btn"
            className="flex items-center gap-2 bg-[#F5F5F5] border border-[#E5E5E5] hover:border-black/30 px-4 py-2.5 rounded-full shadow-sm transition-all text-xs font-mono font-bold tracking-wider text-black"
          >
            <Globe size={12} className="text-[#6B6B6B]" />
            <span>
              {isLoading ? "Detecting…" : CURRENCY_LABELS[currency.code]}
            </span>
            <ChevronDown
              size={12}
              className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-48 bg-white border border-[#E5E5E5] rounded-xl shadow-lg z-50 overflow-hidden"
                id="currency-dropdown"
              >
                <div className="p-1.5 space-y-0.5">
                  <p className="text-[9px] font-mono font-bold tracking-widest text-[#6B6B6B] uppercase px-2 pt-1 pb-0.5">
                    Select Currency
                  </p>
                  {ALL_CURRENCIES.map((code) => (
                    <button
                      key={code}
                      id={`currency-option-${code.toLowerCase()}`}
                      onClick={() => {
                        overrideCurrency(code);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-mono font-semibold transition-all ${
                        currency.code === code
                          ? "bg-black text-white"
                          : "text-black hover:bg-[#F5F5F5]"
                      }`}
                    >
                      <span>{CURRENCY_LABELS[code]}</span>
                      {currency.code === code && (
                        <span className="ml-auto text-[9px] text-white/70 font-normal">Auto</span>
                      )}
                    </button>
                  ))}
                </div>
                <div className="border-t border-[#E5E5E5] px-3 py-2">
                  <p className="text-[9px] text-[#9B9B9B] font-mono leading-tight">
                    {currency.flag} Prices shown in{" "}
                    <span className="font-bold text-black">{currency.code}</span> based on your location.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>


      {/* Location notice badge */}
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center"
        >
          <div className="flex items-center gap-2 bg-[#F5F5F5] border border-[#E5E5E5] rounded-full px-4 py-1.5 shadow-sm">
            <span className="text-base">{currency.flag}</span>
            <span className="text-[10px] font-mono text-[#6B6B6B]">
              Prices shown in <strong className="text-black">{currency.code}</strong> for{" "}
              <strong className="text-black">{currency.countryName}</strong>
            </span>
          </div>
        </motion.div>
      )}

      {/* Grid of plans */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto" id="plans-grid">
        {plans.map((plan, index) => {
          return (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`relative flex flex-col justify-between rounded-2xl border p-8 bg-white text-black ${
                plan.isPopular
                  ? "border-2 border-black shadow-md scale-[1.01]"
                  : "border-[#E5E5E5] bg-[#F5F5F5] shadow-sm hover:border-black/30 hover:scale-[1.01] transition-all duration-300"
              }`}
              id={`plan-card-${plan.name.toLowerCase().replace(/\s/g, "-")}`}
            >
              {plan.isPopular && (
                <span className="absolute -top-3 left-6 bg-black text-white text-[9px] font-mono tracking-widest px-3 py-1 rounded-full uppercase font-black">
                  MOST POPULAR
                </span>
              )}

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-black tracking-tight">{plan.name}</h3>
                  <span className="text-[10px] bg-white border border-[#E5E5E5] text-black rounded-full px-2 py-0.5 font-mono uppercase font-semibold">
                    {plan.badge}
                  </span>
                </div>

                <p className="text-xs text-[#6B6B6B] min-h-[36px]">{plan.desc}</p>

                <div className="py-5 border-y border-[#E5E5E5]">
                  <div className="flex items-baseline gap-2">
                    {plan.wasPrice && (
                      <span className="text-sm line-through text-neutral-400 font-mono">
                        {isLoading ? "…" : plan.wasPrice}
                      </span>
                    )}
                    <span className="text-4xl font-black text-black tracking-tight">
                      {isLoading ? (
                        <span className="inline-block w-24 h-8 bg-[#F0F0F0] rounded animate-pulse" />
                      ) : (
                        plan.nowPrice
                      )}
                    </span>
                  </div>

                  <p className="text-[10px] text-[#6B6B6B] font-mono mt-1">
                    One-time payment. No monthly fees.
                  </p>
                </div>

                <ul className="space-y-3 text-xs text-black">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-green-600 font-bold shrink-0">✓</span>
                      <span className="leading-tight text-neutral-800">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8 mt-auto">
                <a
                  href={plan.link}
                  target="_blank"
                  rel="referrer"
                  className={`w-full py-4 text-center text-xs font-mono font-bold tracking-widest uppercase rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    plan.isPopular
                      ? "bg-black text-white hover:bg-neutral-800"
                      : "bg-white text-black border border-black/20 hover:bg-black hover:text-white hover:border-black"
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight size={13} />
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Content generation add-on note */}
      <div className="max-w-2xl bg-[#F5F5F5] border border-[#E5E5E5] rounded-2xl p-6 mx-auto text-center space-y-3" id="add-on-notice">
        <p className="text-xs text-[#6B6B6B] italic">
          "Need us to write your website copy, generate product descriptions, or create social media content? Request a content generation quote via WhatsApp."
        </p>
        <a
          href="https://wa.me/27713315825?text=Hi%2520Revero%2520Digital%252C%2520I%2527m%2520interested%2520in%2520a%2520content%2520generation%2520add-on%2520pricing."
          target="_blank"
          rel="referrer"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-black underline hover:text-neutral-700"
        >
          <MessageSquare size={12} />
          <span>REQUEST COPYWRITING QUOTE VIA WHATSAPP</span>
        </a>
      </div>
    </div>
  );
}
