import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import { productManager } from './helpers/productManager.js';

const app = express()
const port = (process.env.STATUS === 'production' ? 
                process.env.PROD_PORT :
                process.env.DEV_PORT) || 8080;

app.get('/', (req, res) => {
    res.status(200).send('Hola Mundo!');
})

app.get('/products', async (req, res) => {
    const { limit } = req.query;
    
    let products = await productManager.getProducts();
    if(limit) products = products.slice(0, parseInt(limit));
    
    res.status(200).send(products);
})


app.get('/products/:pid', async (req, res) => {
    const { pid } = req.params;
    let product;
    
    if(parseInt(pid)) product = await productManager.getProductById(parseInt(pid));

    res.status(200).send(product);
})


app.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
})