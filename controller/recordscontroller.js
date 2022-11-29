 import RecordsCollection from "../model/recordschema.js";
 import OrdersCollection from "../model/ordersschema.js";
 import UsersCollection from "../model/usersschema.js";

// const getRecords = async (req, res) => {
//   //send response
//   const records = await RecordsCollection.find();
//   res.send(records);
// };

// const getSingleRecord = (req, res) => {
//   //send response
//   res.send("we have received single record");
// };

// const postRecord = (req, res) => {
//   //send response
//   res.send("hello from postreq after middlewareon record");
// };

// const patchRecord = (req, res) => {
//   //send response
//   res.send("hello from patchreq after middleware on record");
// };

// const deleteRecord = (req, res) => {
//   //send response
//   res.send("hello from deletereq after middleware on record");
// };

// export { getRecords, getSingleRecord, patchRecord, postRecord, deleteRecord };


/* import RecordsCollection from "../models/recordsschema.js"
import OrdersCollection from "../models/ordersschema.js"
import UsersCollection from "../models/usersschema.js" */

export const getRecords = async (req,res,next)=>{
    //Controller // request handler
    console.log(req.method)
    try{
        const records = await RecordsCollection.find()
        res.json(records)  
    } 
    catch(err){
        next(err)
    }
}

export const getSingleRecord = async(req,res,next)=>{
    "/records/:id"
    "/records/123"
    try{
        const id = req.params.id
        const singleRecord = await RecordsCollection.findById(id)
        res.json({success:true, record:singleRecord})

    }
    catch(err){
       next(err)
    }
}

export const createRecord = async (req,res,next)=>{
    //POST request to create record
    try{
        const record = new RecordsCollection(req.body)
        await record.save()
        res.json({success:true, record})
    }
    catch(err){
        next(err)
    }

}


export const updateRecord = async (req,res,next)=>{
    // Patch request /records/:id
    try{
        const id = req.params.id ;
        const updatedRecord = await RecordsCollection.findByIdAndUpdate(id, req.body,{new:true} )
        res.json({success:true, record:updatedRecord})
    }
    catch(err){
        next(err)
    }
}



export const deleteRecord = async (req,res,next)=>{
    //Delete request /records/:id
    try{
        const {id}= req.params 
        //findByIdAndDelete
/*         const deletedItem = await RecordsCollection.findByIdAndRemove(id) */

        const existingRecord = await RecordsCollection.findById(id)

        if(existingRecord){
            const deleteStatus = await RecordsCollection.deleteOne({_id:existingRecord._id})
            res.json({success:true, status: deleteStatus})
        }else{
            throw new Error("record id doesn't exist ! ")
        }
        
    }
    catch(err){
        next(err)
    }
}