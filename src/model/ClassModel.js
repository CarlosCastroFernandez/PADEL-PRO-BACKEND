const mongo = require("mongoose");
const Schema = mongo.Schema;

const classSchema = new Schema(
  {
    date: {
      type: Date,
      required: true
    },
    trainer: {
      type: mongo.Schema.Types.ObjectId,
      ref: "Trainer",
      required: true
    },
    students: [
      {
        type: mongo.Schema.Types.ObjectId,
        ref: "Student"
      }
    ]
 
  }
);
const classModel = mongo.model("Class", classSchema, "Class")

module.exports = classModel;
