import http from 'http';
import logger from './app/helpers/logger.js';
import './app/helpers/env.load.js';
import app from './app/index.app.js';
// import initSocket from './app/service/chat/initSocket.js';

const PORT = process.env.PORT || 8080;

const httpServer = http.createServer(app);
// add client url in production
// initSocket(httpServer, {
//   cors: { origin: '*' },
// });

httpServer.listen(PORT, () => {
  logger.info(`HTTP Server is running on port ${PORT}`);
});
