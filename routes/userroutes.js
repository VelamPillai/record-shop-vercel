// step 1 : app is not available ,so we can use express.Router() function to re-route

import express from 'express';
import { getUsers, getSingleUser, updateUser, deleteUser, createUser ,loginUser ,verifyUserToken } from '../controller/userscontroller.js';

import { usersValidation } from '../middleware/validationMiddleware.js';
import { isAdmin } from '../middleware/isAdminMiddleware.js';
import verifyToken from '../middleware/verifyToken.js';
const route = express.Router();

//route GET
route.get('/',verifyToken ,isAdmin, getUsers);


//Route POST '/users/login'
route.post('/login', loginUser);

//Route GET -verifyToken
route.get('/verifyusertoken', verifyUserToken);


//get single User //Route GET '/Users/:id' --->it is a restricted route --->must be after all get request
route.get('/:id',verifyToken ,isAdmin, getSingleUser)

 //route post '/Users'
 //add express validator and sanitizer for user input
route.post('/',usersValidation,createUser);
//without validation and sanitization middleware
//route.post('/', createUser)
 
 //route patch '/Users/:id'
route.patch('/:id', verifyToken,isAdmin,updateUser)
 
//route delete '/Users/:id'
route.delete('/:id', verifyToken,isAdmin,deleteUser)



export default route;