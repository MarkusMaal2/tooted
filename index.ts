import express, { Express, Request, Response } from "express";
import cors from 'cors'
import stringsController from "./controllers/strings";
import productController from "./controllers/products";
import productsListController from "./controllers/productlist";
import parcelMachinesController from "./controllers/parcelmachines";
import eleringController from "./controllers/elering"
import bodyParser from "body-parser";

const app: Express = express();

app.use(cors({
    origin: ['http://localhost:3006'],
    methods: `GET, PATCH, POST, DELETE`
}))

app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.use('/', stringsController);
app.use('/', productsListController);
app.use('/', parcelMachinesController);
app.use('/', eleringController)
app.use('/toode', productController);

app.listen(3000,() => {
    console.log(`[server]: Server is running at http://localhost:3000`);
});