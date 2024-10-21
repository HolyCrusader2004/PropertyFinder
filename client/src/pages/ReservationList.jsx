import { useQuery } from "@tanstack/react-query";
import { fetchReservationList } from "../util/queries";
import { useParams } from "react-router-dom";
import PropertyDisplay from "../components/PropertyDisplay";
import classes from '../components/PropertyDisplay.module.css'

export default function ReservationList(){
    const {userId} = useParams()
   
    const {data, error, isError, isLoading} = useQuery({
        queryKey: ['properties', 'reservationList'],
        queryFn: ({signal}) => fetchReservationList({signal: signal, id:userId}),
        staleTime:5000
    })
    console.log(data)

    return <>
    {isError ? <p className={classes.error_message}>{`*${error.info?.message}*`}</p>: undefined}
    {isLoading ? <p>Fetching your properties... </p>: undefined}
    {!isLoading && !isError && (!data?.reservationList || data?.reservationList.length === 0) ? <h1>No properties in your reservation list yet</h1>: undefined}
    {(data && data.reservationList && data.reservationList.length > 0) && (<>
        <div style={{display:'flex', flexDirection:'column'}}>
        <h1 style={{textAlign:'center', marginBottom:'10px'}}>Your reservation list</h1>
        <ul className={classes.property_list}>
        {data.reservationList.map((property, index) => {
            const startDate = new Date(property.startDate)
            const endDate = new Date(property.endDate)
            const formattedStartDate = startDate.toLocaleDateString()
            const formattedEndDate = endDate.toLocaleDateString()
            return <li key={index} style={{boxSizing: 'border-box'}}>
             <PropertyDisplay property={property.propertyId} startDate = {formattedStartDate} endDate = {formattedEndDate} totalPrice = {property.totalPrice} clientEmail={property.customerEmail}/>
         </li>
        })}
    </ul></div></>)
    }
    </>
}