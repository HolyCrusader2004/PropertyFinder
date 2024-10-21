
export async function registerUser(userData){
  
    const response = await fetch('http://localhost:3010/auth/register',{
        method: 'POST',
        body: userData
    })

    if (!response.ok) {
        const error = new Error('An error occurred while registering');
        error.code = response.status;
        error.info = await response.json();
        throw error;
      }
    
    const result = await response.json();
    return result;
}

export async function loginUser(userData){
    //console.log(userData)
    const response = await fetch('http://localhost:3010/auth/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })  
    if (!response.ok) {
        const error = new Error('An error occurred while logging in');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }
    const data = await response.json()
    return data;
}

export async function insertProperty(propertyData) {
    const formattedData = new FormData();

    for (const [key, value] of Object.entries(propertyData)) {
        if (key !== 'propertyImages') {
            formattedData.append(key, value);
        }
    }
    propertyData.propertyImages.forEach((image) => {
        formattedData.append('propertyImages', image);
    });

    const response = await fetch('http://localhost:3010/property/create',{
        method: 'POST',
        body: formattedData
    })

    if (!response.ok) {
        const error = new Error('An error occurred while registering');
        error.code = response.status;
        error.info = await response.json();
        throw error;
      }
    
    const result = await response.json();
    return result;
}

export async function insertBooking(data){
    const response = await fetch('http://localhost:3010/user/createBooking',{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })  
    if (!response.ok) {
        const error = new Error('An error occurred while logging in');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }
    const result = await response.json()
    return result;
}

export async function insertWishlist(data){
    const response = await fetch('http://localhost:3010/user/insertWishList',{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })  
    if (!response.ok) {
        const error = new Error('An error occurred while logging in');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }
    const result = await response.json()
    return result;
}

export async function deleteWishlist(data){
    const response = await fetch('http://localhost:3010/user/deleteWishList',{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })  
    if (!response.ok) {
        const error = new Error('An error occurred while logging in');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }
    const result = await response.json()
    return result;
}

export async function deleteProperty({propertyId}){
    const response = await fetch(`http://localhost:3010/property/deleteProperty/${propertyId}`,{
        method: 'DELETE'
    })  
    if (!response.ok) {
        const error = new Error('An error occurred while logging in');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }
    const result = await response.json()
    return result;
}

export async function updateProperty({propertyData, propertyId}) {
    const formattedData = new FormData();

    for (const [key, value] of Object.entries(propertyData)) {
        if (key !== 'propertyImages') {
            formattedData.append(key, value);
        }
    }
    propertyData.propertyImages.forEach((image) => {
        formattedData.append('propertyImages', image);
    });
    // console.log(propertyData)
    const response = await fetch(`http://localhost:3010/property/edit/${propertyId}`,{
        method: 'PATCH',
        body: formattedData
    })

    if (!response.ok) {
        const error = new Error('An error occurred while registering');
        error.code = response.status;
        error.info = await response.json();
        throw error;
      }
    
    const result = await response.json();
    return result;
}

export async function deleteBooking(bookingInfo) {
    const response = await fetch(`http://localhost:3010/user/cancelBooking`, {
        method: 'PATCH',
        body: JSON.stringify(bookingInfo),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        const error = new Error('An error occurred while registering');
        error.code = response.status;
        error.info = await response.json();
        throw error;
    }

    const result = await response.json();
    return result;
}
