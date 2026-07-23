interface KeyholeMarkProps {
  className?: string;
  strokeOnly?: boolean;
}

/**
 * Roof-triangle-with-keyhole approximation of the brand mark. Swap the
 * <path> data here for the real logo asset when it's available — every
 * call site only depends on this component's external API, not its
 * internals.
 */
export function KeyholeMark({ className = 'w-8 h-8', strokeOnly = false }: KeyholeMarkProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
      fill={strokeOnly ? 'none' : 'currentColor'}
      stroke={strokeOnly ? 'currentColor' : 'none'}
      strokeWidth={strokeOnly ? 1 : 0}
    >
      <mask id="keyhole-cut">
        <rect width="48" height="48" fill="white" />
        <circle cx="24" cy="26" r="5" fill="black" />
        <polygon points="24,29 20,40 28,40" fill="black" />
      </mask>
      <polygon points="24,4 44,26 34,26 34,40 14,40 14,26 4,26" mask="url(#keyhole-cut)" />
    </svg>
  );
}
