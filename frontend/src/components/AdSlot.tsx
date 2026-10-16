interface AdSlotProps {
  size?: "banner" | "rectangle" | "skyscraper";
  className?: string;
}

const sizeClasses = {
  banner: "h-24 md:h-28",
  rectangle: "h-64 md:h-72",
  skyscraper: "h-96",
};

export default function AdSlot({
  size = "banner",
  className = "",
}: AdSlotProps) {
  // AdSense approval ke baad yahan actual ad code aayega
  // Filhaal placeholder hai

  return (
    <div
      className={`bg-gray-100 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-sm ${sizeClasses[size]} ${className}`}
      aria-label="Advertisement"
    >
      Advertisement
    </div>
  );
}