import mongodb from 'mongodb';

import Collection from 'mongodb/lib/collection';
import envLoader from './env_loader';

/* Represent MongoDB client */
class DBClient {
  /* Create new DBClient instance */
  constructor() {
    envLoader();
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const dbURL = `mongodb://${host}:${port}/${database}`;

    this.client = new mongodb.MongoClient(dbURL, { useUnifiedTopology: true });
    this.client.connect();
  }

  /** Check if this client's connection to MongoDB server is active */
  isAlive() {
    return this.client.isConnected();
  }

  /** Retrieves the number of users in database */
  async nbUsers() {
    return this.client.db().collection('users').countDocuments();
  }

  /** Retrieve the number of files in database */
  async nbFiles() {
    return this.client.db().collection('files').countDocuments();
  }

  /** Retrieve reference to users collection */
  async usersCollection() {
    return this.client.db().collection('users');
  }

  /** Retrieve reference to files collection */
  async filesCollection() {
    return this.client.db().collection('files');
  }
}

export const dbClient = new DBClient();
export default dbClient;
