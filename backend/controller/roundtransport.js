const dbconnect = require('../middleware/Dbconnect');

const getRoundtransports = async (req, res) => {
    const sqlcommand = `
    SELECT 
        * ,
        "Round_Transport"."id" AS "id_Round_Transport"
    FROM 
        "Round_Transport"
    LEFT JOIN 
        "Status"
    ON
        "Status".id = "Round_Transport"."Status_ID" 
    
    `;
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

const getRoundtransport = async (req, res) => {
    const id = req.params.id
    const sqlcommand = `SELECT * FROM "Round_Transport" WHERE id = $1`;
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

const postRoundtransport = async (req, res) =>{
    const {Round_Name, Max_Weight, Status_ID} = req.body;
    const sqlcommand = `INSERT INTO "Round_Transport" ("Round_Name", "Max_Weight", "Status_ID")  VALUES ($1, $2, $3) RETURNING *`;
    values = [Round_Name, Max_Weight, Status_ID];
    console.log('Round_Name, Max_Weight, Status_ID',Round_Name, Max_Weight, Status_ID)
    try {
        const result = dbconnect.query(sqlcommand, values)
        res.status(200).json({
            data: result.rows,
            success: true,
            msg: `สร้างรอบข่นส่งสำเร็จ ${Round_Name}`
        }); 
    } catch (error) {
        console.log("Database error:", error); 
        res.status(500).json({
            msg: "Internal Server Error" ,
            success: false
        }); 
    }
}

const updateRoundtransport = async (req, res) =>{
    const {Round_Name, Max_Weight, Status_ID} = req.body;
    const id = req.params.id;
    console.log(' req.body', req.body)
    const sqlcommand = `UPDATE "Round_Transport" SET "Round_Name" = $1, "Max_Weight" = $2, "Status_ID" = $3 WHERE id = $4 RETURNING *`;
    const values = [Round_Name, Max_Weight, Status_ID, id]
    try {
        const result = dbconnect.query(sqlcommand, values);
        res.status(200).json({
            data: result.rows,
            success: true,
            msg: `อัพเดทส่งสำเร็จ ${Round_Name}` 
        }); 
    } catch (error) {
        console.log("Database error:", error); 
        res.status(500).json({
            msg: "Internal Server Error" ,
            success: false
        }); 
    }
}
const deleteroundidandlog = async (req, res) =>{
    const id = req.params.id
    console.log('id',id)
    try {
        const resultRoundlogdelete = dbconnect.query(`DELETE FROM "Round_Transport_Log" WHERE "Round_ID" = $1`, [id]);
        const resultRounddelete = dbconnect.query(`DELETE FROM "Round_Transport" WHERE id = $1`, [id]);
        res.status(200).json({
            data: resultRounddelete.rows,
            date1:resultRoundlogdelete,
            success: true,
            msg: `ลำดับ Box ${id} ลบได้สำเร็จแล้วและข้อมูลบันทึกฝุ่นที่ Contain ${id} ได้ลบแล้ว ครับ` 
        }); 
    } catch (error) {
        res.status(400).json({
            success: false,
            msg: `There Problem Accur while Delete BOM ${id}`,
            data: error
        })
    }
   
};

module.exports = {
    getRoundtransports,
    getRoundtransport,
    postRoundtransport,
    updateRoundtransport,
    deleteroundidandlog

}