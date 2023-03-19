import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Context } from "../../context/indexContext";



const UserIndex = () => {

    const { state: { user } } = useContext(Context);


    const [hidden, setHidden] = useState(false);
    const CurrentUser = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/currentUser`);

            console.log(data);

            setHidden(true);
        }
        catch (err) {
            console.error(err);
            setHidden(true);
        }
    }

    useEffect(() => {
        CurrentUser();

    }, [])
    return (
        <>
            {hidden &&
                <h1 className="jumbotron jumbotron-fluid text-center square">
                    <pre> {JSON.stringify(user)}</pre>
                </h1>}
        </>

    )
}

export default UserIndex; 