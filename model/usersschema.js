// import mongoose from 'mongoose';

// const Schema = mongoose.Schema;

// //user Document structure 

// const userSchema = Schema({
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true }
// });

// //create a user collection(user table)
// const UsersCollection = mongoose.model('users', userSchema);

// //create index
// UsersCollection.createIndexes({ email: -1 }); // arrange our record as per index in Database

// //export

// export default UsersCollection;

import mongoose, { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';



//user document structure
const userSchema = new Schema({
  //role specify for admin ,when posting req. if nit given role is user
  role: { type: String, enum: ['user', 'admin'] ,default:'user'},
    firstName: {type:String, required:true},
    lastName: {type:String, required:true},
    email:{type:String, required:true, unique: true}, 
    password: { type: String, required: true },
  orders: [{ type: Schema.Types.ObjectId, ref: 'orders' }],
  token: { type: String },
  profileImage: {
    type: String, default: function () {
    return `https://joeschmoe.io/api/v1/${this.firstName}`
  }}
    
})


//how to create virtual property
userSchema.virtual('fullName').get(function(value, virtual, doc) {
    return this.firstName + ' ' + this.lastName;
  });

//mongoose method to do some action before storing the data to the Database //before do 'save' event , do this things
/* userSchema.pre('save', function (next) {
 //condition is used here , while in order collection the save method , we used to include the order
  if (this.isModified('password')) {
    const saltRound = 10;
    const hashedPassword = bcrypt.hashSync(this.password, saltRound);
    this.password = hashedPassword;
    }
      
    console.log('I am Pre-Save middleware');
    next();




}) */
//for updatation
userSchema.pre('save', function (next) {
  
   if (this.isModified('password')) {
     const saltRound = 10;
     const hashedPassword = bcrypt.hashSync(this.password, saltRound);
     this.password = hashedPassword;
     }
       
    
     next();
 
 
 
 
 }) 

//after save event this function will execute.
/* userSchema.post('save', function () {
    console.log('I am post-save function');
}) */




const UsersCollection = model("users", userSchema)

 //create index  => used to modify email as a unique key //always used with unique while creating the field
UsersCollection.createIndexes({email:-1}) 

export default UsersCollection ;