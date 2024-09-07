import { ISession } from "types";
import { model, Schema } from "mongoose";

const SessionSchema = new Schema<ISession>({
  username: { type: String, required: true },
  token: { type: String, required: true },
});

const SessionModel = model<ISession>("Session", SessionSchema);

export default SessionModel;
