// step 1 : app is not available ,so we can use express.Router() function to re-route

import express from 'express';
//import { getRecords, getSingleRecord, patchRecord, postRecord, deleteRecord } from '../controller/recordscontroller.js';
import { getRecords, getSingleRecord, updateRecord, deleteRecord, createRecord } from '../controller/recordscontroller.js';

import { isAdmin } from '../middleware/isAdminMiddleware.js';
import verifyToken from '../middleware/verifyToken.js';

const route = express.Router();

//route GET
route.get('/',getRecords  )

//get single Record //Route GET '/Records/:id'
route.get('/:id', verifyToken,getSingleRecord)

 //route post '/Records'
route.post('/', verifyToken,isAdmin,createRecord )
 
 //route patch '/Records/:id'
route.patch('/:id',verifyToken,isAdmin,updateRecord)
 
//route delete '/Records/:id'
route.delete('/:id',verifyToken,isAdmin, deleteRecord)

export default route;

