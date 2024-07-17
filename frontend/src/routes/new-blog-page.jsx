import NewBlog from "../components/new-blog";

export default function NewBlogPage({ isAuthenticated }) {
    return (
        <div>
            <NewBlog isAuthenticated={isAuthenticated} />
        </div>
    );
}
