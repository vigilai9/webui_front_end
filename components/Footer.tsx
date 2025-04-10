import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-400 py-10 text-center mt-20 w-full">
            <p>&copy; {new Date().getFullYear()} Vigil AI. All Rights Reserved.</p>
        </footer>
    )
}

export default Footer