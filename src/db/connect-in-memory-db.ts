import mongoose, { Mongoose } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer: MongoMemoryServer;
let mongo: Mongoose;
const mongod = async () => {
  mongoServer = await MongoMemoryServer.create();
  return mongoServer;
};

export const connectInMemoryDB = async (): Promise<void> => {
  mongoServer = await mongod();
  const uri = mongoServer.getUri();

  mongo = await mongoose.connect(uri);
};

export const dbDisconnect = async (): Promise<void> => {
  mongo.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
};
