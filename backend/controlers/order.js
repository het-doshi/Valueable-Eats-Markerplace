import order from '../models/order.js'

export const getOrder = async (req, res) => {
    try {
        const owner = req.query.owner;

        // Await the result of the find query
        const selectedOrder = await order.find({'cart.owner': owner});

        // Map the selected orders to the desired format
        const selectedOrders = selectedOrder.map(order => ({
            user_id: order.user_id,
            order_date: formatDate(order.order_date),
            total_amount: order.total_amount,
            items: order.cart.map(item => ({
                Itemname: item.Itemname,
                Price: item.price,
                quantity: item.quantity
            }))
        }));


        res.status(200).json(selectedOrders);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Helper function to format date as dd/mm/yyyy
function formatDate(date) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-GB', options);
}
