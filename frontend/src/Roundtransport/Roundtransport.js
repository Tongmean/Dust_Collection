import React, { useState, useEffect } from 'react';
import Tablecomponent from '../Components/Tablecomponent';
import { fetchRoundtransports, createRoundtransport, updateRoundtransport, deleteRoundtransport } from '../utility/roundtransportapi';
import ExcelExportButton from '../Components/ExcelExportButton';
import ClipboardButton from '../Components/ClipboardButton';
import { Modal, Button, Form, Input, Select, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const RoundTransport = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [rowData, setRowData] = useState([]);
    const [gridApi, setGridApi] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [editForm] = Form.useForm();
    const [selectedData, setSelectedData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const logData = (await fetchRoundtransports()).data;
            const mapped = logData.map(i => ({
                id: i.id_Round_Transport,
                Round_Name: i.Round_Name,
                Max_Weight: i.Max_Weight,
                Status: i.Status_Name,
                Date_Open: i.Date_Open ? convertToUTC7(i.Date_Open) : null,
                Date_Close: i.Date_Close ? convertToUTC7(i.Date_Close) : null,

            }));
            setRowData(mapped);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const columnDefs = [
        { headerName: 'เลขที่', field: 'id', checkboxSelection: true, headerCheckboxSelection: true, filter: "agTextColumnFilter" },
        { headerName: 'Round Name', field: 'Round_Name' },
        { headerName: 'Max Weight (Kg)', field: 'Max_Weight' },
        { headerName: 'Status', field: 'Status' },
        { headerName: 'Date Open', field: 'Date_Open' },
        { headerName: 'Date close', field: 'Date_Close' },
        {
            headerName: 'Actions',
            field: 'actions',
            cellRenderer: (params) => (
                <>
                    <Button className="btn btn-secondary btn-sm" onClick={() => handleShowEdit(params.data)}>Edit</Button>
                    <Button className="btn btn-danger btn-sm" onClick={() => handleShowDelete(params.data)} style={{ marginLeft: '5px' }}>Delete</Button>
                </>
            ),
        }
    ];

    const onGridReady = params => {
        setGridApi(params.api);
    };

    const handleOpenModal = () => {
        form.resetFields();
        setIsModalOpen(true);
    };

    const handleSave = async (values) => {
        await createRoundtransport(values);
        setIsModalOpen(false);
        loadData();
    };

    const handleShowEdit = (data) => {
        // editForm.setFieldsValue({ ...data, Status_ID: data.Status });
        // setSelectedData(data);
        // setIsEditModalOpen(true);
        editForm.setFieldsValue({
            ...data,
            Status_ID: data.Status === 'Open' ? '1' : '2' // ✅ Map to correct <Option value>
        });
        setSelectedData(data);
        setIsEditModalOpen(true);
    };

    const handleUpdate = async (values) => {
        console.log('Form Submitted:', values); // 👀 Add this
        setLoading(true)
        try {
            await updateRoundtransport(selectedData.id, values);
            setIsEditModalOpen(false);
            
        } catch (error) {
            console.log(error)
        } finally{
            loadData();
            setLoading(false)
        }
        
    };

    const handleShowDelete = (data) => {
        setSelectedData(data);
        setIsDeleteModalOpen(true);
    };

    const handleDelete = async () => {
            setLoading(true)
        try {
            await deleteRoundtransport(selectedData.id);
            setIsDeleteModalOpen(false);
            loadData();
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
        
    };

    const convertToUTC7 = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString("th-TH", { timeZone: "Asia/Bangkok" });
    };
    // if (isPending) {
    //     return (
    //         <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
    //             <Spin size="large" />
    //         </div>
    //     ); // Show a spinner until the data is loaded
    // }
    return (
        <>
            <div>
                <Button className='btn btn-success btn-sm' onClick={handleOpenModal} style={{ marginBottom: '10px' }}>เพิ่มรายการ</Button>
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
                    rowData={rowData}
                    onGridReady={onGridReady}
                />
            )}
            
            <Modal title="เพิ่มรายการ" open={isModalOpen} onCancel={() => setIsModalOpen(false)} onOk={() => form.submit()}>
                <Form form={form} layout="vertical" onFinish={handleSave}>
                    <Form.Item name="Round_Name" label="Round Name" rules={[{ required: true, message: 'Please enter Round Name' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="Max_Weight" label="Max Weight (Kg)" rules={[{ required: true, message: 'Please enter Max Weight' }]}>
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item name="Status_ID" label="Status" rules={[{ required: true, message: 'Please select Status' }]}>
                        <Select>
                            <Option value="1">Open</Option>
                            <Option value="2">Closed</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal title="แก้ไขรายการ" open={isEditModalOpen} onCancel={() => setIsEditModalOpen(false)} onOk={() => editForm.submit()}>
                <Form form={editForm} layout="vertical" onFinish={handleUpdate}>
                    <Form.Item name="Round_Name" label="Round Name" rules={[{ required: true, message: 'Please enter Round Name' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="Max_Weight" label="Max Weight (Kg)" rules={[{ required: true, message: 'Please enter Max Weight' }]}>
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item name="Status_ID" label="Status" rules={[{ required: true, message: 'Please select Status' }]}>
                        <Select>
                            <Option value="1">Open</Option>
                            <Option value="2">Closed</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal 
                title="ยืนยันการลบ" 
                open={isDeleteModalOpen} 
                onCancel={() => setIsDeleteModalOpen(false)} 
                onOk={handleDelete}
                loading={loading}
            >
                <p>คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?</p>
            </Modal>

        </>
    );
};

export default RoundTransport;
