import { useEffect, useState } from "react";
import {FaHome,FaUsers,FaCog} from 'react-icons/fa'
import { CiMoneyCheck1,CiLogout } from "react-icons/ci";
import { NavLink } from "react-router";
const Barre_lateral = () => {
    const menuItems = [
        {id: 1, name:'Tableau de bord', path:'/admin-dashboard',icon: <FaHome />,isParent: true},
        {id:2, name:'Membres', path:'/admin-dashboard/membre',icon: <FaUsers />,isParent: false},
        {id:3, name:'Cotisations',path:'/admin-dashboard/cotisation',icon: <CiMoneyCheck1 />,isParent: false},
        {id:4,name:'Profile',path:'/admin-dashboard/profile',icon: <FaCog />,isParent: false},
        {id:6, name:'Logout',path:'/admin-dashboard/logout',icon: <CiLogout />,isParent: false},
    ]
    const [menuLinks,SetMenuLinks] = useState(menuItems)

    return(
        <div className="flex flex-col h-screen p-3 bg-or-clair text-white w-16 md:w-60 shadow-lg fixed">
            <div className="h-16 justify-center items-center">
                <span className="hidden md:block  text-white text-lg font-bold">Gestion NHO</span>
                <span className="md:hidden text-lg font-bold">NHO</span>
            </div>

            <div className="flex-1 mt-4">
                <ul className="space-y-1 p-1 text-xl md:space-y-6 h-screen">
                    {menuLinks.map((item) => (
                        <li key={item.id}>
                        <NavLink
                        end={item.isParent}
                        to={item.path}
                        className={({isActive}) => (isActive ? 'bg-or-fonce' : '') + ' flex hover:bg-slate-600 transition duration-200'}
                        >
                            <span className="text-xl"> {item.icon}</span>
                            <span className="hidden md:block ml-4 text-wh">{item.name}</span>
                        </NavLink>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
    )

}

export default Barre_lateral