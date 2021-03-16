import express from 'express';
import cors from 'cors'
import products from './routes/productsRoutes.js';
import orders from './routes/ordersRoutes.js';
import cart from './routes/cartRoutes.js';
import './db/db.js';

const app = express();
const PORT = process.env.PORT || 9800;

//parse data for post call
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors());

app.get('/health', (req,res) => {
  res.send("Health OK!!")
})

app.use('/products', products);
app.use('/orders', orders);
app.use('/cart', cart);

app.get("*", (req, res) => {
  res.send("You've tried reaching a route that doesn't exist.")
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})