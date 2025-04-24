const dbconnect = require('../middleware/Dbconnect');

const getTypes = async (req, res) => {
    const sqlcommand = `SELECT * FROM "Type" ORDER BY id ASC`;
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

const getType = async (req, res) => {
    const id = req.params.id
    const sqlcommand = `SELECT * FROM "Type" WHERE id = $1'`;
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

const postType = async (req, res) =>{
    const {Type_Name} = req.body;
    const sqlcommand = `INSERT INTO "Type" ("Type_Name")  VALUES ($1) RETURNING *`;
    values = [Type_Name];
    try {
        const result = dbconnect.query(sqlcommand, values);
        res.status(200).json({
            data: result.rows,
            success: true,
            msg: `สร้างรอบข่นส่งสำเร็จ ${Type_Name}`
        }); 
    } catch (error) {
        console.log("Database error:", error); 
        res.status(500).json({
            msg: "Internal Server Error" ,
            success: false
        }); 
    }
}

const updateType = async (req, res) =>{
    const {Type_Name} = req.body;
    const id = req.params.id;
    const sqlcommand = `UPDATE "Type" SET "Type_Name" = $1  WHERE id = $2 RETURNING *`;
    values = [Type_Name, id]
    try {
        const result = dbconnect.query(sqlcommand, values);
        res.status(200).json({
            data: result.rows,
            success: true,
            msg: `อัพเดทส่งสำเร็จ ${Type_Name}` 
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
    getTypes,
    getType,
    postType,
    updateType,

}