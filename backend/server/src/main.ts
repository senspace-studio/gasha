import * as os from 'os';
import * as __cluster__ from 'cluster';
import { Cluster } from 'cluster';
import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './modules/app.module';

const cluster = __cluster__ as unknown as Cluster;
const numCPUs = os.cpus().length;

const logger = new Logger(cluster.isPrimary ? 'Primary' : 'Worker');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  await app.listen(3000);
}
// bootstrap();
const primaryProcess = () => {
  logger.log(`Primary server started on ${process.pid} cpu len: ${numCPUs}`);
  for (let i = 0; i < numCPUs; i++) {
    logger.log(`cluster fork: ${i}`);
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    logger.warn(
      `[${worker.id}] Worker died : [PID ${worker.process.pid}] [Signal ${signal}] [Code ${code}]`,
    );
    cluster.fork();
  });
};

const workerProcess = () => {
  logger.log(`bootstrap@${process.pid}`);
  bootstrap();
};

if (cluster.isMaster || cluster.isPrimary) {
  primaryProcess();
} else {
  workerProcess();
}
