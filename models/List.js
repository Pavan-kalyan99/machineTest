import mongoose from 'mongoose';

const listSchema = new mongoose.Schema({
  agentId: mongoose.Schema.Types.ObjectId,
  firstName: String,
  phone: String,
  notes: String
});

export default mongoose.model('List', listSchema);
