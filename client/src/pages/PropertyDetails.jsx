import { useMutation, useQuery } from "@tanstack/react-query"
import { fetchDetails, queryClient } from "../util/queries"
import { useNavigate, useParams } from "react-router-dom"
import { facilities } from "../assets/data"
import { useState } from "react"
import classes from './PropertyDetails.module.css'
import { useDispatch, useSelector } from "react-redux"
import { ArrowBack } from "@mui/icons-material"
import { BsHeartFill } from "react-icons/bs"
import { motion } from 'framer-motion'
import CalendarComponent from "../components/Calendar"
import { itemVariants, listVariants } from "../components/CategoryAndTypes"
import Modal from "../components/Modal"
import {deleteWishlist, insertBooking, insertWishlist, deleteProperty} from '../util/mutations'
import { deleteFavorite, insertFavorite } from "../redux/userSlice"

export default function PropertyDetails() {
    const { propertyId } = useParams()
    const { user } = useSelector((state) => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // console.log(user)

    const { data, isLoading, error, isError } = useQuery({
        queryKey: ['properties', propertyId],
        queryFn: ({ signal }) => fetchDetails({ signal: signal, id: propertyId }),
        staleTime: 5000
    })

    const {mutate, isPending, error:booking_error, isError: isBookingErr} = useMutation({
        mutationFn: insertBooking,
        onSuccess:() => {
            queryClient.invalidateQueries({queryKey: ['tripList']})
            navigate('..')
        }
    })

    const {mutate:insertWishList} = useMutation({
        mutationFn: insertWishlist,
        onSuccess:() => {
            queryClient.invalidateQueries({queryKey: ['wishList']})
        }
    })

    const {mutate:deleteWishList} = useMutation({
        mutationFn: deleteWishlist,
        onSuccess:() => {
            queryClient.invalidateQueries({queryKey: ['wishList']})
        }
    })

    const {mutate:deletePropertyFunc, isError:deleteErr, error:deleteError} = useMutation({
        mutationFn: deleteProperty,
        onSuccess:() => {
            queryClient.invalidateQueries({queryKey: ['properties']})
            navigate('..')
        }
    })

    function handleFavoriteChange(){
        const wishListPropertyIds = user.wishList.map((wishItem) => wishItem.propertyId);
        const isFavorite = wishListPropertyIds.includes(propertyId); 
        if (isFavorite) {
            deleteWishList({ propertyId: propertyId, email: user.email });
            dispatch(deleteFavorite({ propertyId: propertyId }));  
        } else {
            insertWishList({ propertyId: propertyId, email: user.email });
            dispatch(insertFavorite({ propertyId: propertyId })); 
        }
    }

    const [dateRange, setDateRange] = useState([new Date(), new Date()])
    function handleDateChange(date) {
        if (date.length === 2) {
            setDateRange(date);
        }
    }
    const [startDelete, setStartDelete] = useState(false)
    function handleStartDelete() {
        setStartDelete(true)
    }

    function handleStopDelete() {
        setStartDelete(false)
    }

    function handleSubmitBooking(){
        mutate({
            customerEmail: user.email,
            ownerEmail: data.userEmail,
            startDate: dateRange[0],
            endDate: dateRange[1],
            totalPrice: data.price * (Math.round((dateRange[1] - dateRange[0]) / (1000 * 60 * 60 * 24))),
            propertyId: data._id
        })
    }

    function handleDelete(){
        deletePropertyFunc({propertyId: propertyId})
    }

    function handleEdit(){
        navigate(`/properties/edit/${propertyId}`)
    }

    return <div className={classes.container}>
        {startDelete && (
            <Modal onClose={handleStopDelete} isOpen={startDelete}>
                <h2 className={classes.modalHeader}>Are you sure?</h2>
                <p className={classes.modalBody}>
                    Do you really want to delete this property? This action cannot be undone.
                </p>
                <div className={classes.modalActions}>
                    <motion.button className={classes.modalButton} onClick={handleStopDelete} style={{width: '150px'}} whileHover={{scale:1.05}}>
                        Cancel
                    </motion.button>
                    <motion.button className={classes.modalButton} style={{width:'150px'}} whileHover={{scale:1.05}} onClick={handleDelete}>
                        Delete
                    </motion.button>
                </div>
                {deleteErr ? <p className={classes.error_message}>{`*${deleteError.info?.message}*`}</p> : undefined}
            </Modal>
        )}

        {isError ? <p className={classes.error_message}>{`*${error.info?.message}*`}</p> : undefined}
        {isLoading ? <p>Fetching your properties... </p> : undefined}
        {data &&
            <>
                <div className={classes.action_buttons}>
                    <ArrowBack sx={{ color: 'white', backgroundColor: 'black', borderRadius: '50%' }} onClick={() => { navigate('..') }} />
                    {user && user.email !== data.userEmail && <BsHeartFill style={{ color:  user.wishList.some((wishItem) => wishItem.propertyId === propertyId) ? 'red': 'gray' }} onClick={handleFavoriteChange} />}
                </div>
                <div className={classes.title}>
                    <h1>{data.title} in {data.city}, {data.country}</h1>
                </div>
                <div className={classes.images}>
                    {data.imagePaths.map((image, index) => (
                        <motion.img key={index} src={`http://localhost:3010/${image.replace('public', '')}`} alt="propertyPictures" whileHover={{ scale: 1.1 }} />
                    ))}
                </div>
                <hr />
                <h2 className={classes.h2_details}>{data.type}</h2>
                <p>{data.guests} guests | {data.beds} {data.beds > 1 ? 'beds' : 'bed'} |  {data.rooms} {data.rooms > 1 ? 'rooms' : 'room'} |  {data.bathrooms} {data.bathrooms > 1 ? 'bathrooms' : 'bathroom'} </p>
                <hr />
                <h3 className={classes.h3_details}>Description</h3>
                <p>{data.description}</p>
                <hr />
                <h3 className={classes.h3_details}>{data.highlight}</h3>
                <p>{data.highlightDesc}</p>
                <hr />
                <h2 className={classes.h2_details}>This place is owned by {data.userEmail}</h2>
                <hr />
                <div className={classes.facility_list}>
                    <h1>What this place offers</h1>
                    <motion.ul variants={listVariants} initial={'hidden'} whileInView={'visible'}>
                        {data.amenities[0].split(',').map((amenity, index) => (
                            <motion.li key={index} variants={itemVariants}>
                                {facilities.find((facility) => facility.name === amenity)?.icon}
                                {amenity}
                            </motion.li>
                        ))}
                    </motion.ul>
                </div>
                {!user && <p>You need to login before booking this place</p>}
                {(user && user.email !== data.userEmail) &&
                    <>
                        <div className={classes.calendar}>
                            <h1>Choose your stay period</h1>
                            <CalendarComponent handleDateChange={handleDateChange} dateRange={dateRange} price={data.price} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' ,flexDirection:'column'}}>
                            <motion.button disabled={isPending} onClick={handleSubmitBooking} style={{ width: '150px', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }} whileHover={{ scale: 1.05 }}>{isPending ? 'Submitiing...': 'Book'}</motion.button>
                            {isBookingErr ? <p className={classes.error_message}>{`*${booking_error.info?.message}*`}</p> : undefined}
                        </div>
                    </>
                }
                {user && user.email === data.userEmail &&
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
                        <motion.button style={{ width: '150px', margin: '20px' }} whileHover={{ scale: 1.05 }} onClick={handleEdit}>Edit</motion.button>
                        <motion.button style={{ width: '150px' }} whileHover={{ scale: 1.05 }} onClick={handleStartDelete}>Delete</motion.button>
                    </div>
                }
            </>
        }
    </div>
} 