import express from 'express';
import helmet from 'helmet'; // https://expressjs.com/en/advanced/best-practice-security.html
import { settings } from './config'
import { LogHelper } from './utils';
import cors from 'cors';


const app = express()
  .use(helmet())
  .use(cors())
  .use(express.urlencoded({ extended: true }))
  .use(express.json());

app.get('/', (req, res) => {
  res.status(200).send({
    code: 200,
    message: 'Hello you must be authenticated to proceed!',
  });
});



app.use((req, res) => {
  return res.status(404).json({
    error: 'Not Found',
  });
});


app.listen(settings.PORT, () => {
  LogHelper.info(`Listening on ${settings.PORT}`);
  LogHelper.info(`Ready! Open ${settings.serverUrl}`);
});
