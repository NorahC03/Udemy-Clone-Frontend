import axios from 'axios';
import { toast } from 'react-toastify';
import { normalizeRouteRegex } from 'next/dist/lib/load-custom-routes';
import { useState, useEffect, useContext } from 'react';
import Link from "next/link";
import { SyncOutlined } from '@ant-design/icons';
import { Context } from '../context/indexContext';
import { useRouter } from "next/router";
const register = () => {
    const [name, setName] = useState('Arin');
    const [email, setEmail] = useState('arin@gmail.com');
    const [password, setPassword] = useState('eeeeeee');
    const [loading, setloading] = useState(false);

    //Global state
    const { state, dispatch } = useContext(Context);
    const { user } = state;
    const router = useRouter();
    useEffect(() => {
        if (user !== null) {
            router.push("/")
        }
    })

    const handelSubmit = async (e) => {
        // console.log({ name, email, password });
        e.preventDefault();
        try {
            setloading(true);
            const sent = await axios.post(`${process.env.NEXT_PUBLIC_API}/register`,
                { name, email, password })
            toast.success(`Successfully registered`);
            setloading(false);
        }
        catch (err) {
            toast.error(err.response.data);
            setloading(false);
        }

    }


    return (
        <>
            <h1 className='jumbotron jumbotron-fluid text-center bg-warning square'>I am Registered</h1>

            <div className="column col-md-4 offset-md-4 pb-5">
                <form onSubmit={handelSubmit}>
                    {/* Name */}
                    <span className="form-title">Name</span>
                    <input type="text" className="form-control p-4 mb-4" placeholder="Enter Name" value={name} onChange={e => setName(e.target.value)} required>
                    </input>
                    {/* Email */}
                    <span className="form-title">Email</span>
                    <input type="email" className="form-control p-4 mb-4" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} required>
                    </input>

                    {/* Password */}
                    <span className="form-title">Password</span>
                    <input type="password" className="form-control p-4 mb-4" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} required>
                    </input>



                    <button type='submit' className="btn btn-block btn-primary"
                        disabled={!name || !password || !email || loading} >{loading ? <SyncOutlined spin ></SyncOutlined> : "Submit"}</button>
                    <p className="text-center p-3">Already registered ?
                        <Link href="/login"><a>Try Login</a></Link>
                    </p>

                </form>
            </div>
        </>
    )

}
export default register;