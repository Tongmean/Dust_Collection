const dbconnect = require('../middleware/Dbconnect');

const getRoundtransportlogs = async (req, res) => {
    // const sqlcommand = 
    // `
    // SELECT 
    //     "Round_Transport"."Round_Name", "Round_Transport"."Max_Weight", "Round_Transport"."id" AS "Round_id", "Round_Transport"."Date_Open",  "Round_Transport"."Date_Close",
    //     "Round_Transport_Log"."id", "Round_Transport_Log"."Weight", "Round_Transport_Log"."Date",
    //     "Department"."Department_Name",
    //     "Type"."Type_Name",
    //     "Status"."Status_Name" AS "Status_Name",
    //     "Area"."Area" AS "Area",
    //     "Concern_Person"."Name" AS "Concern_Person",
       
    //     SUM("Round_Transport_Log"."Weight") OVER (
    //         PARTITION BY "Round_Transport"."id" 
    //         ORDER BY "Round_Transport_Log"."id" 
    //         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    //     ) AS "Cumulative_Weight"

    // FROM 
    //     "Round_Transport_Log"
    // LEFT JOIN 
    //     "Round_Transport"
    // ON 
    // "Round_Transport"."id" = "Round_Transport_Log"."Round_ID"
    // LEFT JOIN 
    //     "Department"
    // ON 
    // "Department"."id" = "Round_Transport_Log"."Department_ID"
    // LEFT JOIN 
    //     "Type"
    // ON 
    // "Type"."id" = "Round_Transport_Log"."Type_ID"
    // LEFT JOIN 
    //     "Status"
    // ON 
    // "Round_Transport"."Status_ID" = "Status"."id"
    // LEFT JOIN 
    //     "Area"
    // ON 
    // "Area"."id" = "Round_Transport_Log"."Area"
    // LEFT JOIN 
    //     "Concern_Person"
    // ON 
    // "Concern_Person"."id" = "Round_Transport_Log"."Concern_Person"
    // `
    const sqlcommand = 
    `
    SELECT 
        "Round_Transport"."Round_Name", 
        "Round_Transport"."Max_Weight", 
        "Round_Transport"."id" AS "Round_id", 
        "Round_Transport"."Date_Open",  
        "Round_Transport"."Date_Close",
        "Round_Transport_Log"."id", 
        "Round_Transport_Log"."Weight", 
        "Round_Transport_Log"."Date",
        "Department"."Department_Name",
        "Type"."Type_Name",
        "Status"."Status_Name" AS "Status_Name",
        "Area"."Area" AS "Area",
        "Concern_Person"."Name" AS "Concern_Person",
    
        SUM("Round_Transport_Log"."Weight") OVER (
            PARTITION BY "Round_Transport"."id" 
            ORDER BY "Round_Transport_Log"."id" 
            ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
        ) AS "Cumulative_Weight",

        ROW_NUMBER() OVER (
            PARTITION BY "Round_Transport"."id" 
            ORDER BY "Round_Transport_Log"."id"
        ) AS "Running_Number"

    FROM 
        "Round_Transport_Log"
    LEFT JOIN 
        "Round_Transport"
    ON 
        "Round_Transport"."id" = "Round_Transport_Log"."Round_ID"
    LEFT JOIN 
        "Department"
    ON 
        "Department"."id" = "Round_Transport_Log"."Department_ID"
    LEFT JOIN 
        "Type"
    ON 
        "Type"."id" = "Round_Transport_Log"."Type_ID"
    LEFT JOIN 
        "Status"
    ON 
        "Round_Transport"."Status_ID" = "Status"."id"
    LEFT JOIN 
        "Area"
    ON 
        "Area"."id" = "Round_Transport_Log"."Area"
    LEFT JOIN 
        "Concern_Person"
    ON 
        "Concern_Person"."id" = "Round_Transport_Log"."Concern_Person"

    `

    
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

const getRoundtransportlog = async (req, res) => {
    const id = req.params.id
    const sqlcommand = `SELECT * FROM "Round_Transport_Log" WHERE id = $1`;
    // const sqlcommand = `
    //     SELECT 
    //         ("Round_Transport"."Round_Name" || ' น้ำหนัก Max ' || "Round_Transport"."Max_Weight") AS "Round_ID",
    //         "Round_Transport_Log"."id", "Round_Transport_Log"."Weight", "Round_Transport_Log"."Date",
    //         "Department"."Department_Name" AS "Department_ID",
    //         "Type"."Type_Name" AS "Type_ID",
    //         "Status"."Status_Name" AS "Status_ID",
    //         "Area"."Area" AS "Area",
    //         "Concern_Person"."Name" AS "Concern_Person"
    //     FROM 
    //         "Round_Transport_Log"
    //     LEFT JOIN 
    //         "Round_Transport"
    //     ON 
    //     "Round_Transport"."id" = "Round_Transport_Log"."Round_ID"
    //     LEFT JOIN 
    //         "Department"
    //     ON 
    //     "Department"."id" = "Round_Transport_Log"."Department_ID"
    //     LEFT JOIN 
    //         "Type"
    //     ON 
    //     "Type"."id" = "Round_Transport_Log"."Type_ID"
    //     LEFT JOIN 
    //         "Status"
    //     ON 
    //     "Round_Transport"."Status_ID" = "Status"."id"
    //     LEFT JOIN 
    //         "Area"
    //     ON 
    //     "Area"."id" = "Round_Transport_Log"."Area"
    //     LEFT JOIN 
    //         "Concern_Person"
    //     ON 
    //     "Concern_Person"."id" = "Round_Transport_Log"."Concern_Person"
    //     WHERE 
    //     "Round_Transport_Log"."id" = $1

    // `
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

// const postRoundtransportlog = async (req, res) =>{
//     const {Round_ID, Concern_Person, Department_ID, Type_ID, Weight} = req.body;
//     const sqlcommand = `INSERT INTO "Round_Transport_Log" ("Round_ID", "Concern_Person", "Department_ID" , "Type_ID", "Weight") VALUES ($1, $2, $3, $4, $5) RETURNING*`
//     const values = [Round_ID, Concern_Person, Department_ID, Type_ID, Weight];
//     try {
//         //Sum total weight
//         const sqlsum= `
//             SELECT SUM("Weight") AS total_weight
//             FROM "Round_Transport_Log"
//             WHERE "Round_ID" = $1;
//         `
//         const resultsum = dbconnect.query(sqlsum, [Round_ID]).row[0];
//         //Check Before save to database
//         const sqlcheck = `SELECT "Max_Weight" FROM "Round_Transport" WHERE "id" = $1`;
//         const maxWeightcheck = dbconnect.query(sqlcheck, [Round_ID]).rows[0];
//         if((resultsum + Weight) > maxWeightcheck){
//             return res.status(400).json({
//                 success: true,
//                 msg: `น้ำหนักคุณเกินแล้ว Max Weight: ${maxWeightcheck}, `
//             }); 
//         }
//         const result = dbconnect.query(sqlcommand, values);
//         res.status(200).json({
//             data: result.rows,
//             success: true,
//             msg: `สร้างรอบข่นส่งสำเร็จ ${Weight}`
//         }); 
//     } catch (error) {
//         console.log("Database error:", error); 
//         res.status(500).json({
//             msg: "Internal Server Error" ,
//             success: false
//         }); 
//     }
// }

const postRoundtransportlog = async (req, res) => {
    const { Round_ID, Concern_Person, Department_ID, Type_ID, Weight, Area } = req.body;
    // console.log(req.body)
    const sqlcommand = `INSERT INTO "Round_Transport_Log" ("Round_ID", "Concern_Person", "Department_ID", "Type_ID", "Weight", "Area") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const values = [Round_ID, Concern_Person, Department_ID, Type_ID, Weight, Area];
    try {
        // Fetch all weights for the specific round
        const sqlsum = `
            SELECT
                "Round_ID",
                SUM("Weight") AS total_weight
            FROM
                "Round_Transport_Log"
            WHERE
                "Round_ID" = $1
            GROUP BY
                "Round_ID";

        `;
        const resultsum = await dbconnect.query(sqlsum, [Round_ID]);
        const totalWeight = resultsum.rows?.[0]?.total_weight ?? 0;
        // console.log('totalWeight', totalWeight)
        // Check Max Weight
        const sqlcheck = `SELECT "Max_Weight" FROM "Round_Transport" WHERE "id" = $1`;
        const maxWeightcheck = await dbconnect.query(sqlcheck, [Round_ID]);
        const maxWeight = maxWeightcheck.rows[0].Max_Weight;
        let weightNumber = parseFloat(Weight);
        let combine = parseFloat(weightNumber) + parseFloat(totalWeight);
        // console.log('combine', combine);
        // console.log('weightNumber', weightNumber);
        // console.log('maxWeight', maxWeight);
        if ((combine) > parseFloat(maxWeight)) {
            return res.status(400).json({
                success: false,
                msg: `น้ำหนักคุณเกินแล้ว Max Weight: ${maxWeight} น้ำที่ Sum ได้ ${combine}`,
            });
        }

        // Insert new record
        const result = await dbconnect.query(sqlcommand, values);
        res.status(200).json({
            data: result.rows,
            success: true,
            msg: `สร้างรอบข่นส่งสำเร็จ ${Weight}`,
        });
    } catch (error) {
        console.log("Database error:", error);
        res.status(500).json({
            msg: "Internal Server Error",
            success: false,
        });
    }
};




const updateRoundtransportlog = async (req, res) =>{
    const id = req.params.id;
    const {Round_ID, Concern_Person, Department_ID, Type_ID, Weight, Area} = req.body;
    // console.log("id", id)
    // console.log(" req.body",  req.body)
    const sqlcommand = `UPDATE "Round_Transport_Log" SET "Round_ID" = $1, "Concern_Person" = $2, "Department_ID" = $3 , "Type_ID" = $4, "Weight" = $5, "Area" = $6 WHERE id = $7 RETURNING *`;
    values = [Round_ID, Concern_Person, Department_ID, Type_ID, Weight, Area, id]
    try {
        const result = dbconnect.query(sqlcommand, values);
        res.status(200).json({
            data: result.rows,
            success: true,
            msg: `อัพเดทส่งสำเร็จ` 
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
    getRoundtransportlogs,
    getRoundtransportlog,
    postRoundtransportlog,
    updateRoundtransportlog

}