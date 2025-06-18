const dbconnect = require('../middleware/Dbconnect');

const getDepartments = async (req, res) => {
    const sqlcommand = `SELECT * FROM "Department" ORDER BY id ASC`;
    try {
        const result = await dbconnect.query(sqlcommand);  
        res.status(200).json({
            data: result.rows,
            success: true,
            msg: "Query Successfull"
        }); 
    } catch (error) {
        console.log("Database error:", error); 
        res.status(500).json({
            msg: "Internal Server Error" ,
            success: false
        }); 
    };
};

const getDepartment = async (req, res) => {
    const id = req.params.id
    const sqlcommand = `SELECT * FROM "Department" WHERE id = $1 `;
    try {
        const result = await dbconnect.query(sqlcommand, [id]);  
        res.status(200).json({
            data: result.rows,
            success: true,
            msg: "Query Successfull"
        }); 
    } catch (error) {
        console.log("Database error:", error); 
        res.status(500).json({
            msg: "Internal Server Error" ,
            success: false
        }); 
    };
};

const postDepartment = async (req, res) =>{
    const {Department_Name} = req.body;
    const sqlcommand = `INSERT INTO "Department" ("Department_Name") VALUES ($1) RETURNING *`;
    values = [Department_Name];
    try {
        const result = await dbconnect.query(sqlcommand, values);
        res.status(200).json({
            data: result.rows,
            success: true,
            msg: `สร้างรอบข่นส่งสำเร็จ ${Department_Name}`
        }); 
    } catch (error) {
        console.log("Database error:", error); 
        res.status(500).json({
            msg: "Internal Server Error" ,
            success: false
        }); 
    }
}


const updateDepartment = async (req, res) =>{
    const {Department_Name} = req.body;
    const id = req.params.id;
    const sqlcommand = `UPDATE "Department" SET "Department_Name" = $1  WHERE id = $2 RETURNING *`;
    values = [Department_Name, id]
    try {
        const result = await dbconnect.query(sqlcommand, values);
        res.status(200).json({
            data: result.rows,
            success: true,
            msg: `อัพเดทส่งสำเร็จ ${Department_Name}` 
        }); 
    } catch (error) {
        console.log("Database error:", error); 
        res.status(500).json({
            msg: "Internal Server Error" ,
            success: false
        }); 
    }
}
module.exports = {
    getDepartments,
    getDepartment,
    postDepartment,
    updateDepartment,

}