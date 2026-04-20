interface WhatsAppOrderButtonProps {
  phone: string;
  label?: string;
}

export function WhatsAppOrderButton({ phone, label = "Order on WhatsApp" }: WhatsAppOrderButtonProps) {
  const href = `https://wa.me/${phone.replace(/[^\d]/g, "")}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
    >
      {label}
    </a>
  );
}