import type {
  CommonContent,
  ContactPageContent,
  HomeContent,
  Locale,
  LogoPageContent,
  ProductSolutionsContent,
  ServiceContent,
} from "./types";

import { common as enCommon } from "./en/common";
import { home as enHome } from "./en/home";
import { vendors as enVendors } from "./en/vendors";
import { partners as enPartners } from "./en/partners";
import { productSolutions as enProductSolutions } from "./en/product-solutions";
import { contact as enContact } from "./en/contact";
import { services as enServices } from "./en/services";

import { common as azCommon } from "./az/common";
import { home as azHome } from "./az/home";
import { vendors as azVendors } from "./az/vendors";
import { partners as azPartners } from "./az/partners";
import { productSolutions as azProductSolutions } from "./az/product-solutions";
import { contact as azContact } from "./az/contact";
import { services as azServices } from "./az/services";

import { common as ruCommon } from "./ru/common";
import { home as ruHome } from "./ru/home";
import { vendors as ruVendors } from "./ru/vendors";
import { partners as ruPartners } from "./ru/partners";
import { productSolutions as ruProductSolutions } from "./ru/product-solutions";
import { contact as ruContact } from "./ru/contact";
import { services as ruServices } from "./ru/services";

interface LocaleContent {
  common: CommonContent;
  home: HomeContent;
  vendors: LogoPageContent;
  partners: LogoPageContent;
  productSolutions: ProductSolutionsContent;
  contact: ContactPageContent;
  services: Record<string, ServiceContent>;
}

const CONTENT: Record<Locale, LocaleContent> = {
  en: {
    common: enCommon,
    home: enHome,
    vendors: enVendors,
    partners: enPartners,
    productSolutions: enProductSolutions,
    contact: enContact,
    services: enServices,
  },
  az: {
    common: azCommon,
    home: azHome,
    vendors: azVendors,
    partners: azPartners,
    productSolutions: azProductSolutions,
    contact: azContact,
    services: azServices,
  },
  ru: {
    common: ruCommon,
    home: ruHome,
    vendors: ruVendors,
    partners: ruPartners,
    productSolutions: ruProductSolutions,
    contact: ruContact,
    services: ruServices,
  },
};

export function getContent(locale: Locale): LocaleContent {
  return CONTENT[locale];
}
