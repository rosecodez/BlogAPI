import BlogDetail from "../components/blog-detail";

export default function BlogDetailPage({ isAuthenticated }) {
    return (
        <div>
            <BlogDetail isAuthenticated= { isAuthenticated }/>
        </div>
    );
}
