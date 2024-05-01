import payment from "../models/payment.js";

export const PaymentEntry = async (req, res) => {
    try {
            const newEntry = await payment.create({
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

export const getPaymentsEntry = async (req, res) => {
    try {
        
        const selectedItem = await payment.find({ owner: req.query.owner});
        const selectedItems = selectedItem.map(paymententry => ({
            name: paymententry.name,
            date: formatDate(paymententry.date), 
            price: paymententry.price,
            quantity: paymententry.quantity, 
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