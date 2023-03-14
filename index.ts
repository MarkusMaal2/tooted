import express, { Express, Request, Response } from "express";
import stringsController from "./controllers/strings";
import productController from "./controllers/products";
import productsListController from "./controllers/productlist";

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.use('/', stringsController);
app.use('/', productsListController);
app.use('/toode', productController);

app.listen(3000,() => {
    console.log(`[server]: Server is running at http://localhost:3000`);
});