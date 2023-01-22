import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../utils/authContext"

const Protected = ({ children }) => {
    const { admin } = useAuth()
    const router = useRouter();

    useEffect(() => {

        if (!admin) {
            console.log('You are not logged in')
            router.push('/login')
            return;
        }
    }, [admin, router.push])

    return <>
        {admin ? children : null}
    </>
};

export default Protected;