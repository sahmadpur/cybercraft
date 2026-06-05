/**
 * One-time download of Cybercraft media into public/assets/.
 * Tries the full-size original (no -WxH suffix) first, falls back to the
 * sized variant. Files are saved as-is (no re-encoding) to preserve
 * transparency and proportions.
 *
 * Run: npx tsx scripts/download-assets.ts
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36";

const U = "https://cybercraft.az/wp-content/uploads";

/** dest (under public/assets) -> source URL (sized variants resolved automatically) */
const ASSETS: Record<string, string> = {
  // Brand
  "brand/cybercraft-logo.webp": `${U}/2025/05/cybercraft-main-logo-2.webp`,
  "brand/cybercraft-logo-footer.webp": `${U}/2025/05/cybercraft-main-logo.webp`,

  // Vendors (order matches /vendors/ page)
  "vendors/huawei.webp": `${U}/2025/05/huawei-2-200x200.webp`,
  "vendors/apple.webp": `${U}/2025/05/apple-1-200x200.webp`,
  "vendors/lenovo.webp": `${U}/2025/05/lenovo-1-200x200.webp`,
  "vendors/samsung.webp": `${U}/2025/05/samsung-1-200x200.webp`,
  "vendors/hikvision.webp": `${U}/2025/05/hikvision-1-200x200.webp`,
  "vendors/fudo-security.webp": `${U}/2025/05/fudo-security-1-200x200.webp`,
  "vendors/cloudflare.webp": `${U}/2025/05/cloudflare-1-200x200.webp`,
  "vendors/palo-alto.webp": `${U}/2025/05/paloalto-1-200x200.webp`,
  "vendors/check-point.svg": `${U}/2026/04/Check_Point_logo_2022.svg`,
  "vendors/hcl-software.webp": `${U}/2026/04/images-200x200.webp`,
  "vendors/veeam.webp": `${U}/2026/04/lg-677b54367b523-Veeam-200x200.webp`,
  "vendors/dell.webp": `${U}/2025/05/dell-2-200x200.webp`,
  "vendors/microsoft.webp": `${U}/2025/05/microsoft-1-200x200.webp`,
  "vendors/hp.webp": `${U}/2025/05/hp-1-200x200.webp`,
  "vendors/ibm.webp": `${U}/2025/05/ibm-1-200x200.webp`,
  "vendors/canon.webp": `${U}/2025/05/canon-1-200x200.webp`,
  "vendors/fortinet.webp": `${U}/2025/05/fortinet-1-200x200.webp`,
  "vendors/cisco.webp": `${U}/2025/05/cisco-1-200x200.webp`,
  "vendors/f5.webp": `${U}/2025/05/F5-application-1-200x200.webp`,
  "vendors/xfusion.webp": `${U}/2026/04/images-1-200x200.webp`,
  "vendors/xfusion-wide.webp": `${U}/2025/06/xFusion_RGB-scaled.webp`,
  "vendors/tenable.webp": `${U}/2026/04/Tenable-200x200.webp`,
  "vendors/datadog.webp": `${U}/2026/04/66666666666666-200x200.webp`,
  "vendors/checkpro.webp": `${U}/2025/05/checkpro-1.webp`,

  // Partners (order matches /partners/ page; mont appears on home strip)
  "partners/gulfstream.webp": `${U}/2025/05/gulfstream-1-200x200.webp`,
  "partners/softprom.webp": `${U}/2025/05/softprom-1-200x200.webp`,
  "partners/muk.webp": `${U}/2025/10/sota-online-holding-ltd-2281x727300wnetapp_tcm19-33286.webp`,
  "partners/techpro-dc.webp": `${U}/2025/05/techpro-dc-1-200x200.webp`,
  "partners/techpro-dc-wide.webp": `${U}/2025/05/techprodc.webp`,
  "partners/bakotech.webp": `${U}/2025/05/bakotech-1-200x200.webp`,
  "partners/elcore.webp": `${U}/2026/04/Elcore-130x130.webp`,
  "partners/erc.webp": `${U}/2026/04/ERC-150x150.webp`,
  "partners/estet.webp": `${U}/2026/04/Estet-2-130x130.webp`,
  "partners/mont-azerbaijan.webp": `${U}/2025/05/mont-azerbaijan-1.webp`,

  // Page imagery
  "images/about-us.webp": `${U}/2025/05/about-us-800x800.webp`,
  "images/banner-cloud-security.webp": `${U}/2025/05/Cloud-Security-and-Managed-Services-1300x271.webp`,
  "images/banner-it-team.webp": `${U}/2025/05/Collaborative-IT-Team-in-Office-1300x271.webp`,
  "images/banner-monitoring.webp": `${U}/2025/05/IT-Professional-Monitoring-Systems-1300x271.webp`,
  "images/banner-server-room.webp": `${U}/2025/05/Server-Room-_-Data-Center-1300x271.webp`,

  // Service card images (home / product & solutions)
  "services/advanced-cybersecurity-services.webp": `${U}/2025/05/Advanced-Cybersecurity-Services.webp`,
  "services/cloud-solutions.webp": `${U}/2025/05/Cloud-solutions.webp`,
  "services/collaboration-tools-unified-communications.webp": `${U}/2025/05/Collaboration-Tools-Unified-communications.webp`,
  "services/cyber-security-solutions.webp": `${U}/2025/05/Cyber-security.webp`,
  "services/it-sales-solutions-by-cybercraft.webp": `${U}/2025/05/it-sales.webp`,
  "services/it-support-help-desk-services.webp": `${U}/2025/05/IT-Support-Help-Desk-Services.webp`,
  "services/it-hardware-and-software.webp": `${U}/2025/05/it-hardware-software.webp`,
  "services/innovation-emerging-tech.webp": `${U}/2025/05/Innovation-Emerging-Tech.webp`,
  "services/it-consulting-digital-transformation.webp": `${U}/2025/05/IT-consulting-digital-transformation.webp`,
  "services/it-equipment-smart-solutions.webp": `${U}/2025/05/IT-Equipment-Smart-Solutions.webp`,
  "services/it-infrastructure-design-deployment.webp": `${U}/2025/05/IT-infrastructure-design-deployment.webp`,
  "services/managed-it-services.webp": `${U}/2025/05/Managed-IT-services.webp`,
  "services/network-solutions-optimization.webp": `${U}/2025/05/Network-solutions-optimization.webp`,
  "services/smart-cctv-solutions-for-modern-security.webp": `${U}/2025/05/cctv.webp`,
  "services/virtualization-server-consolidation.webp": `${U}/2025/05/Virtualization-Server-Consolidation.webp`,
  "services/strategic-it-consulting.webp": `${U}/2025/05/it-planning.webp`,
};

/** Candidate URLs: original (suffix stripped) first, then the given URL. */
function candidates(url: string): string[] {
  const stripped = url.replace(/-\d+x\d+(\.\w+)$/, "$1");
  return stripped !== url ? [stripped, url] : [url];
}

async function fetchOk(url: string): Promise<ArrayBuffer | null> {
  try {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

async function main() {
  let failures = 0;
  for (const [dest, url] of Object.entries(ASSETS)) {
    const target = path.join("public/assets", dest);
    await mkdir(path.dirname(target), { recursive: true });
    let saved = false;
    for (const candidate of candidates(url)) {
      const buf = await fetchOk(candidate);
      if (buf) {
        await writeFile(target, Buffer.from(buf));
        const kb = (buf.byteLength / 1024).toFixed(1);
        const note = candidate !== url ? " (original)" : "";
        console.log(`✓ ${dest} ${kb}KB${note}`);
        saved = true;
        break;
      }
    }
    if (!saved) {
      console.error(`✗ FAILED ${dest} <- ${url}`);
      failures++;
    }
    await new Promise((r) => setTimeout(r, 200));
  }
  console.log(failures ? `\n${failures} failures` : "\nAll assets downloaded.");
  process.exitCode = failures ? 1 : 0;
}

main();
