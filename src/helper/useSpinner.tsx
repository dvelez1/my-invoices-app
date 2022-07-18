import React from 'react'

export const useSpinner = () => {
  return (
<div className="spinner-grow text-primary" role="status">
  <span className="sr-only">Loading...</span>
</div>
  )
}

export default useSpinner
