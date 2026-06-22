"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/site";

export default function WhatsAppFloat() {
  const href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    site.whatsappMessage
  )}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hablar por WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 220, damping: 15 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.45)]"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-50 animate-ping" />
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="relative h-7 w-7"
      >
        <path d="M20.5 3.5A11.4 11.4 0 0 0 12.04 0C5.4 0 0 5.4 0 12.04c0 2.13.55 4.2 1.6 6.04L0 24l6.07-1.59a11.95 11.95 0 0 0 5.96 1.52h.01c6.64 0 12.04-5.4 12.04-12.04 0-3.22-1.25-6.24-3.58-8.39ZM12.04 21.8h-.01a9.97 9.97 0 0 1-5.08-1.39l-.36-.21-3.6.94.96-3.51-.24-.36a9.94 9.94 0 0 1-1.52-5.27c0-5.5 4.48-9.99 9.99-9.99a9.94 9.94 0 0 1 7.06 2.93 9.94 9.94 0 0 1 2.93 7.06c0 5.51-4.48 9.99-9.99 9.99Zm5.48-7.48c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.36.22-.66.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.68-2.08-.18-.3-.02-.46.13-.61.13-.13.3-.36.45-.54.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.07-.15-.68-1.63-.93-2.23-.24-.59-.49-.5-.68-.51l-.58-.01c-.2 0-.53.07-.81.38-.28.3-1.06 1.04-1.06 2.54 0 1.5 1.09 2.94 1.24 3.14.15.2 2.14 3.27 5.18 4.59.72.31 1.29.49 1.73.63.73.23 1.39.2 1.91.12.58-.09 1.78-.73 2.04-1.43.25-.7.25-1.3.18-1.43-.07-.13-.27-.2-.57-.35Z" />
      </svg>
    </motion.a>
  );
}
