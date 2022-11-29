import RecordsCollection from "../model/recordschema.js";
 import OrdersCollection from "../model/ordersschema.js";
import UsersCollection from "../model/usersschema.js";
 
import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// const getUsers = async(req, res) => {
//     //send response
//     const user = await UsersCollection.find();
//   res.send(user);
// }

// const getSingleUser = (req, res) => {
//     //send response
//     res.send('we have received single User');
// }
 
// const postUser =  (req, res) => {
//     //send response
//     res.send('hello from postreq after middlewareon User' );
// }
 
// const patchUser =  (req, res) => {
//     //send response
//     res.send('hello from patchreq after middleware on User');
// }
 
// const deleteUser = (req, res) => {
//     //send response
//     res.send('hello from deletereq after middleware on User');
// }
 

// export { getUsers, getSingleUser, patchUser, postUser, deleteUser };


export const getUsers = async (req,res,next)=>{
    //Controller // request handler
    try{
        const users = await UsersCollection.find().select('_id firstName lastName email password');
        res.json(users)  
    } 
    catch(err){
        next(err)
    }
}

export const getSingleUser = async(req,res,next)=>{
    "/users/:id"
    // "localhost:4000/users/123"  ---> get 
    try{
        const id = req.params.id;
        const singleUser = await UsersCollection.findById(id).select('_id firstName lastName email -password -__v');
        res.json({success:true, user:singleUser})

    }
    catch (err) {
        //next(err);
        //custom error
        const error = new Error('Id not found');
        error.status = 404;
        next(error);
    }
}


//sign up user
export const createUser = async (req,res,next)=>{
    // before storing user into database , hash user password and store the password to database
    //Hashing password using bcrypt
    //bcrypt.hash() ->async // bcrypt.hashSync()
    //POST request to create User
    
    try {
        console.log(req.file);
       /*  const saltRounds = 1;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
         console.log(hashedPassword); 
        req.body.password = hashedPassword; */
        
        const user = new UsersCollection(req.body);
        if (req.file) {
           
             //for react app is a front end
        //user.profileImage = `http://localhost:4000/${req.file.filename}`;
        //when using express server as a server with views has build of front end ---> this statement i used when deploy our production build in the render.com
        user.profileImage = `${req.file.filename}`
        }
        await user.save()
        res.json({success:true, data:user})
    }
    catch(err){
       next(err)
    }

}


export const updateUser = async (req,res,next)=>{
    //only working with thunder client and without profile image
    // Patch request /users/:id
   /*  try{
        const id = req.params.id ;
        const updatedUser = await UsersCollection.findByIdAndUpdate(id, req.body,{new:true} )
        res.json({success:true, User:updatedUser})
    }
    catch(err){
        next(err)
    } */
    
    //request from react front end front end (one or two fields)
//     try {
//         let user = await UsersCollection.findById(req.params.id);
//         console.log('user.image', user.profileImage);
//         /*console.log('update',req.file) */
//         if (req.file  ) {
//             user.profileImage = `http://localhost:4000/${req.file.filename}`;
//            /*  console.log(user.profileImage); */
//         }
//        
//         await user.save(); 
    //         const updatedUser = await UsersCollection.
    //findByIdAndUpdate(req.params.id, req.body, { new: true })
//         res.json({ success: true, data: updatedUser  });
        
//     }
//     catch(err){
//         next(err)
// } 
    
    //request from react front end with separate page for edit the fields in the front end side
try {
    let user = await UsersCollection.findById(req.params.id);
    
    console.log('update', req.file) 
    
    if (req.file  ) {
        //for react app is a front end
        //user.profileImage = `http://localhost:4000/${req.file.filename}`;
        //when using express server as a server with views has build of front end
        user.profileImage = `${req.file.filename}`
       /*  console.log(user.profileImage); */
    }
    if (req.body.password) {
        user.password = req.body.password;
    }
    
   
    await user.save(); 
    let body = {};
    for (const key in req.body) {
        
        if (req.body[key]!=='' && key !=='password' ) {
            body[key] = req.body[key];
        }
    }
    
    const updatedUser = await UsersCollection.findByIdAndUpdate(req.params.id, body, { new: true }).populate('orders')
   // console.log(updatedUser);
    res.json({ success: true, data: updatedUser  });
    
}
catch(err){
    next(err)
}


}



export const deleteUser = async (req,res,next)=>{
    //Delete request /users/:id
    try{
        const {id}= req.params 
        //findByIdAndDelete
/*         const deletedItem = await UsersCollection.findByIdAndRemove(id) */

        const existingUser = await UsersCollection.findById(id);

        if(existingUser){
            const deleteStatus = await UsersCollection.deleteOne({_id:existingUser._id})
            res.json({success:true, status: deleteStatus})
        }else{
            throw new Error("user id doesn't exist ! ")
        }
        
    }
    catch(err){
        next(err)
    }
}


//loginUser
export async function loginUser(req, res, next) {
    try {
        
        
        const user = await UsersCollection.findOne({ email: req.body.email });
       // console.log(user);
        if (user) {
            const check = await bcrypt.compare(req.body.password, user.password);
            if (check) {
                //create authentication functionality // create token
                let token = jwt.sign({ _id: user._id, firstName: user.firstName }, process.env.TOKEN_SECRET_KEY, { expiresIn: "1h", issuer: 'velam server', audience: 'students' });
                //store the authendication token to data base
                /* user.token = token;
                await user.save(); //drawback , password will change again.
                */
                //another method to store token to database
                const updatedUser = await UsersCollection.findByIdAndUpdate(user._id, { token: token }, { new: true }).populate('orders');
                // 3 methods to send  the token  to the user
                //1.sending token into body of res
                //res.json({ success: true, data: user ,token: token });
                //2.sending token to client with header (better way - front-end developer  will  process the token manually)
                /* res.json({ success: true, data: user });
                res.header({"token":token}); */
                //another way
                res.header({ "token": token }).json({ success: true, data: updatedUser });//combine header and body as a single command.
                //3.sending token to client from server using cookie (better way - browser will automatically process the token)
                /* res.json({ success: true, data: user });
                res.cookie({"authenticationCertificate":token}); */

            }
            
            else {
                throw new Error('Invalid password, please try again');
            }
        
            //console.log(check);
        }
    
        else {
            throw new Error("email doesn't exists")
        } 
        
    }
    catch (err) {
        next(err.message);
    }

    
}

//verifyusertoken  (when user refresh the browser , without logged out . )

export const verifyUserToken = async(req, res, next) => {
    try {
        const token = req.headers.token;
        //to extract the payload (which contains the user._id ,that is while for  the JWT-token creation we used user._id and user.firstName )from the token
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        //to find the user from the user from database
        //populate orders - which show the orders
        const user = await UsersCollection.findById(decoded._id).populate('orders');
        res.json({ success: true, data: user });

        
    }
    catch (err) {
        next(err);
    }
}
