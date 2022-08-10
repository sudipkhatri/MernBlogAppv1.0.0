import mongoose from "mongoose";
import blogSchema from "../Model/blogSchema";
import userSchema from "../Model/userSchema";

export const getAllBlog = async (req, res, next) =>{

    let blogs;

    try{
        blogs = await blogSchema.find().populate('user');
    }
    catch(err){
        console.log(err);
    }
    if(!blogs){
        res.status(404).json({message : "Blog not found."})
    }
    return res.status(200).json({message : "Blogs", blogs})

}

export const addBlog = async(req,res,next) =>{

    const {title, description, image, user} = req.body;
    // takes the user -> which is userId  
    let existingUser;
    try{
        existingUser = await userSchema.findById(user)
    }
    catch(err){
        return console.log(err)
    }
    if(!existingUser){
        return res.status(400).json({message : "unauthorized, unable to find"});
    }
    const newBlog = new blogSchema({
        title,
        description,
        image,
        user
    })
    // to save data and information of user session is created 
    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await newBlog.save({session});
        existingUser.blogs.push(newBlog);
        await existingUser.save({session});
        await session.commitTransaction();

    }
    catch(err){
      console.log(err);
      return res.status(500).json({ message: "unauthorized unable to save blogs.", newBlog });
    }

    return res.status(200).json({message : "new blog added.", newBlog})
    
    
}

export const updateBlog = async(req, res, next) =>{

    const{title, description} = req.body;
    const blogId = req.params.id;
    let updateBlog
    try{
    updateBlog =  await blogSchema.findByIdAndUpdate(blogId, {
        title,
        description,
    })
}
    catch(err){
        console.log("unable to update");
        return res.status(500).json({message : "unable to update blog"})  
    }

    return res.status(200).json({message: "success", updateBlog})

}

export const getById = async (req, res, next) =>{

    const blogId = req.params.id;
    let blog;

    try {
        blog = await blogSchema.findById(blogId)
    }
    catch(err){
        res.status(404).json({ message: "blog not found" });
        return console.log(err);
    }
    if(!blog){
        return res.status(404).json({message : "blog not found"})
    }
    return res.status(200).json({message : "success", blog})
}

export const deleteById = async (req, res, next) =>{

    let id = req.params.id;
    let newBlogs;
    try{
        // for the relation or reference we use populate method 
        // please be mindful when we use populate on the schema ref it should have its modal name exact same
        newBlogs = await blogSchema.findByIdAndRemove(id).populate('user');
        // blog.user from blog schema and inside user we get data from blogs which is array 
        await newBlogs.user.blogs.pull(newBlogs)
        await newBlogs.user.save()
    }
    catch(err){
       console.log(err)
    }
    if (!newBlogs) {
      return res.status(400).json({ message: "action invalid." });
    }
    return res.status(200).json({ message: "deleted .", newBlogs });
    
}  

export const getUserById = async(req, res, next)=>{

    let id = req.params.id;
    let userBlog;
    try{
        userBlog = await userSchema.findById(id).populate("blogs");
        
    }
    catch(err){
        console.log(err);
    }
    if(!userBlog){
        return res.status(404).json({message : "Blog not Found."})
    }
    return res.status(200).json({user: userBlog});
}