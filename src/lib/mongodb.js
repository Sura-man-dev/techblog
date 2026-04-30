import { MongoClient } from "mongodb";

const options = {};

let client;
let clientPromise;

function createClientPromise() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    return global._mongoClientPromise;
  }

  client = new MongoClient(uri, options);
  return client.connect();
}

export default function getMongoClient() {
  if (!clientPromise) {
    clientPromise = createClientPromise();
  }
  return clientPromise;
}
