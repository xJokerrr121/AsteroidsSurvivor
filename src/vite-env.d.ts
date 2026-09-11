/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Managed analytics endpoint. Must be an allowlisted https host — see `src/telemetry/beacon.ts`. */
  readonly VITE_TELEMETRY_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
