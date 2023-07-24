import React from 'react'
import { DBHeader } from "../components";
import { Routes } from 'react-router-dom';

const DBRightSection = () => {
  return (
    <div className="flex flex-col py-12 px-12 flex-1 h-full">
      <DBHeader/>
      <div className="flex flex-col flex-1 overflow-y-scrollbar-none">
        <Routes>
          <Routes path="/home"/>
        </Routes>

      </div>
    </div>
  )
}

export default DBRightSection
