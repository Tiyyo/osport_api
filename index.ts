import http from 'http';
import https from 'https';
// import fs from 'fs';
import logger from './app/helpers/logger.ts';
import './app/helpers/env.load.ts';
import app from './app/index.app.ts';

const PORT = process.env.PORT || 8080;

const httpServer = http.createServer(app);
const httpsServer = https.createServer({
  // key: fs.readFileSync('key.pem'),
  // cert: fs.readFileSync('cert.pem'),
}, app);
// const server = createServer(app);

httpServer.listen(PORT, () => {
  logger.info(`HTTP Server is running on port ${PORT}`);
});

httpsServer.listen(8443, () => {
  logger.info(`HTTPS Server is running on port ${8443}`);
});
