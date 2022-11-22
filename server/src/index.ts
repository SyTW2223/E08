import * as express from 'express';
import './db/mongoose';
import {defaultRouter} from './routers/default';
import {postRouter} from './routers/post';
import {getRouter} from './routers/get';
// import {patchRouter} from './routers/patch';
// import {deleteRouter} from './routers/delete';

const app = express();
app.use(express.json());
app.use(defaultRouter);
app.use(postRouter);
app.use(getRouter);
// app.use(patchRouter);
// app.use(deleteRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});