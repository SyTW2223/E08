import {connect} from 'mongoose';

/**
 * If the enviroment variable is not established,
 * connects to the url
 */
const mongodb_url = 'mongodb+srv://SyTW:sytw123@cluster0.vrub0al.mongodb.net/?retryWrites=true&w=majority';

/**
 * Connects to the Mongo server
 */
connect(mongodb_url, {
  autoIndex: true,
}).then(() => {
  console.log('Connection to MongoDB server established');
}).catch(() => {
  console.log('Unnable to connect to MongoDB server');
});