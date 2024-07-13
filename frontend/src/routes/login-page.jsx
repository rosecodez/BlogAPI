import LoginForm from "../components/login-form";

export default function LoginPage( { setToken }) {
    return (
        <div>
            <SignupForm setToken={setToken}/>
        </div>
    );
}
