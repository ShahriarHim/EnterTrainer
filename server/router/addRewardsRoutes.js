const express = require("express");
const router = express.Router();
const user = require("../model/userSchema");
const CourseContent = require("../model/courseContentSchema");

router
.route("/")
.get(async(req,res)=>{
    try{
        const {courseid, userid} = req.query;
        const user1 = await user.findById(userid);
        const courseContent = await CourseContent.findOne({courseId: courseid});
        if(user1 && courseContent){
            user1.courseRewards = user1.courseRewards + 10;
            await user1.save();
            res.status(200).json(
                {
                    user: userid,
                    message: "Rewards added successfully",
                    courseID: courseid,
                }
            );
        }
        else{
            res.status(302).json({
                user: userid,
                message: "Rewards not added as course or user not found",
                courseID: courseid,
            })
        }
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "Rewards not added",
            error: "user id or course id not valid"
        });
    }
})


module.exports = router;