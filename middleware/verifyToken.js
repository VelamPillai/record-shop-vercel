import jwt from "jsonwebtoken";
import UsersCollection from "../model/usersschema.js";

async function verifyToken(req, res, next) {
  try {
    //extracting token from req.header array (from the client)
    const { token } = req.headers;
    console.log(token);

    //verify token
    const payload = jwt.verify(token, process.env.TOKEN_SECRET_KEY); //if the verification is correct , it will return the payload.
    console.log(payload);

    //get user from database by using the verified data from the token
    const user = await UsersCollection.findById(payload._id);

    //attaching user in request
    req.user = user; //for using next middle ware ,if we want ,eg -> isAdmin middleware

    next();
  } catch (err) {
    next(err);
  }
}

export default verifyToken;
