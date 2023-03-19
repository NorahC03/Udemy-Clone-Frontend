import { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const InitialState = {
    user: null,
}

const Context = createContext();

//root reducer
const rootReducer = (state, action) => {

    switch (action.type) {
        case "Login": return { ...state, user: action.payload }
        case "Logout": return { ...state, user: null }
        default: return state
    }
}

//Context provider

const Provider = ({ children }) => {

    const [state, dispatch] = useReducer(rootReducer, InitialState)
    useEffect(() => {
        dispatch({
            type: "Login",
            payload: JSON.parse(window.localStorage.getItem("user"))
        })
    }, [])

    console.log(state);
    const router = useRouter();



    axios.interceptors.response.use(
        function (response) {
            return response;
        },
        function (error) {
            let res = error.response;
            if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
                return new Promise((resolve, reject) => {
                    axios.get(`${process.env.NEXT_PUBLIC_API}/logout`)
                        .then((data) => {
                            //empty the storage and context object
                            dispatch({ type: "logout", })
                            window.localStorage.removeItem("user");
                            router.push("/login")

                        })
                        .catch(err => {
                            console.error("Axios Interceptor could not proceed", err);
                        })
                })
            }
            return Promise.reject(error);
        }


    )


    useEffect(() => {
        const getCsrfToken = async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/csrf-token`)
            console.log(data);
            axios.defaults.headers["X-CSRF-Token"] = data.getCsrfToken;
        };
        getCsrfToken()

    }, [])


    return (
        <Context.Provider value={{ state, dispatch }}>
            {children}
        </Context.Provider>
    )

}

export { Context, Provider };