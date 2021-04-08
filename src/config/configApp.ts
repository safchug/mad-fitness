import 'dotenv/config';

export const configApp = {
  appPort: process.env.PORT,
  appHost: process.env.HOST,
  saltRounds: 10,
};
