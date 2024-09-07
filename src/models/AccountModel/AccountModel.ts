import { IAccount, ISession } from "types";
import { model, Schema } from "mongoose";

const AccountSchema = new Schema<IAccount>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
});

const AccountModel = model<IAccount>("Account", AccountSchema);

export default AccountModel;
