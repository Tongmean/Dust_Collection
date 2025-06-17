import React, { useState, useEffect } from 'react';
import Tablecomponent from '../Components/Tablecomponent';
import { fetchRoundtransportlogs } from '../utility/roundtransportlogapi';
import ExcelExportButton from '../Components/ExcelExportButton';
import ClipboardButton from '../Components/ClipboardButton';
import { useNavigate } from 'react-router-dom';
import { Select, Button ,Spin} from 'antd';
import moment from "moment-timezone";
const { Option } = Select;


const TransportLog = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [rowData, setRowData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [gridApi, setGridApi] = useState(null);
    const [filters, setFilters] = useState({});
    const [uniqueValues, setUniqueValues] = useState({});
    const navigate = useNavigate();

    const utc7Date = (dateString) => {
        return moment(dateString).tz("Asia/Bangkok").format("DD/MM/YYYY");
    };
    
    const convertToUTC7 = (dateString) => {
        const utc7Date = moment(dateString).tz("Asia/Bangkok"); // Convert to UTC+7
      
        return {
          date: utc7Date.format("DD/MM/YYYY"), // Extract Date
          time: utc7Date.format("HH:mm:ss"),   // Extract Time
        };
    };
    const columnDefs = [
        { headerName: 'ลำดับ', field: 'Running_Number', checkboxSelection: true, headerCheckboxSelection: true, filter: "agTextColumnFilter" },
        { headerName: 'Box No.', field: 'Round_Name' },
        { headerName: 'ว/ด/ป', field: 'Date' },
        { headerName: 'เวลา', field: 'Time' },
        { headerName: 'ชื่อผู้ชั่ง', field: 'Concern_Person' },
        { headerName: 'หน่วยงาน', field: 'Department_Name' },
        { headerName: 'ประเภทของเสีย', field: 'Type_Name' },
        { headerName: 'ชื่ออาคาร', field: 'Area' },
        { headerName: 'น้ำหนักของเสีย (Kg)', field: 'Weight' },
        { headerName: 'น้ำหนักของเสียรวมใน Box (Kg)', field: 'Cumulative_Weight' },
        // { headerName: 'ลำดับ Box ', field: 'Round_id' },

        // { headerName: 'Box No.', field: 'Round_Name' },
        { headerName: 'Max Weight (Kg)', field: 'Max_Weight' },
        { headerName: 'วันเปิด Box', field: 'Date_Open' },
        { headerName: 'Status', field: 'Status' },
        { headerName: 'วันปิด Box', field: 'Date_Close' },
        {
            headerName: 'Actions',
            field: 'actions',
            cellRenderer: (params) => (
                <Button className="btn btn-secondary btn-sm" onClick={() => handleShowEdit(params.data)}>Edit</Button>
                // <Button className="btn btn-danger btn-sm" onClick={() => handleShowEdit(params.data)}>Edit</Button>
            ),
        }
    ];
      
    useEffect(() => {
        const load = async () => {
            try {
                const logData = (await fetchRoundtransportlogs()).data;
                console.log('logData', logData)

                const mapped = logData.map(i => {
                    const { date, time } = convertToUTC7(i.Date); // Convert date
                
                    return {
                        id: i.id,
                        Round_Name: i.Round_Name,
                        Max_Weight: i.Max_Weight,
                        Status: i.Status_Name,
                        Concern_Person: i.Concern_Person,
                        Department_Name: i.Department_Name,
                        Type_Name: i.Type_Name,
                        Weight: parseFloat(i.Weight) || 0,
                        Area: i.Area,
                        Date: date,  
                        Time: time,
                        Round_id: i.Round_id,
                        Cumulative_Weight: i.Cumulative_Weight,
                        Date_Close: utc7Date(i.Date_Close),
                        Date_Open: utc7Date(i.Date_Open),
                        Running_Number: i.Running_Number
                    };
                });              
                console.log('finalMapped', mapped)
                setRowData(mapped);
                // setRowData(mapped);
                setFilteredData(mapped);
                extractUniqueValues(mapped);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const extractUniqueValues = (data) => {
        const keys = ['Round_Name', 'Max_Weight', 'Status', 'Concern_Person', 'Department_Name', 'Type_Name', 'Weight', 'Area','Date', 'Round_id', 'Date_Open', 'Date_Close'];
        const unique = {};
        keys.forEach(key => {
            unique[key] = [...new Set(data.map(item => item[key]))];
        });
        setUniqueValues(unique);
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    useEffect(() => {
        let data = rowData;
        Object.keys(filters).forEach(key => {
            if (filters[key]) {
                data = data.filter(item => item[key]?.toString() === filters[key]);
            }
        });
        setFilteredData(data);
    }, [filters, rowData]);


    const onGridReady = params => {
        setGridApi(params.api);
    };
    const handleShowEdit = (data) =>{
        navigate(`/transportlog/${data.id}`)
    }
    // Loading spinner while fetching data
    // if (loading) {
    //     return (
    //         <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
    //             <Spin size="large" />
    //         </div>
    //     ); // Show a spinner until the data is loaded
    // }
    return (
        <>

            <div style={{ marginBottom: '10px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {Object.keys(uniqueValues).map(key => (
                    <Select
                        key={key}
                        placeholder={key.replace('_', ' ')}
                        onChange={value => handleFilterChange(key, value)}
                        style={{ minWidth: 150 }}
                        allowClear
                    >
                        {uniqueValues[key].map(value => (
                            <Option key={value} value={value}>{value}</Option>
                        ))}
                    </Select>
                ))}
            </div>
            <div>
                <Button className='btn btn-success btn-sm' style={{ marginBottom: '10px' }} onClick={() => navigate('/')}>เพิ่มรายการ</Button>
                <ExcelExportButton gridApi={gridApi} columnDefs={columnDefs} Tablename="TransportLog" />
                <ClipboardButton gridApi={gridApi} columnDefs={columnDefs} />
            </div>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                    <Spin size="large" />
                </div>
            ) : error ? (
                <div style={{ color: 'red' }}>{`Error: ${error}`}</div>
            ) : (
                <Tablecomponent
                    columnDefs={columnDefs}
                    rowData={filteredData}
                    onGridReady={onGridReady}
                />
            )}
        </>
    );
};

export default TransportLog;