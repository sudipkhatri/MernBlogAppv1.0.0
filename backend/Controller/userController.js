import userSchema from "../Model/userSchema";
import bcrypt from 'bcryptjs';

export const getAllUser = async(req, res, next)=>{
    let users;
    //always use try and catch block when working with db
    try{
        users = await userSchema.find();
    }
    catch(err){
     return console.log(err);
    }
    if(!users){
        res.status(404).json({message: "no user found"})
    }
    return res.status(200).json({message: "success", users})

}

export const signUp = async(req, res, next) =>{

    const {name, email, password, blogs } = req.body;

    let existingUser;
    try{
        existingUser = await userSchema.findOne({email})
    }
    catch(e){
      return console.log(e);
    }
    if(existingUser){
      return res.status(400).json({message: "user exist"})
    }
    const hashPassword = bcrypt.hashSync(password);
    const user = new userSchema({
        name,
        email,
        password : hashPassword,
        blogs : []
    });
    try{
        await user.save()
    }
    catch(e){
       return console.log(e);
    }
    res.status(201).json({user})
}

export const login = async(req, res, next) =>{

    const{email, password} = req.body;
    let existUser 
    try{
        existUser = await userSchema.findOne({email})
    }
    catch(err){
        return console.log(err)
    }
    if(!existUser){
        res.status(400).json({message: "user not found"})
    }
    const isPassword = bcrypt.compareSync(password, existUser.password);
    if(!isPassword){
        return res.status(400).json({message: "Password Incorrect !"})
    }
    return res.status(200).json({message: "login successfull", user : existUser});
}

