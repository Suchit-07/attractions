import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Info from './Info'
import Saved from './Saved'

const Base = () => {
  return (
    <Router>
        <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/info" element={<Info/>}/>
            <Route exact path="/saved" element={<Saved/>}/>
        </Routes>
    </Router>
  );
}

export default Base;