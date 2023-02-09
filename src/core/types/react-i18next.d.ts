import { resources } from "~/resources/i18n/i18n";

declare module 'react-i18next' {
    interface CustomTypeOptions {
      resources: typeof resources['fr']
    }
  }