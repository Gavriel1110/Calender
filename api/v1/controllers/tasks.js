module.exports={
    GetAllTasks: (req, res) => {
        const conn = global.db;
        const query = "SELECT * FROM t_tasks";
        conn.query(query, (error, results, fields) => {
          if (error) {
            return res.status(500).json(error);//החזרת פרטי שגיאה
          }
          else{
            return res.status(200).json(results);// החזרת הנתונים שנתקבלו מהשרת
          }
        });
    },
    GetTasksById:(req, res)=>{
            let pid=req.params.id;
            const conn = global.db;
            const query = ("SELECT * FROM t_tasks WHERE pid =?",pid,(error, results, fields) => {
              if (error) {
                return res.status(500).json(error);//החזרת פרטי שגיאה
              }
              else{
                return res.status(200).json(results);// החזרת הנתונים שנתקבלו מהשרת
              }
            });
        },        
    AddTasks:(req, res)=>{
        let pid=req.params.id;
        const conn = global.db;
        const query = ("SELECT * FROM t_tasks WHERE pid =?",pid,(error, results, fields) => {
          if (error) {
            return res.status(500).json(error);//החזרת פרטי שגיאה
          }
          else{
            return res.status(200).json(results);// החזרת הנתונים שנתקבלו מהשרת
          }
        });
    },     
    UptadeTasks:(req, res)=>{
        let pid=req.params.id;
        const conn = global.db;
        const query = ("SELECT * FROM t_tasks WHERE pid =?",pid,(error, results, fields) => {
          if (error) {
            return res.status(500).json(error);//החזרת פרטי שגיאה
          }
          else{
            return res.status(200).json(results);// החזרת הנתונים שנתקבלו מהשרת
          }
        });
    },     
    DeleteTasks:(req, res)=>{
        let pid=req.params.id;
        const conn = global.db;
        const query = ("SELECT * FROM t_tasks WHERE pid =?",pid,(error, results, fields) => {
          if (error) {
            return res.status(500).json(error);//החזרת פרטי שגיאה
          }
          else{
            return res.status(200).json(results);// החזרת הנתונים שנתקבלו מהשרת
          }
        });
    },   
} 
