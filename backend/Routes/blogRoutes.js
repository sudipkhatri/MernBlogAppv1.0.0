import express from "express";
import { getAllBlog, addBlog, updateBlog, getById, deleteById, getUserById } from "../Controller/blogController";

const blogsRouter = express.Router();

blogsRouter.get('/', getAllBlog);
blogsRouter.get("/:id", getById);
blogsRouter.get("/user/:id", getUserById);
blogsRouter.post('/add', addBlog);
blogsRouter.patch('/update/:id', updateBlog);
blogsRouter.delete('/:id', deleteById);


export default blogsRouter;