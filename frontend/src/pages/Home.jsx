import { getPosts } from "../api"
import { useState, useEffect } from "react"
import { BlogCart } from "../components/BlogCard"

export function Home() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        async function loadAllPosts() {
            const data = await getPosts()
            data.sort((d1, d2) => new Date(d2.dateCreated).getTime() - new Date(d1.dateCreated).getTime())
            setPosts(data)
        }
        loadAllPosts()
    }, [])

    return (
        <div className="posts">
            <>
                {posts.map((post) => {
                    return (
                        <BlogCart post={post}/>
                    )
                })}
            </>
        </div>
    )
}