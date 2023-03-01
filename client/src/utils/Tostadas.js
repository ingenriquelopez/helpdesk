import { toast } from 'react-toastify';

//tema = dark, light, colored
const tostada_I= (message, posy, delay, theme)=> {
    toast.info(message, {
     position: posy,
     autoClose: delay,
     hideProgressBar: false,
     closeOnClick: true,
     pauseOnHover: true,
     draggable: true,
     progress: undefined,
     theme: theme,
     }); 
}  

const tostada_S= (message, posy, delay, theme)=> {
    toast.success(message, {
     position: posy,
     autoClose: delay,
     hideProgressBar: false,
     closeOnClick: true,
     pauseOnHover: true,
     draggable: true,
     progress: undefined,
     theme: theme,
     }); 
}  

const tostada_E= (message, posy, delay, theme)=> {
    toast.error(message, {
     position: posy,
     autoClose: delay,
     hideProgressBar: false,
     closeOnClick: true,
     pauseOnHover: true,
     draggable: true,
     progress: undefined,
     theme: theme,
     }); 
}  
const tostada_W= (message,posy,delay, theme)=> {
    toast.warn(message, {
     position: posy,
     autoClose: delay,
     hideProgressBar: false,
     closeOnClick: true,
     pauseOnHover: true,
     draggable: true,
     progress: undefined,
     theme: theme,
     }); 
}  



export {
    tostada_S,
    tostada_I,
    tostada_E,
    tostada_W,

}