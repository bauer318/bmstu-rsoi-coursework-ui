import React, {useState} from 'react';
import {FaCity, FaExchangeAlt, FaGithub, FaHistory, FaUsers} from 'react-icons/fa';
import {NavLink} from "react-router-dom";
import {HiHome, HiUsers} from "react-icons/hi";
import {MdOutlineAccountBalanceWallet, MdOutlinePermIdentity} from "react-icons/md";
import {RiLuggageDepositLine} from "react-icons/ri";
import {BiMoneyWithdraw} from "react-icons/bi";
import {GrCurrency} from "react-icons/gr";
import {BsFillWalletFill} from "react-icons/bs";
import LogoutBtn from "./LogoutBtn";
import {FiSettings} from "react-icons/fi";


const Sidebar = ({children, user}) => {
    const [isOpen, setIsOpen] = useState(true);
    const getMenuIndexByRole = userRole => {
        switch (userRole) {
            case 'ROLE_ADMIN':
                return 0;
            case 'ROLE_USER':
                return 1;
            case 'ROLE_AGENT':
                return 2;
            case 'ROLE_CLIENT':
                return 3;
            default:
                return 4;
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
                <NavLink to={"https://forms.yandex.ru/u/65a25274d0468848f12a169b/"}
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