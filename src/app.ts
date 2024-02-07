import express from 'express';
import productsRoute from './routes/products.route';
import ordersRoute from './routes/orders.route';

const app = express();

app.use(express.json());

app.get('/health', (req, res) => res.sendStatus(200));
app.use('/products', productsRoute);
app.use('/orders', ordersRoute);

export default app;