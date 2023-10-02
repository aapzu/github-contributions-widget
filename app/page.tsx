'use client'

import { NextPage } from 'next'
import { useSearchParams } from 'next/navigation'

const IndexPage: NextPage = () => {
  const searchParams = useSearchParams()
  const username = searchParams.get('username') ?? undefined

  const imgUrl = username ? `/${username}.png` : undefined

  return (
    <div className="flex flex-col items-center justify-center h-screen dark:bg-gray-800">
      {username && (
        <img
          src={imgUrl}
          alt={`${username}'s GitHub contributions`}
          className="mb-4 rounded-md shadow-md dark:shadow-none"
        />
      )}
      <form action="/" method="GET" className="dark:bg-gray-800">
        <input
          type="text"
          name="username"
          defaultValue={username}
          placeholder="Enter GitHub username"
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        />
        <button
          type="submit"
          className="px-4 py-2 ml-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default IndexPage
