import './signup.css'
//import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FormInput from '../../components/formInput/FormInput';
import axios from 'axios';

const Signup = ()=>{

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [phone, setPhone] = useState("");
    const [password,setPassword] = useState("");
    const [role,setRole] = useState("student");
    const [dateOfBirth,setDateOfBirth] = useState(Date.now());
    const [town,setTown] = useState('warsaw');
    
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
            id:'name',
            label:'Name',
            type: 'text',
            func:setName,
            value:name
        },
        {
            id:'lastname',
            label:'Lastname',
            type: 'text',
            func:setLastname,
            value:lastname
        },
        {
            id:'phone',
            label:'Phone number',
            type: 'text',
            func:setPhone,
            value:phone
        },
        {
            id:'password',
            label:'Password',
            type: 'password',
            func:setPassword,
            value:password
        },
        {
            id:'DOB',
            label:'Date of birth',
            type: 'date',
            func:setDateOfBirth,
            value:dateOfBirth
        },
        {
            id:'role',
            label:'Role',
            type: 'select',
            func:setRole,
            value:role,
            options:['student','trainer','admin']
        },
        {
            id:'town',
            label:'Town',
            type: 'select',
            func:setTown,
            value:town,
            options:['warsaw','france']
        },
    ]

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/auth/signup',{
            email,name,lastname,phone,password,
            DOB:dateOfBirth,role,town
        }).then(()=>{
            setEmail('');
            setName('');
            setLastname('');
            setPhone('');
            setPassword('');
            setDateOfBirth(Date.now());
            setRole('student');
            setTown('warsaw');
        }).catch((err)=>{
            setError(err);
        })
    };

    

    return (
        <div className="sign-cnt">
            <form
                className="signup"
                onSubmit={handleSubmit}
            >
                <h3>Register</h3>
                {fields.map((field=>(
                    <FormInput key={field.id} {...field} />
                )))}
                <button className='sign-btn' type='submit'>Register</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    )
}

export default Signup;