import SignupForm from "../components/signup-form";

export default function SignupPage({ setToken }) {
    return (
        <div>
            <SignupForm setToken={setToken} />
        </div>
    );
}
