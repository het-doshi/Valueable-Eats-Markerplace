import owner from '../models/owner.js';
import bcrypt from "bcrypt";
import connectdb from "../database/connect.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });
import { v2 as cloudinary } from 'cloudinary';
import blockowner from '../models/blockOwner.js'


cloudinary.config({ 
    cloud_name: 'dfnn4ox7q', 
    api_key: '167924479915846', 
    api_secret: '6-c-WARoOjTIXT9W7ToKjLZxSV4' 
});

dotenv.config();
connectdb(process.env.MongoUrl);

const saltRounds = 10;

export const register = async (req, res) => {
    try {
        const password = req.body.password;
        const city = req.body.city;

        const collectionCity = city+'_restaurants'

        const collections = await mongoose.connection.db.listCollections().toArray();
        const collectionExists = collections.some(collection => collection.name === collectionCity);

        if (collectionExists) {
            console.log("service exists!");
            const hashpass = await bcrypt.hash(password, saltRounds)
            const newOwner = await owner.create({
                ...req.body,
                restaurantName: req.body.restaurantname,
                password: hashpass,
                image: null
            });
            res.status(200).json({ message: "Registration successful", data: newOwner });
        } else {
            console.log("service does not exist!");
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const login = async (req, res) => {
    try {
        const enteredName = req.body.name;
        const enteredPass = req.body.password;
        console.log(enteredName)
        console.log(enteredPass)

        const blockOwner = await blockowner.find({name: enteredName})
        if(blockOwner)
        {
            return res.status(403).json({ message: "Blocked owner" });
            console.log("blocked ")
        }
        
        const user = await owner.findOne({ name: enteredName });
        console.log(user)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }



        const result =  bcrypt.compare(enteredPass, user.password);
        if (result) {
            return res.status(200).json({ message: "Login successfully", data: user });
            console.log("logined")
        } 
        else 
        {
            return res.status(401).json({ message: "Invalid password" });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};


export const updateOwner = async (req, res) => {
    try {
        const selectedOwner = await owner.findOne({ _id: req.query.owner });

        if (selectedOwner) {
            await owner.updateOne(
                { _id: req.query.owner },
                {
                    $set: {
                        name: req.body.name,
                        email: req.body.email,
                        restaurantName: req.body.restaurantname,
                        city: req.body.city,
                        address: req.body.address
                    }
                }
            );
            res.status(200).json({ message: "Owner details updated successfully" });
        } else {
            res.status(404).json({ message: "Owner not found" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const RestrauntImage = async (req, res) => {
    try {

        const selectedOwner = await owner.findOne({ _id: req.query.owner });

        upload.single('image')(req, res, async function (err) {
            if (err) {
                console.error("Error uploading file:", err);
                return res.status(400).json({ error: "Error uploading file" });
            }

            if(!req.file.path){
                res.status(400).json({ message: "Null Image" });
            }

            const result = await cloudinary.uploader.upload(req.file.path);
            const imageUrl = result.url;
             
            console.log(selectedOwner)
            console.log(imageUrl)
            if (selectedOwner) {
                await owner.updateOne(
                    { _id: req.query.owner },
                    {
                        $set: {
                            image: imageUrl 
                        }
                    }
                );
                res.status(200).json({ message: "Image updated successfully" });
            } else {
                res.status(404).json({ message: "Owner not found" });
            }
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
