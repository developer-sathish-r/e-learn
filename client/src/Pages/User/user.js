import { Image } from "antd";

export const userData = {
    basicInfo: {
        profilePicture: "https://via.placeholder.com/150",
        fullName: "John Doe",
        username: "johndoe123",
        email: "john.doe@example.com",
        phoneNumber: "+123456789",
        dateOfBirth: "1990-05-15",
    },
    accountDetails: {
        creationDate: "2023-01-01",
        role: "Learner",
        membershipType: "Premium",
        languagePreference: "English",
    },
    learningProgress: {
        activeCourses: [
            {
                courseName: "HTML and CSS",
                development: "Front-End Development",
                assigner: "Ganapathy",
                level: [
                    {
                        easy: [
                            {
                                title: 'Module 1',
                                task: <Image
                                    width={200}
                                    src="https://res.cloudinary.com/dz209s6jk/image/upload/v1676299213/Challenges/tn6hip0khjvu4qrhww7r.jpg"
                                />,
                                attempt: [
                                    {
                                        time: '00:42:15',
                                        file: '',
                                        comment: "Not ok do again",
                                    },
                                    {
                                        time: '00:30:15',
                                        file: '',
                                        comment: "Ok Good"
                                    }
                                ],
                                totalTime : '01:12:30',
                                status : 'not yet start', // 'waiting for review' (or) 'not completed' (or) 'completed'
                            },
                            {
                                title: 'Module 2',
                                task: <Image
                                    width={200}
                                    src="https://res.cloudinary.com/dz209s6jk/image/upload/v1631270211/Challenges/dgmrkrfyzvyzwuwl7vac.jpg"
                                />,

                                attempt: [
                                    {
                                        time: '00:42:15',
                                        file: '',
                                        comment: "Not ok do again",
                                    },
                                    {
                                        time: '00:30:15',
                                        file: '',
                                        comment: "Ok Good"
                                    }
                                ],
                                totalTime : '01:12:30',
                                status : 'not yet start', 
                            },
                            {
                                title: 'Module 3',
                                task: <Image
                                    width={200}
                                    src="https://res.cloudinary.com/dz209s6jk/image/upload/v1724410481/Challenges/stikcghtpo7obqenm1ao.jpg"
                                />,
                                attempt: [
                                    {
                                        time: '00:42:15',
                                        file: '',
                                        comment: "Not ok do again",
                                    },
                                    {
                                        time: '00:30:15',
                                        file: '',
                                        comment: "Ok Good"
                                    }
                                ],
                                totalTime : '01:12:30',
                                status : 'not yet start', 
                            },
                        ]
                    },
                    {
                        intermediate: [
                            {
                                title: 'Module 1',
                                task: <Image
                                    width={200}
                                    src="https://res.cloudinary.com/dz209s6jk/image/upload/v1676299213/Challenges/tn6hip0khjvu4qrhww7r.jpg"
                                />,
                                attempt: [
                                    {
                                        time: '00:42:15',
                                        file: '',
                                        comment: "Not ok do again",
                                    },
                                    {
                                        time: '00:30:15',
                                        file: '',
                                        comment: "Ok Good"
                                    }
                                ],
                                totalTime : '01:12:30',
                                status : 'not yet start', 
                            },
                            {
                                title: 'Module 2',
                                preview: <Image
                                    width={200}
                                    src="https://res.cloudinary.com/dz209s6jk/image/upload/v1631270211/Challenges/dgmrkrfyzvyzwuwl7vac.jpg"
                                />,
                                attempt: [
                                    {
                                        time: '00:42:15',
                                        file: '',
                                        comment: "Not ok do again",
                                    },
                                    {
                                        time: '00:30:15',
                                        file: '',
                                        comment: "Ok Good"
                                    }
                                ],
                                totalTime : '01:12:30',
                                status : 'not yet start', 
                            },
                            {
                                title: 'Module 3',
                                task: <Image
                                    width={200}
                                    src="https://res.cloudinary.com/dz209s6jk/image/upload/v1724410481/Challenges/stikcghtpo7obqenm1ao.jpg"
                                />,
                                attempt: [
                                    {
                                        time: '00:42:15',
                                        file: '',
                                        comment: "Not ok do again",
                                    },
                                    {
                                        time: '00:30:15',
                                        file: '',
                                        comment: "Ok Good"
                                    }
                                ],
                                totalTime : '01:12:30',
                                status : 'not yet start', 
                            },
                        ]
                    },
                    {
                        hard: [
                            {
                                title: 'Module 1',
                                task: <Image
                                    width={200}
                                    src="https://res.cloudinary.com/dz209s6jk/image/upload/v1676299213/Challenges/tn6hip0khjvu4qrhww7r.jpg"
                                />,
                                attempt: [
                                    {
                                        time: '00:42:15',
                                        file: '',
                                        comment: "Not ok do again",
                                    },
                                    {
                                        time: '00:30:15',
                                        file: '',
                                        comment: "Ok Good"
                                    }
                                ],
                                totalTime : '01:12:30',
                                status : 'not yet start', 
                            },
                            {
                                title: 'Module 2',
                                task: <Image
                                    width={200}
                                    src="https://res.cloudinary.com/dz209s6jk/image/upload/v1631270211/Challenges/dgmrkrfyzvyzwuwl7vac.jpg"
                                />,
                                attempt: [
                                    {
                                        time: '00:42:15',
                                        file: '',
                                        comment: "Not ok do again",
                                    },
                                    {
                                        time: '00:30:15',
                                        file: '',
                                        comment: "Ok Good"
                                    }
                                ],
                                totalTime : '01:12:30',
                                status : 'not yet start', 
                            },
                            {
                                title: 'Module 3',
                                task: <Image
                                    width={200}
                                    src="https://res.cloudinary.com/dz209s6jk/image/upload/v1724410481/Challenges/stikcghtpo7obqenm1ao.jpg"
                                />,
                                attempt: [
                                    {
                                        time: '00:42:15',
                                        file: '',
                                        comment: "Not ok do again",
                                    },
                                    {
                                        time: '00:30:15',
                                        file: '',
                                        comment: "Ok Good"
                                    }
                                ],
                                totalTime : '01:12:30',
                                status : 'not yet start', 
                            },
                        ]
                    }
                ],
                enrolled: 124,
                mission: "Our mission is to empower learners with the foundational knowledge of HTML and CSS, enabling them to build responsive and visually appealing web pages.",
                outcome: "By completing this course, learners will gain the skills to create professional-grade web designs, implement modern layouts, and optimize user experiences.",
                level: 3,
                reviews: 4.7,
                reviewCount :197,
                recommendedSkils: "HTML & CSS",
                schedule: "40 hours",
                likes: '96%',
                startDate: "2024-01-01",
                estimatedCompletion: "2024-03-01",
            },
        ],
        completedCourses: [
            {
                courseName: "HTML & CSS",
                assignedBy: "John Brown",
                reviewedBy: "Jim Green",
                timeToComplete: 8,
                completedAt: "2025-01-01",
                certificateUrl: " certificate-html&css.pdf"
            },
            {
                courseName: "JS",
                assignedBy: "Alice Johnson",
                reviewedBy: "Joe Black",
                timeToComplete: 10,
                completedAt: "2025-01-02",
                certificateUrl: "certificate-js.pdf"
            },
            {
                courseName: "React JS",
                assignedBy: "Edward King",
                reviewedBy: "Jim Red",
                timeToComplete: 12,
                completedAt: "2025-01-03",
                certificateUrl: "certificate-react-js.pdf"
            },
        ],
        activeQuizzes: [
            { name: "JavaScript Quiz 1", dueDate: "2025-01-10" },
        ],
        learningStreak: "15 days",
    },
    achievements: {
        certificates: [
            { title: "React Basics Certificate", date: "2024-02-01" },
        ],
        badges: ["Top Scorer", "Fast Learner"],
        leaderboardRank: 5,
    },
    activitySummary: {
        totalHours: "120 hours",
        lastActive: "Yesterday",
        favoriteTopics: ["JavaScript", "React"],
        recentActivity: ["Completed Module 2 of React Basics"],
    },
    communication: {
        messages: [
            { title: "Welcome to the Platform", date: "2023-01-01" },
        ],
        notifications: [
            { title: "New course available", date: "2025-01-04" },
        ],
    },
    subscription: {
        currentPlan: "Premium",
        renewalDate: "2025-01-15",
        paymentHistory: [
            { date: "2024-01-15", amount: "$99" },
        ],
    },
    personalGoals: {
        weeklyGoals: "Complete 2 modules",
        progress: "50%",
        preferredMode: "Video lessons",
        skillFocus: ["Frontend Development"],
    },
    security: {
        twoFactorAuth: true,
        lastLogin: "2025-01-04",
    },
    social: {
        friends: ["Alice", "Bob"],
        studyGroups: ["React Enthusiasts"],
    },
    feedback: {
        reviews: [
            { course: "React Fundamentals", rating: 5, comment: "Excellent!" },
        ],
        supportTickets: [
            { id: "123", status: "Resolved" },
        ],
    },
};