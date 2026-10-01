import Barre_lateral from "./Barre_lateral";
import { Outlet } from "react-router";
import React from 'react'

export const Dashboard = () => {
  return (
    <div>
        <div className="flex">
            <Barre_lateral />
            <div className="flex-1 ml-16 md:ml-64 bg-gray-100 min-h-screen">
                <Outlet />
            </div>
        </div>
    </div>
  )
}
