const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const port = 8081;
const host = "0.0.0.0";

const roundtransportRoute = require('./route/roundtransportRoute');
const roundtransportlogRoute = require('./route/roundtransportRoutelog');
const departmentRoute = require('./route/departmentRoute');
const typeRoute = require('./route/typeRoute');
const sellectedRoute = require('./route/sellectedRoute');
const concertpersonRoute = require('./route/concernpersonRoute');
const areaRoute = require('./route/areaRoute');

app.use('/api/roundtransport', roundtransportRoute)
app.use('/api/roundtransportlog', roundtransportlogRoute)
app.use('/api/department', departmentRoute)
app.use('/api/type', typeRoute)
app.use('/api/sellected', sellectedRoute)
app.use('/api/concernperson', concertpersonRoute)
app.use('/api/area', areaRoute)
//Listen require
app.listen(port, host,  (req, res)=>{

    
    console.log(`Backend running at http://${host}:${port}`);
    console.log("Server run on port:", port);
})
