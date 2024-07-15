import LoginForm from "../components/login-form";

export default function LoginPage( { setToken }) {
    return (
        <div>
            <LoginForm setToken={setToken}/>
        </div>
    );
}
