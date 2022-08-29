const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
    {
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin"
          },
        trainSeats: {
            type: String,  
            required: true, 
        },
        coach: {
            type: String,
            enum: ['business coach', 'economy coach']
        },
        bookingPeriod: {
            type: String,
            required: true,
        },
        train_destination_from_to: {
            type: String,
            required: true,
        }

},
{
    collection: "reservation_info",
    timestamps: true,
    versionKey: false,
}
);

module.exports = mongoose.model('Reservation', reservationSchema);