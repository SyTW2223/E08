import {connect} from 'mongoose';


const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env

/**
 * If the enviroment variable is not established,
 * connects to the url
 */
const connectionString = NODE_ENV === 'test'
  ? MONGO_DB_URI_TEST
  : MONGO_DB_URI;

/**
 * Connects to the Mongo server
 */
connect(connectionString as string, {
  autoIndex: true,
}).then(() => {
  console.log('Connection to MongoDB server established');
}).catch(() => {
  console.log('Unnable to connect to MongoDB server');
});