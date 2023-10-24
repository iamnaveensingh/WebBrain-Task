import React, { useState } from 'react';
import Input from './Input';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Register = () => {
    const navigate = useNavigate()

    const [{ name, adminKey, email, password }, setData] = useState({
        name: "",
        adminKey: "",
        email: "",
        password: "",
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            const { data } = await axios.post('http://localhost:4000/admin/register', { name, adminKey, email, password })

            if (data.success) {
                localStorage.setItem("AdminToken", data.token)
                toast.success('Register Successfully !', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                navigate("/products")
            }
        } catch (error) {
            toast.error('Wrong Admin key or Already Registerd !', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.log(error)
        }
    }
    const onChange = (e) => {
        setData({ ...{ name, adminKey, email, password }, [e.target.name]: e.target.value })

    }

    return (
        <>
            <div className="bg-gray-50 dark:bg-gray-900">

                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 text-white space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Register as a new Admin
                            </h1>
                            <h1 onClick={() => navigate('/register')} className="hover:cursor-pointer text-lg font-semibold  leading-tight tracking-tight text-gray-900  dark:text-white">
                                Click Here For user Register
                            </h1>
                            Admin Key = webBrain
                            <form className="space-y-4 md:space-y-4" onSubmit={handleSubmit}>
                                <Input required={"required"} value={adminKey} onChange={onChange} type={"text"} name={"adminKey"} label={"Your Admin Key"} placeholder={"Admin Key"} />
                                <Input required={"required"} value={name} onChange={onChange} type={"text"} name={"name"} label={"Your Name"} placeholder={"Jon Deo"} />
                                <Input required={"required"} value={email} onChange={onChange} type={"email"} name={"email"} label={"Your Email"} placeholder={"name@company.com"} />
                                <Input required={"required"} value={password} onChange={onChange} type={"password"} name={"password"} label={"Password"} placeholder={"••••••••"} />
                                <button type="submit" className="w-full bg-blue-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign Up</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet? <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500"> Sign in</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Register
