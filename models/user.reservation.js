const mongoose = require("mongoose");

const userReservationSchema = new mongoose.Schema(
    {
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
          },
        trainSeat: {
            type: Number,  
            required: true, 
            unique: true,
        },
        coach: {
            type: String,
            enum: ['business coach', 'economy coach']
        },
        your_destination_from_to: {
            type: String,
            required: true,
        },
        depature_date_and_time: {
            type: String,
            required: true,
        },

},
{
    collection: "user_reservation_info",
    timestamps: true,
    versionKey: false,
}
);

module.exports = mongoose.model('user_reservation', userReservationSchema);