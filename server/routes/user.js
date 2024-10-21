const router = require('express').Router();
const User = require('../models/user');
const mongoose = require('mongoose')

router.patch('/createBooking', async (req, res) => {
    try {
        const { customerEmail, ownerEmail, startDate, endDate, propertyId, totalPrice } = req.body
        const start = new Date(startDate)
        const end = new Date(endDate)
        const user = await User.findOne({ email: customerEmail })
        const owner = await User.findOne({ email: ownerEmail })

        if (!user || !owner) {
            return res.status(400).json({ message: 'User or owner not found' })
        }

        const isBooked = owner.reservationList.some((trip) => {
            const tripStart = new Date(trip.startDate)
            const tripEnd = new Date(trip.endDate)
            return trip.propertyId.toString() === propertyId.toString() && 
                (
                    (tripStart.getTime() <= start.getTime() && start.getTime() <= tripEnd.getTime()) || 
                    (tripStart.getTime() <= end.getTime() && end.getTime() <= tripEnd.getTime())
                )
            })

        if (isBooked) {
            return res.status(400).json({ message: 'Place is already booked' })
        }
        user.tripList.push({ propertyId, startDate: start, endDate: end, totalPrice, ownerEmail })
        owner.reservationList.push({ propertyId, startDate: start, endDate: end, totalPrice, customerEmail })
        await user.save()
        await owner.save()
        res.status(200).json({ message: 'Booking inserted successfully' })
    } catch (err) {
        res.status(500).json({ message: 'Booking failed', error: err.message })
    }
});

router.patch('/insertWishList', async (req, res) => {
    try {
        const { propertyId ,email} = req.body
        
        const user = await User.findOne({ email: email })

        if (!user) {
            return res.status(400).json({ message: 'User not found' })
        }

        user.wishList.push({ propertyId })
       
        await user.save()
        res.status(200).json({ message: 'WishList changed successfully' })
    } catch (err) {

        res.status(500).json({ message: 'Wish failed', error: err.message })
    }
});

router.patch('/deleteWishList', async (req, res) => {
    try {
        const { propertyId ,email} = req.body
        
        const user = await User.findOne({ email: email })

        if (!user) {
            return res.status(400).json({ message: 'User not found' })
        }
        const objectIdPropertyId = new mongoose.Types.ObjectId(propertyId);
        user.wishList = user.wishList.filter((property) => 
            !property.propertyId.equals(objectIdPropertyId)
        );

        await user.save()
        res.status(200).json({ message: 'WishList changed successfully' })
    } catch (err) {
        res.status(500).json({ message: 'Wish failed', error: err.message })
    }
});


router.get('/:userId', async (req, res) => {
    try {   
        const userId = req.params.userId
        //console.log(userId)
        const user = await User.findById(userId).populate({
            path: 'tripList.propertyId',
            model: 'Property'            
        });
        //console.log(user)
        res.status(200).json({message: 'TripList retrieved successfully', tripList:user.tripList })

    } catch (err) {
        res.status(500).json({ message: 'Fetching trip list failed', error: err.message })
    }
})


router.get('/reservationList/:userId', async (req, res) => {
    try {   
        const userId = req.params.userId
        //console.log(userId)
        const user = await User.findById(userId).populate({
            path: 'reservationList.propertyId',
            model: 'Property'            
        });
        //console.log(user)
        res.status(200).json({message: 'Reservation list retrieved successfully', reservationList:user.reservationList })

    } catch (err) {
        res.status(500).json({ message: 'Fetching reservation list failed', error: err.message })
    }
})

router.get('/wishList/:userEmail', async (req, res) => {
    const userEmail = req.params.userEmail

    try{
        const user = await User.findOne({email: userEmail}).populate({
            path: 'wishList.propertyId',
            model: 'Property'            
        });
        //console.log(user)
        
        res.status(200).json({message: 'Wish list retrieved successfully', wishList:user.wishList })
    } catch (err) {
        res.status(400).json({ message: 'User properties acquisition failed', error: err.message });
    }
})

router.patch('/cancelBooking', async (req, res) => {
    // console.log('Request received:', req.body);
    const { propertyId, userId, startDate, endDate } = req.body;
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    try {
        const user = await User.findById(userId);
        const booking = user.tripList.find((booking) => {
            return (
                new Date(booking.startDate).getTime() === parsedStartDate.getTime() &&
                new Date(booking.endDate).getTime() === parsedEndDate.getTime() &&
                booking.propertyId._id.equals(propertyId._id)
            );
        });

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        const currentDate = new Date();
        if (parsedStartDate.getTime() - currentDate.getTime() < 1000 * 60 * 60 * 24 * 3) {
            return res.status(400).json({ message: 'The booking is less than three days from now' });
        }

        user.tripList = user.tripList.filter((b) => 
            new Date(b.startDate).getTime() !== parsedStartDate.getTime() || 
            new Date(b.endDate).getTime() !== parsedEndDate.getTime()
        );
        
        await user.save();
        return res.status(200).json({ message: 'Booking removed successfully' });
    } catch (err) {
        return res.status(400).json({ message: 'Booking cancellation failed', error: err.message });
    }
});

module.exports = router;
