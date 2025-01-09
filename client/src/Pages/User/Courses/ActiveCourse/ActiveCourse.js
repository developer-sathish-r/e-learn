import React, { memo, useState } from 'react'
import { Col, Row, Divider, Card, Modal, Button } from 'antd';
import { ReactComponent as Code } from "../../../../Assets/SVGs/Icons/code.svg";
import rightArrow from '../../../../Assets/SVGs/Icons/circle-arrow.svg';
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from 'react-router';
import { MdPadding } from 'react-icons/md';
import { FaCommentsDollar } from 'react-icons/fa';
import './activeCourse.css'
const ActiveCource = memo(() => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const activeCourses = [
        {
            id: "HTML&CSS",
            name: "HTML & CSS",
            course_img: <Code width={250} height={250} />,
        },
    ];

    const handleCourse = () => {
        setIsModalOpen(true);
    };

    const handleBeginner = () => {
        navigate('/user/courses/beginner-level')

    }

    const handleIntermediate = () => {
        navigate('/user/courses/intermediate-level')

    }

    const handleAdvance = () => {
        navigate('/user/courses/advance-level')
    }

    return (
        <>
            <Divider orientation="left">Active Course</Divider>
            <Row className=" shadow-2xl bg-slate-200">
                <Col >
                    {activeCourses.map((data) => {
                        return (
                            <Row className="justify-evenly align-middle my-5 mx-10">
                                <Col>{data.course_img}</Col>
                            </Row>
                        );
                    })}
                </Col>
                <Divider type="vertical" style={{ height: "100%" }} />
                <Col style={{ width: 500 }}>
                    <h1 style={{ fontWeight: 750, fontSize: 35, marginTop: 25, textdecoration: "underline" }}>HTML & CSS</h1>
                    <h1 style={{ fontWeight: 750 }}>Description : </h1>
                    <div style={{ marginTop: 100, marginBottom: 10 }}>
                        <h1 style={{ marginBottom: 10 }}>Progress</h1>
                        <ProgressBar height={"5px"} completed={60} />
                    </div>
                    {/* <progress value={75} max={100} /> */}
                    <p>60% completed</p>
                </Col>

                <Col>
                    <div class="arrow" onClick={handleCourse} >
                        <span></span>
                        <span></span>

                    </div>
                </Col>

                {/* <img src={rightArrow} alt="" width='200px' onClick={handleCourse} /> */}

            </Row>


            <Modal title="Select your course level" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <div className='flex justify-around p-10'>

                    <Button onClick={handleBeginner}>Beginner</Button>
                    <Button onClick={handleIntermediate}>Intermediate</Button>
                    <Button onClick={handleAdvance}>Advance</Button>
                </div>
            </Modal>
        </>

    )
});

export default ActiveCource