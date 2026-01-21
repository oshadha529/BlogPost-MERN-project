import { Link, useNavigate } from "react-router-dom"
import { pageData } from "./pageData"

export function Navbar() {

    const navigate = useNavigate()

    function handleLogout() {
        const confirm = window.confirm("Are you sure you want to Log Out?")
        if(confirm) {
            sessionStorage.removeItem("User")
            navigate("/")
        }
    }


    return (
        <div className="navbar">
            {pageData.map((page) => {
                return (
                    <Link key={page.path} to={page.path} className="navItem">
                        <button>
                            {page.name}
                        </button>
                    </Link>
                )
            })}
            <button onClick={handleLogout}>Log Out</button>
        </div>
    )
}