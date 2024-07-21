import Profile from "../components/profile";

export default function ProfilePage({ isAuthor }) {
    return (
        <div>
            <Profile isAuthor={isAuthor} />
        </div>
    );
}
