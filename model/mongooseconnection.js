import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config();
console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI,()=>{console.log("DB connection established !")});