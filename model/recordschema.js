// import mongoose from "mongoose";
// import Mongoose from "mongoose";

// //to create instance of Schema class from mongoose.
// const Schema = mongoose.Schema;


// //record document structure - singe row structure of the table of the DataBase.
// const recordSchema = new Schema(
//     {
//         title: { type: String, required: true },
//         author: { type: String, required: true },
//         year: { type: Number, required: true },
//         img: { type: String, required: true },
//         price: { type: Number, required: true }
        
//     }
// );

// //create collection and store such type of documents in the collection (creating record table)

// const RecordsCollection = mongoose.model('records', recordSchema);

// export default RecordsCollection;

import mongoose from "mongoose";

const Schema = mongoose.Schema;

//record document structure
const recordSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
  img: { type: String, required: true },
  price: { type: Number, required: true },
});

//create collection and store such type of documents in that collection
const RecordsCollection = mongoose.model("records", recordSchema)

export default RecordsCollection