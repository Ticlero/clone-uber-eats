export interface MailModuleOptions {
  apiKey: string;
  domain: string;
  fromEmail: string;
  global: boolean;
}

export interface EmailVar {
  key: string;
  value: string;
}
