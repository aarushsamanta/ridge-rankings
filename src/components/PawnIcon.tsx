import type { SVGProps } from "react";

export function PawnIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Head */}
      <circle cx="12" cy="5.5" r="2.6" />
      {/* Collar */}
      <path d="M9 9.5h6" />
      {/* Body */}
      <path d="M9.5 9.5c-.4 1.6-1.4 2.7-2.6 3.5h10.2c-1.2-.8-2.2-1.9-2.6-3.5" />
      {/* Skirt / base flare */}
      <path d="M7.5 13c-.4 2.3-.9 4.4-2 6h13c-1.1-1.6-1.6-3.7-2-6" />
      {/* Foot */}
      <path d="M4.5 19h15" />
      <path d="M4 21h16" />
    </svg>
  );
}
