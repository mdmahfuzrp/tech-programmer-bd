import { useEffect } from "react"

const useDashboardTitle = title =>{
    useEffect(()=>{
        document.title = `Dashboard - ${title}`;
    },[title])
}

export default useDashboardTitle;