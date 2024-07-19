import React from 'react'
import { Link } from 'react-router-dom'

function Signup() {
  return (
    <div className='p-3 max-w-lg mx-auto '>
      <h1 className='font-bold text-lg sm:text-3xl text-center my-8'>Sign up</h1>
      <form className='flex flex-col gap-4'>
        <input type='text' placeholder='username' className='border p-3 rounded-lg ' id='username'  />
        <input type='text' placeholder='email' className='border p-3 rounded-lg ' id='email'  />
        <input type='text' placeholder='password' className='border p-3 rounded-lg ' id='password'  />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 cursor-pointer disabled:opacity-50'>Sign up</button>
      </form>

      <div className='flex gap-2 my-2'>
        <p>Have an account?</p>
        <Link to='/sign-in' className='text-blue-500'>Sign in here</Link>
      </div>
      
    </div>
  )
}

export default Signup