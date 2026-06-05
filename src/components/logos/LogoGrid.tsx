import Image from "next/image";
import { getAsset, type AssetId } from "@/content/assets";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

interface LogoGridProps {
  logos: AssetId[];
  /** Tailwind grid-cols classes */
  columns?: string;
  tileClassName?: string;
}

/**
 * Hairline-bordered logo tiles; grayscale at rest, full color + lifted border
 * on hover. Pure CSS hover so tiles stay server-renderable.
 */
export function LogoGrid({
  logos,
  columns = "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  tileClassName = "",
}: LogoGridProps) {
  return (
    <StaggerGroup as="ul" stagger={0.04} className={`grid gap-px overflow-hidden rounded-2xl border border-line bg-line ${columns}`}>
      {logos.map((id) => {
        const asset = getAsset(id);
        return (
          <StaggerItem
            as="li"
            key={id}
            className={`group flex items-center justify-center bg-surface p-7 transition-colors duration-300 hover:bg-brand-soft/40 ${tileClassName}`}
          >
            <Image
              src={asset.src}
              alt={asset.alt}
              width={asset.width}
              height={asset.height}
              className="h-12 w-auto max-w-[70%] object-contain grayscale transition-all duration-300 group-hover:scale-105 group-hover:grayscale-0 sm:h-14"
            />
          </StaggerItem>
        );
      })}
    </StaggerGroup>
  );
}
