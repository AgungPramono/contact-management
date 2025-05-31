export const createAddress = async (token, id, {street, city, province, country, postalCode}) => {
    return fetch(`${import.meta.env.VITE_API_PATH}/contacts/${id}/addresses`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-API-TOKEN': token
        },
        body: JSON.stringify({
            street,
            city,
            province,
            country,
            postalCode
        })
    })
}

export const updateAddress = async (token, contactId,addressId ,{street, city, province, country, postalCode}) => {
    return fetch(`${import.meta.env.VITE_API_PATH}/contacts/${contactId}/addresses/${addressId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-API-TOKEN': token
        },
        body: JSON.stringify({
            street,
            city,
            province,
            country,
            postalCode
        })
    })
}

export const addressList = async (token, id) => {
    return fetch(`${import.meta.env.VITE_API_PATH}/contacts/${id}/addresses`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-API-TOKEN': token
        }
    })
}

export const getAddress = async (token, contactId,addressId) => {
    return fetch(`${import.meta.env.VITE_API_PATH}/contacts/${contactId}/addresses/${addressId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-API-TOKEN': token
        }
    })
}