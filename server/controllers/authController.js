const ObjectId = require('mongodb').ObjectId;
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const mongoose = require("mongoose")
const axios = require("axios")
var db = process.env.MONGO_URI

// Register User
exports.users = async (req, res) => {
    const { name, email, password, role, phone_number } = req.body;
    try {
        const existingUser = await User.findOne({ 'profile.email': email });
        if (existingUser) {
            return res.status(403).json({ message: 'User already exists' });
        }
        const course_details = {
            active_courses: [
                {
                    id: "1",
                    title: "react",
                    description: "React can be used to develop single-page, mobile, or server-rendered applications with frameworks like Next. js and Remix. Because React is only concerned with the user interface and rendering components to the DOM, React applications often rely on libraries for routing and other client-side functionality.",
                    levels: {
                        beginner: [
                            {
                                id: "1",
                                title: "react_task_1",
                                task_description: "React can be used to develop single-page, mobile, or server-rendered applications with frameworks like Next. js and Remix. Because React is only concerned with the user interface and rendering components to the DOM, React applications often rely on libraries for routing and other client-side functionality.",
                                task_image: "https://cdn.dribbble.com/users/883236/screenshots/14416424/media/ef64e09c03fac65dccd4f1c9a7b15d19.png",
                            },
                            {
                                id: "2",
                                title: "react_task_2",
                                task_description: "React can be used to develop single-page, mobile, or server-rendered applications with frameworks like Next. js and Remix. Because React is only concerned with the user interface and rendering components to the DOM, React applications often rely on libraries for routing and other client-side functionality.",
                                task_image: "https://cdn.dribbble.com/users/883236/screenshots/14416424/media/ef64e09c03fac65dccd4f1c9a7b15d19.png",
                            },
                        ]
                    }
                },
                {
                    id: "2",
                    title: "angular",
                    description: "Angular can be used to develop single-page, mobile, or server-rendered applications with frameworks like Next. js and Remix. Because React is only concerned with the user interface and rendering components to the DOM, React applications often rely on libraries for routing and other client-side functionality.",
                    levels: {
                        beginner: [
                            {
                                id: "1",
                                title: "angular_task_1",
                                task_description: "angular can be used to develop single-page, mobile, or server-rendered applications with frameworks like Next. js and Remix. Because React is only concerned with the user interface and rendering components to the DOM, React applications often rely on libraries for routing and other client-side functionality.",
                                task_image: "https://www.google.com/imgres?q=image&imgurl=https%3A%2F%2Fplus.unsplash.com%2Fpremium_photo-1664474619075-644dd191935f%3Ffm%3Djpg%26q%3D60%26w%3D3000%26ixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%253D&imgrefurl=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fimage&docid=ExDvm63D_wCvSM&tbnid=2brKLR3s5kTpPM&vet=12ahUKEwiir7OF39mKAxVYSWwGHR0_KgQQM3oECGIQAA..i&w=3000&h=2003&hcb=2&itg=1&ved=2ahUKEwiir7OF39mKAxVYSWwGHR0_KgQQM3oECGIQAA",
                            },
                            {
                                id: "2",
                                title: "angular_task_2",
                                task_description: "Angular can be used to develop single-page, mobile, or server-rendered applications with frameworks like Next. js and Remix. Because React is only concerned with the user interface and rendering components to the DOM, React applications often rely on libraries for routing and other client-side functionality.",
                                task_image: "https://www.google.com/imgres?q=image&imgurl=https%3A%2F%2Fplus.unsplash.com%2Fpremium_photo-1664474619075-644dd191935f%3Ffm%3Djpg%26q%3D60%26w%3D3000%26ixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%253D&imgrefurl=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fimage&docid=ExDvm63D_wCvSM&tbnid=2brKLR3s5kTpPM&vet=12ahUKEwiir7OF39mKAxVYSWwGHR0_KgQQM3oECGIQAA..i&w=3000&h=2003&hcb=2&itg=1&ved=2ahUKEwiir7OF39mKAxVYSWwGHR0_KgQQM3oECGIQAA",
                            },
                        ]
                    }
                }
            ]
        }
        const profile = {
            name, email, password, role, phone_number
        }
        const newUser = new User({ profile, course_details });
        await newUser.save();
        res.status(201).json({ success: 'User registered successfully' });
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: 'Server error' });
    }
};

//middleware
const authenticationToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, process.env.TOKEN, (err, user) => {
        if (err) {
            res.sendStatus(403);
        }
        req.user = user;
        next();
    })
}


exports.post = authenticationToken, async (req, res) => {
    res.json(User.filter(post => post))

}

exports.login = async (req, res) => {    
    const { email, password, role } = req.body;    
    try {
        const user = await User.findOne({
            'profile.email': email,
            'profile.password': password,
            'profile.role': role
        });

        if (user) {
            return res.status(200).json({ success: user });
        }
        return res.status(404).json({ message: 'User not found' });

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


exports.getAllUsers = async (req, res) => {
    try {
        const user = await User.find();
        await res.status(201).json({
            success: true,
            message: "Users Fetched successfully",
            data: user,
        });
    }
    catch (error) {
        await res.status(200).json({
            success: false,
            message: "Fetch Users Failed!",
            status: error
        });
    }
}

exports.getUserById = async (req, res) => { 
    try {
        const user = await User.findById(req?.params?.id);
        await res.status(201).json({
            success: true,
            message: "User Fetched successfully",
            data: user,
        })
    }
    catch (error) {
        await res.status(200).json({
            success: false,
            message: "Fetch Users Failed!",
            status: error
        });
    }
}



exports.deleteById = async (req, res) => {
    try {
        const response = await User.findByIdAndDelete(req.params.id);
        await res.status(200).json({
            success: true,
            message: "User Deleted Successfully!",
        });

    }
    catch (error) {
        console.log("Inside Error", error);

        await res.status(200).json({
            success: false,
            message: "Fetch Users Failed!",
            status: error
        });
    }
}

exports.editUserById = async (req, res) => {
    console.log(req, 177);

}

exports.upload = async (req, res) => {
    console.log('req: ', req.file);
    const URI = `${req.protocol}://${req.get('host')}/images/${req?.file?.filename}`;
    try {
        const newData = {
            name: req.file.originalname,
            uploaded_file: URI,
        }
        const response = await axios.get(`http://localhost:5001/api/get/user/${req.params.id}`)
        await mongoose.connect(`${db}`, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        const profile = await {
            ...response.data.dataprofile,
            profile_image: newData
        }

        const teamCreation = await User.updateOne({ "_id": req.params.id }, { $set: { profile: profile } })
            .then(result => {
                res.status(201).json({
                    success: true,
                    message: "Member added successfully",
                });
            })
            .catch(error => {
                console.error('Error updating user:', error);
            });
    }
    catch (error) {

        res.status(500).json({
            message: 'Error uploading files',
            error: error
        });
    }
}

exports.editProfileCard = async (req, res) => {
    const response = await axios.get(`http://localhost:5001/api/get/user/${req.params.id}`)
    await mongoose.connect(`${db}`, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    });
    
    const profile = await {
        ...response?.data.data?.profile,
        email: req.body.email,
        name: req.body.name,
        linkedin: req.body.linkedin,
        phone_number: req.body.phone_number,
        date_of_birth: req.body.date_of_birth,
        password : req.body.password,
    }

    const teamCreation = await User.updateOne({ "_id": req.params.id }, { $set: { profile: profile } })
        .then(result => {
            res.status(201).json({
                success: true,
                message: "Data Edited successfully",
                data : result
            });
        })
        .catch(error => {
            console.error('Error updating user:', error);
        });

}