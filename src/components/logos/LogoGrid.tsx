import Image from "next/image";
import { getAsset, type AssetId } from "@/content/assets";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";

/**
 * Perceptually-even logo sizing: wordmark logos (wide aspect) render shorter
 * but longer than square marks so every brand occupies a similar visual area.
 */
export function logoHeight(width: number, height: number, base = 64): number {
  const aspect = Math.max(width / height, 0.6);
  return Math.round(Math.min(base * 1.15, Math.max(34, base / Math.pow(aspect, 0.4))));
}

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
            className={`group flex min-h-36 items-center justify-center bg-surface p-6 transition-colors duration-300 hover:bg-brand-soft/40 ${tileClassName}`}
          >
            <Image
              src={asset.src}
              alt={asset.alt}
              width={asset.width}
              height={asset.height}
              style={{ height: logoHeight(asset.width, asset.height) }}
              className="w-auto max-w-[88%] object-contain grayscale mix-blend-multiply transition-all duration-300 group-hover:scale-105 group-hover:grayscale-0"
            />
          </StaggerItem>
        );
      })}
    </StaggerGroup>
  );
}
