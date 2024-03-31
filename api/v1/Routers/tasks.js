const express=require('express');
const router=express.Router();
const auth= require("../Middlewares/auth");  
const {
    GetAllTasks,
    GetTasksById,
    AddTasks,
    UptadeTasks,
    DeleteTasks
}=require(`../controllers/tasks`);

router.get('/', GetAllTasks);
router.get('/:id', GetTasksById);
router.post('/',auth, AddTasks);
router.patch('/:id',auth, UptadeTasks);
router.delete('/:id',auth, DeleteTasks);

module.exports=router;//ייצוא