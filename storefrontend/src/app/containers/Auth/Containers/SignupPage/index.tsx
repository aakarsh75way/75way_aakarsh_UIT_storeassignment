import React from 'react'
import SignUpForm from './form'

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
    <div className="bg-white p-8 rounded-md shadow-md max-w-md w-full text-gray-800">
      <h1 className="text-3xl font-semibold mb-6 text-center">Sign Up</h1>
      <SignUpForm />
    </div>
  </div>
  )
}

export default SignUpPage
