import React, {useState} from 'react';
import {FaExchangeAlt, FaGithub, FaUsers} from 'react-icons/fa';
import {NavLink} from "react-router-dom";
import {HiUsers} from "react-icons/hi";
import {MdOutlineAccountBalanceWallet, MdOutlinePermIdentity} from "react-icons/md";
import {RiLuggageDepositLine} from "react-icons/ri";
import LogoutBtn from "./LogoutBtn";


const Sidebar = ({children, user}) => {
    const [isOpen, setIsOpen] = useState(true);
    const getMenuIndexByRole = userRole => {
        switch (userRole) {
            case 'ROLE_ADMIN':
                return 0;
            case 'ROLE_USER':
                return 1;
            default:
                return 2;
        }
    }
    const menuIndex = getMenuIndexByRole(user?.userRole?.userRole);
    const menuItem = [
        [
            {
                path: "admin/users",
                name: "Users",
                icon: <HiUsers/>
            },
            {
                path: "admin/stats",
                name: "Stats",
                icon: <FaExchangeAlt/>
            },
        ],
        [
            {
                path: "/user/home",
                name: "Home",
                icon: <MdOutlineAccountBalanceWallet/>
            },
            {
                path: "/user/blogs",
                name: "My blogs",
                icon: <RiLuggageDepositLine/>
            },
            {
                path: "/user/profile",
                name: "Profile",
                icon: <MdOutlinePermIdentity/>
            }
        ],
        [
            {
                path: "/",
                name: "",
                icon: <FaUsers/>
            },
        ],

    ];
    const userLogo = ['Admin', 'User']
    return (
        <div className="container-sidebar">
            <div className="sidebar min-vh-100">
                <div className="top_section">
                    <h1 className="logo d-none d-sm-inline">{user ? userLogo[menuIndex] : 'Home'}</h1>
                </div>
                {user ?
                    (
                        menuItem[menuIndex]?.map((item, index) => (
                                <NavLink to={item.path} key={index} className="link nav-item fs-4" activeclassname="active">
                                    <div className="icon">{item.icon}</div>
                                    <div className="link_text ms-2 d-none d-sm-inline">{item.name}</div>
                                </NavLink>
                            )
                        )
                    ) :
                    (
                        <div>

                        </div>
                    )
                }
                {
                    user &&
                    <div className={"col d-flex justify-content-center mt-5"}>
                        <LogoutBtn/>
                    </div>
                }
                <hr className={"mt-5"}/>
                <NavLink to={"https://github.com/bauer318/rsoi-coursework-ui.git"}
                         className="link nav-item fs-1" activeclassname="active">
                    <div className="icon"><FaGithub/></div>
                    <div className="link_text ms-2 d-none d-sm-inline">{"Project's repository"}</div>
                </NavLink>
            </div>
            <main>{children}</main>
        </div>
    );
};

export default Sidebar;