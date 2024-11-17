import './login.css'
//import { useNavigate } from "react-router-dom";
import FormInput from '../../components/formInput/FormInput';
import { useState } from "react";
import axios from 'axios';

const Login = ()=>{

    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState(null);

    //const navigate = useNavigate();

    const fields = [
        {
            id:'email',
            label:'Email',
            type: 'email',
            func:setEmail,
            value:email
        },
        {
            id:'password',
            label:'Password',
            type: 'password',
            func:setPassword,
            value:password
        },
    ]

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/auth/login',{
            email,password
        }).then(()=>{
            setEmail('');
            setPassword('')
        }).catch((err)=>{
            setError(err);
        })
    };

    return (
        <div className="login-cnt">
            <form
                className="login"
                onSubmit={handleSubmit}
            >
                <h3>Login</h3>
                {fields.map((field=>(
                    <FormInput key={field.id} {...field} />
                )))}
                <button className='login-btn' type='submit'>Login</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    )
}

export default Login;