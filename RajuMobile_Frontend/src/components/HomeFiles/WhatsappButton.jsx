import { FaWhatsapp } from "react-icons/fa";

function WhatsAppButton() {
    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=Hello%20I%20want%20to%20know%20about%20your%20accessories%20products`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 left-5 bg-green-500 text-white p-4 rounded-full shadow-lg text-4xl z-50">
      <FaWhatsapp />
    </a>
  );
}

export default WhatsAppButton;