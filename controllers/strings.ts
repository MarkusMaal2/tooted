import { Request, Response, Router } from "express";
import {randomInt} from "crypto";

const router: Router = Router();

router.get("/hello-world", (req: Request, res: Response) => {
    res.send("Hello world at " + new Date())
});

router.get("/hello-world:nimi", (req: Request, res: Response) => {
    res.send("Hello, " + req.params.nimi)
});

router.get("/add/:nr1/:nr2", (req: Request, res: Response) => {
    res.send(req.params.nr1 + req.params.nr2)
});

router.get("/multiply/:nr1/:nr2", (req: Request, res: Response) => {
    res.send((parseInt(req.params.nr1) * parseInt(req.params.nr2)).toString())
});

router.get("/random/:nr1/:nr2", (req: Request, res: Response) => {
    let i1: number = parseInt(req.params.nr1)
    let i2: number = parseInt(req.params.nr2)
    if (i2 < i1) {
        const mem: number = i1
        i1 = i2
        i2 = mem
    }
    const randInt: number = Math.floor(Math.random() * (i2 - i1)) + i1
    res.send(randInt.toString())
});

router.get("/age/:year", (req: Request, res: Response) => {
    const bYear: number = parseInt(req.params.year)
    const cYear: number = new Date().getFullYear()
    const age: number = cYear - bYear
    res.send("You are either " + (age - 1).toString() + " or " + age.toString() + " years old, depending on if you've had your birthday already")
})

router.get("/do-logs/:arv", (req: Request, res: Response) => {
    for (let index = 0; index < Number(req.params.arv); index++) {
        console.log("See on logi nr " + index);
    }
    res.send();
});

export default router;