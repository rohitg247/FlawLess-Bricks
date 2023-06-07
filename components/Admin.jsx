import React from "react";
import { signOut } from "next-auth/react";
import PropertyForm from "../components/PropertyForm";

const AdminPage = () => {
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
