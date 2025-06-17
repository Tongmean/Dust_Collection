import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Spin } from 'antd';
// import { Checkbox, Row, Col } from 'antd';

import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Notification from '../Components/Notification';
import { updateRoundtransportlog, fetchRoundtransportlog } from '../utility/roundtransportlogapi';
import { fetchRoundtransport, fetchDepartment, fetchType, fetchCurentweight } from '../utility/sellectedapi';
import {fetchConcernpersons} from '../utility/concertperonapi'
import {fetchAreas} from '../utility/areaapi'
import DateTimeComponent from '../utility/nowdate';

const { Option } = Select;
const CreateRoundtransportlog = () => {
    const [form] = Form.useForm();
    const [isPending, setIsPending] = useState(false);
    const [notification, setNotification] = useState(null);
    const [roundtransportOption, setRoundtransportOption] = useState([]);
    const [departmentOption, setDepartmentOption] = useState([]);
    const [typeOption, setTypeOption] = useState([]);
    const [concernpersonOption, setConcernpersonOption] = useState([]);
    const [areaOption, setAreaOption] = useState([]);
    const [getWeight, setGetweight] = useState(0);
    const [roundmaxWeight, setRoundmaxWeight] = useState(0);
    const [Weight, setWeight] = useState(0);
    const navigate = useNavigate();
    const { id } = useParams();

    //Dropdown Value
    useEffect(() => {
        const load = async () => {
            setIsPending(true);
            try {
                const roundtransportOptiondata = await fetchRoundtransport(); 
                setRoundtransportOption(roundtransportOptiondata.data); 

                const departmenttOptiondata = await fetchDepartment(); 
                setDepartmentOption(departmenttOptiondata.data); 

                const typeOptiondata = await fetchType(); 
                setTypeOption(typeOptiondata.data); 

                const concernpersondata = await fetchConcernpersons(); 
                setConcernpersonOption(concernpersondata.data); 

                const areadata = await fetchAreas(); 
                setAreaOption(areadata.data); 

                const Roundtransportlogdata = await fetchRoundtransportlog(id); 
                console.log('Roundtransportlogdata', Roundtransportlogdata.data[0])

                if (Roundtransportlogdata && Roundtransportlogdata.data[0]) {
                const data = Roundtransportlogdata.data[0];
                form.setFieldsValue({
                    id: data.id,
                    Round_ID: data.Round_ID,
                    Concern_Person: data.Concern_Person,
                    Department_ID: data.Department_ID,
                    Type_ID: data.Type_ID,
                    Weight: data.Weight,
                    Area: data.Area,
                    // other fields if necessary
                });
                // form.setFieldValue(data)
                if(data.Round_ID){
                    const result = await fetchCurentweight(data.Round_ID); // API call to fetch sum of weights
                    // setRoundWeightSum(result.data); // Assuming API returns the sum of weights
                    const totalweight = result.data[0].total_weight;
                    setGetweight(totalweight);

                    if (roundtransportOptiondata.data.length > 0) {
                    const selectedRound = roundtransportOptiondata.data.find(dept => dept.id === data.Round_ID);
                    if (selectedRound) {
                        setRoundmaxWeight(selectedRound.Max_Weight);
                        console.log('maxWeight', selectedRound.Max_Weight);
                    }
                }
                }
            }
              
            } catch (error) {
                showNotification('Failed to fetch data', 'warning');
            } finally {
                setIsPending(false);
            }
        };
        load();
    }, []);
    // Handle round ID change to fetch weight sum
    const handleRoundChange = async (Round_ID) => {
        console.log('Round_ID', Round_ID)
        try {
            const result = await fetchCurentweight(Round_ID); // API call to fetch sum of weights
            // setRoundWeightSum(result.data); // Assuming API returns the sum of weights
            const totalweight = result.data[0].total_weight;
            setGetweight(totalweight)
            showNotification(`น้ำหนักสรุปสำหรับรอบนี้ ที่ได้ชั่งมาแล้ว : ${totalweight} Kg`, 'warning');
            form.setFieldValue("total_weight", totalweight);
            // form.setFieldValue("current_total_weight", (totalweight + Weight));
            // console.log('totalweight', totalweight)
            // console.log('Round_ID', Round_ID)
            const selectedRound = roundtransportOption.find(dept => dept.id === Round_ID);
            const maxWeight = selectedRound.Max_Weight; // Get Max_Weight
            setRoundmaxWeight(maxWeight);
        } catch (error) {
            showNotification('Failed to fetch weight sum', 'warning');
        }
    };
    const handleWeightChange = async (e) => {
        try {
            const Weight = e.target.value;
            setWeight(Weight)
            if (Weight === "" || parseFloat(Weight) < 0) {
                return;
            }
            if((parseFloat(getWeight) + parseFloat(Weight)) > parseFloat(roundmaxWeight)){
                form.setFieldValue("current_total_weight", parseFloat(roundmaxWeight));
                alert(`คุณไม่สามารถบันทึกเกินน้ำหนักได้ Max ${roundmaxWeight} กรุณาลด`)
                showNotification(`ไม่สามารถบันทึกเกิน: ${parseFloat(roundmaxWeight)} Kg ที่จะบันทึกตอนนี้คือ ${(parseFloat(getWeight) + parseFloat(Weight))} Kg กรุณาลดจำนวนเป็น: ${parseFloat(roundmaxWeight)} Kg, คุณบันทึกเกิน Max: ${(parseFloat(getWeight) + parseFloat(Weight)) - parseFloat(roundmaxWeight)} Kg`, 'warning');

            }else{
                form.setFieldValue("current_total_weight", (parseFloat(getWeight) + parseFloat(Weight)));
            }
            // form.setFieldValue("current_total_weight", (parseFloat(getWeight) + parseFloat(Weight)));
        } catch (error) {
            showNotification('การคำนวณมีปัญหานิดหน่อย ครับ', 'warning');
        }
    };
    const handleSubmit = async (values) => {
        setIsPending(true);
        const logData = { ...values};

        try {
            const result = await updateRoundtransportlog(id,logData);
            showNotification(result.msg, 'success');
            setTimeout(() => navigate('/transportlog'), 2000);
            form.resetFields();
        } catch (error) {
            showNotification(error.message, 'warning');
        } finally {
            setIsPending(false);
        }
    };

    const showNotification = (message, type) => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 4000);
    };

    const handleClearForm = () => {
        form.resetFields();
        showNotification('Form values cleared', 'success');
    };
    if (isPending) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Spin size="large" />
            </div>
        ); // Show a spinner until the data is loaded
    }
    return (
        <>
            <div className="container-fluid">
                <h2>แบบฟอร์มแก้ไข้ข้อมูลฝุ่น</h2>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={{
                        Round_ID: '',
                        Concern_Person: '',
                        Department_ID: '',
                        Type_ID: '',
                        Weight: '0',
                    }}
                >
                    <div className="row">
                        <div className='col-md-4'>
                            <Form.Item
                                label="ลำดับ"
                                name="id"
                            >
                                <Input type="text"  disabled />
                            </Form.Item>
                            <DateTimeComponent/>

                        </div>
                        <div className='col-md-8 d-flex justify-content-center'>
                            <div class="card w-75">
                            <div class="card-body">
                                <h5 class="card-title text-warning">การแจ้งเดือน</h5>
                                <p class="card-text">น้ำหนัก Max: {roundmaxWeight} Kg</p>
                                <p class="card-text">น้ำหนักที่บันทึกไปแล้ว : {getWeight} Kg</p>
                                {/* <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                <p class="card-text">ไม่สามารถบันทึกเกิน: ${parseFloat(roundmaxWeight)} Kg ที่จะบันทึกตอนนี้คือ ${(parseFloat(getWeight) + parseFloat(Weight))} Kg กรุณาลดจำนวนเป็น: ${parseFloat(roundmaxWeight)} Kg, คุณบันทึกเกิน Max: ${(parseFloat(getWeight) + parseFloat(Weight)) - parseFloat(roundmaxWeight)} Kg`, 'warning');</p> */}
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                            <Form.Item
                                label="ชื่อผู้ชั่ง"
                                name="Concern_Person"
                                rules={[{ required: true, message: 'กรุณากรอก ชื่อผู้ชั่ง' }]}
                            >
                                {/* <Input /> */}
                                <Select placeholder="ชื่อผู้ชั่ง" >
                                    {concernpersonOption.map((dept) => (
                                        <Option key={dept.id} value={dept.id}>
                                            {dept.Name}
                                        </Option>
                                    ))}
                                    
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="ชื่อ BOX"
                                name="Round_ID"
                                rules={[{ required: true, message: 'กรุณากรอก ชื่อ BOX' }]}
                                // onChange={handleRoundChange}
                            >
                                <Select placeholder="เลือก ชื่อ BOX" onChange={handleRoundChange}>
                                    {roundtransportOption.map((dept) => (
                                        <Option key={dept.id} value={dept.id}>
                                            {dept.Round_Name} น้ำหนัก Max {dept.Max_Weight} Kg
                                        </Option>
                                    ))}
                                    
                                </Select>
                            </Form.Item>
                        </div>
                        <div className="col-md-3">
                            <Form.Item
                                label="หน่วยงาน"
                                name="Department_ID"
                                rules={[{ required: true, message: 'กรุณาเลือกหน่วยงาน' }]}
                            >
                                <Select placeholder="เลือกหน่วยงาน">
                                    {departmentOption.map((dept) => (
                                        <Option key={dept.id} value={dept.id}>
                                            {dept.Department_Name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                    label="น้ำหนัก (กิโลกรัม)"
                                    name="Weight"
                                    rules={[{ required: true, message: 'กรุณากรอกน้ำหนัก' }]}
                                >
                                <Input 
                                    type="number" 
                                    step="0.01" 
                                    min="0" 
                                    onChange={handleWeightChange} 
                                    // onKeyDown={handleKeyDown} // Disable keyboard if condition is met
                                    onBlur={(e) => {
                                        let value = parseFloat(e.target.value);
                                        if (isNaN(value) || value < 0) {
                                            e.target.value = "";
                                        }
                                    }}
                                />
                            </Form.Item>
                        </div>
                            
                        <div className="col-md-3">
                            <Form.Item
                                label="ชื่ออาคาร"
                                name="Area"
                                rules={[{ required: true, message: 'กรุณาเลือก ชื่ออาคาร' }]}
                            >
                                <Select >
                                        {areaOption.map((type) => (
                                            <Option key={type.id} value={type.id}>
                                                {type.Area}
                                            </Option>
                                        ))}
                                </Select>
                            </Form.Item>
                            {/* <Form.Item
                                label="น้ำหนักที่บันทึกไปแล้ว (กิโลกรัม)"
                                name="total_weight"
                            >
                                <Input type="number"  disabled />
                            </Form.Item> */}
                            <Form.Item
                                label="น้ำหนัก Grand Total (กิโลกรัม)"
                                name="current_total_weight"
                            >
                                <Input type="number"  disabled />
                            </Form.Item>
                        </div>
                        <div className="col-md-3">
                            <Form.Item
                                label="ประเภทฝุ่น"
                                name="Type_ID"
                                rules={[{ required: true, message: 'กรุณาเลือกประเภทฝุ่นง' }]}
                            >
                                <Select placeholder="เลือกประเภท ประเภทฝุ่น">
                                    {typeOption.map((type) => (
                                        <Option key={type.id} value={type.id}>
                                            {type.Type_Name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            
                      
                        </div>
                    </div>

                    <div className="col-12">
                        <Form.Item>
                            <Button type="default" className="me-2" onClick={() => navigate('/transportlog')}>
                                Back
                            </Button>
                            <Button type="primary" htmlType="submit" disabled={isPending}>
                                {isPending ? 'Saving...' : 'Save Data'}
                            </Button>
                            <Button type="default" onClick={handleClearForm} style={{ marginLeft: '10px' }}>
                                Clear
                            </Button>
                        </Form.Item>
                    </div>
                </Form>

                {notification && (
                    <Notification
                        message={notification.message}
                        type={notification.type}
                        onClose={() => setNotification(null)}
                    />
                )}
            </div>
        </>
    );
};

export default CreateRoundtransportlog;
