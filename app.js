require('dotenv').config();//טעינת קובץ ההגדרות למערכת
const express=require('express');// קישור לספריית אקספרס
const app=express();//יצירת מימוש של הספרייה
const morgan=require('morgan');//קישור לספריית מורגן
//קישור של התיקיות לראוטרים
const tasksRouter = require('./api/v1/Routers/tasks');// קישור לראוטר של המוצרים
const usersRouter = require('./api/v1/Routers/users');// קישור לראוטר של המשתמשים
const categoriesRouter = require('./api/v1/Routers/categories');// קישור לראוטר של הקטגוריות
// קישור למונגו דיבי
const MongoStore = require('connect-mongo');//קישור למונגו
const mongoose = require ('mongoose');//קישור לספריית העבודה מול מונגו
global.db=mongoose.connection;//יצירת משתנה גלובלי בשם דיבי שמחזיק את הקונקשן
// אישור סאשן
const session = require('express-session');//קישור לסאשן
const twentyMin = 1000 * 60 * 20; // 20 דקות
app.use(session({
    secret: '123456789',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: twentyMin},
    store: MongoStore.create({
        mongoUrl:process.env.MONGO_CONN+ 'sessionDb',
        collectionName: 'sessionsTable'
    })
}));
const ConnStr=process.env.MONGO_CONN;//שליפת מחרוזת ההתחברות מתוך הגדרות המערכת
mongoose.connect(ConnStr + 'ecom').then((status)=>{
    if(status)
    console.log("Connected To Mongo DB");//יראה שזה התחבר למונגו דיבי
    else
    {
        console.log("Not Connected");//יראה שזה לא התחבר למונגו דיבי
    }
})

const arr=['192.168.1.1','::1','1.1.1'];//כתובת איי פי כדי להיות עם גישה
app.use((req,res,next)=>{
    console.log(req.ip);
    let i;
    for(i=0;i<arr.length;i++)//עבור על כל כתובות האייפי המורשות
         if (req.ip==arr[i])//במידה וכתובת האייפי של מבקש הבקשה נמצאת בתוך רשימת המורשים
         {
            break;
         }  
    if(i==arr.length)     
        return res.status(403).json({msg:'Not Autorized'});
    else
         next();
})
//הוספת שכבות
app.use(morgan('dev'));//הוספת שכבה שמבצעת לוג לכל הבקשות שיתקבלו
app.use(express.json());//הוספת שכבה שמטפלת בבקשות שכוללות בודי בקידוד ג'ייסון
app.use(express.urlencoded({extended: true}));//הוספת שכבה שמטפלת בבקשות שנשלחו בפורמט יואראל אנקודד

module.exports=app;//ייצוא של app 

//מוצרים
const tasksModel=require('./api/v1/Modules/tasks');//קישור מוצרים למודול
app.use('/tasks', tasksRouter);//קישור הראוטר לאפליקציה

//משתמשים
const users = require('./api/v1/controllers/users');//קישור משתמשים למודול
const usersModel=require('./api/v1/Modules/users');//קישור הראוטר לאפליקציה
app.use('/users', usersRouter); 

//קטגוריות
const categories  = require('./api/v1/controllers/categories');//קישור קטגוריות למודול
const categoriesModel=require('./api/v1/Modules/categories')//;קישור הראוטר לאפליקציה
app.use('/categories', categoriesRouter);

const auth=require('./api/v1/Middlewares/auth');//
app.use('/tasks',auth,tasksRouter);
//שגיאה 404
app.all('*',(req,res)=>{
    return res.status(404).json({msg:"Not Found"});//יראה הודעה שזה לא נמצא
});