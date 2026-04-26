import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../utils/axios';
import { FaCalendarAlt, FaMapMarkerAlt, FaRegClock, FaTicketAlt, FaShieldAlt } from 'react-icons/fa';

const Home = () => {
    const [searchParams] = useSearchParams();
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [location, setLocation] = useState(searchParams.get('location') || '');
    const [category, setCategory] = useState(searchParams.get('category') || '');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const querySearch = searchParams.get('search') || '';
        const queryLocation = searchParams.get('location') || '';
        const queryCategory = searchParams.get('category') || '';
        if (querySearch !== search) {
            setSearch(querySearch);
        }
        if (queryLocation !== location) {
            setLocation(queryLocation);
        }
        if (queryCategory !== category) {
            setCategory(queryCategory);
        }
    }, [searchParams]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchEvents();
        }, 400); // 400ms debounce
        return () => clearTimeout(timeoutId);
    }, [search, location, category]);

    const fetchEvents = async () => {
        try {
            const params = new URLSearchParams();
            if (search) params.set('search', search);
            if (location) params.set('location', location);
            if (category) params.set('category', category);
            const query = params.toString();
            const { data } = await api.get(`/events${query ? `?${query}` : ''}`);
            setEvents(data);
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <div className="relative w-full overflow-hidden mb-12">
                <div className="absolute inset-0 brightness-50 bg-[url('https://i.pinimg.com/1200x/50/fc/af/50fcaf188b4803271d1f0b77e65cd026.jpg')] bg-cover bg-center scale-100"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/55 to-slate-900/25"></div>
                <div className="absolute -top-28 -right-20 w-80 h-80 rounded-full bg-slate-700/15 blur-3xl"></div>
                <div className="absolute -bottom-28 -left-24 w-80 h-80 rounded-full bg-slate-800/15 blur-3xl"></div>
                <div className="relative p-10 md:p-20 text-center flex flex-col items-center z-10">
                    <span className="bg-white/15 text-purple-100 backdrop-blur-md px-5 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-7 border border-white/25">Discover. Book. Experience.</span>
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight text-white drop-shadow-2xl">
                        Find Your Next <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-violet-300 to-fuchsia-300">Unforgettable</span> Experience
                    </h1>
                    <p className="text-slate-200 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                        Discover the best tech conferences, late-night music festivals, and hands-on workshops happening directly in your area. Secure your spot today.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-3xl">
                        <div className="rounded-2xl px-4 py-3 bg-white/10 border border-white/20 backdrop-blur-sm text-slate-100">
                            <p className="text-2xl font-extrabold">500+</p>
                            <p className="text-xs uppercase tracking-wider text-slate-300">Live Events</p>
                        </div>
                        <div className="rounded-2xl px-4 py-3 bg-white/10 border border-white/20 backdrop-blur-sm text-slate-100">
                            <p className="text-2xl font-extrabold">50k+</p>
                            <p className="text-xs uppercase tracking-wider text-slate-300">Bookings Done</p>
                        </div>
                        <div className="rounded-2xl px-4 py-3 bg-white/10 border border-white/20 backdrop-blur-sm text-slate-100">
                            <p className="text-2xl font-extrabold">24/7</p>
                            <p className="text-xs uppercase tracking-wider text-slate-300">Instant Access</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-10 sm:px-12 lg:px-16">
            <div className="flex items-center justify-between mb-8 px-2 -mt-4 border-b border-slate-200 pb-4">
                <h2 className="text-3xl font-extrabold text-slate-900 -mt-2 tracking-tight">Upcoming Events</h2>
                <div className="text-slate-500 font-medium">{events.length} results found</div>
            </div>

            {loading ? (
                <div className="text-center py-20 text-xl font-semibold text-slate-600">Loading events...</div>
            ) : events.length === 0 ? (
                <div className="text-center py-20 text-xl text-slate-500">No events found matching your search.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map(event => (
                        <div key={event._id} className="bg-white/85 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-slate-100 transition duration-300 hover:-translate-y-1 flex flex-col">
                            <div className="h-48 bg-slate-200 overflow-hidden relative">
                                {event.image ? (
                                    <img src={event.image} alt={event.title} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-600 font-bold text-2xl">
                                        {event.category || 'Event'}
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                                    {event.ticketPrice === 0 ? <span className="text-emerald-600">FREE</span> : <span className="text-slate-900">₹{event.ticketPrice}</span>}
                                </div>
                            </div>
                            <div className="p-6 flex-grow flex flex-col">
                                <div className="text-xs font-bold text-purple-800 uppercase tracking-[0.15em] mb-2">{event.category}</div>
                                <h2 className="text-xl font-bold text-slate-800 mb-3">{event.title}</h2>
                                <div className="flex flex-col gap-2 mb-4 text-slate-600 text-sm">
                                    <div className="flex items-center gap-2">
                                        <FaCalendarAlt className="text-purple-500" />
                                        <span>{new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaMapMarkerAlt className="text-purple-500" />
                                        <span>{event.location}</span>
                                    </div>
                                </div>
                                <div className="mt-auto">
                                    <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                                        <div className="bg-gradient-to-r from-purple-700 to-violet-800 h-2 rounded-full" style={{ width: `${(event.availableSeats / event.totalSeats) * 100}%` }}></div>
                                    </div>
                                    <p className="text-xs text-slate-500 mb-4">{event.availableSeats} of {event.totalSeats} seats remaining</p>
                                    <Link to={`/events/${event._id}`} className="block w-full text-center bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold py-2.5 rounded-xl transition">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Why Choose Us / Features row */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 px-4">
                <div className="bg-white/85 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:-translate-y-1 transition duration-300">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-700 to-violet-800 text-white rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-lg shadow-purple-900/25">
                        <FaRegClock />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Fast Booking</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">Secure your tickets instantly with our fast streamlined booking infrastructure built for speed.</p>
                </div>
                <div className="bg-white/85 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:-translate-y-1 transition duration-300">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-700 to-violet-800 text-white rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-lg shadow-purple-900/25">
                        <FaTicketAlt />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Seamless Access</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">Download tickets instantly or manage them right from your personal dashboard with ease.</p>
                </div>
                <div className="bg-white/85 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:-translate-y-1 transition duration-300">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-700 to-violet-800 text-white rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-lg shadow-purple-900/25">
                        <FaShieldAlt />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Secure Platform</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">All transactions and registrations are backed by reliable security controls.</p>
                </div>
            </div>

            {/* Footer Section */}
            <footer className="mt-auto pt-16 pb-8 border-t border-slate-200 text-center">
                <div className="flex justify-center items-center gap-2 mb-4">
                    <FaTicketAlt className="text-purple-800 text-2xl" />
                    <span className="text-xl font-bold text-slate-900">Events Now</span>
                </div>
                <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto">
                    The simplest, most dynamic way to manage, discover, and host world-class events in your local city. Let's make memories together.
                </p>
                <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                    &copy; {new Date().getFullYear()} Events Now Platform. Built by Kartik Bhandari. All rights reserved.
                </div>
            </footer>
            </div>
        </div>
    );
};

export default Home;
