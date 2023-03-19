import axios from 'axios';
import { toast } from 'react-toastify';
import { normalizeRouteRegex } from 'next/dist/lib/load-custom-routes';
import { useState, useContext, useEffect } from 'react';
import Link from "next/link";
import { SyncOutlined } from '@ant-design/icons';
import { Context } from '../context/indexContext';
import { useRouter } from "next/router";
const Login = () => {
    // const [name, setName] = useState('Arin');
    const [email, setEmail] = useState('arin@gmail.com');
    const [password, setPassword] = useState('eeeeeee');
    const [loading, setloading] = useState(false);
    //state
    const { state, dispatch } = useContext(Context);
    // console.log("State", state);

    //router
    const router = useRouter();
    const { user } = state;
    useEffect(() => {
        if (user !== null) {
            router.push("/")
        }
    }, [user])


    const handelSubmit = async (e) => {
        // console.log({ name, email, password });
        e.preventDefault();
        try {
            setloading(true);
            const sent = await axios.post(`${process.env.NEXT_PUBLIC_API}/login`,
                { email, password })
            toast.success(`Logged in Succesfully`);
            setloading(false);

            //dispatch

            await dispatch({
                type: "Login",
                payload: sent.data
            })
            //save in local storage
            window.localStorage.setItem("user", JSON.stringify(sent.data));
        }

        catch (err) {
            console.log(err);
            toast.error(err.response.data);
            setloading(false);
        }

    }


    return (
        <>
            <h1 className='jumbotron jumbotron-fluid text-center bg-warning square'>I am login</h1>
            <div className="column col-md-4 offset-md-4 pb-5">
                <form onSubmit={handelSubmit}>
                    {/* Email */}
                    <span className="form-title">Email</span>
                    <input type="email" className="form-control p-4 mb-4" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} required>
                    </input>

                    {/* Password */}
                    <span className="form-title">Password</span>
                    <input type="password" className="form-control p-4 mb-4" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} required>
                    </input>

                    <button type='submit' className="btn btn-block btn-primary"
                        disabled={!password || !email || loading} >{loading ? <SyncOutlined spin ></SyncOutlined> : "Submit"}</button>
                    <p className="text-center p-3">Not  registered ?
                        <Link href="/register"><a>Try Register</a></Link>
                    </p>

                </form>
            </div>
        </>
    )

}
export default Login;