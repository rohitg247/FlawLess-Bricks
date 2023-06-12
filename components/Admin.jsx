import React, { useEffect } from "react";
import PropertyForm from "../components/PropertyForm";
import { useSession } from 'next-auth/react';
import { useRouter } from "next/router";

const AdminPage = () => {

    const navigation = useRouter()
    const { data: session, status } = useSession()


    console.log(session)

    useEffect(() => {
        if (session?.user?.access === "user") {
            navigation.push("/403")
        }
    }, [session])
    if (session?.user?.access === "user" || status === "unauthenticated") {
        navigation.push("/403")
        return (
            <div>
                You dont have access to this page redirecting...
            </div>
        )
    }

    return (
        <div className="container">
            <div className="grid place-content-center min-h-screen">
                <div className="flex flex-col gap-4">
                    <h1 className="text-4xl">Admin Page</h1>
                    <PropertyForm />
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
