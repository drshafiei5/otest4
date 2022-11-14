import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { registerUser } from "../Service/api"
import { createOrUpdateLS } from "../Service/ls";

function Signup(props) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: ''
    })

    async function handleSubmit(e) {
        e.preventDefault()
        const res = await registerUser(formData);
        createOrUpdateLS('user', { ...res.data.user, accessToken: res.data.accessToken });


        if (res.data?.accessToken?.length > 0) {
            props.setAuth(true);
            navigate('/');
        }
    }

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <h1>Signup Form</h1>
            <form className='login-form' onSubmit={e => handleSubmit(e)}>
                <input type='text' placeholder='Username' value={formData.username} name='username' onChange={e => handleChange(e)} ></input>
                <input type='text' placeholder='Email' value={formData.email} name='email' onChange={e => handleChange(e)} ></input>
                <input type='text' placeholder='Password' value={formData.password} name='password' onChange={e => handleChange(e)} ></input>
                <button className='login-btn' type='submit'>Sign Up</button>
            </form>
        </div>
    )
}

export default Signup