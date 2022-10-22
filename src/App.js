import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Create from './components/create.component'
import Search from './components/search.component'
import List from './components/list.component';

function App() {
  
  
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/sign-in'}>
              HomePage
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={'/create'}>
                    Create
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/search'}>
                    Search
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link className="nav-link" to={'/list'}>
                    List
                  </Link>
                </li> */}
              </ul>
            </div>
          </div>
        </nav>
        <br></br><br></br><br></br><br></br><br></br>
        <div className="outer">
          <div className="inner">
            <Routes>
              <Route exact path="/" element={<Create />} />
              <Route path="/create" element={<Create />} />
              <Route path="/search" element={<Search />} />
              <Route path="/list" element={<List />} />
            </Routes>
          </div>
        </div>
      </div>
      
    </Router>
    
  )
}

export default App