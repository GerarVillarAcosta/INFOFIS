/**
 * Datos legales centralizados de INFOFIS.
 * Todas las páginas legales y el Footer leen de este archivo.
 * Cuando se registre la empresa en Paraguay, actualizar razón social y RUC acá.
 */

export const LEGAL = {
  brand: "INFOFIS",
  website: "https://infofis.vercel.app",
  lastUpdated: "6 de octubre de 2026",

  owner: {
    legalForm: "Persona física — actividad profesional independiente",
  },

  contact: {
    email: "infooofis@gmail.com",
  },

  tax: {
    vatId: null,
    smallBusiness: false,
    ruc: null,
  },

  host: {
    name: "Vercel Inc.",
    address: "440 N Barranca Ave #4133, Covina, CA 91723, EE. UU.",
    privacyUrl: "https://vercel.com/legal/privacy-policy",
    dpaUrl: "https://vercel.com/legal/dpa",
  },

  formProvider: {
    name: "Web3Forms",
    privacyUrl: "https://web3forms.com/privacy",
  },

  jurisdiction: {
    law: "las leyes de la República del Paraguay",
    courts: "los tribunales ordinarios de la ciudad de Asunción, Paraguay",
  },
};
