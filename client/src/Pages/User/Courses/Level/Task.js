import React, { memo, useEffect, useState, useRef } from 'react'; 
import { useSelector } from "react-redux";
import { Button, Modal, Image } from 'antd';
import { COLORS } from "../../../../Config/variables";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { redirect, useLocation, useParams } from 'react-router';
import {  PrimaryButton } from "../../../../Components/index"

const Task = memo(() => {
  const id = useSelector((obj) => obj.token.success._id);
  const {state}=useLocation();
  const [data, setData] = useState();
  const redirect = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [moduleTimes, setModuleTimes] = useState([]); 
  const [uploadModuleIndex, setUploadModuleIndex] = useState(null); 
  const [uploadComplete, setUploadComplete] = useState(null); 
  const [isConfirmingEnd, setIsConfirmingEnd] = useState(false); 
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [faqData, setFaqData]=useState(state)
  const fileInput = useRef(null);

  const buttonStyle = {
    backgroundColor: isHovered ? COLORS.WHITE : COLORS.PRIMARY_COLOR[500],
    color: isHovered ? COLORS.PRIMARY_COLOR[500] : COLORS.WHITE,
    border: isHovered ? `1px solid ${COLORS.PRIMARY_COLOR[500]}` : `1px solid transparent`,
    transition: "background-color 0.3s, color 0.3s, border 0.3s",
  };

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const timing = (moduleIndex) => {
    setModuleTimes((prevTimes) => {
      const updatedTimes = [...prevTimes];
      const currentModule = updatedTimes[moduleIndex] || {};

      if (currentModule.isRunning) {
        setIsConfirmingEnd(true);
      } else {
        currentModule.startTime = Date.now();
        currentModule.isRunning = true;
      }


      updatedTimes[moduleIndex] = currentModule;
      return updatedTimes;
    });
  };


  const confirmEnd = (moduleIndex) => {
    setModuleTimes((prevTimes) => {
      const updatedTimes = [...prevTimes];
      const currentModule = updatedTimes[moduleIndex] || {};


      currentModule.endTime = Date.now();
      currentModule.isRunning = false;


      const duration = currentModule.endTime - currentModule.startTime;
      const hours = Math.floor(duration / 3600000);
      const minutes = Math.floor((duration % 3600000) / 60000);
      const seconds = Math.floor((duration % 60000) / 1000);
      currentModule.elapsedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;


      setUploadModuleIndex(moduleIndex);
      setIsConfirmingEnd(false); 
      return updatedTimes;
    });
  };


  const cancelEnd = () => {
    setIsConfirmingEnd(false); 
  };


  const handleUpload = (moduleIndex) => {
    setUploadComplete((prev) => ({ ...prev, [moduleIndex]: true }));
    setUploadModuleIndex(null); 
  };


  const handleRestart = () => {
    setUploadComplete(null); 
    setIsConfirmingEnd(false);
  };


  
  const handleFolderUpload = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files); 
  };


  return (
    <>
    
      <div className="max-w-7xl mx-auto p-4 bg-gray-100 rounded-lg shadow-lg mt-5" >
        <PrimaryButton label="Back" onClick={()=>redirect(-1)} />
        <h2 className="text-3xl font-bold text-center mb-6 text-fuchsia-950">Task</h2>
        {state.map((faq, index) => (
          <div key={index} className="mb-4">
            <button  
              className={`w-full text-left p-4 rounded-t-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-800 ${activeIndex === index ? 'bg-fuchsia-950 text-white' : 'bg-white text-fuchsia-700 hover:bg-fuchsia-50'}`}
              onClick={() => toggleAccordion(index)}
              aria-expanded={activeIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <div className="flex items-center justify-between"  >
                <span className="font-semibold">{faq.title}</span>
                {activeIndex === index ? (
                  <FaChevronUp className="w-5 h-5" />
                ) : (
                  <FaChevronDown className="w-5 h-5" />
                )}
              </div>
            </button>


            <div
              id={`faq-answer-${index}`}
              className={`overflow-hidden transition-all duration-300 ease-in-out ${activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <p className="p-2 text-gray-700">Sample UI</p>


              <div className="bg-white flex flex-row items-center justify-between p-4 space-x-4">
                <p className="text-gray-700"><Image width={200} src={faq.task} alt='' /></p>
                <p className="text-gray-700">
                  {moduleTimes[index]?.isRunning && "Your time is running!"}


                  {moduleTimes[index]?.elapsedTime && (
                    <div className="mt-2 text-gray-700">
                      <p>Time taken to complete this task : {moduleTimes[index]?.elapsedTime}</p>
                    </div>
                  )}
                </p>


                <div>
                  {uploadComplete?.[index] ? (
                    <button
                      className="p-2 bg-green-500 text-white rounded"
                      onClick={handleRestart}
                    >
                      Restart
                    </button>
                  ) : uploadModuleIndex === index ? (
                    <button 
                     className="h-12 px-6 m-2 text-lg text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
                    style={buttonStyle}
                      onClick={() => handleUpload(index)}
                    >
                      Upload Folder
                    </button>
                  //   <Button
                  //   onClick={() => fileInput.current.click()} 
                  //   style={{ marginTop: '20px' }}
                  // >
                  //   Upload Folder
                  // </Button>
                  ) : (
                    <Button  className="h-12 px-6 m-2 text-lg text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
                      onClick={() => timing(index)}
                      
                      style={buttonStyle}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      {moduleTimes[index]?.isRunning ? 'End' : 'Start'}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
  
      <input
        type="file"
        ref={fileInput}
        webkitdirectory="true"
        onChange={handleFolderUpload}
        style={{ display: 'none' }} 
      />
     
      <Modal
        title="Confirm End"
        visible={isConfirmingEnd}
        onOk={() => confirmEnd(activeIndex)}
        onCancel={cancelEnd}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to end?</p>
      </Modal>
    </>
  );
});


export default Task;