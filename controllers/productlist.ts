import { Request, Response, Router } from "express";
import Toode from "../models/Toode"

const router: Router = Router();

const tooted: Toode[] = [
    new Toode(1,"Koola", 1.5, true),
    new Toode(2,"Fanta", 1.0, false),
    new Toode(3,"Sprite", 1.7, true),
    new Toode(4,"Vichy", 2.0, true),
    new Toode(5,"Vitamin well", 2.5, true)
]

router.get("/tooted", (req: Request, res: Response) => {
    res.send(tooted)
})

router.delete("/kustuta-toode/:index", (req: Request, res: Response) => {
    if (/^[0-9]+$/.test(req.params.index)) {
        tooted.splice(Number(req.params.index), 1)
    }
    res.send(tooted)
})

router.delete("/kustuta-toode-2/:index", (req: Request, res: Response) => {
    if (/^[0-9]+$/.test(req.params.index)) {
        tooted.splice(Number(req.params.index), 1)
        res.send("Toode kustutatud")
    } else {
        res.send("Toote kustutamiseks tuleb sisestada number")
    }
})

router.post("/lisa-toode/", (req: Request, res: Response) => {
    if (/^[0-9]+$/.test(req.body.id) && /^[0-9]+$/.test(req.body.hind)) {
        tooted.push(
            new Toode(
                Number(req.body.id),
                req.body.nimi,
                Number(req.body.hind),
                req.body.aktiivne === true)
        )
    }
    res.send(tooted)
})

router.patch("/hind-dollaritesse/:kurss", (req: Request, res: Response) => {
    if (/^[0-9]+.[0-9]+$/.test(req.params.kurss)) {
        for (let index = 0; index < tooted.length; index++) {
            tooted[index].price = tooted[index].price * Number(req.params.kurss);
        }
    }
    res.send(tooted)
});

router.delete("/kustuta-koik", (req: Request, res: Response) => {
    tooted.splice(0, tooted.length)
    res.send(tooted)
})

router.patch("/deaktiveeri", (req: Request, res: Response) => {
    tooted.forEach((toode) => {
        toode.isActive = false
    })
    res.send(tooted)
})
router.get("/annatoode/:nr", (req: Request, res: Response) => {
    if (/^[0-9]+$/.test(req.params.nr)) {
        let valitudToode: Toode | null = null
        tooted.forEach((toode) => {
            if (toode.id == parseInt(req.params.nr)) {
                valitudToode = toode
            }
        })
        res.send(valitudToode)
    } else {
        res.send(null)
    }
})

router.get("/kallistoode", (req: Request, res:Response) => {
    let kalleimToode: Toode | null = null
    tooted.forEach((toode) => {
        if ((kalleimToode === null) || (kalleimToode.price < toode.price)) {
            kalleimToode = toode
        }
    })
    res.send(kalleimToode)
})

export default router;