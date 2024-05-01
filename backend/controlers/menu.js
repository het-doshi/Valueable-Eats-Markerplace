import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import dish from '../models/menu.js'
const upload = multer({ dest: 'uploads/' });
import mongoose from 'mongoose';

cloudinary.config({ 
    cloud_name: 'dfnn4ox7q', 
    api_key: '167924479915846', 
    api_secret: '6-c-WARoOjTIXT9W7ToKjLZxSV4' 
});



export const newItem = async (req, res) => {
    try {
        upload.single('image')(req, res, async function (err) {
            if (err) {
                console.error("Error uploading file:", err);
                return res.status(400).json({ error: "Error uploading file" });
            }

            const result = await cloudinary.uploader.upload(req.file.path);
            const imageUrl = result.url;
            const city = req.body.city;
            const collectionName = city + '_restaurants';

            // Dynamically create a Mongoose model for the collection
            const CollectionModel = mongoose.model(collectionName, dish.schema);

            await CollectionModel.create({
                owner: req.body.owner,
                city: req.body.city,
                restaurant: req.body.restaurant,
                rating: req.body.rating,
                address: req.body.address,
                cuisine: req.body.cuisine,
                menu: req.body.menu,
                item: req.body.item,
                price: req.body.price,
                image: imageUrl
            });

            res.status(200).json({ message: "Item added successfully" });
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const getItem = async (req, res) => {
    try {
        
        const owner = req.query.owner;
        const city = req.query.city;
        const collectionName = city + '_restaurants';
        const CollectionModel = mongoose.model(collectionName, dish.schema);

        const selectedItem = await CollectionModel.find({owner});

        const selectedItems = selectedItem.map(dish => {
            return {
                name: dish.item,
                cuisine: dish.cuisine,
                price: dish.price,
                menu: dish.menu,
                rating: dish.rating,
            };
        });
        res.json(selectedItems);
        res.status(200);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const updateItem = async (req, res) => {
    try {
        upload.single('image')(req, res, async function (err) {
            if (err) {
                console.error("Error uploading file:", err);
                return res.status(400).json({ error: "Error uploading file" });
            }

            const result = await cloudinary.uploader.upload(req.file.path);
            const imageUrl = result.url;

            const city = req.query.city;
            const collectionName = city + '_restaurants';

            // Dynamically create a Mongoose model for the collection
            const CollectionModel = mongoose.model(collectionName, dish.schema);

            const selectedItem = await CollectionModel.findOne({ item: req.query.item });

            if (selectedItem) {
                await CollectionModel.updateOne(
                    { item: req.query.item },
                    {
                        $set: {
                            owner: req.body.owner,
                            city: req.body.city,
                            restaurant: req.body.restaurant,
                            rating: req.body.rating,
                            address: req.body.address,
                            cuisine: req.body.cuisine,
                            menu: req.body.menu,
                            item: req.body.item,
                            price: req.body.price,
                            image: imageUrl
                        }
                    }
                );
                res.status(200).json({ message: "Item updated successfully" });
            } else {
                res.status(404).json({ message: "Item not found" });
            }
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteItem = async (req, res) => {
    try {

        const city = req.query.city;
        const collectionName = city + '_restaurants';
        const CollectionModel = mongoose.model(collectionName, dish.schema);

        const selectedItem = await CollectionModel.findOne({ item: req.query.item });
        
        if (selectedItem) {
            await CollectionModel.deleteOne({ item: req.query.item });
            res.status(200).json({ message: "Item deleted successfully" });
        } 
        else
        {
            res.status(404).json({ message: "Item not found" });
        }

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getfilterItems = async (req, res) => {
    try {

        const city = req.query.city;
        const collectionName = city + '_restaurants';
        const CollectionModel = mongoose.model(collectionName, dish.schema);

        const selectedItem = await CollectionModel.find({ owner: req.query.owner});
        const selectedItems = selectedItem.map(dish => ({
            name: dish.item,
            cuisine: dish.cuisine,
            price: dish.price,
            item: dish.item,
            image: dish.image
        }));
        res.status(200).json(selectedItems);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};