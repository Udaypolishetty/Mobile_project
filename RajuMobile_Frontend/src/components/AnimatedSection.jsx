import { useScrollReveal } from "../hooks/useScrollReveal";

// direction: "up" | "left" | "right" | "fade"
// delay: ms number
export default function AnimatedSection({ children, direction = "up", delay = 0, className = "" }) {
  const { ref, isVisible } = useScrollReveal();

  const base = "transition-all duration-700 ease-out";
  const hidden = {
    up: "opacity-0 translate-y-12",
    left: "opacity-0 -translate-x-10",
    right: "opacity-0 translate-x-10",
    fade: "opacity-0 scale-95",
  };
  const visible = "opacity-100 translate-y-0 translate-x-0 scale-100";

  return (
    <div
      ref={ref}
      className={`${base} ${isVisible ? visible : hidden[direction]} ${className}`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
