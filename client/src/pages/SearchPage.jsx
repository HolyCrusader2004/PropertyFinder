import { useQuery } from "@tanstack/react-query";
import { fetchSearchList } from "../util/queries";
import { useParams } from "react-router-dom";
import PropertyDisplay from "../components/PropertyDisplay";
import classes from '../components/PropertyDisplay.module.css'

export default function SearchPage(){
    const {searchParam} = useParams()
   
    const {data, error, isError, isLoading} = useQuery({
        queryKey: ['properties', searchParam],
        queryFn: ({signal}) => fetchSearchList({signal: signal, searchParam:searchParam}),
        staleTime:5000
    })

    return <>
    {isError ? <p className={classes.error_message}>{`*${error.info?.message}*`}</p>: undefined}
    {isLoading ? <p>Fetching your properties... </p>: undefined}
    {!isLoading && !isError && (!data || data.length === 0) ? <h1>No properties match your search: <strong>{searchParam}</strong></h1>: undefined}
    {(data && data && data.length > 0) && (<>
        <div style={{display:'flex', flexDirection:'column'}}>
        <h1 style={{textAlign:'center', marginBottom:'10px'}}>Properties that match your search</h1>
        <ul className={classes.property_list}>
        {data.map((property, index) => {
            return <li key={index} style={{boxSizing: 'border-box'}}>
             <PropertyDisplay property={property}/>
         </li>
        })}
    </ul></div></>)
    }
    </>
}