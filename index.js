const express = require('express');

const app  = express();
let rooms=[  
    {
        id: 1,
        roomName: "101",
        noOfSeatsAvailable: 35,
        amenities: ["Air-Conditioning","Wifi"],
        pricePerHr: 150
    },
    {
        id: 2,
        roomName: "102",
        noOfSeatsAvailable: 50,
        amenities: ["Air-Conditioning","Wifi","Food"],
        pricePerHr: 200
    },
    {
        id: 3,
        roomName: "103",
        noOfSeatsAvailable: 150,
        amenities: ["Air-Conditioning","Wifi","Food","Elevator"],
        pricePerHr: 1000
    }
];
let roomsDet=[
    {
        customerName:"customer1",
        date:"20-09-2022",
        startTime:"09:00AM",
        endTime:"06:00PM",
        roomName:"101",
        bookedStatus:true
    },
    {
        customerName:"",
        date:"",
        startTime:"",
        endTime:"",
        roomName:"102",
        bookedStatus:false
    },
    {
        customerName:"customer10",
        date:"22-09-2022",
        startTime:"05:00AM",
        endTime:"12:00AM",
        roomName:"103",
        bookedStatus:true
    }
];

app.use(express.json());

//1 creating a room
app.post("/create-room",function(req,res){
    req.body.id = rooms.length + 1
    rooms.push(req.body);
    res.json({
        message:"Room Created"
    })
})

//2 booking a room
app.post("/book-room",function(req,res){
    const chk = req.body
    
    roomsDet.map((rooms)=>{
        if(rooms.id == chk.id){
            if(rooms.date != chk.date && rooms.startTime!=chk.startTime){
                rooms.customerName = chk.customerName;
                rooms.date = chk.date;
                rooms.startTime = chk.startTime;
                rooms.endTime = chk.endTime;
                rooms.bookedStatus = !rooms.bookedStatus;
                res.json({message:"Room booked"})
            }
            //Incase Not Available
            else{
                res.json({message:"This room is already booked."});
            }
        }
        return rooms
    })
})

//3 all rooms with booked data
app.get("/allrooms",function(req,res){
    res.json(
        roomsDet.map((rooms)=>{
            if(rooms.bookedStatus == true){
                return{
                    "Room Name":rooms.roomName,
                    "Booked Status":"Booked",
                    "Customer Name":rooms.customerName,
                    "Date":rooms.date,
                    "Start time":rooms.startTime,
                    "End time":rooms.endTime
                }
            }else{
                return{
                    "Room Name":rooms.roomName,
                    "Booked Status":"Available"
                }
            }
        })
    )
})

// 4 Get all Customers with booking Rooms 
app.get("/allcustomers",function(req,res){
    res.json(
        roomsDet.filter((rooms)=>{
            if(rooms.bookedStatus == true){
                return rooms
            }
        })
        .map((det)=>{
            return{  
                "Customer Name":det.customerName,
                "Room Name":det.roomName,
                "Date":det.date,
                "Start time":det.startTime,
                "End time":det.endTime
            }
        })
    )
})

app.listen(process.env.PORT||3001);
