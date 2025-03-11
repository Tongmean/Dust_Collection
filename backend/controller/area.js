const dbconnect = require('../middleware/Dbconnect');

const getAreas = async (req, res) => {
    const sqlcommand = `SELECT * FROM "Area" ORDER BY id ASC`;
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

const getArea = async (req, res) => {
    const id = req.params.id
    const sqlcommand = `SELECT * FROM "Area" WHERE id = $1 `;
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

const postArea = async (req, res) =>{
    const {Area} = req.body;
    const sqlcommand = `INSERT INTO "Area" ("Area") VALUES ($1) RETURNING *`;
    values = [Area];
    try {
        const result = dbconnect.query(sqlcommand, values);
        res.status(200).json({
            data: result.rows,
            success: true,
            msg: `สร้างรอบข่นส่งสำเร็จ ${Area}`
        }); 
    } catch (error) {
        console.log("Database error:", error); 
        res.status(500).json({
            msg: "Internal Server Error" ,
            success: false
        }); 
    }
}


const updateArea = async (req, res) =>{
    const {Area} = req.body;
    const id = req.params.id;
    const sqlcommand = `UPDATE "Area" SET "Area" = $1  WHERE id = $2 RETURNING *`;
    values = [Area, id]
    try {
        const result = dbconnect.query(sqlcommand, values);
        res.status(200).json({
            data: result.rows,
            success: true,
            msg: `อัพเดทส่งสำเร็จ ${Area}` 
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
    getAreas,
    getArea,
    postArea,
    updateArea,

}