import React, { useState, useEffect } from 'react';
import Tablecomponent from '../Components/Tablecomponent';
import { fetchTypes, createType, updateType } from '../utility/typeapi';
import ExcelExportButton from '../Components/ExcelExportButton';
import ClipboardButton from '../Components/ClipboardButton';
import { Button, Modal, Input, Form, message } from 'antd';

const Type = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [rowData, setRowData] = useState([]);
    const [gridApi, setGridApi] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [selectedType, setSelectedType] = useState(null);
    const [form] = Form.useForm();
    const [editForm] = Form.useForm();

    const columnDefs = [
        { headerName: 'เลขที่', field: 'id', checkboxSelection: true, headerCheckboxSelection: true, filter: "agTextColumnFilter" },
        { headerName: 'ประเภท', field: 'Type_Name' },
        {
            headerName: 'Actions',
            field: 'actions',
            cellRenderer: (params) => (
                <div>
                    <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleShowEdit(params.data)}
                        style={{ marginRight: '5px' }}
                    >
                        Edit
                    </button>
                </div>
            ),
        }
    ];

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const logData = (await fetchTypes()).data;
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
        setSelectedType(data);
        editForm.setFieldsValue({ Type_Name: data.Type_Name });
        setIsEditModalVisible(true);
    };

    const handleAddClick = () => {
        setIsModalVisible(true);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleEditModalCancel = () => {
        setIsEditModalVisible(false);
        editForm.resetFields();
    };

    const handleFormSubmit = async (values) => {
        try {
            await createType(values);
            message.success('Type added successfully!');
            setIsModalVisible(false);
            form.resetFields();
            loadData();
        } catch (error) {
            message.error('Failed to add type');
        }
    };

    const handleEditSubmit = async (values) => {
        try {
            await updateType(selectedType.id, values);
            message.success('Type updated successfully!');
            setIsEditModalVisible(false);
            editForm.resetFields();
            loadData();
        } catch (error) {
            message.error('Failed to update type');
        }
    };

    return (
        <>
            <div>
                <Button className='btn btn-success btn-sm' onClick={handleAddClick} style={{ marginBottom: '10px' }}>เพิ่มรายการ</Button>
                <ExcelExportButton gridApi={gridApi} columnDefs={columnDefs} Tablename="TransportLog" />
                <ClipboardButton gridApi={gridApi} columnDefs={columnDefs} />
            </div>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div style={{ color: 'red' }}>{`Error: ${error}`}</div>
            ) : (
                <Tablecomponent
                    columnDefs={columnDefs}
                    rowData={rowData}
                    onGridReady={onGridReady}
                />
            )}

            <Modal title="เพิ่มประเภท" open={isModalVisible} onCancel={handleModalCancel} onOk={() => form.submit()}>
                <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
                    <Form.Item name="Type_Name" label="ประเภท" rules={[{ required: true, message: 'Please enter a type name' }]}> 
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal title="แก้ไขประเภท" open={isEditModalVisible} onCancel={handleEditModalCancel} onOk={() => editForm.submit()}>
                <Form form={editForm} layout="vertical" onFinish={handleEditSubmit}>
                    <Form.Item name="Type_Name" label="ประเภท" rules={[{ required: true, message: 'Please enter a type name' }]}> 
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default Type;
