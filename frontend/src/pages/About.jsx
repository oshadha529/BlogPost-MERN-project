import { Link } from "react-router-dom"

export function About() {
    return (
        <div>
            <h1>About Us</h1>
            <p>This blog platform is built to share ideas, experiences, and knowledge through meaningful content.</p>
            <p>It encourages writers, learners, and creators to express their thoughts in a simple and engaging way.</p>
            <p>The goal is to create a space where diverse perspectives and stories can be explored and appreciated.</p>
            <p>If you are interested in writing a blog, kindly visit <Link to="/createblog">Create Blog</Link> to get started.</p>
        </div>
    )
}