/* eslint-disable no-console */
import { Outlet, Link } from 'react-router-dom'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRefreshMutation } from './authApiSlice'
import usePersist from '../../hooks/usePersist'
import { selectToken } from './authSlice'

function PersistLogin() {
  const [persist] = usePersist()
  const token = useSelector(selectToken)
  const effectRef = useRef(false)

  const [trueSuccess, setTrueSuccess] = useState(false)

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation()

  useEffect(() => {
    if (effectRef.current === true || process.env.NODE_ENV !== 'development') {
      const verifyRefreshToken = async () => {
        console.log('verifying refresh token')
        try {
          await refresh()
          setTrueSuccess(true)
        } catch (err) {
          console.log(err)
        }
      }

      if (!token && persist) {
        verifyRefreshToken()
      }
    }

    return () => {
      effectRef.current = true
    }
  }, [])

  let content
  if (!persist) {
    content = <Outlet />
  } else if (isLoading) {
    content = <p>Loading...</p>
  } else if (isError) {
    content = (
      <p>
        {error.message} <Link to="/login">Please Login again</Link>
      </p>
    )
  } else if (isSuccess && trueSuccess) {
    content = <Outlet />
  } else if (token && isUninitialized) {
    // eslint-disable-next-line no-console
    console.log('token exists, but isUninitialized')
    content = <Outlet />
  }

  return content
}

export default PersistLogin
