import { useState, useEffect, useContext } from "react";
import { Menu, Dropdown, Button } from 'antd';
import Link from 'next/link';

const { Item, SubMenu, ItemGroup } = Menu;
import { LoginOutlined, AppstoreOutlined, UserAddOutlined, LogoutOutlined, CoffeeOutlined, DashboardOutlined } from '@ant-design/icons'
import { Context } from "../context/indexContext.js";
import axios from 'axios';
import { toast } from "react-toastify";
import { useRouter } from "next/router";


const TopNav = () => {

    const [current, setCurrent] = useState("");
    const router = useRouter();
    const { state, dispatch } = useContext(Context);
    const { user } = state;
    console.log(state);
    const logout = async () => {
        dispatch({ type: "logout", })
        window.localStorage.removeItem("user");
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/logout`);
        toast(data.message);
        router.push("/login");
        router.reload(window.location.pathname);
    }
    useEffect(() => {
        process.browser && setCurrent(window.location.pathname);//to make sure in browser  mode 
    }, [process.browser && window.location.pathname])
    // To Activate the specific link when the component mount 
    // console.log(window.location.pathname);
    // console.log(current);


    return (
        <Menu mode='horizontal ' selectedKeys={[current]}>

            {user == null && (
                <>
                    <Item key="/login" icon={<LoginOutlined />} onClick={e => setCurrent(e.key)}>
                        <Link href="/login"><a>Login</a></Link>

                    </Item>
                    <Item key="/register" icon={<UserAddOutlined />} onClick={e => setCurrent(e.key)}>
                        <Link href="/register"><a>Register</a></Link>
                    </Item>

                </>
            )
            }
            <Item key="/" icon={<AppstoreOutlined />} onClick={e => setCurrent(e.key)}>
                <Link href="/"><a>App</a></Link>
            </Item>
            {user !== null && (
                <>
                    {/* <SubMenu icon={<CoffeeOutlined />} title={user && user.name} className="float-right">
                    </SubMenu> */}
                    {/* <ItemGroup>
                    </ItemGroup> */}
                    <Item icon={<LogoutOutlined />} onClick={logout} className="float-right" >
                        Logout
                    </Item>
                    <Item icon={<DashboardOutlined />} key="/user" >

                        <Link href="/user"><a>Dashboard</a></Link>

                    </Item>



                    <Item icon={<CoffeeOutlined />} className="float-right"  >
                        {user && user.name}
                    </Item>
                </>

            )

            }


        </Menu>

    )
};

export default TopNav;