import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient()

export async function fetchProperties({ signal, categories }) {
    const params = new URLSearchParams({ categories: categories.join(',') });
    console.log(params)

    const response = await fetch(`http://localhost:3010/property/getProperties?${params}`, {
        method: 'GET',
        signal: signal,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    
    if (!response.ok) {
        const error = new Error('An error occurred while fetching');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }
    
    const result = await response.json();
    return result.properties;
}

export async function fetchDetails({id, signal}){
    const response = await fetch(`http://localhost:3010/property/${id}`, {
        method: 'GET',
        signal: signal,
    });
    if (!response.ok) {
        const error = new Error('An error occurred while fetching property details');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }
    
    const result = await response.json();
    return result.property;
}

export async function fetchTripList({id, signal}) {
    console.log(id)
    const response = await fetch(`http://localhost:3010/user/${id}`, {
        method: 'GET',
        signal: signal,
    })
    if (!response.ok) {
        const error = new Error('An error occurred while fetching tripList')
        error.code = response.status
        error.info = await response.json()
        throw error
    }
    
    const result = await response.json()
    // console.log(result.tripList)
    return result
}

export async function fetchReservationList({id, signal}) {
    console.log(id)
    const response = await fetch(`http://localhost:3010/user/reservationList/${id}`, {
        method: 'GET',
        signal: signal,
    })
    if (!response.ok) {
        const error = new Error('An error occurred while fetching tripList')
        error.code = response.status
        error.info = await response.json()
        throw error
    }
    
    const result = await response.json()
    // console.log(result.tripList)
    return result
}

export async function fetchPropertyList({email, signal}) {
    const response = await fetch(`http://localhost:3010/property/propertyList/${email}`, {
        method: 'GET',
        signal: signal,
    })
    if (!response.ok) {
        const error = new Error('An error occurred while fetching tripList')
        error.code = response.status
        error.info = await response.json()
        throw error
    }
    
    const result = await response.json()
    // console.log(result.tripList)
    return result.properties
}

export async function fetchWishList({email, signal}) {
    const response = await fetch(`http://localhost:3010/user/wishList/${email}`, {
        method: 'GET',
        signal: signal,
    })
    if (!response.ok) {
        const error = new Error('An error occurred while fetching tripList')
        error.code = response.status
        error.info = await response.json()
        throw error
    }
    
    const result = await response.json()
    // console.log(result.tripList)
    return result
}

export async function fetchSearchList({signal, searchParam}){
    const response = await fetch(`http://localhost:3010/property/search/${searchParam}`, {
        method: 'GET',
        signal: signal,
    })
    if (!response.ok) {
        const error = new Error('An error occurred while fetching tripList')
        error.code = response.status
        error.info = await response.json()
        throw error
    }
    
    const result = await response.json()
    // console.log(result.tripList)
    return result.properties
}
