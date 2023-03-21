import {Request, Response, Router} from "express";
import axios from "axios";

const router: Router = Router();

router.get("/nord-pool-price", async (req: Request, res: Response) => {
    const response = await axios.get(
        "https://dashboard.elering.ee/api/nps/price"
    )
    res.json(response.data)
});

export default router;