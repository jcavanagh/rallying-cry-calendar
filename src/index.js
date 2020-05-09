import dotenv from 'dotenv';
dotenv.config();

import cron from './cron.js';
import service from './service.js';

const mode = process.env.RCC_MODE;
if (mode == 'cron') {
  cron();
} else {
  service();
}
