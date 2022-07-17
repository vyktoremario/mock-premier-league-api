import express from 'express';
import helmet from 'helmet'; // https://expressjs.com/en/advanced/best-practice-security.html
import { settings } from './config'
import { LogHelper } from './utils';
import cors from 'cors';
import { connectDB } from './db/connect-db';
import { connectInMemoryDB } from './db/connect-in-memory-db';
import { UserModel } from './models/user-model';

if (process.env.NODE_ENV === "test") {
  connectInMemoryDB();
} else {
  connectDB();
}


const app = express()
  .use(helmet())
  .use(cors())
  .use(express.urlencoded({ extended: true }))
  .use(express.json());

app.get('/', async (req, res) => {
  const user = await UserModel.find({});
  res.status(200).send({
    code: 200,
    message: 'Hello you must be authenticated to proceed!',
    result: user
  });
});

app.get('/create', async (req, res) => {
  const data = {
    email: 'mario@gmail.com',
    firstName: 'victor',
    lastName: 'umeh',
    password: 'admin',
    roles: 'admin',
  }
  const user = await UserModel.create(data);
  res.status(200).send({
    code: 200,
    message: 'Hello you must be authenticated to proceed!',
    result: user
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
