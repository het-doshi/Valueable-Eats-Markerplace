import express from "express";
import dotenv from "dotenv";
import connectdb from "./database/connect.js";
import cors from 'cors'

dotenv.config();
const app = express();
const port = 4000;

//middleware
app.use(express.json());
app.use(cors());

//controllers
import {register, login, updateOwner, RestrauntImage} from './controlers/restaurant.js'
import {newItem ,getItem, deleteItem, updateItem, getfilterItems} from './controlers/menu.js'
import{getOrder} from './controlers/order.js'
import{salesEntry, getsalesEntry} from './controlers/sales.js'
import {PaymentEntry, getPaymentsEntry} from './controlers/payment.js'

// Connect to the database
connectdb(process.env.MongoUrl)
  .then(() => {
    app.listen(port, () => {
      console.log(`Backend server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err + " not connected");
});

//owner routes
app.post("/api/register", register);
app.post("/api/login", login);
app.put("/api/owner", updateOwner);
app.put("/api/owner/picture", RestrauntImage)


//menu routes
app.post('/api/menu', newItem);
app.get('/api/menu', getItem);
app.get('/api/menu/filter',getfilterItems );
app.put('/api/menu', updateItem);
app.delete('/api/menu', deleteItem);

//order routes
app.get('/api/orders',getOrder);

//sales routes
app.post('/api/sales',salesEntry);
app.get('/api/sales',getsalesEntry);

// payment routes
app.post('/api/payments',PaymentEntry);
app.get('/api/payments',getPaymentsEntry);