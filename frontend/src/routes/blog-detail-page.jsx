import React from "react";
import BlogDetail from "../components/blog-detail";

export default function BlogDetailPage({ isAuthenticated, isAuthor }) {
    return (
        <div>
            <BlogDetail isAuthenticated={isAuthenticated} isAuthor={isAuthor} />
        </div>
    );
}
