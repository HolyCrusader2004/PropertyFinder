import { useQuery } from "@tanstack/react-query";
import { fetchPropertyList } from "../util/queries";
import { useParams } from "react-router-dom";
import PropertyDisplay from "../components/PropertyDisplay";
import classes from '../components/PropertyDisplay.module.css'

export default function TripListPage(){
    const {userEmail} = useParams()
   
    const {data, error, isError, isLoading} = useQuery({
        queryKey: ['properties', 'propertyList'],
        queryFn: ({signal}) => fetchPropertyList({signal: signal, email:userEmail}),
        staleTime:5000
    })
    console.log(data)

    return <>
    {isError ? <p className={classes.error_message}>{`*${error.info?.message}*`}</p>: undefined}
    {isLoading ? <p>Fetching your properties... </p>: undefined}
    {!isLoading && !isError && (data.length === 0) ? <h1>There are no properties that you've registered yet</h1>: undefined}
    {(data && data.length > 0) && (<>
        <div style={{display:'flex', flexDirection:'column'}}>
        <h1 style={{textAlign:'center', marginBottom:'10px'}}>Your properties list</h1>
        <ul className={classes.property_list}>
        {data.map((property) => {
            return <li key={property.title} style={{boxSizing: 'border-box'}}>
             <PropertyDisplay property={property}/>
         </li>
        })}
    </ul></div></>)
    }
    </>
}