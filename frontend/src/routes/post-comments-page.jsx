import NewBlog from "../components/new-blog";

export default function BlogCommentsPage({ isAuthenticated }) {
    return (
        <div>
            <NewBlog isAuthenticated={isAuthenticated} />
        </div>
    );
}
