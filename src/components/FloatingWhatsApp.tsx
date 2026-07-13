import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send } from "lucide-react";

interface FloatingWhatsAppProps {
  whatsappNumber: string;
}

export default function FloatingWhatsApp({ whatsappNumber }: FloatingWhatsAppProps) {
  const [showPrompt, setShowPrompt] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);

  useEffect(() => {
    // Show inviting chat message after 4.5 seconds
    const timer = setTimeout(() => {
      if (!hasDismissed) {
        setShowPrompt(true);
      }
    }, 4500);

    return () => clearTimeout(timer);
  }, [hasDismissed]);

  const handleOpenWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=Hi%20Revero%2C%20I%27m%20interested%20in%20a%20website%20for%20my%20business.`, "_blank", "noopener,noreferrer");
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowPrompt(false);
    setHasDismissed(true);
  };

  return (
    <div id="sticky-whatsapp-widget" className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">
      <AnimatePresence>
        {showPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="w-72 bg-[#0B0B0C] border border-[#27272A] rounded-2xl shadow-lg p-4 cursor-pointer pointer-events-auto hover:border-white/35 transition-all group overflow-hidden"
            onClick={handleOpenWhatsApp}
            id="whatsapp-prompt-bubble"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#27272A] mb-2">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[10px] font-mono tracking-wider text-neutral-400 uppercase font-bold">Consultant Active</span>
              </div>
              <button
                onClick={handleDismiss}
                className="text-neutral-400 hover:text-white p-1 rounded-md hover:bg-neutral-900 transition-colors pointer-events-auto"
                id="btn-dismiss-prompt"
              >
                <X size={12} />
              </button>
            </div>
            
            <p className="text-xs text-white leading-relaxed font-sans mb-3 font-semibold">
              "Hey! Let's discuss your web design project on WhatsApp. Let's build a secure, high-converting website!"
            </p>
            
            <div className="flex items-center justify-between bg-[#18181B] rounded-xl px-3 py-2 text-[10px] text-neutral-400 border border-[#27272A] font-mono">
              <span>Tap to chat on WhatsApp</span>
              <Send size={11} className="text-white group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        id="btn-floating-whatsapp-trigger"
        onClick={handleOpenWhatsApp}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative bg-black text-white p-4 rounded-full shadow-lg transition-shadow pointer-events-auto cursor-pointer group flex items-center justify-center border border-white/20 hover:border-white/40"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black/40 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 text-[9px] font-bold text-white items-center justify-center leading-none">1</span>
        </span>
        <MessageSquare size={22} className="fill-current text-white group-hover:rotate-6 transition-transform duration-300" />
      </motion.button>
    </div>
  );
}
