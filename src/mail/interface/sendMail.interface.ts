export interface SendMail {
  to: string;
  from: string;
  subject: string;
  template: string;
  url?: string;
}
