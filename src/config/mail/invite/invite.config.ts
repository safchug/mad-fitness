const now = new Date();
const expires = new Date(now.getTime() + parseInt(process.env.INVITE_EXPIRES));

export const inviteConfig = {
  subject: process.env.MAIL_INVITE_SUBJECT,
  template: process.env.MAIL_INVITE_TEMPLATE,
  from: process.env.MAIL_USER,
  expiresAt: expires,
};
