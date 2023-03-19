import 'dotenv/config'
import './database/connectDb.js'
import  express  from "express";
import authrouter from "./routes/auth.route.js"

const app = express()

app.use(express.json());
app.use("/api/v1/auth", authrouter);

app.get("/", (req,res)=>{
    res.send("hola mundo");
})

const PORT = process.env.PORT || 9000
app.listen(PORT, ()=> console.log("✔server is ON port 9000 "+"http://localhost:9000"))