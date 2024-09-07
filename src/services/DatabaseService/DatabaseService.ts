import { connect, Model, RootFilterQuery } from "mongoose";
import { Config } from "config";

/* DatabaseService - Singleton */

class DatabaseService {
  // this is a private static member
  // use instance instead of creating a new DatabaseService object.
  private static instance?: DatabaseService;

  constructor(mongoUri?: string, onConnect?: () => void, onFail?: () => void) {
    // if there is already a singleton instance
    if (DatabaseService.instance !== undefined) {
      // use that instance instead.
      return DatabaseService.instance;
    }

    // else, create a new instance
    const uri = mongoUri ?? Config.MongoDbUri ?? "";
    connect(uri).then(onConnect).catch(onFail);
    DatabaseService.instance = this;
    return this;
  }

  async getDocumentById<T>(
    id: string,
    collection: Model<T>
  ): Promise<T | null> {
    return await collection.findById(id);
  }

  async getDocumentByQuery<T>(
    query: RootFilterQuery<T>,
    collection: Model<T>
  ): Promise<T | null> {
    return await collection.findOne(query);
  }

  async createDocument<T>(data: T, collection: Model<T>): Promise<T> {
    return await collection.create(data);
  }
}

export default DatabaseService;
