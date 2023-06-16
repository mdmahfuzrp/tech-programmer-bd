import { useEffect, useState } from "react"

const useSelectedClass = () =>{
    const [selectedClass, setSelectedClass] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/selectedClass')
        .then(res => res.json())
        .then(data => {
            setSelectedClass(data);
        })
    },[])
    return selectedClass();
}

export default useSelectedClass;