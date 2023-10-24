import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const nevigate = useNavigate()
    function handleLogout() {
        localStorage.clear()
        nevigate('/')
    }
    return (

        <nav className="bg-white border-gray-200 dark:bg-gray-800">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="w-full md:block md:w-auto">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-800 dark:border-gray-700">
                        <li>
                            <a href="/AddProducts" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Add Products</a>
                        </li>
                        <li>
                            <a href="/Products" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Products</a>
                        </li>
                        <li>
                            <a href="/cart" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Cart</a>
                        </li>
                    </ul>
                </div>
                
                {
                    (localStorage.getItem('UserToken') || localStorage.getItem('AdminToken')) ?
                        <div onClick={handleLogout} className='text-white cursor-pointer px-3 py-1 bg-red-500 rounded-lg'>Logout</div>
                        : ''
                }
                {/* <div onClick={handleLogout} className='text-white cursor-pointer px-3 py-1 bg-red-500 rounded-lg'>Logout</div> */}
            </div>
        </nav >


    )
}

export default Navbar
