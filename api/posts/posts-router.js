// implement your posts router here
const express = require('express')
const Posts = require('./posts-model')

const router = express.Router()

router.get('/', async (req,res)=>{
    try{
        const posts = await Posts.find()
        res.status(200).json(posts)
    }
    catch(err){
        res.status(500).json({message:'The posts information could not be retrieved'})
    }
})

router.get('/:id', async (req,res)=>{
    try{
        const id = req.params.id
        const post = await Posts.findById(id)

        if(!post){
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        }
        else{
            res.status(200).json(post)
        }
    }
    catch(err){
        res.status(500).json({message:"The posts information could not be retrieved"})
    }
})

router.post('/', async (req,res)=>{
    
    try{

        const incoming = req.body
        const newPost = {
            ...incoming,
            create_at: Date(),
            updtaed_at: null}
        if( !newPost.title || !newPost.contents ){
            res.status(400).json({message:"Please provide title and contents for the post"})
        }
        else{
            res.status(201).json({message:'Post created', data: newPost})
        }
    }
    catch(err){
        res.status(500).json({message:"There was an error while saving the post to the database"})
    }
})

router.put('/:id', async(req,res)=>{
    try{
        const id = req.params.id
        const incoming = req.body
        if(!incoming.title || !incoming.contents){
            res.status(400).json({message:"Please provide input for title and contents"})
        }
        else{
            const update = await Posts.update(id,incoming)
            if(!update){
                res.status(404).json({message:"The post with the specified ID does not exist"})
            }
            else{
                res.status(200).json({message:"Post with the specified ID has been updated", data: update})
            }
        }
    }
    catch(err){
        res.status(500).json({message:"The post information could not be modified"})
    }
})

router.delete('/:id', async (req,res)=>{
    try{
        const id = req.params.id
        const remove = await Posts.remove(id)
        if(!remove){
            res.status(404).json({message:"The post with the specified ID does not exist"})
        }
        else{
            res.status(200).json({message:"The post with the specified ID has been deleted", data:remove})
        }
    }
    catch(err){
        res.status(500).json({message: "The post could not be removed"})
    }
})

router.get('/:id/comments', async (req,res)=>{
    try{
        const id = req.params.id
        const comments = await Posts.findPostComments(id)

        if(!comments){
            res.status(404).json({message:"The post with the specified ID does not exist"})
        }
        else{
            res.status(200).json(comments)

        
    }}
    catch(err){
        res.status(500).json({message: "The comments information could not be retrieved"})
    }
})
module.exports = router