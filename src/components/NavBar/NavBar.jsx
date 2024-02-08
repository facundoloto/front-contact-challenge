import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';

function NavBar() {
    const navigate = useNavigate();
    const isLogout = useAuthStore((state) => state.logout);

    const handleLogOut = () => {
        try {
            isLogout();
            navigate("/auth/login/");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div className="text-light bg-dark">
                <nav className="navbar">
                    <div className="logo"><h2>Contact</h2></div>
                    <Button onClick={handleLogOut} variant="danger">Log Out</Button>
                </nav>
            </div>
        </>
    );
}

export default NavBar;