import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import About from "./pages/about";
import Events from "./pages/events";
import Teams from "./pages/team";
import SignUp from "./pages/signup";
import Footer from "./components/Footer.js";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<About />} />
                <Route
                    path="/events"
                    element={<Events />}
                />

                <Route path="/team" element={<Teams />} />
                <Route
                    path="/sign-up"
                    element={<SignUp />}
                />
            </Routes>
            <Footer />
        </Router>

    );
}
 
export default App;