
import express from 'express';
import bodyParser from 'body-parser';
import 'babel-polyfill';
import authRouter from './server/routes/authRouter';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', authRouter);

app.listen(3000, () => {
  console.log('app listening at PORT: 3000');
});

export default app;
