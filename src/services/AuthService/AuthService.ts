/* AuthService - Singleton */

import { AccountModel, SessionModel } from "models";
import { DatabaseService } from "services/DatabaseService";
import { Database } from "services";
import { IAccount, ISession } from "types";
import { compareSync } from "bcrypt";
import { randomBytes } from "crypto";

class AuthService {
  // this is a private static member
  // use instance instead of creating a new AuthService object.
  private static instance?: AuthService;
  private database?: DatabaseService;

  constructor() {
    // if there is already a singleton instance
    if (AuthService.instance !== undefined) {
      // use that instance instead.
      return AuthService.instance;
    }

    // else, create a new instance
    this.database = new DatabaseService();
    return this;
  }

  async createSession(username: string): Promise<ISession> {
    if (this.database === undefined)
      throw Error("DatabaseService not initialized.");

    const token = randomBytes(24).toString("hex");
    return this.database?.createDocument<ISession>(
      {
        username,
        token,
      },
      SessionModel
    );
  }

  async checkCredentials(
    username: string,
    password: string
  ): Promise<IAccount | null> {
    const account = await Database.getDocumentByQuery(
      { username: username },
      AccountModel
    );
    if (account === null) return null;

    const isPasswordMatch = compareSync(password, account.password);
    if (!isPasswordMatch) return null;

    return account;
  }

  async verifyToken(token: string): Promise<boolean> {
    const session = await Database.getDocumentByQuery({ token }, SessionModel);
    return session !== null;
  }
}

export default AuthService;
