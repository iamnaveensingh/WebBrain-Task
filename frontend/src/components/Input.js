import React from 'react'

const Input = ({ value, onChange, type, name, label, placeholder, required }) => {
    return (
        <>
            <div>
                <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label} {required ? (<span className='text-red-600 text-xl'>*</span>) : ("")}  </label>
                <input value={value} onChange={onChange} type={type} name={name} autoComplete='off' className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required={required} />
            </div>
        </>
    )
}

export default Input
