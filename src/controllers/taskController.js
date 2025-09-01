import TaskSchema from "../models/Task.js";

export const assignTask = async (req, res) => {
    const taskName=req.body.taskName;
    const taskType=req.body.taskType;
    const assignedTo=req.body.assignedTo;
    const aidRequest=req.body.aidRequest;

    try{
        const taskAssigned=await TaskSchema.create({
            taskName:taskName,
            taskType:taskType,
            status:"accepted",
            priority:"high",
            assignedTo:assignedTo,
            aidRequest:aidRequest
        })

        return res.status(201).json({
            sucess:true,
            message:taskAssigned
        })
    }
    catch(error){
        console.log(error)
        return res.status(400).json({
            success:false,
            message:"Error"
        })
    }
};
