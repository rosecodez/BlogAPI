import BlogComments from "../components/new-blog";

export default function BlogCommentsPage({ isAuthenticated }) {
    return (
        <div>
            <BlogComments isAuthenticated={isAuthenticated} />
        </div>
    );
}
