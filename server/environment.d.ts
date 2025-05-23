declare namespace NodeJS {
  interface ProcessEnv {
    DB_CONNECTION_URL: string;
    EMAIL_PASSWORD: string;
    EMAIL_USER: string;
    FRONTEND_ENDPOINT: string;
  }
}
