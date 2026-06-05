import Image from "next/image";
import { getAsset, type AssetId } from "@/content/assets";
import { logoHeight } from "./LogoGrid";

interface LogoMarqueeProps {
  logos: AssetId[];
  /** Scroll direction */
  reverse?: boolean;
}

/**
 * Infinite logo marquee for the home trust strips. Every logo renders at its
 * natural width (no grid squeeze); the list is duplicated for a seamless
 * loop. The reduced-motion CSS net pauses the animation, leaving the first
 * copy visible and the duplicate aria-hidden.
 */
export function LogoMarquee({ logos, reverse = false }: LogoMarqueeProps) {
  const row = (ariaHidden: boolean) => (
    <ul
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center gap-16 pr-16"
    >
      {logos.map((id) => {
        const asset = getAsset(id);
        return (
          <li key={id} className="flex items-center">
            <Image
              src={asset.src}
              alt={ariaHidden ? "" : asset.alt}
              width={asset.width}
              height={asset.height}
              style={{ height: logoHeight(asset.width, asset.height, 52) }}
              className="w-auto max-w-48 object-contain grayscale mix-blend-multiply transition-all duration-300 hover:grayscale-0"
            />
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="group/marquee relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className={`flex w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"} group-hover/marquee:[animation-play-state:paused] motion-reduce:flex-wrap motion-reduce:!animate-none`}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
