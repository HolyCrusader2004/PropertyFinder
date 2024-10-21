import { useQuery } from "@tanstack/react-query";
import { fetchWishList } from "../util/queries";
import { useParams } from "react-router-dom";
import PropertyDisplay from "../components/PropertyDisplay";
import classes from '../components/PropertyDisplay.module.css'
import { useSelector } from "react-redux";

export default function WishListPage(){
    const {userEmail} = useParams()
   
    const {data, error, isError, isLoading} = useQuery({
        queryKey: ['properties', 'wishList'],
        queryFn: ({signal}) => fetchWishList({signal: signal, email:userEmail}),
        staleTime:5000
    })

    const { user } = useSelector((state) => state.user)
    console.log(user)

    return <>
    {isError ? <p className={classes.error_message}>{`*${error.info?.message}*`}</p>: undefined}
    {isLoading ? <p>Fetching your properties... </p>: undefined}
    {!isLoading && !isError && (!data?.wishList || data?.wishList.length === 0) ? <h1>No properties in your wish list yet</h1>: undefined}
    {(data && data.wishList && data.wishList.length > 0) && (<>
        <div style={{display:'flex', flexDirection:'column'}}>
        <h1 style={{textAlign:'center', marginBottom:'10px'}}>Your wish list</h1>
        <ul className={classes.property_list}>
        {data.wishList.map((property, index) => {
            return <li key={index} style={{boxSizing: 'border-box'}}>
             <PropertyDisplay property={property.propertyId}/>
         </li>
        })}
    </ul></div></>)
    }
    </>
}