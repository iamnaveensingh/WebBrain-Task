
import React, { useState } from 'react';
import Input from './Input';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';




const AdminLogin = () => {
  const navigate = useNavigate()

  const [{ email, password }, setData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {

      const { data } = await axios.post('http://localhost:4000/admin/login', { email, password })

      if (data.success) {
        localStorage.setItem("AdminToken", data.token)
        toast.success('Login Successfully !', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/Addproducts")
      }
    } catch (error) {
      toast.error('Invalid credintial !', {
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
    setData({ ...{ email, password }, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <h1 onClick={() => navigate('/')} className="hover:cursor-pointer text-lg font-semibold  leading-tight tracking-tight text-gray-900  dark:text-white">
                Click Here For User Login
              </h1>
              <form className="space-y-4 md:space-y-4" onSubmit={handleSubmit}>


                <Input required={"required"} value={email} onChange={onChange} type={"email"} name={"email"} label={"Your Email"} placeholder={"name@company.com"} />

                <Input required={"required"} value={password} onChange={onChange} type={"password"} name={"password"} label={"Password"} placeholder={"••••••••"} />


                <button type="submit" className="w-full bg-blue-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet? <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500"> Sign up</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default AdminLogin
