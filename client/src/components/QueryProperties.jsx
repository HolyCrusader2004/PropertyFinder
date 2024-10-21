
import { fetchProperties } from "../util/queries";
import PropertyDisplay from "./PropertyDisplay";
import {useQuery} from '@tanstack/react-query'
import classes from './PropertyDisplay.module.css'

export default function QueryProperties({queries}){
    const {data, isError, isLoading, error} = useQuery({
        queryKey: ['properties', queries],
        queryFn: ({signal}) => fetchProperties({signal, categories: queries}),
        staleTime: 5000
    })
    return <>
    {isError ? <p className={classes.error_message}>{`*${error.info?.message}*`}</p>: undefined}
    {isLoading ? <p>Fetching your properties... </p>: undefined}
    {!isLoading && !isError && (!data || data.length === 0) ? <h1>No properties of such type yet</h1>: undefined}
    {(data && data.length > 0) && (<>
        <div style={{display:'flex', flexDirection:'column'}}>
        <h1 style={{textAlign:'center', marginBottom:'10px'}}>Properties that match your filters</h1>
        <ul className={classes.property_list}>
        {data.map((property) => (
         <li key={property.title} style={{boxSizing: 'border-box'}}>
             <PropertyDisplay property={property} />
         </li>
        ))}
    </ul></div></>)
    }
    </>
}