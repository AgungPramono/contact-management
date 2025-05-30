import swal from "sweetalert2";

export const alertSuccess = async (message) => {
    return swal.fire({
        icon:'success',
        title:'Success',
        text:message
    })
}

export const alertError = async (message) => {
    return swal.fire({
        icon:'error',
        title:'Ups',
        text:message
    })
}