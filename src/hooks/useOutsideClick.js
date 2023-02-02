import { useRef, useEffect } from 'react'

const useOutsideClick = (callback) => {
  const ref = useRef()

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback()
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [ref])

  return ref
}

export default useOutsideClick
