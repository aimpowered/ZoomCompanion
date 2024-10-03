import { model, models, Schema } from "mongoose";

const messageSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  messages: [{ type: String }],
});

const MessageModel = models.Message || model("Message", messageSchema);

export default MessageModel;
