import { getPost } from "../api"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

export function ReadBlog() {
    const [post, setPost] = useState({})

    //Params let grab the post id from URL
    let params = useParams()
    let id = params.id

    useEffect(() => {
        async function loadPost() {
            let data = await getPost(id)
            let date = new Date(data.dateCreated)
            data.dateCreated = date.toString()

            setPost(data)
        }
        loadPost()
    }, [])

    return (
        <>
            <h1>{post.title}</h1>
            <h2>{post.description}</h2>
            <h3>{post.dateCreated?.slice(4, 15)}</h3>
            <p>{post.content}</p>
        </>
    )
}