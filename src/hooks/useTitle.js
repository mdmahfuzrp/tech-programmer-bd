import { useEffect } from "react"

const useTitle = title =>{
    useEffect(()=>{
        document.title = `TPBD - ${title}`;
    },[title])
}

export default useTitle;