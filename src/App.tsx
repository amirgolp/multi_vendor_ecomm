import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Login from './pages/Login.tsx'
import ReactQueryProvider from "./components/QueryClientProvider.tsx"
import Signup from "./pages/SignUp.tsx"

const App: React.FC = () => {
    return (
        <ReactQueryProvider>
            <Router>
                <nav>
                    <ul>
                        <li>
                            <Link to="/signup">Sign-Up</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </Router>
        </ReactQueryProvider>
    );
};

export default App