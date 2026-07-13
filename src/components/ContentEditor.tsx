import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sliders, RotateCcw, Check, Phone, FileText, ChevronRight, Hash, Eye, Sparkles } from "lucide-react";
import { AgencyContent, defaultContent } from "../types";

interface ContentEditorProps {
  content: AgencyContent;
  onChange: (updated: AgencyContent) => void;
  onReset: () => void;
}

export default function ContentEditor({ content, onChange, onReset }: ContentEditorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"general" | "hero" | "why" | "what" | "process" | "social">("general");

  const updateField = (path: string, value: any) => {
    const fresh = { ...content };
    const keys = path.split(".");
    let current: any = fresh;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    onChange(fresh);
  };

  const updateArrayField = (section: "whyChooseUs" | "whatWeDo" | "process" | "socialProof", index: number, field: string, value: string) => {
    const fresh = { ...content };
    if (section === "whyChooseUs") {
      fresh.whyChooseUs.cards[index] = { ...fresh.whyChooseUs.cards[index], [field]: value };
    } else if (section === "whatWeDo") {
      fresh.whatWeDo.cards[index] = { ...fresh.whatWeDo.cards[index], [field]: value };
    } else if (section === "process") {
      fresh.process.steps[index] = { ...fresh.process.steps[index], [field]: value };
    } else if (section === "socialProof") {
      fresh.socialProof.metrics[index] = { ...fresh.socialProof.metrics[index], [field]: value };
    }
    onChange(fresh);
  };

  return (
    <>
      {/* Small floating badge in bottom-left to toggle the developer control desk */}
      <div className="fixed bottom-6 left-6 z-40 pointer-events-auto" id="editor-trigger-container">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-black hover:bg-neutral-900 border border-black/10 text-white font-mono text-[10px] font-bold uppercase tracking-widest px-4 py-3 rounded-full shadow-lg transition-all cursor-pointer group"
          id="btn-toggle-editor"
        >
          <Sliders size={12} className="text-white group-hover:rotate-45 transition-transform" />
          <span>{isOpen ? "Close Editor" : "Customize Live Copy"}</span>
          <span className="flex h-1.5 w-1.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
          </span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-45"
              id="editor-backdrop"
            />

            {/* Sidebar dashboard drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 left-0 w-full max-w-md bg-white border-r border-[#E5E5E5] z-50 flex flex-col shadow-2xl overflow-hidden font-sans"
              id="editor-drawer-panel"
            >
              {/* Header */}
              <div className="p-6 border-b border-[#E5E5E5] bg-[#F5F5F5] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <Sparkles size={13} className="text-black" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#6B6B6B]">AGENCY CUSTOMIZER</span>
                  </div>
                  <h3 className="text-base font-extrabold text-black mt-1">Live Copy Dashboard</h3>
                </div>
                <button
                  onClick={onReset}
                  title="Reset to factory settings"
                  className="flex items-center gap-1.5 bg-white hover:bg-neutral-50 border border-[#E5E5E5] text-[10px] font-mono font-bold text-[#6B6B6B] hover:text-black px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                  id="btn-reset-content"
                >
                  <RotateCcw size={11} />
                  <span>Reset App</span>
                </button>
              </div>

              {/* Grid-tabs navigation */}
              <div className="grid grid-cols-3 border-b border-[#E5E5E5] bg-[#F5F5F5]/30 p-2 gap-1 text-[9px] font-mono font-bold uppercase tracking-wider text-center">
                {(["general", "hero", "why", "what", "process", "social"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 rounded-md transition-all cursor-pointer ${
                      activeTab === tab ? "bg-black text-white px-3 font-bold" : "text-[#6B6B6B] hover:text-black hover:bg-neutral-100"
                    }`}
                  >
                    {tab === "general" ? "Core Info" : tab === "why" ? "Benefits" : tab}
                  </button>
                ))}
              </div>

              {/* Form elements Scroll Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6" id="editor-scroll-area">
                
                {/* 1. GENERAL CORE CONFIG */}
                {activeTab === "general" && (
                  <div className="space-y-4" id="tab-panel-general">
                    <div className="p-4 bg-[#F5F5F5] border border-[#E5E5E5] rounded-xl">
                      <div className="flex items-center gap-2 mb-3">
                        <Phone size={13} className="text-black" />
                        <h4 className="text-xs font-mono font-bold text-black uppercase">WhatsApp Target Connection</h4>
                      </div>
                      <label className="block text-[10px] font-mono tracking-widest text-[#6B6B6B] uppercase mb-2">
                        WhatsApp Number (with country code, no space)
                      </label>
                      <input
                        type="text"
                        value={content.whatsappNumber}
                        onChange={(e) => updateField("whatsappNumber", e.target.value.replace(/\s+/g, ""))}
                        className="w-full bg-white border border-[#E5E5E5] focus:border-black focus:outline-none rounded-lg px-3 py-2 text-xs text-black font-mono"
                        placeholder="e.g. 27713315825"
                      />
                      <p className="text-[10px] text-[#6B6B6B] mt-2 leading-relaxed font-mono">
                        Links dynamically direct to: <span className="text-black underline font-bold">https://wa.me/{content.whatsappNumber}</span>
                      </p>
                    </div>

                    <div className="p-4 bg-[#F5F5F5] border border-[#E5E5E5] rounded-xl">
                      <div className="flex items-center gap-3 mb-3">
                        <FileText size={13} className="text-black" />
                        <h4 className="text-xs font-mono font-bold text-black uppercase font-sans">Agency Name Settings</h4>
                      </div>
                      <label className="block text-[10px] font-mono tracking-widest text-[#6B6B6B] uppercase mb-2">
                        Agency Wordmark text
                      </label>
                      <input
                        type="text"
                        value={content.agencyName}
                        onChange={(e) => updateField("agencyName", e.target.value)}
                        className="w-full bg-white border border-[#E5E5E5] focus:border-black focus:outline-none rounded-lg px-3 py-2 text-xs text-black"
                        placeholder="e.g. REVERO"
                      />
                    </div>
                  </div>
                )}

                {/* 2. HERO CONFIG */}
                {activeTab === "hero" && (
                  <div className="space-y-4" id="tab-panel-hero">
                    <div>
                      <label className="block text-[10px] font-mono tracking-widest text-[#6B6B6B] uppercase mb-2">Tagline Over-Title</label>
                      <input
                        type="text"
                        value={content.hero.tagline}
                        onChange={(e) => updateField("hero.tagline", e.target.value)}
                        className="w-full bg-white border border-[#E5E5E5] focus:border-black focus:outline-none rounded-lg px-3 py-2 text-xs text-black"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono tracking-widest text-[#6B6B6B] uppercase mb-2">Main Headline</label>
                      <textarea
                        rows={3}
                        value={content.hero.headline}
                        onChange={(e) => updateField("hero.headline", e.target.value)}
                        className="w-full bg-white border border-[#E5E5E5] focus:border-black focus:outline-none rounded-lg px-3 py-2 text-xs text-black leading-relaxed"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono tracking-widest text-[#6B6B6B] uppercase mb-2">Subheadline Description</label>
                      <textarea
                        rows={4}
                        value={content.hero.subheadline}
                        onChange={(e) => updateField("hero.subheadline", e.target.value)}
                        className="w-full bg-white border border-[#E5E5E5] focus:border-black focus:outline-none rounded-lg px-3 py-2 text-xs text-black leading-relaxed"
                      />
                    </div>
                  </div>
                )}

                {/* 3. WHY CHOOSE US BENEFITS */}
                {activeTab === "why" && (
                  <div className="space-y-6" id="tab-panel-why">
                    <div>
                      <label className="block text-[10px] font-mono tracking-widest text-[#6B6B6B] uppercase mb-2">Section Headline</label>
                      <input
                        type="text"
                        value={content.whyChooseUs.sectionHeadline}
                        onChange={(e) => updateField("whyChooseUs.sectionHeadline", e.target.value)}
                        className="w-full bg-white border border-[#E5E5E5] focus:border-black focus:outline-none rounded-lg px-3 py-2 text-xs text-black"
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <span className="block text-[10px] font-mono tracking-widest text-[#6B6B6B] uppercase">Benefit Cards (3)</span>
                      {content.whyChooseUs.cards.map((card, i) => (
                        <div key={card.id} className="p-4 bg-[#F5F5F5] border border-[#E5E5E5] rounded-xl space-y-3">
                          <span className="font-mono text-[9px] text-[#6B6B6B] font-bold">Card #{i + 1}</span>
                          <div>
                            <label className="block text-[9px] font-mono text-[#6B6B6B] uppercase mb-1">Title</label>
                            <input
                              type="text"
                              value={card.title}
                              onChange={(e) => updateArrayField("whyChooseUs", i, "title", e.target.value)}
                              className="w-full bg-white border border-[#E5E5E5] focus:border-black focus:outline-none rounded-lg px-3 py-1.5 text-xs text-black font-semibold"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] font-mono text-[#6B6B6B] uppercase mb-1">Description</label>
                            <textarea
                              rows={2}
                              value={card.description}
                              onChange={(e) => updateArrayField("whyChooseUs", i, "description", e.target.value)}
                              className="w-full bg-white border border-[#E5E5E5] focus:border-black focus:outline-none rounded-lg px-3 py-1.5 text-xs text-[#6B6B6B] leading-relaxed"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. WHAT WE DO SERVICES */}
                {activeTab === "what" && (
                  <div className="space-y-6" id="tab-panel-what">
                    <div>
                      <label className="block text-[10px] font-mono tracking-widest text-[#6B6B6B] uppercase mb-2">Section Headline</label>
                      <input
                        type="text"
                        value={content.whatWeDo.sectionHeadline}
                        onChange={(e) => updateField("whatWeDo.sectionHeadline", e.target.value)}
                        className="w-full bg-white border border-[#E5E5E5] focus:border-black focus:outline-none rounded-lg px-3 py-2 text-xs text-black"
                      />
                    </div>

                    <div className="space-y-4">
                      <span className="block text-[10px] font-mono tracking-widest text-[#6B6B6B] uppercase">Service Cards (6)</span>
                      {content.whatWeDo.cards.map((card, i) => (
                        <div key={card.id} className="p-4 bg-[#F5F5F5] border border-[#E5E5E5] rounded-xl space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="font-mono text-[9px] text-black">Service #{i + 1}</span>
                            <span className="font-mono text-[8px] bg-black text-white px-2 py-0.5 rounded uppercase font-bold">{card.badge}</span>
                          </div>
                          <div>
                            <label className="block text-[9px] font-mono text-[#6B6B6B] uppercase mb-1">Service Title</label>
                            <input
                              type="text"
                              value={card.title}
                              onChange={(e) => updateArrayField("whatWeDo", i, "title", e.target.value)}
                              className="w-full bg-white border border-[#E5E5E5] focus:border-black focus:outline-none rounded-lg px-3 py-1.5 text-xs text-black font-semibold"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] font-mono text-[#6B6B6B] uppercase mb-1">Description</label>
                            <input
                              type="text"
                              value={card.description}
                              onChange={(e) => updateArrayField("whatWeDo", i, "description", e.target.value)}
                              className="w-full bg-white border border-[#E5E5E5] focus:border-black focus:outline-none rounded-lg px-3 py-1.5 text-xs text-[#6B6B6B]"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. PROCESS STEPS */}
                {activeTab === "process" && (
                  <div className="space-y-6" id="tab-panel-process">
                    <div>
                      <label className="block text-[10px] font-mono tracking-widest text-[#6B6B6B] uppercase mb-2">Section Headline</label>
                      <input
                        type="text"
                        value={content.process.sectionHeadline}
                        onChange={(e) => updateField("process.sectionHeadline", e.target.value)}
                        className="w-full bg-white border border-[#E5E5E5] focus:border-black focus:outline-none rounded-lg px-3 py-2 text-xs text-black"
                      />
                    </div>

                    <div className="space-y-4">
                      {content.process.steps.map((step, i) => (
                        <div key={i} className="p-4 bg-[#F5F5F5] border border-[#E5E5E5] rounded-xl space-y-3">
                          <span className="font-mono text-[9px] text-black uppercase tracking-widest font-bold">Step {step.stepNumber}</span>
                          <div>
                            <label className="block text-[9px] font-mono text-[#6B6B6B] uppercase mb-1">Title</label>
                            <input
                              type="text"
                              value={step.title}
                              onChange={(e) => updateArrayField("process", i, "title", e.target.value)}
                              className="w-full bg-white border border-[#E5E5E5] focus:border-black focus:outline-none rounded-lg px-3 py-1.5 text-xs text-black font-semibold"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] font-mono text-[#6B6B6B] uppercase mb-1">Description</label>
                            <textarea
                              rows={2}
                              value={step.description}
                              onChange={(e) => updateArrayField("process", i, "description", e.target.value)}
                              className="w-full bg-white border border-[#E5E5E5] focus:border-black focus:outline-none rounded-lg px-3 py-1.5 text-xs text-[#6B6B6B]"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 6. SOCIAL PROOF / STATS */}
                {activeTab === "social" && (
                  <div className="space-y-6" id="tab-panel-social">
                    <div>
                      <label className="block text-[10px] font-mono tracking-widest text-[#6B6B6B] uppercase mb-2">Section Headline</label>
                      <textarea
                        rows={2}
                        value={content.socialProof.headline}
                        onChange={(e) => updateField("socialProof.headline", e.target.value)}
                        className="w-full bg-white border border-[#E5E5E5] focus:border-black focus:outline-none rounded-lg px-3 py-2 text-xs text-black font-sans leading-relaxed"
                      />
                    </div>

                    <div className="space-y-4">
                      <span className="block text-[10px] font-mono tracking-widest text-[#6B6B6B] uppercase">Trust Metrics (4)</span>
                      {content.socialProof.metrics.map((metric, i) => (
                        <div key={metric.id} className="p-4 bg-[#F5F5F5] border border-[#E5E5E5] rounded-xl grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[9px] font-mono text-[#6B6B6B] uppercase mb-1">Metric Value</label>
                            <input
                              type="text"
                              value={metric.value}
                              onChange={(e) => updateArrayField("socialProof", i, "value", e.target.value)}
                              className="w-full bg-white border border-[#E5E5E5] focus:border-black focus:outline-none rounded-lg px-3 py-1.5 text-xs text-black font-mono font-bold"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] font-mono text-[#6B6B6B] uppercase mb-1">Label</label>
                            <input
                              type="text"
                              value={metric.label}
                              onChange={(e) => updateArrayField("socialProof", i, "label", e.target.value)}
                              className="w-full bg-white border border-[#E5E5E5] focus:border-black focus:outline-none rounded-lg px-3 py-1.5 text-xs text-[#6B6B6B] font-sans"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Drawer footer */}
              <div className="p-6 border-t border-[#E5E5E5] bg-[#F5F5F5] flex items-center gap-3">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-black text-white font-mono text-xs font-bold uppercase tracking-widest py-3.5 rounded-xl cursor-pointer hover:bg-neutral-900 transition-all font-semibold active:translate-y-px"
                >
                  <Check size={13} />
                  <span>Save & Close</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
