/**
 * Language-agnostic asset metadata. All files were downloaded from
 * Cybercraft's current public media (scripts/download-assets.ts) and are
 * served locally from public/assets/.
 */
export interface AssetMeta {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const ASSETS = {
  // Brand
  "logo-main": { src: "/assets/brand/cybercraft-logo.webp", alt: "Cybercraft — IT Solution Company", width: 1500, height: 400 },
  "logo-footer": { src: "/assets/brand/cybercraft-logo-footer.webp", alt: "Cybercraft — IT Solution Company", width: 823, height: 445 },
  "logo-mini": { src: "/assets/brand/cybercraft-mini.webp", alt: "Cybercraft", width: 400, height: 400 },

  // Vendors (order matches the live /vendors/ page)
  "vendor-huawei": { src: "/assets/vendors/huawei.webp", alt: "Huawei", width: 252, height: 251 },
  "vendor-apple": { src: "/assets/vendors/apple.webp", alt: "Apple", width: 220, height: 264 },
  "vendor-lenovo": { src: "/assets/vendors/lenovo.webp", alt: "Lenovo", width: 384, height: 115 },
  "vendor-samsung": { src: "/assets/vendors/samsung.webp", alt: "Samsung", width: 380, height: 97 },
  "vendor-hikvision": { src: "/assets/vendors/hikvision.webp", alt: "Hikvision", width: 395, height: 93 },
  "vendor-fudo-security": { src: "/assets/vendors/fudo-security.webp", alt: "Fudo Security", width: 362, height: 143 },
  "vendor-cloudflare": { src: "/assets/vendors/cloudflare.webp", alt: "Cloudflare", width: 378, height: 182 },
  "vendor-palo-alto": { src: "/assets/vendors/palo-alto.webp", alt: "Palo Alto Networks", width: 402, height: 111 },
  "vendor-check-point": { src: "/assets/vendors/check-point.svg", alt: "Check Point", width: 385, height: 184 },
  "vendor-hcl-software": { src: "/assets/vendors/hcl-software.webp", alt: "HCL Software", width: 208, height: 50 },
  "vendor-veeam": { src: "/assets/vendors/veeam.webp", alt: "Veeam", width: 663, height: 252 },
  "vendor-dell": { src: "/assets/vendors/dell.webp", alt: "Dell", width: 243, height: 243 },
  "vendor-microsoft": { src: "/assets/vendors/microsoft.webp", alt: "Microsoft", width: 395, height: 121 },
  "vendor-hp": { src: "/assets/vendors/hp.webp", alt: "HP", width: 240, height: 240 },
  "vendor-ibm": { src: "/assets/vendors/ibm.webp", alt: "IBM", width: 266, height: 130 },
  "vendor-canon": { src: "/assets/vendors/canon.webp", alt: "Canon", width: 333, height: 102 },
  "vendor-fortinet": { src: "/assets/vendors/fortinet.webp", alt: "Fortinet", width: 360, height: 79 },
  "vendor-cisco": { src: "/assets/vendors/cisco.webp", alt: "Cisco", width: 357, height: 208 },
  "vendor-f5": { src: "/assets/vendors/f5.webp", alt: "F5", width: 229, height: 229 },
  "vendor-xfusion": { src: "/assets/vendors/xfusion.webp", alt: "xFusion", width: 225, height: 60 },
  "vendor-xfusion-wide": { src: "/assets/vendors/xfusion-wide.webp", alt: "xFusion", width: 2560, height: 328 },
  "vendor-tenable": { src: "/assets/vendors/tenable.webp", alt: "Tenable", width: 535, height: 168 },
  "vendor-datadog": { src: "/assets/vendors/datadog.webp", alt: "Datadog", width: 335, height: 336 },
  "vendor-checkpro": { src: "/assets/vendors/checkpro.webp", alt: "CheckPro", width: 395, height: 130 },

  // Partners (order matches the live /partners/ page)
  "partner-gulfstream": { src: "/assets/partners/gulfstream.webp", alt: "Gulfstream Distribution", width: 346, height: 254 },
  "partner-softprom": { src: "/assets/partners/softprom.webp", alt: "Softprom", width: 398, height: 98 },
  "partner-muk": { src: "/assets/partners/muk.webp", alt: "MUK", width: 337, height: 137 },
  "partner-techpro-dc": { src: "/assets/partners/techpro-dc.webp", alt: "Techpro DC", width: 417, height: 120 },
  "partner-techpro-dc-wide": { src: "/assets/partners/techpro-dc-wide.webp", alt: "Techpro DC", width: 414, height: 117 },
  "partner-bakotech": { src: "/assets/partners/bakotech.webp", alt: "BAKOTECH", width: 381, height: 112 },
  "partner-elcore": { src: "/assets/partners/elcore.webp", alt: "Elcore", width: 192, height: 79 },
  "partner-erc": { src: "/assets/partners/erc.webp", alt: "ERC", width: 225, height: 186 },
  "partner-estet": { src: "/assets/partners/estet.webp", alt: "ESTET", width: 720, height: 418 },
  "partner-mont-azerbaijan": { src: "/assets/partners/mont-azerbaijan.webp", alt: "Mont Azerbaijan", width: 378, height: 165 },

  // Page imagery
  "image-about-us": { src: "/assets/images/about-us.webp", alt: "Cybercraft team at work", width: 1500, height: 1500 },
  "banner-cloud-security": { src: "/assets/images/banner-cloud-security.webp", alt: "Cloud security and managed services", width: 1920, height: 400 },
  "banner-it-team": { src: "/assets/images/banner-it-team.webp", alt: "Collaborative IT team in office", width: 1920, height: 400 },
  "banner-monitoring": { src: "/assets/images/banner-monitoring.webp", alt: "IT professional monitoring systems", width: 1920, height: 400 },
  "banner-server-room": { src: "/assets/images/banner-server-room.webp", alt: "Server room data center", width: 1920, height: 400 },

  // Service card images (id matches services.registry.ts)
  "service-advanced-cybersecurity-services": { src: "/assets/services/advanced-cybersecurity-services.webp", alt: "Advanced cybersecurity services", width: 662, height: 372 },
  "service-cloud-solutions": { src: "/assets/services/cloud-solutions.webp", alt: "Cloud solutions", width: 662, height: 372 },
  "service-collaboration-tools-unified-communications": { src: "/assets/services/collaboration-tools-unified-communications.webp", alt: "Collaboration tools and unified communications", width: 662, height: 372 },
  "service-cyber-security-solutions": { src: "/assets/services/cyber-security-solutions.webp", alt: "Cyber security solutions", width: 662, height: 372 },
  "service-it-sales-solutions-by-cybercraft": { src: "/assets/services/it-sales-solutions-by-cybercraft.webp", alt: "IT sales and solutions", width: 662, height: 372 },
  "service-it-support-help-desk-services": { src: "/assets/services/it-support-help-desk-services.webp", alt: "IT support and help desk services", width: 662, height: 372 },
  "service-it-hardware-and-software": { src: "/assets/services/it-hardware-and-software.webp", alt: "IT hardware and software", width: 662, height: 372 },
  "service-innovation-emerging-tech": { src: "/assets/services/innovation-emerging-tech.webp", alt: "Innovation and emerging tech", width: 662, height: 372 },
  "service-it-consulting-digital-transformation": { src: "/assets/services/it-consulting-digital-transformation.webp", alt: "IT consulting and digital transformation", width: 662, height: 372 },
  "service-it-equipment-smart-solutions": { src: "/assets/services/it-equipment-smart-solutions.webp", alt: "IT equipment and smart solutions", width: 662, height: 372 },
  "service-it-infrastructure-design-deployment": { src: "/assets/services/it-infrastructure-design-deployment.webp", alt: "IT infrastructure design and deployment", width: 662, height: 372 },
  "service-managed-it-services": { src: "/assets/services/managed-it-services.webp", alt: "Managed IT services", width: 662, height: 372 },
  "service-network-solutions-optimization": { src: "/assets/services/network-solutions-optimization.webp", alt: "Network solutions and optimization", width: 662, height: 372 },
  "service-smart-cctv-solutions-for-modern-security": { src: "/assets/services/smart-cctv-solutions-for-modern-security.webp", alt: "Smart CCTV solutions", width: 662, height: 372 },
  "service-virtualization-server-consolidation": { src: "/assets/services/virtualization-server-consolidation.webp", alt: "Virtualization and server consolidation", width: 662, height: 372 },
  "service-strategic-it-consulting": { src: "/assets/services/strategic-it-consulting.webp", alt: "Strategic IT consulting", width: 662, height: 372 },
} as const satisfies Record<string, AssetMeta>;

export type AssetId = keyof typeof ASSETS;

export function getAsset(id: AssetId): AssetMeta {
  return ASSETS[id];
}

export function serviceAsset(serviceId: string): AssetMeta | undefined {
  return (ASSETS as Record<string, AssetMeta>)[`service-${serviceId}`];
}
