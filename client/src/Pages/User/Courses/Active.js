import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router";
import { ReactComponent as CSS } from "../../../Assets/SVGs/Stacks/css.svg";
import { ReactComponent as HTML } from "../../../Assets/SVGs/Stacks/html.svg";
import { ReactComponent as RightArrow } from "../../../Assets/SVGs/Icons/auth/user-circle.svg";
import easy from "../../../Assets/Images/levels/easy.png";
import hard from "../../../Assets/Images/levels/hard.png";
import medium from "../../../Assets/Images/levels/medium.png";
import { COLORS } from "../../../Config/variables";
import { Task } from "../Courses/Level/Task"

 //Main CourseUI Component
const CourseUI = ({ data }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    const handleLevelSelect = (path) => {
        setIsModalOpen(false);
        if (path === "/user/courses/easy") {
            navigate("/user/courses/easy", { state: COURSE_LEVELS[0]?.level[0].easy})
        }
        if (path === "/user/courses/intermediate") {
            navigate("/user/courses/intermediate", { state: COURSE_LEVELS[1].level[0].intermediate })
        }
        if (path === "/user/courses/hard") {
            navigate("/user/courses/hard", { state: COURSE_LEVELS[2].level[0].hard })
        }
    };

    const buttonStyle = {
        backgroundColor: isHovered ? COLORS.WHITE : COLORS.PRIMARY_COLOR[500],
        color: isHovered ? COLORS.PRIMARY_COLOR[500] : COLORS.WHITE,
        border: isHovered ? `1px solid ${COLORS.PRIMARY_COLOR[500]}` : `1px solid transparent`,
        transition: "background-color 0.3s, color 0.3s, border 0.3s",
    };
    const COURSE_LEVELS = [
        {
            level: [],
            image: easy,
            path: "/user/courses/easy",
            alt: "Easy",
            stars: 1,
            color: "text-yellow-400",

        },
        {
            level: [],
            image: medium,
            path: "/user/courses/intermediate",
            alt: "Intermediate",
            stars: 2,
            color: "text-blue-400",

        },
        {
            level: [],
            image: hard,
            path: "/user/courses/hard",
            alt: "Hard",
            stars: 3,
            color: "text-red-400",

        },
    ];

    const courseLevel = async () => {
        try {
            const { learningProgress: { activeCourses: [{ task }] } } = await data
            const res = task.filter((e, i) => {
                if (Object.keys(e) == 'easy') {
                    COURSE_LEVELS[0].level.push(e)

                }
                if (Object.keys(e) == 'intermediate') {
                    COURSE_LEVELS[1].level.push(e)

                }

                if (Object.keys(e) == 'hard') {
                    COURSE_LEVELS[2].level.push(e)

                }
            })
        }
        catch (e) {
            // console.log("error", e)
        }

    }
    courseLevel()

    //Card Component - Reusable
    const Card = ({ title, text }) => (
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4" style={{ color: COLORS.PRIMARY_COLOR[500] }}>{title}</h2>
            <p className="text-gray-600">{text}</p>
        </div>
    );

    // Modal Component - Reusable
    const Modal = ({ isOpen, onClose, children }) => {
        if (!isOpen) return null;
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-25">
                <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-3xl p-6 relative">
                    <button
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                        onClick={onClose}
                    >
                        Close
                    </button>
                    {children}
                </div>
            </div>
        );
    };

 
    //LevelCard Component
    const LevelCard = ({ level, image, path, alt, stars, color, onClick, task }) => {
        console.log("task", task)
        return (
            <>
                <div
                    className="overflow-hidden bg-cover rounded-lg cursor-pointer h-96 group"
                    style={{ backgroundImage: `url(${image})` }}
                    onClick={onClick}
                >
                    <div className="flex flex-col justify-center px-8 py-4 transition-opacity duration-700 opacity-0 backdrop-blur-sm bg-gray-800/60 group-hover:opacity-100">
                        <h2 className="mt-4 text-xl font-semibold text-white capitalize">
                            {level}
                        </h2>
                        <p className={`mt-2 text-lg tracking-wider uppercase ${color}`}>Level</p>
                        <div className="flex gap-1 mt-2">
                            {Array.from({ length: stars }).map((_, index) => (
                                <svg
                                    key={index}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    className="w-5 h-5 text-yellow-400"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 15.27l4.15 2.18-1.06-4.68 3.61-3.12-4.73-.39L10 1 7.02 9.26l-4.73.39 3.61 3.12-1.06 4.68L10 15.27z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            ))}
                        </div>
                    </div>
                </div>
                {/* <Task /> */}
            </>

        )
    };


    // Memoized Course Levels
    const levelCards = useMemo(
        () =>
            COURSE_LEVELS.map((course) => (
                <>
                    <LevelCard
                        task={data}
                        key={course.level}
                        {...course}
                        onClick={() => handleLevelSelect(course.path)}
                    />
                </>
            )), [{}]
    );

    return (
        <>
            {data?.learningProgress?.activeCourses[0] === undefined ?
                <div className="flex justify-center items-center">
                    No avaliable course
                </div> :

                <>
                    <div className="flex justify-center items-center">
                        <div className="w-full p-8">
                            {/* Course Header */}
                            <div className="flex justify-evenly items-center">
                                <div className="flex justify-center border border-gray-600 shadow-xl rounded-md p-4">
                                    <HTML width={160} height={160} />
                                    <CSS width={140} height={140} className="mt-4" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-800 underline" >
                                        {data?.learningProgress?.activeCourses[0]?.courseName}
                                    </h1>
                                    <p className="text-gray-500 mt-2 text-center">
                                        This course is part of{" "}
                                        <span className="text-primaryColor-500 underline">
                                            {data?.learningProgress?.activeCourses[0]?.development}
                                        </span>
                                    </p>
                                    <p className="mt-4 text-sm text-gray-500">
                                        Assigned by: <span className="font-semibold" style={{ color: COLORS.PRIMARY_COLOR[500] }}> {data?.learningProgress?.activeCourses[0]?.assigner}</span>
                                    </p>
                                    <button style={buttonStyle}
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}
                                        className="mt-4 px-4 py-2 bg-primaryColor-500 text-white rounded hover:bg-primaryColor-250 hover:text-primaryColor-500 focus:outline-none focus:ring-2 focus:ring-bl focus:ring-opacity-50"
                                        onClick={() => setIsModalOpen(true)}
                                    >
                                        Learn More{" "}
                                        <RightArrow className="inline w-5 h-5 font-semibold m-1" />
                                    </button>
                                    <p className="text-sm text-gray-500 mt-4">
                                        <span className="font-semibold"> {data?.learningProgress?.activeCourses[0]?.enrolled}</span> already enrolled and
                                        completed
                                    </p>
                                </div>
                            </div>

                            {/* Mission and Outcome Section */}
                            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <Card title="Mission" style={{ color: COLORS.PRIMARY_COLOR[500] }} text={data?.learningProgress?.activeCourses[0]?.mission} />
                                <Card title="Outcome" text={data?.learningProgress?.activeCourses[0]?.outcome} />
                            </div>
                            <div className="mt-8 border-t pt-8">
                                <div className="flex justify-between items-center text-gray-700">
                                    <div className="text-center">
                                        <h2 className="text-xl font-semibold" style={{ color: COLORS.PRIMARY_COLOR[500] }}># {data?.learningProgress?.activeCourses[0]?.level}</h2>
                                        <p className="text-sm text-gray-500">Levels</p>
                                    </div>
                                    <div className="text-center">
                                        <h2 className="text-xl font-semibold" style={{ color: COLORS.PRIMARY_COLOR[500] }}> {data?.learningProgress?.activeCourses[0]?.reviews}<span style={{ color: "yellow" }}> ★</span></h2>
                                        <p className="text-sm text-gray-500">({data?.learningProgress?.activeCourses[0]?.reviewCount} reviews)</p>
                                    </div>
                                    <div className="text-center">
                                        <h2 className="text-xl font-semibold" style={{ color: COLORS.PRIMARY_COLOR[500] }}> {data?.learningProgress?.activeCourses[0]?.recommendedSkils}</h2>
                                        <p className="text-sm text-gray-500">Recommended Skils</p>
                                    </div>
                                    <div className="text-center">
                                        <h2 className="text-xl font-semibold" style={{ color: COLORS.PRIMARY_COLOR[500] }}>Approx. {data?.learningProgress?.activeCourses[0]?.schedule}</h2>
                                        <p className="text-sm text-gray-500">schedule</p>
                                    </div>
                                    <div className="text-center">
                                        <h2 className="text-xl font-semibold" style={{ color: COLORS.PRIMARY_COLOR[500] }}> {data?.learningProgress?.activeCourses[0]?.likes}</h2>
                                        <p className="text-sm text-gray-500">Most learners liked this course</p>
                                    </div>
                                </div>
                            </div>

   

                {/* Modal */}
                            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                                <h2 className="text-2xl font-semibold text-center underline mb-4">
                                    Select Your Course Level
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ color: COLORS.PRIMARY_COLOR[500] }}   >{levelCards}</div>
                            </Modal>
                        </div>
                    </div>
                </>
            }
        </>
    );
};

export default CourseUI;
