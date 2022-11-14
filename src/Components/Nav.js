import { useState } from "react";
import { Link } from "react-router-dom";
import { getFromLs, removeFromLS } from "../Service/ls";


function Nav(props) {
    return (
        <div>
            {
                props.auth ?
                    <>
                        <p>Welcome {getFromLs('user')?.username}</p>
                        <Link to="/add">Add Home</Link>
                        <br />
                        <p onClick={() => {
                            props.setAuth(false);
                            removeFromLS('user');
                        }}>
                            Exit
                        </p>
                    </>
                    :
                    <>
                        <Link to="/register">register</Link>
                        <br />
                        <Link to="/signin">login</Link>
                    </>
            }
        </div>
    )
}

export default Nav;