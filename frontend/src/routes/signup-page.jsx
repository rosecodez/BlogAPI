import React from 'react';
import SignupForm from "../components/signup-form";

export default function SignupPage( isAuthenticated={isAuthenticated}) {
    return (
        <div>
            <SignupForm isAuthenticated={isAuthenticated}/>
        </div>
    );
}
