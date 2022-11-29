// import mongoose from "mongoose";
// /* import { Schema, model } from mongoose; */

// const Schema =  mongoose.Schema;

// //order document structure 

// const orderSchema = new Schema({
//     records: [{ type: String }],
//     totalPrice: { type: Number, required: true }
// });

// //order collection (order table)

// const OrdersCollection = mongoose.model('orders', orderSchema);

// //export

// export default OrdersCollection;

import mongoose from "mongoose";

const Schema = mongoose.Schema ;

// order document structure
const orderSchema = new Schema({
    //how to make a relationship between different collection in the database
    records: [ {type:Schema.Types.ObjectId,ref:"records",required:true} ],
    totalPrice: { type: Number, required: true },
    userId :{type:Schema.Types.ObjectId,ref:'users' ,required:true} //here type = not normal string ,it is a unique user Objectid from the collection - 'user'
})

const OrdersCollection = mongoose.model("orders", orderSchema)

export default OrdersCollection;