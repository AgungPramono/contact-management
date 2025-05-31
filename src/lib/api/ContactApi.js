export const ContactCreate = async (token,{firstName,lastName,email,phone})=>{
    return await fetch(`${import.meta.env.VITE_API_PATH}/contacts`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Accept':'application/json',
            'X-API-TOKEN':token
        },
        body:JSON.stringify({
            firstName,
            lastName,
            email,
            phone
        })
    })
}