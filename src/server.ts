import express, {Request, Response} from "express"
const app = express()

app.get("/", (req: Request, res: Response)  => {
    res.send("Sugma")
})



app.listen(3000, ()=> {
    console.log(`listening on port 3k`)
})