// //step 1:import express to listen request from front-end client
import express from "express";
//step 5: import morgan package - middleware package(exec b/w request and response) - used to log requests along with some other information

// //import mongoose (Object-oriented programming lib used to connect MongoDB to Nodejs js runtime environment)
import mongoose from "mongoose";
// //to access env variable
import dotenv from "dotenv";
//import multer -for process the file uploaded with request


//import cors

//import cors from "cors";

dotenv.config();

//config multer package  to store data in the folder and overwrite the filename.-> when you get the image file in a request , where you have to store the image , what is the name for the file to be stored //this method should need to create a folder for store data


//another way - to save the file from req api - here if the folder is not exists , it will create a folder and put the file on it.
//const upload = multer({ dest: 'uploads/' });//storing the image in the upload folder

// //import userRoute
import userRoute from "./routes/userroutes.js";
import recordRoute from "./routes/recordroutes.js";
import orderRoute from "./routes/orderroutes.js";
import verifyToken from "./middleware/verifyToken.js";

// step 2: creating /initializing express server
// const app = express();

// //create mongoose connection - local machine
console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, () => {
  console.log("DB connection established !");
});

// //import the mongoose connection file --->if it is placed as a separate file.
// import './model/mongooseconnection.js';

// //MVC model
// //MODELS (data storage ,DB)
// //VIEWS ( UI, frontend , presentational data)
// //CONTROLLERS (request handlers , logic)

// /*step :5

// 1.in middle ware ,after serving response ,the code will not run the main controller response.
// 2 so we needed next() controller
// 3. next() method will send result to following controller and serving the request with main controller response.
// 4.app.use() ->it will execute for any kind of request(GET,POST,PATCH,DELETE etc)
// 5.any endpoint app.use('',(req,res)=>{})

// */

// //step5 middleware to print to show the request -use morgan middleware

// app.use(morgan('dev'));

// //step4: create routs or endpoints (user send the request from frontend ,it contains endpoints ,where user wants to land his search) || in server side this command used to get the user req and server the req.

// //GET - ROUTE
// //get request app.get(endpoint,request_handler(req,res){})
// //index route
// /*
// 3 types of RESPONSE
//     1.res.send()
//     2.res.json()
//     3.res.file()
// */
// //routes to userRoutes.js
// app.use("/users",userRoute);
// //routes to recordRoute
// app.use("/records",recordRoute);
// //route to orderRoute
// app.use("/orders",orderRoute);

// //step 3:Listen on PORT
// const PORT = process.env.PORT || 4000;
// app.listen(4000,()=>console.log('server started....',PORT))

const app = express();
const PORT =process.env.PORT || 5000;


//to avoid cors error to access data from backend to front end (cross origin resource sharing )

//app.use(cors({ origin: "http://localhost:3000" ,exposedHeaders:["token"]}));

//serve static file /pages
app.use(express.static("upload"));

//Custom middleware
/* function log(req,res,next){
        console.log("I am a middleware")
        next() 
}
function checkMethod(req,res,next){
    console.log("I am Second middleware")
    next()
}
function thirdMiddleware(req,res,next){
    console.log("I am third middleware")
}
app.use(  log , checkMethod , thirdMiddleware) */

//express json middleware to parse any incoming json data and give the value in req.body

app.use(express.json());

//production code route (build folder /static folder)
//whenever receive request to serve the build static files 
app.use(express.static('view/build'));
//build routing
app.get('/', (req, res) => {
  res.sendFile("./view/build/index.html",{root:"."})
})


//MVC
// MODELS (data storage)
// VIEWS (UI ,frontend , presentational data)
// CONTROLLERS (request handlers , logic)

//Routes
// "/users" GET POST PATCH DELETE
//upload.single(''image') -> will create a file properties in (req.file) -> it makes one folder (if not ),otherwise it will store the image in the upload folder
//multer has different methods like single, array etc
// app.use("/users",upload.single('image') ,userRoute);
app.use("/users", upload.single("profileImage"), userRoute);

// "/records" GET POST PATCH DELETE
app.use("/records", recordRoute);

// "/orders" GET POST PATCH DELETE
app.use("/orders", verifyToken, orderRoute);

// handling 404 page not found error (custom error handling middleware)
app.use((req, res, next) => {
  /*  res.json({success:false, message:"there is no such route found"}) */
  res.sendFile("./views/pageNotFound.html", { root: "." });
});

//universal error handler middleware
//if the request has some message , ie not empty request , (next() - function used in middleware to forward a request down . If it is having some message as a argument , then the below universal error handler will execute  => next('error');)
app.use((err, req, res, next) => {
  //normal error status -> will show the error message , but the RRC status code is 200 on browser
  //res.json({ success: false, message: err });
  //how to handle - user defined error
  res.status(err.status || 500).json({ success: false, message: err });
});

//listening request on port 4000
app.listen(PORT, () => console.log("server is running on port :", PORT));
