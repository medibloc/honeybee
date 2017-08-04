var mongoose = require('mongoose');

var HistorySchema = new mongoose.Schema({
  patient: {type: String, lowercase: true},
  index: {type: Number},
  disease: {type: String},
  prescription: {type: String},
  date: {type: Date, default: Date.now}
});

HistorySchema.index({patient: 1, index: 1}, {unique: true})

mongoose.model('History', HistorySchema);
