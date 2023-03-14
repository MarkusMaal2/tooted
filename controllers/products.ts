import { Request, Response, Router } from "express";
import Toode from '../models/Toode';

const router: Router = Router();

let toode: Toode | null = new Toode(1, "Koola", 1.5, true);

router.get("/", (req: Request, res: Response) =>  {
    res.send(toode)
});

router.get("/kustuta-toode", (req: Request, res: Response) =>  {
    toode = null;
    res.send(toode)
});

router.get("/kustuta-toode2", (req: Request, res: Response) =>  {
    toode = null;
    res.send("Edukalt kustutatud");
});

router.get("/suurenda-hinda", (req: Request, res: Response) =>  {
    if (toode !== null) {
        toode.price = toode.price + 1;
    }
    res.send(toode);
});

router.get("/notaktiivne", (req: Request, res: Response) => {
    toode?.invactive()
    res.send(toode)
});

router.get("/nimetaymber/:newName", (req: Request, res: Response) => {
    if (toode !== null) {
        toode.name = req.params.newName
    }
    res.send(toode)
})

export default router;