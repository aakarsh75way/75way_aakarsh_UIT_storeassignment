import  { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt' 
export const registerUser=async (req:Request,res:Response)=>{
  console.log("Recieved a req")
    try {
        const { username, email, password,confirmPassword,preference} = req.body;
       console.log("Prefrence",preference)
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ error: 'Email already exists' });
        }
        if(password===confirmPassword){
     // Hash the password before saving it to the database
     const hashedPassword = await bcrypt.hash(password, 10);
    
     // Create a new user
     const newUser = new User({
       username,
       email,
       role:"user",
       preference,
       password: hashedPassword,
     });
     await newUser.save();
     res.status(201).json({ message: 'User registered successfully' });
        }else{
          res.status(400).json({ message: 'Wrong Credentials!'});
        }
   
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}