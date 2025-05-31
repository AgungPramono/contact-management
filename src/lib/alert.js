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

export const alertConfirm = async (message) => {
    const result = await swal.fire({
        icon:'question',
        title:'Confirm',
        text:message,
        showCancelButton:true,
        confirmButtonText:'Yes',
        cancelButtonText:'No',
        confirmButtonColor:'#d33',
        cancelButtonColor:'#3085d6'
    })

    return result.isConfirmed;
}