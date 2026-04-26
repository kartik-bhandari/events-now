import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaSearch, FaTicketAlt, FaUserCircle } from 'react-icons/fa';
import { CITIES } from '../constants/cities';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [search, setSearch] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const profileMenuRef = useRef(null);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const trimmedSearch = search.trim();
        const params = new URLSearchParams();
        const currentCategory = new URLSearchParams(location.search).get('category');
        if (trimmedSearch) params.set('search', trimmedSearch);
        if (selectedCity) params.set('location', selectedCity);
        if (currentCategory) params.set('category', currentCategory);
        const query = params.toString();
        navigate(query ? `/?${query}` : '/');
    };

    const handleCityChange = (e) => {
        const city = e.target.value;
        setSelectedCity(city);
        const params = new URLSearchParams();
        const trimmedSearch = search.trim();
        const currentCategory = new URLSearchParams(location.search).get('category');
        if (trimmedSearch) params.set('search', trimmedSearch);
        if (city) params.set('location', city);
        if (currentCategory) params.set('category', currentCategory);
        const query = params.toString();
        navigate(query ? `/?${query}` : '/');
    };

    const handleDashboardClick = () => {
        setShowProfileMenu(false);
        navigate(user ? (user.role === 'admin' ? '/admin' : '/dashboard') : '/login');
    };

    const handleAuthClick = () => {
        setShowProfileMenu(false);
        if (user) {
            logout();
            navigate('/login');
            return;
        }
        navigate('/login');
    };

    React.useEffect(() => {
        const params = new URLSearchParams(location.search);
        setSearch(params.get('search') || '');
        setSelectedCity(params.get('location') || '');
    }, [location.search]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_28px_rgba(2,6,23,0.45)]">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 items-center py-4 gap-4 lg:gap-6">
                    <div className="flex items-center justify-center lg:justify-start">
                        <Link to="/" className="text-white text-2xl font-extrabold flex items-center gap-2 tracking-tight shrink-0">
                            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-700 to-violet-800 flex items-center justify-center shadow-lg shadow-purple-900/40">
                                <FaTicketAlt className="text-sm" />
                            </span>
                            Events Now
                        </Link>
                    </div>
                    <form onSubmit={handleSearchSubmit} className="flex items-center justify-center w-full">
                        <div className="relative w-full sm:w-[20rem] lg:w-[28rem] xl:w-[30rem]">
                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
                            <input
                                type="text"
                                placeholder="Search events..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-purple-600 transition"
                            />
                        </div>
                    </form>
                    <div className="flex flex-wrap items-center justify-center lg:justify-end gap-4 sm:gap-5">
                        <Link to="/" className="text-slate-200 hover:text-white transition cursor-pointer font-medium">Events</Link>
                        <Link to="/categories" className="text-slate-200 hover:text-white transition cursor-pointer font-medium">Categories</Link>
                        <select
                            value={selectedCity}
                            onChange={handleCityChange}
                            className="w-36 sm:w-40 py-2.5 pl-4 pr-10 rounded-xl bg-slate-900 border border-slate-600 text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-purple-600 transition appearance-none bg-[length:14px_14px] bg-[position:right_0.85rem_center] bg-no-repeat"
                        >
                            <option value="">All Cities</option>
                            {CITIES.map((city) => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                        <div className="relative" ref={profileMenuRef}>
                            <button
                                onClick={() => setShowProfileMenu((prev) => !prev)}
                                className="text-slate-100 hover:text-white transition p-1 rounded-full"
                                aria-label="Profile menu"
                            >
                                <FaUserCircle className="text-3xl" />
                            </button>
                            {showProfileMenu && (
                                <div className="absolute right-0 mt-2 w-44 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl py-1 z-50">
                                    <button
                                        onClick={handleDashboardClick}
                                        className="w-full text-left px-4 py-2 text-sm text-slate-100 hover:bg-slate-800 transition"
                                    >
                                        Dashboard
                                    </button>
                                    <button
                                        onClick={handleAuthClick}
                                        className="w-full text-left px-4 py-2 text-sm text-slate-100 hover:bg-slate-800 transition"
                                    >
                                        {user ? 'Logout' : 'Login'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
