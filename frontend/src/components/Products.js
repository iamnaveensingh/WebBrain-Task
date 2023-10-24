import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



const Products = () => {
  const [fatch, setFatch] = useState([])
  const nevigate = useNavigate()
  const fetchdata = async () => {
    const data = await axios.get('http://localhost:4000/product/read')
    setFatch(data.data.products)
  }

  const deleteProduct = async (Id) => {
    try {
      const token = localStorage.getItem('AdminToken')
      const { data } = await axios.delete(`http://localhost:4000/product/delete/${Id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
      console.log(data)
      if (data.success) {
        fetchdata()
        toast.success('Deleted Successfully !', {
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
  const addToCart = async (item) => {
    try {
      const token = localStorage.getItem('AdminToken')
      const { data } = await axios.post('http://localhost:4000/product/cart', item,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      )
      if (data.success) {
        toast.success('Added To Cart!', {
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
  const inStock = async () => {
    const data = await axios.get('http://localhost:4000/product/read-InStock')
    setFatch(data.data.products)
  }

  const sold = async () => {
    const data = await axios.get('http://localhost:4000/product/read-Sold')
    setFatch(data.data.products)
  }

  const getFilterData = (status) => {
    if (status === "instock") {
      inStock()
    } else if (status === "sold") {
      sold()
    }
  }

  return (
    <>
      <div className='text-white bg-gray-50 dark:bg-gray-900'>
        Filter by
        <button className='px-2 py-1 bg-blue-600 rounded-lg' onClick={() => getFilterData('instock')} >
          In Stock
        </button> or .
        <button className='px-2 py-1 bg-blue-600 rounded-lg' onClick={() => getFilterData('sold')} >
          Sold
        </button>
      </div>
      <div className='flex flex-wrap justify-between min-h-screen bg-gray-50 dark:bg-gray-900' >
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
                  <button onClick={() => nevigate(`/editProduct/${item._id}`)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    Edit
                  </button>
                  <button onClick={() => addToCart(item)} class="bg-blue-500 hover:bg-yellow-300 text-white font-bold py-2 px-4 rounded-full">
                    Cart
                  </button>
                  <button onClick={() => deleteProduct(item._id)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    Delete
                  </button>
                </div>
              </div>)
          })
        ) : (
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
              </div>
            )
          })
        ))}
      </div>
    </>
  )
}

export default Products;
