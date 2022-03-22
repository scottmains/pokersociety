import {Link} from "react-router-dom";

function Navbar () {
    return (

        <nav>
            <Link to={"/"}>
                <h1> Poker Society</h1>
            </Link>

        </nav>

    );
}

export default Navbar;