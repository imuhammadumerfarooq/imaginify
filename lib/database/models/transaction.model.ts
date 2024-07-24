import { Document, model, models, Schema } from "mongoose";

const TransactionSchema = new Schema({
    createdAt: { type: Date, required: Date.now },
    stripeId: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    plan: { type: String },
    credits: { type: Number },
    buyer: { type: Schema.Types.ObjectId },
})

const Transaction = models?.Transaction || model('Transaction', TransactionSchema);

export default Transaction;