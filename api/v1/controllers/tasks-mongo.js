const tasks=require('../Modules/tasks');//חיבור למודל של המוצרים 
module.exports={
    GetAllTasks:(req, res)=>{
        tasks.find().then((data)=>{
            return res.status(200).json(data);
        });
    },
    GetTasksById:(req, res)=>{
        let pid=req.params.id;
        tasks.findOne({pid}).then((data)=>{
            return res.status(200).json(data);
        });
    },
    AddTasks:(req, res)=>{
        let body=req.body;
        tasks.insertMany([body]).then((data)=>{
            return res.status(200).json(data);
        });
    },
    UptadeTasks:(req, res)=>{
        let pid=req.params.id;
        let body=req.body;
        tasks.updateMany({pid},[body]).then((data)=>{
            return res.status(200).json(data);
        });
    },
    DeleteTasks:(req, res)=>{
        let pid=req.params.id;
        let body=req.body;
        tasks.deleteOne([body]).then((data)=>{
            return res.status(200).json(data);
        });
    },
} 
