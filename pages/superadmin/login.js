import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);
    const router = useRouter();



    function login() {
       
            const item = { email, password };

            axios.post("http://127.0.0.1:8000/api/login", item)
                .then(function (response) {
                    localStorage.setItem("user-info", JSON.stringify(response.data));
                    router.push("/admin");
                })

                .catch((error) => {
                    console.log(error);
                    setMessage(error.response.data.message);
                });
        }
       

    useEffect(() => {
        if (localStorage.getItem("user-info")) {
            router.push("/admin");
        }
    }, []);
    return (
        <>
            <div className="col-sm-6 offset-sm-3">
                <h1 className="text-center">Super Admin Login</h1>
                {message && <div class="alert alert-primary" role="alert">
                    {message}
                </div>}
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Enter your Email" /><br />
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Enter your password" />
                <br />
                <button onClick={login} className="btn btn-success">Login</button>
            </div>
        </>
    )
}

export default Login;