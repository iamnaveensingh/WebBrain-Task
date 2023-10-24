import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Input from './Input';


const EditProducts = () => {
    const [image, setImage] = useState('')
    const [edit, setEdit] = useState(
        {
            title: "",
            price: "",
            status: "",
            disc: ""
        }
    )
    const param = useParams()
    const id = param.id;
    const getData = async () => {
        const token = localStorage.getItem('AdminToken')
        const product = await axios.get(`http://localhost:4000/product/find/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        setEdit(product.data.data)

    }
    const update = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('AdminToken')
            const { data } = await axios.put(`http://localhost:4000/product/update/${id}`, { ...edit, image: image },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            if (data.success) {
                setEdit({
                    title: "",
                    price: "",
                    status: "",
                    disc: ""
                })
                toast.success('Update Successfully !', {
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
    const uploadIMG = () => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "webBrain");
        data.append("cloud_name", "dlfspcces");
        fetch("https://api.cloudinary.com/v1_1/dlfspcces/image/upload", {
            method: "post",
            body: data,
        })
            .then((res) => res.json())
            .then((data) => setImage(data.url))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getData()
    }, [])


    const onChange = (e) => {
        setEdit({ ...edit, [e.target.name]: e.target.value })
    }

    return (
        <>
            {
                (localStorage.getItem('AdminToken')) ? (
                    <div className="bg-gray-50 dark:bg-gray-900">
                        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                        Edit Product
                                    </h1>
                                    <form className="space-y-4 md:space-y-4" onSubmit={update}>
                                        <Input required={"required"} value={edit.title} onChange={onChange} type={"text"} name={"title"} label={"Title"} placeholder={"Product Title"} />
                                        <Input required={"required"} onChange={(e) => setImage(e.target.files[0])} type={"file"} name={"image"} label={"Image"} placeholder={"Product Image"} />
                                        <div onClick={uploadIMG} className='bg-green-300 w-32 text-center cursor-pointer rounded-lg p-2'>Upload Image</div>
                                        <Input required={"required"} value={edit.price} onChange={onChange} type={"number"} name={"price"} label={"Price"} placeholder={"Product Price"} />
                                        {/* <Input required={"required"} value={edit.status} onChange={onChange} type={"text"} name={"status"} label={"Status"} placeholder={"Product Status"} /> */}
                                        <select name="status" onChange={onChange} value={edit.status}>
                                            <option value="inStock">In Stock</option>
                                            <option value="Sold">Sold</option>
                                        </select>
                                        <Input required={"required"} value={edit.disc} onChange={onChange} type={"text"} name={"disc"} label={"Discreption"} placeholder={"Product Discreption"} />
                                        {
                                            ((image === '') || (image === undefined) || (typeof (image) === 'object')) ? (
                                                <div className="w-full dark:bg-red-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Wait for Image Upload</div>
                                            ) : (
                                                <button type='submit' className="w-full dark:bg-blue-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Update</button>
                                            )
                                        }

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                ) : ("You are not authorize to see this page")
            }

        </>
    )
}

export default EditProducts
