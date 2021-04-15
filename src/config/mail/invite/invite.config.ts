const now = new Date();
const expires = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days

export const inviteConfig = {
  subject: 'Welcome to Mad fitness. Please continue your registration!',
  template: 'invite',
  HOST: '127.0.0.1',
  PORT: '3000',
  PROTOCOL: 'http',
  expiresAt: expires,
};
