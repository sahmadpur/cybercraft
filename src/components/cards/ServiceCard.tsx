import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { serviceAsset } from "@/content/assets";
import type { ServiceCardInfo } from "@/content/types";

interface ServiceCardProps {
  card: ServiceCardInfo;
  slug: string;
}

/** Editorial service card: framed image, title, blurb, sliding arrow on hover */
export function ServiceCard({ card, slug }: ServiceCardProps) {
  const image = serviceAsset(card.serviceId);

  return (
    <Link
      href={{ pathname: "/[service]", params: { service: slug } }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_24px_48px_-32px_rgba(0,5,68,0.35)]"
    >
      {image && (
        <div className="overflow-hidden border-b border-line">
          <Image
            src={image.src}
            alt=""
            width={image.width}
            height={image.height}
            className="aspect-[16/9] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        </div>
      )}
      <div className="flex grow flex-col gap-2.5 p-6">
        <h3 className="font-display text-base font-semibold text-navy">
          {card.title}
        </h3>
        {card.blurb && (
          <p className="text-sm leading-relaxed text-ink-muted">{card.blurb}</p>
        )}
        <span
          aria-hidden
          className="mt-auto inline-flex items-center gap-2 pt-3 text-sm font-semibold text-navy"
        >
          <span className="grid size-6 place-items-center rounded-md bg-brand-soft text-brand-dark transition-all duration-300 group-hover:bg-brand group-hover:text-navy">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h9.5M8.5 3.5 13 8l-4.5 4.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </span>
      </div>
    </Link>
  );
}
