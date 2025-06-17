import React, { useState, useEffect } from 'react';
import Tablecomponent from '../Components/Tablecomponent';
import { fetchAreas, createArea, updateArea } from '../utility/areaapi';
import ExcelExportButton from '../Components/ExcelExportButton';
import ClipboardButton from '../Components/ClipboardButton';
import { Modal, Button, Form, Input, message } from 'antd';

const Area = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [rowData, setRowData] = useState([]);
    const [gridApi, setGridApi] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const [form] = Form.useForm();

    const columnDefs = [
        { headerName: 'เลขที่', field: 'id', checkboxSelection: true, headerCheckboxSelection: true, filter: "agTextColumnFilter" },
        { headerName: 'พื่นที่', field: 'Area' },
        {
            headerName: 'Actions',
            field: 'actions',
            cellRenderer: (params) => (
                <Button className="btn btn-secondary btn-sm" onClick={() => handleShowEdit(params.data)}>Edit</Button>
            ),
        }
    ];

    useEffect(() => {
        loadDepartments();
    }, []);

    const loadDepartments = async () => {
        try {
            const logData = (await fetchAreas()).data;
            setRowData(logData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const onGridReady = params => {
        setGridApi(params.api);
    };

    const handleShowEdit = (data) => {
        setEditingRecord(data);
        form.setFieldsValue(data);
        setIsModalOpen(true);
    };

    const handleShowAdd = () => {
        setEditingRecord(null);
        form.resetFields();
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            if (editingRecord) {
                await updateArea(editingRecord.id, values);
                message.success('Updated successfully');
            } else {
                await createArea(values);
                message.success('Added successfully');
            }
            setIsModalOpen(false);
            loadDepartments();
        } catch (error) {
            message.error('Error saving data');
        }
    };

    return (
        <>
            <div>
                <Button className='btn btn-success btn-sm' onClick={handleShowAdd} style={{ marginBottom: '10px' }}>เพิ่มรายการ</Button>
                <ExcelExportButton gridApi={gridApi} columnDefs={columnDefs} Tablename="TransportLog" />
                <ClipboardButton gridApi={gridApi} columnDefs={columnDefs} />
            </div>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div style={{ color: 'red' }}>{`Error: ${error}`}</div>
            ) : (
                <Tablecomponent columnDefs={columnDefs} rowData={rowData} onGridReady={onGridReady} />
            )}
            
            <Modal title={editingRecord ? 'Edit Department' : 'Add Department'} open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
                <Form form={form} layout="vertical">
                    <Form.Item name="Area" label="พื่นที่" rules={[{ required: true, message: 'Please enter พื่นที่' }]}> 
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default Area;
