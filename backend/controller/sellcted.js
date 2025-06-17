const dbconnect = require('../middleware/Dbconnect');

const getRoundtransportwithsstatusid = async (req, res) => {
    const sqlcommand = `SELECT * FROM "Round_Transport" WHERE "Status_ID" = '1' `;
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
const getDepartmentid = async (req, res) => {
    const sqlcommand = `SELECT * FROM "Department" ORDER BY id ASC `;
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
const getTypeid = async (req, res) => {
    const sqlcommand = `SELECT * FROM "Type" ORDER BY id ASC `;
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
const getCurrentweight = async (req, res) => {
    // const {Round_ID} = req.body;
    const Round_ID = req.params.Round_ID
    console.log('Round_ID', Round_ID)
    const sqlcommand = `
    SELECT 
        COALESCE(SUM("Weight"), 0) AS total_weight
    FROM 
        "Round_Transport_Log"
    WHERE 
        "Round_ID" = $1;

    
    `;
    try {
        const result = await dbconnect.query(sqlcommand, [Round_ID]);  
        res.status(200).json({
            data: result?.rows ?? 0,
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
const getMaxid = async (req, res) => {
    
    const sqlcommand = `
        SELECT COALESCE(MAX(id), 0) + 1 AS Maxid FROM public."Round_Transport_Log";
    
    `;
    try {
        const result = await dbconnect.query(sqlcommand);  
        res.status(200).json({
            data: result?.rows ?? 0,
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


module.exports = {
    getRoundtransportwithsstatusid,
    getDepartmentid,
    getTypeid,
    getCurrentweight,
    getMaxid

}