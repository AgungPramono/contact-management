export const createAddress =async (token,id,{street,city,province,country,postalCode}) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/contacts/${id}/addresses`, {
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