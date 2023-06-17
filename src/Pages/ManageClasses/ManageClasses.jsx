import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import PendingClasses from "./PendingClasses";
import Swal from "sweetalert2";
import ApproveClasses from "./ApproveClasses";
import DenyClasses from "./DenyClasses";
import useDashboardTitle from "../../hooks/useDashboardTitle";

const ManageClasses = () => {
    
    // Website Title
    useDashboardTitle('Manage Classes')

    const [pendingClasses, setPendingClasses] = useState([]);
    const [approvedClasses, setApprovedClasses] = useState([]);
    const [denyClasses, setDenyClasses] = useState([]);
    const { data: classes = [], refetch, isLoading } = useQuery(['classes'], async () => {
        const res = await fetch('https://tech-programmer-bd-server.vercel.app/classes');
        return res.json();
    })
    useEffect(() => {
        const allPendingClasses = classes.filter(c => c.status === 'pending');

        if (JSON.stringify(allPendingClasses) !== JSON.stringify(pendingClasses)) {
            setPendingClasses(allPendingClasses);
        }
    }, [classes, pendingClasses]);
    useEffect(() => {
        const allApprovedClasses = classes.filter(c => c.status === 'Approve');

        if (JSON.stringify(allApprovedClasses) !== JSON.stringify(approvedClasses)) {
            setApprovedClasses(allApprovedClasses);
        }
    }, [classes, approvedClasses]);



    useEffect(() => {
        const allDenyClasses = classes.filter(c => c.status === 'Deny');

        if (JSON.stringify(allDenyClasses) !== JSON.stringify(denyClasses)) {
            setDenyClasses(allDenyClasses);
        }
    }, [classes, denyClasses]);

    console.log('approved', approvedClasses);


    const handleApproveClass = (c) => {
        fetch(`https://tech-programmer-bd-server.vercel.app/classes/approve/${c._id}`, {
            method: 'PATCH',
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        title: 'Successful',
                        text: `Class Approved Successful`,
                        icon: 'success',
                        confirmButtonText: 'Done'
                    })
                }
            })
    }

    // TODO: FEEDBACK NOT UPDATE
    const handleDenyClass = (id, feedback) => {
        console.log(feedback);
        fetch(`https://tech-programmer-bd-server.vercel.app/classes/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(feedback)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        title: 'Class Decline Successful',
                        text: `Your feedback is submit now`,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                }
            })
    }

    return (
        <div>
            <div>
                <PendingClasses handleDenyClass={handleDenyClass} handleApproveClass={handleApproveClass} pendingClasses={pendingClasses} isLoading={isLoading}></PendingClasses>
                <ApproveClasses approvedClasses={approvedClasses} isLoading={isLoading}></ApproveClasses>
                <DenyClasses denyClasses={denyClasses} isLoading={isLoading}></DenyClasses>
            </div>
        </div>
    );
};

export default ManageClasses;