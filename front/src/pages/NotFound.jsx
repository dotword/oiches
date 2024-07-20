import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100%' }}
            exit={{ opacity: 0, height: 0 }}
            className="h-screen w-screen relative"
        >
            <img
                src="/404Page.jpg"
                className="absolute top-0 left-0 w-full h-full object-cover -z-10"
                alt="Background 404"
            />
            <section className="relative text-white text-center flex flex-col items-center justify-center h-full z-10">
                <h1 className="text-8xl font-bold text-yellowOiches">404</h1>
                <p className="text-4xl mt-4 text-yellowOiches">Upps!!</p>
                <p className="text-5xl mt-4 text-yellowOiches">
                    Disimula viene Pitingo
                </p>
                <NavLink to="/" className="text-4xl mt-10 text-white-500">
                    ← Volver a inicio
                </NavLink>
            </section>
        </motion.div>
    );
};

export default NotFound;
