import mongoose, { Schema, Document } from "mongoose";

interface AuditDocument extends Document {
  protocols: string[];
  scan: any[];
  result: { x: number; y: number };
  createdAt: Date;
}

const AuditSchema: Schema = new Schema({
  protocols: { type: [String], required: true },
  scan: { type: Array, required: true },
  result: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<AuditDocument>("Audit", AuditSchema);
