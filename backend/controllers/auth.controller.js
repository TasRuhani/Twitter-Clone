import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'

export const signup = async(req, res) => {
   try{
    const {fullname, username, email, password} = req.body;
    const emailRegex =  /^[a-zA-Z0-9. _%+-]+@[a-zA-Z0-9. -]+\\. [a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)){
        return res.status(400).json({ error: "Invalid Email Format" });
    }

    const existingUser = await User.findOne({ username });
    if(existingUser){
        return res.status(400).json({ error: "Username is already taken" });
    }

    const existingEmail = await User.findOne({ email });
    if(existingEmail){
        return res.status(400).json({ error: "Email is already taken" });
    }
    
    const salt = await bcrypt.genSaatl(10);
const hashed = await bcrypt.hash(password, salt);

const newUser = new User({
    fullname,
    username,
    email,
    password: hashedPassword
})

if(newUser){
    generateTokenAndSetCookie(newUser._id,res)
    await newUser.save();

    res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        email: newUser.email,
        followers: newUser.followers,
        following: newUser.following,
        profileImg: newUser.profileImg,
        coverImg: newUser.coverImg,
        
    })
} else {
    res.status(400).json({ error: "Invalid User Data" });
}

   }  catch(error) {
        console.log("Error in Signup controller", error.message)
        res.status(500).json({ error: "Internal Server Error" });
   }
}


export const login = async(req, res) => {
    res.json({
        data: "You hit the login endpoint",
    })
}

export const logout = async(req, res) => {
    res.json({
        data: "You hit the logout endpoint",
    })
}
