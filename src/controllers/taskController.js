import TaskSchema from "../models/Task.js";

export const assignTask = async (req, res) => {
    const taskName=req.body.taskName;
    const taskType=req.body.taskType;
    const assignedTo=req.body.assignedTo;
    const donationRequest=req.body.donationRequest;

    try{
        const taskAssigned=await TaskSchema.create({
            taskName:taskName,
            taskType:taskType,
            status:"pending",
            priority:"low",
            assignedTo:assignedTo,
            donationRequest:donationRequest
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

export const getAllTasks=async(req,res)=>{
    try{
    const allTasks=await TaskSchema.find().populate("assignedTo");
    console.log(allTasks)
    return res.status(200).json({
        success:true,
        message:allTasks
    })
    }catch(error){
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    })
  }
};
export const deletTask=async (req,res)=>{
    const {id}=req.params;

    try{
        if (!id){
            return res.status(403).json({
                success:false,
                message:'id required'
        })
        }
        const deletedTask=await TaskSchema.findOne(id);
        if(!deletedTask){
            return res.status(201).json({
                success:false,
                message:'Data not found'
        })
    }
    await deletedTask.deleteOne();
    console.log(deletedTask);
    return res.status(201).json({
            message:"Deleted Successfully",
            success:true
        })
}
catch(err){
    console.log(err)
        return res.status(500).json({
            success:false,
            message:"Unable to delete"
         });
}
}