import { ChangeEvent, useState } from "react";

const useMessage = ()=> {
    const [message, setMessage] = useState <string>("");

    const handleMessage = (e: ChangeEvent<any>) => {
        setMessage(e.target.value)
    }
   return {message, handleMessage, setMessage}
}


export default useMessage