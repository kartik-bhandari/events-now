import React from 'react';
import { Link } from 'react-router-dom';
import { EVENT_CATEGORIES } from '../constants/categories';

const Categories = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Browse By Category</h1>
                <p className="text-slate-500 mt-2">Pick a category and discover matching events instantly.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {EVENT_CATEGORIES.map((category) => (
                    <Link
                        key={category.value}
                        to={`/?category=${encodeURIComponent(category.value)}`}
                        className="group relative h-44 rounded-2xl overflow-hidden shadow-lg border border-white/20"
                    >
                        {category.imageUrl ? (
                            <img
                                src={category.imageUrl}
                                alt={category.label}
                                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-purple-700 to-violet-800" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10" />
                        <div className="absolute top-4 left-4 right-4">
                            <h2 className="text-white text-2xl font-extrabold tracking-tight drop-shadow-md">
                                {category.label}
                            </h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Categories;
