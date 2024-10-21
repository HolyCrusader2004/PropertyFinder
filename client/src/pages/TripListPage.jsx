import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchTripList, queryClient } from "../util/queries";
import { useNavigate, useParams } from "react-router-dom";
import PropertyDisplay from "../components/PropertyDisplay";
import classes from '../components/PropertyDisplay.module.css'
import { motion } from 'framer-motion'
import { useState } from "react";
import Modal from "../components/Modal";
import { deleteBooking } from "../util/mutations";

export default function TripListPage() {
    const { userId } = useParams()
    const [startDelete, setStartDelete] = useState(false)
    const navigate = useNavigate()
    const [bookingInfo, setBookingInfo] = useState({
        propertyId: '',
        startDate: '',
        endDate: '',
        userId: ''
    })

    function handleStartDelete({ propertyId, startDate, endDate }) {
        setStartDelete(true)
        setBookingInfo({
            propertyId: propertyId,
            startDate: startDate,
            endDate: endDate,
            userId: userId
        })
    }

    function handleStopDelete() {
        setStartDelete(false)
    }
    const { data, error, isError, isLoading } = useQuery({
        queryKey: ['properties', 'tripList'],
        queryFn: ({ signal }) => fetchTripList({ signal: signal, id: userId }),
        staleTime: 5000
    })
    const { mutate, isError: deleteErr, error: deleteError } = useMutation({
        mutationFn: deleteBooking,
        onSuccess: () => {
            navigate('..')
            queryClient.invalidateQueries(['tripList'])
        }
    })

    function handleDelete() {
        mutate(bookingInfo)
    }

    return <>
        {startDelete && (
            <Modal onClose={handleStopDelete} isOpen={startDelete}>
                <h2 className={classes.modalHeader}>Are you sure?</h2>
                <p className={classes.modalBody}>
                    Do you really want to cancel this booking? This action cannot be undone. You can't cancel a booking that starts in three days
                </p>
                <div className={classes.modalActions}>
                    <motion.button className={classes.modalButton} onClick={handleStopDelete} style={{ width: '150px' }} whileHover={{ scale: 1.05 }}>
                        Cancel
                    </motion.button>
                    <motion.button className={classes.modalButton} style={{ width: '150px' }} whileHover={{ scale: 1.05 }} onClick={handleDelete}>
                        Remove booking
                    </motion.button>
                </div>
                {deleteErr ? <p className={classes.error_message}>{`*${deleteError.info?.message}*`}</p> : undefined}
            </Modal>
        )}
        {isError ? <p className={classes.error_message}>{`*${error.info?.message}*`}</p> : undefined}
        {isLoading ? <p>Fetching your properties... </p> : undefined}
        {!isLoading && !isError && (!data?.tripList || data?.tripList.length === 0) ? <h1>No properties in your trip list yet</h1> : undefined}
        {(data && data.tripList && data.tripList.length > 0) && (<>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>Your trip list</h1>
                <ul className={classes.property_list}>
                    {data.tripList.map((property, index) => {
                        const startDate = new Date(property.startDate)
                        const endDate = new Date(property.endDate)
                        const formattedStartDate = startDate.toLocaleDateString()
                        const formattedEndDate = endDate.toLocaleDateString()
                        const currentDate = new Date()
                        const isBookingCompleted = currentDate >= startDate
                        return <li key={index} style={{ boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
                            <PropertyDisplay property={property.propertyId} startDate={formattedStartDate} endDate={formattedEndDate} totalPrice={property.totalPrice} />
                            <motion.button whileHover={{ scale: 1.05 }} style={{ backgroundColor: isBookingCompleted ? 'green' : 'red', marginTop: '12px' }} onClick={() => { handleStartDelete({ propertyId: property.propertyId, endDate, startDate }) }} disabled={isBookingCompleted}>{isBookingCompleted ? "Completed" : "Cancel booking"}</motion.button>
                        </li>
                    })}
                </ul></div></>)
        }
    </>
}