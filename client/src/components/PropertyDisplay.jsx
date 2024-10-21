import { useState } from "react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import classes from './PropertyDisplay.module.css';
import {motion} from 'framer-motion'
import {useNavigate} from 'react-router-dom'
import { BsHeartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { deleteWishlist, insertWishlist } from "../util/mutations";
import { queryClient } from "../util/queries";
import { deleteFavorite, insertFavorite } from "../redux/userSlice";

export default function PropertyDisplay({ property, startDate, endDate, totalPrice , clientEmail}) {
    const [currImage, setCurrImage] = useState(0);
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    
    function handleNext() {
        setCurrImage((prevState) => (prevState + 1) % property.imagePaths.length);
    }

    function handlePrev() {
        setCurrImage((prevState) => (prevState - 1 + property.imagePaths.length) % property.imagePaths.length);
    }

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

    function handleFavoriteChange(){
        const wishListPropertyIds = user.wishList.map((wishItem) => wishItem.propertyId)
        const isFavorite = wishListPropertyIds.includes(property._id)
        if (isFavorite) {
            deleteWishList({ propertyId: property._id, email: user.email })
            dispatch(deleteFavorite({ propertyId: property._id }))
        } else {
            insertWishList({ propertyId: property._id, email: user.email })
            dispatch(insertFavorite({ propertyId: property._id }))
        }
    }
    
    return (
        <motion.div className={classes.container} whileHover={{scale:1.05}} >
            <div className={classes.image_container}>
                    {property.imagePaths.map((image, index) => (
                     <img src={`http://localhost:3010/${image.replace('public', '')}`} alt={`place ${index + 1}`} key={index} className={classes.image} style={{ opacity: index === currImage ? 1 : 0 }} />
                    ))}
                <div onClick={handlePrev} className={classes.arrow_left}>
                    <MdArrowBackIosNew style={{ fontSize: '15px' }} />
                </div>
                <div onClick={handleNext} className={classes.arrow_right}>
                    <MdArrowForwardIos style={{ fontSize: '15px' }} />
                </div>
               {user && property.userEmail !== user.email && <div className={classes.heart}>
                    <BsHeartFill style={{ color: user.wishList.some((wishItem) => wishItem.propertyId === property._id) ? 'red': 'white' , fontSize:'15px'}} onClick={handleFavoriteChange} />
                </div>}
            </div>
            <div onClick={() => navigate(`/properties/${property._id}`)} style={{cursor:'pointer'}}>
            <h3>{property.title}</h3>
            <p>{property.city}, {property.province}, {property.country}</p>
            <p><strong>{property.category}</strong></p>
            <p>{property.type}</p>
            {startDate ? <>
            <p>{startDate} - {endDate}</p>
            <span>${totalPrice}</span>
            </>
            :<p><span>$ {property.price}</span> - per night</p>}
            {clientEmail ? <p>client - <strong>{clientEmail}</strong></p>: undefined}
            </div>      
        </motion.div>
    );
}
