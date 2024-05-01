import sales from "../models/sales.js";

export const salesEntry = async (req, res) => {
    try {
            const newEntry = await sales.create({
                owner : req.query.owner,
                name: req.body.name,
                date: req.body.date, 
                price: req.body.price,
                quantity: req.body.quantity, 
            }) 
            res.status(200).json(newEntry)   
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getsalesEntry = async (req, res) => {
    try {
        
        const selectedItem = await sales.find({ owner: req.query.owner});
        const selectedItems = selectedItem.map(oederentry => ({
            name: oederentry.name,
            date: formatDate(oederentry.date), 
            price: oederentry.price,
            quantity: oederentry.quantity, 
        }));
        res.status(200).json(selectedItems);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

function formatDate(date) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-GB', options);
}