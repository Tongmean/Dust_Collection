const dbconnect = require('../middleware/Dbconnect');

const getConcernpersons = async (req, res) => {
    const sqlcommand = `SELECT * FROM "Concern_Person" ORDER BY id ASC`;
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

const getConcernperson = async (req, res) => {
    const id = req.params.id
    const sqlcommand = `SELECT * FROM "Concern_Person" WHERE id = $1 `;
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

const postConcernperson = async (req, res) =>{
    const {Name} = req.body;
    const sqlcommand = `INSERT INTO "Concern_Person" ("Name") VALUES ($1) RETURNING *`;
    values = [Name];
    try {
        const result = await dbconnect.query(sqlcommand, values);
        res.status(200).json({
            data: result.rows,
            success: true,
            msg: `สร้างรอบข่นส่งสำเร็จ ${Name}`
        }); 
    } catch (error) {
        console.log("Database error:", error); 
        res.status(500).json({
            msg: "Internal Server Error" ,
            success: false
        }); 
    }
}

const updateConcernperson = async (req, res) =>{
    const {Name} = req.body;
    const id = req.params.id;
    const sqlcommand = `UPDATE "Concern_Person" SET "Name" = $1  WHERE id = $2 RETURNING *`;
    values = [Name, id]
    try {
        const result = await dbconnect.query(sqlcommand, values);
        res.status(200).json({
            data: result.rows,
            success: true,
            msg: `อัพเดทส่งสำเร็จ ${Name}` 
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
    getConcernpersons,
    getConcernperson,
    postConcernperson,
    updateConcernperson,

}