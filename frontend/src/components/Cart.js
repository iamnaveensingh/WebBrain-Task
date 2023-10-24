import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const Cart = () => {
    const [fatch, setFatch] = useState([])


    const fetchdata = async () => {
        try {
            const token = localStorage.getItem('AdminToken')
            const data = await axios.get('http://localhost:4000/product/getCart',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                console.log(data.data.products)
            setFatch(data.data.products)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteCart = async (Id) => {
        try {
          const token = localStorage.getItem('AdminToken')
          const { data } = await axios.delete(`http://localhost:4000/product/deleteCart/${Id}`,
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            })
          console.log(data)
          if (data.success) {
            fetchdata()
            toast.success('Removed Successfully !', {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        } catch (error) {
          toast.error('Something Went Wrong !', {
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

    useEffect(() => {
        fetchdata()
    }, [])
    return (
        <><div className='flex flex-wrap justify-between min-h-screen bg-gray-50 dark:bg-gray-900' >
            {(localStorage.getItem('AdminToken') ? (
                fatch.map((item) => {
                    return (
                        <div key={item._id} className="max-w-sm dark:text-white h-[350px] dark:bg-gray-800 dark:border-gray-700 rounded-lg overflow-hidden w-64 m-5 shadow-lg">
                            <img className="w-full h-36" src={item.image} alt="Product " />
                            <div className="px-6 pt-1 pb-3">
                                <div className="font-bold text-xl mb-2">{item.title}</div>
                                <p className="text-gray-700 text-base font-extrabold dark:text-white">
                                    ₹ {item.price}
                                </p>
                                <p className="text-gray-700 text-base dark:text-white">
                                    {item.disc}
                                </p>
                                <p className="text-gray-700 font-medium text-base dark:text-white">
                                    {item.status}
                                </p>
                            </div>
                            <div className="px-2  flex justify-between items-center">

                                <button onClick={() => deleteCart(item._id)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                                    Remove
                                </button>
                            </div>
                        </div>)
                })
            ) : ('')
            )}
        </div>
        </>
    )
}

export default Cart
