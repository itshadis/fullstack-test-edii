import React from "react"
import Header from "../components/Header"
import Sidebar from "../components/SideBar"

const MainLayout = ({ children }: { children:  React.ReactNode}) => {
  return (
    <>
      <Header />
      <div className="d-flex">
        <Sidebar />
        <div className="w-100 overflow-auto px-5" style={{ height: "calc(100vh - 56px)" }}>
          { children }
        </div>
      </div>
    </>
  )
}

export default MainLayout