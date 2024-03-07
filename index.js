import express from 'express';
import cors from 'cors';
import apiRouter from './Router/routerroom.js'
const app = express()
const PORT = 4000;

app.use(cors());
 app.use(express.json());
 app.use('/api', apiRouter)

app.get('/', (req, res) => {
    res.status(200).send(`<div><h1 style="background-color:Lawngreen; text-align: center; width:100%; height:50px; padding:15px;" >Node Js Task Hall-Booking with CURD Operations</h1>
    <br>
   <li> Get all Rooms with the endPoint /api/roomapi </li> <br>
   <li> Listing all rooms with booked data  with the endPoint /api/customer</li> <br>
   <li> By using POST call create a room with the endPoint /create</li> <br>
   <li> Deleting the rooms  with the endPoint /delete/:id</li> <br>
   <li> By using PUT call booking new hall  with the endPoint /put/:id</li> <br>
    </div>`)
})

app.listen(PORT, () => {
    console.log(`App is working in the port ${PORT}`);
})