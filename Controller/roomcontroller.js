const roomBookingDetails = [{
    room_id: 1,
    room_name: "First Floor",
    booked_status: true,
    price_per_hour: 8000,
},
    {
    room_id: 2,
    room_name: "Second Floor",
    booked_status: true,
    price_per_hour: 7000,
    },
    {room_id: 1,
    room_name: "Ground Floor",
    booked_status: true,
    price_per_hour: 5500
    },
    {room_id: 1,
    room_name: "Third Floor",
    booked_status: true,
    price_for_1_hours: 3000}];

const customer = [{
    room_id: 1,
    customer_id: 1,
    name: "Veerakumar Venkatesan",
    date: "09/03/2024",
    start_time: "06:00:00 am",
    end_time: "01:00:00 pm",
},
{
    room_id: 2,
    customer_id: 2,
    name: "Priyanka Ravichandran",
    date: "22/04/2024",
    start_time: "09:30:00 am",
    end_time: "12:30:00 pm",
},
{
    room_id: 3,
    customer_id: 3,
    name: "Janani Ravichandran",
    date: "09/06/2024",
    start_time: "03:00:00 am",
    end_time: "10:00:00 pm"
},
{
    room_id: 4,
    customer_id: 4,
    name: "Syed Abilash",
    date: "05/05/2024",
    start_time: "10:00:00 am",
    end_time: "05:00:00 pm",
}
];

// Listing all rooms with booked data 
export const bookedRoomDetails = (req, res) => {
    let bookedRoom = [];
    for (let i = 0; i <= roomBookingDetails.length-1; i++){
        for (let j = 0; j <= customer.length-1; j++){
            if (roomBookingDetails[i].room_id === customer[j].room_id) {
                bookedRoom.push({
                    Customer: customer[j],
                    Room_name: roomBookingDetails[i].room_name,
                    Booking_Status: roomBookingDetails[i].booked_status,
                })
            }
        }
        if (roomBookingDetails[i].booked_status === false) {
            bookedRoom.push(roomBookingDetails[i]);
        }
    }
    res.status(200).send(bookedRoom);
}
    
// Lisiting all customer with Booked data

export const allCustomer = (req, res) => {
    let  bookedRoom = [];
    for (let i = 0; i < roomBookingDetails.length; i++){
        for (let j = 0; j < customer.length; j++){
            if (roomBookingDetails[i].room_id === customer[j].room_id) {
                bookedRoom.push({
                    CustomerDetails: customer[j].name,
                    Room_Name: roomBookingDetails[i].room_name,
                    Date: customer[j].date,
                    Start_Time: customer[j].start_time,
                    End_Time: customer[j].end_time,
                    booked_Status: roomBookingDetails[i].booked_status,
                });
            }
        }
    }
    res.status(200).send(bookedRoom);
}

// creating a room  // post call

export const createRoom = (req, res) => {
    const { room_id, room_name, booked_status } = req.body;
    const creatingRoom = {
        Room_id: roomBookingDetails.length + 1,
        Room_Name: room_name,
        Booking_Status: false
    }
    roomBookingDetails.push(creatingRoom);
    res.status(200).json({message:"Room added successfully", data:creatingRoom})
}

// Deleting the rooms

export const deleteRoomById = (req, res) => {
    const roomId = req.params.id;
    const index = roomBookingDetails.findIndex(hall => hall.id == roomId)
    if (index === -1) {
        return res.status(404).json({message:"Room Not Found"})
    }
    roomBookingDetails.splice(index,1)
    res.status(200).json({message:"Deleted Successfully"})
}

//

export const BookingRooms = (req, res) => {
  try {
    const { id } = req.params;
    const Room_id = +id;
    const index = findIndex(roomBookingDetails, id);
    const temp = { ...roomBookingDetails[index] };
    temp.booked_status = true;

    if (index !== -1 && roomBookingDetails[index].booked_status == false) {
      roomBookingDetails.splice(index, 1, temp); 
      const id = customer.length ? customer[customer.length - 1].customer_id + 1 : 1;
      const newCustomer = {
        Customer_id: id,
        name,
        date,
        start_time,
        end_time,
        room_id: Room_id,
      };
      customer.push(newCustomer); 
      res.status(200).send({
        message: "Room Booking Successful",
      });
    } else if (roomBookingDetails[index].booked_status == true) {
      res.status(500).send({
        message: "This Room is already booking",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};