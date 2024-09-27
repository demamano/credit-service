import app from './app';
import logger from './utils/logger';
import http from 'node:http';

// app server
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port, () => {
    logger.info(`Server is available port ${port}`);
});
