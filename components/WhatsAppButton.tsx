import Link from "next/link";
import { MessageCircle } from "lucide-react";

const WA_NUMBER = "595972767816";
const WA_MSG = "Hola, me interesa solicitar información sobre sus servicios.";

export function WhatsAppButton() {
  const href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MSG)}`;
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl"
      style={{ backgroundColor: "#25D366" }}
    >
      <MessageCircle size={26} color="#fff" fill="#fff" />
    </Link>
  );
}
