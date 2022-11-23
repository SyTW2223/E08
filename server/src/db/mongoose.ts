import {connect} from 'mongoose';

/**
 * If the enviroment variable is not established,
 * connects to the url
 */
const mongodb_url = 'mongodb+srv://SyTW:sytw123@cluster0.vrub0al.mongodb.net/test';

/**
 * Connects to the Mongo server
 */
connect(mongodb_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => {
  console.log('Connection to MongoDB server established');
}).catch(() => {
  console.log('Unnable to connect to MongoDB server');
});