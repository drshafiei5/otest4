import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Service/api";
import { createOrUpdateLS } from "../Service/ls";


function SignIn(props) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    async function handleSubmit(e) {
        e.preventDefault()
        const res = await loginUser(formData);
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
            <h1>SignIn Form</h1>
            <form className='SignIn-form' onSubmit={e => handleSubmit(e)}>
                <input type='text' placeholder='Email' value={formData.email} name='email' onChange={e => handleChange(e)} ></input>
                <input type='text' placeholder='Password' value={formData.password} name='password' onChange={e => handleChange(e)} ></input>
                <button className='SignIn-btn' type='submit'>SignIn</button>
            </form>
        </div>
    )
}

export default SignIn;