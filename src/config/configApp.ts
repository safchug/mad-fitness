export const configApp = {
  appPort: process.env.PORT || 3000,
  appHost: process.env.HOST || '0.0.0.0',
  appProtocol: process.env.PROTOCOL || 'http',
  saltRounds: 10,
};
