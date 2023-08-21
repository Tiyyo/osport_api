import { createServer } from 'http';
import logger from './app/helpers/logger.ts';
import './app/helpers/env.load.ts';
import app from './app/index.app.ts';

const PORT = process.env.PORT || 8080;

const server = createServer(app);

server.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
