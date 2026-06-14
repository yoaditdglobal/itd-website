import Image from "next/image";
import LinkedInIcon from "@/components/ui/LinkedInIcon";
import type { TeamMember } from "@/lib/data";

interface TeamCardProps {
  member: TeamMember;
}

/**
 * Team member card with a hover/focus-reveal caption.
 *
 * The name + role + LinkedIn link live in a bottom gradient scrim. On hover-capable
 * devices the scrim is hidden and reveals on `group-hover` / `group-focus-within`
 * (so keyboard users get it too); the photo gently zooms. On touch / no-hover
 * devices the scrim is always visible. The text is always in the DOM, so screen
 * readers get name + role regardless of visual state. All motion respects
 * `prefers-reduced-motion`.
 */
export default function TeamCard({ member }: TeamCardProps) {
  const zoom = member.objectScale ?? 1;
  return (
    <div className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-border bg-bg-secondary">
      <Image
        src={member.photo}
        alt={`${member.name}, ${member.role}`}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        style={{
          ...(member.objectPosition ? { objectPosition: member.objectPosition } : {}),
          ...(zoom !== 1
            ? {
                transform: `scale(${zoom})`,
                transformOrigin: member.objectPosition ?? "center",
              }
            : {}),
        }}
        className={
          zoom !== 1
            ? "object-cover transition-transform duration-300 ease-out"
            : "object-cover transition-transform duration-300 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        }
      />

      {/* Caption scrim — always visible on touch, hover/focus-reveal on desktop */}
      <div
        className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent
                   opacity-100 translate-y-0
                   md:opacity-0 md:translate-y-2
                   md:group-hover:opacity-100 md:group-hover:translate-y-0
                   md:group-focus-within:opacity-100 md:group-focus-within:translate-y-0
                   transition-all duration-250 ease-out motion-reduce:transition-none motion-reduce:translate-y-0"
      >
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="text-white font-semibold leading-tight truncate">
              {member.name}
            </p>
            <p className="text-body-sm text-white/75 leading-snug">{member.role}</p>
          </div>
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className="flex-shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/15 text-white hover:bg-white hover:text-[#0A66C2] backdrop-blur-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <LinkedInIcon className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
