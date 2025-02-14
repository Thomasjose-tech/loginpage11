import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://hooset05:ebjzmQgIhqDsLPgZ@cluster1.jyea0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";
let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default clientPromise;
