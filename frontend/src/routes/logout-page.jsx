import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

export default function LogoutPage({logout}) {
    const navigate = useNavigate();

    useEffect(() => {
        const logoutUser = async () => {
            try {
                const response = await fetch("http://localhost:3000/users/logout", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error("Logout request failed");
                }
                localStorage.removeItem('token');
                localStorage.removeItem("userId")
                logout();
                navigate("/");
            } catch (error) {
                console.error("Error logging out:", error.message);
            }
        };

        logoutUser();
    }, [navigate]);

    return (
        <div>
            <p>Logging out...</p>
        </div>
    );
}
