import React from 'react'
import { Image } from 'semantic-ui-react'


const GetCloudUploads = ({ uploads }) => {


  return (
    <div>
      {uploads.map(upload => {
        return <Image key={upload}
          src={upload}
          wrapped ui={true}
          alt=""
          rounded
        // onClick={() => handleRemoveImage(upload)}
        />
      })}
    </div>
  )
}

export default GetCloudUploads