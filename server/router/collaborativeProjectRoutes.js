const express = require("express");
const router = express.Router();

const CollaborateProjects = require("../model/collaborateProjectsSchema");

const ReturnDataTemplate = (data,message,method)=>{
    return {
        data,
        message,
        method
    }
}

router
.route("/")
.get(async(req,res)=>{
    const serial = req.query.serial || null;
    try{ // additional error handling
        if (serial) { // if serial is provided
            //find by the provided serial
            const data = await CollaborateProjects.find({serial});
            return res.status(200).json(ReturnDataTemplate(data,'Collaborative Projects GetOne by Serial','GET'));
        }else{ // if serial is not provided
            const data = await CollaborateProjects.find();
            return res.status(200).json(ReturnDataTemplate(data,'event Routes','GET'));
        }
    }catch(err){
        return res.status(500).json(ReturnDataTemplate(err.message,'event Routes','GET'));
    }
})
.post(async(req,res)=>{
    const recievedData = req.body;
    try{ // additional error handling
        const data = await CollaborateProjects.create(recievedData);
        return res.status(200).json(ReturnDataTemplate(data,'event created','POST'));
    }
    catch(err){
        return res.status(500).json(ReturnDataTemplate(err.message,'event creation failed','POST'));
    }
})
.delete(async(req,res)=>{
    const serial = req.query.serial || null;
    try{ // additional error handling
        if (serial) { // check if ID exists
            // delete by id
            const data = await CollaborateProjects.findOneAndDelete({serial});
            return res.status(200).json(ReturnDataTemplate(data,'Collaborative Projects with ID','DELETE'));
        }else{ // scope of improvement: delete all CollaborateProjects
            // const data = await CollaborateProjects.deleteMany();
            return res.status(200).json(ReturnDataTemplate(null,'event Routes','DELETE'));
        }
    }
    catch(err){
        return res.status(500).json(ReturnDataTemplate(err.message,'event Routes','DELETE'));
    }
})


module.exports = router;
