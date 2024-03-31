const mongoose = require ('mongoose');//קישור לספריית העבודה מול מונגו
//נגדיר סכימה עבור מוצר שנותנת תבנית
const tasksSchema=new mongoose.Schema({
    pname:String,
    price:Number,
    picname:String
});
//נגדיר מודל עבור מוצר שנותנת
module.exports=mongoose.model('tasks',tasksSchema);//ייצוא של המודל מונגו