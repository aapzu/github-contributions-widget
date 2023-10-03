'use client'

import { FC, useEffect, useMemo, useState } from 'react'

const ContributionsImg: FC<{ username: string }> = ({ username }) => {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState<string>()

  const imgUrl = useMemo(
    () => (username ? `/${username}.png` : undefined),
    [username],
  )

  useEffect(() => {
    const func = async () => {
      setError(undefined)
      setLoaded(false)

      if (!imgUrl) {
        return
      }
      const res = await fetch(imgUrl)
      if (!res.ok) {
        const text = await res.text()
        setError(text)
        return
      }
      setLoaded(true)
    }
    func()
  }, [username])

  return (
    <div className="mb-4">
      {username && loaded && (
        <img
          src={imgUrl}
          alt={`${username}'s GitHub contributions`}
          className="rounded-md shadow-md dark:shadow-none"
        />
      )}
      {error && (
        <p className="text-red-500">
          <span className="font-bold">Error:</span> {error}
        </p>
      )}
    </div>
  )
}

export default ContributionsImg
