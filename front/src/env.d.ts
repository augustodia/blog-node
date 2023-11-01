/// <reference types="vite/client" />

interface ImportMetaEnv {
    SERVER_PORT: number
    VITE_API_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

