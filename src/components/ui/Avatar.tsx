interface Props {
  name: string;
  src?: string | null;
  size?: "sm" | "md" | "lg";
}

const sizes = { 
  sm: "w-8 h-8 text-xs", 
  md: "w-10 h-10 text-sm", 
  lg: "w-16 h-16 text-xl" 
};

/**
 * A profile component that shows a user's photo or their name initials.
 */
export default function Avatar({ name, src, size = "md" }: Props) {
  // Logic to get up to 2 initials (e.g., "John Doe" -> "JD")
  const initials = name
    .split(" ")
    .filter(Boolean) // Ensure we don't process extra spaces
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  // If a source image exists, render the image
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${sizes[size]} rounded-full object-cover ring-2 ring-brand-orange/30`}
      />
    );
  }

  // Fallback: Render a gradient circle with initials
  return (
    <div
      className={`${sizes[size]} rounded-full bg-gradient-to-br from-brand-orange to-orange-400 text-white font-bold flex items-center justify-center ring-2 ring-brand-orange/30`}
    >
      {initials}
    </div>
  );
}