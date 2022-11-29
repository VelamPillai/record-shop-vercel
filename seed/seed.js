// import mongoose from "mongoose";
// //get duplicate data for development purpose
// import { faker } from "@faker-js/faker";

// //import RecordsCollection ,UserCollection

// import RecordsCollection from "../model/recordschema.js";
// import UsersCollection from "../model/usersschema.js";
// //import mongodb connection
// import "../model/mongooseconnection.js";

// //enter the data using async - await function

// async function addRecords() {
//   const recordPromises = Array(20)
//     .fill(null)
//     .map(() => {
//       const record = new RecordsCollection({
//         title: faker.commerce.productName(),
//         author: faker.name.fullName(),
//         year: faker.date.past().getFullYear(),
//         img: faker.image.image(),
//         price: faker.commerce.price(),
//       });

//       return record.save();
//     });
//   await Promise.all(recordPromises);
//   //mongoose.connection.close();
// }

// /* import("./model/mongooseconnection.js").then(() => {
//   addRecords();
// }); */
// addRecords();
// //enter the data using async - await function

// async function addUsers() {
//   const userPromises = Array(20)
//     .fill(null)
//     .map(() => {
//       const user = new UsersCollection({
//         firstName: faker.name.firstName(),
//         lastName: faker.name.lastName(),
//         email: faker.internet.email(),
//         password: faker.internet.password(),
//       });

//       return user.save();
//     });
//   await Promise.all(userPromises);
//   console.log("20 users added");
//   mongoose.connection.close();
// }

// addUsers();

import mongoose from "mongoose";
import RecordsCollection from "../model/recordschema.js";
import { faker } from "@faker-js/faker";
import UsersCollection from "../model/usersschema.js";

mongoose.connect("mongodb://127.0.0.1:27017/record-shop", () => {
  console.log("connected to DB ....");
});

async function addRecords() {
  const recordPromises = Array(20)
    .fill(null)
    .map(() => {
      const record = new RecordsCollection({
        title: faker.commerce.productName(),
        author: faker.name.fullName(),
        year: faker.date.past().getFullYear(),
        img: faker.image.image(),
        price: faker.commerce.price(),
      });
      return record.save();
    });

  await Promise.all(recordPromises);
  mongoose.connection.close();
}
 //addRecords() 

async function addUsers() {
  const userPromises = Array(20)
    .fill(null)
    .map(() => {
      const user = new UsersCollection({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      });
      return user.save();
    });
  await Promise.all(userPromises);
  console.log("20 users stored in DB!");
  mongoose.connection.close();
}

//addUsers();
