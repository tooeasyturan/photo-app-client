import React from 'react'

const FileUploadMulter = () => {
  return (
    <div>
      <form action='http://localhost:3004/upload' method="POST" className="col-md-4 mt-4" encType="multipart/form-data">
        <div className="custom-file">
          <input name="myImage" type="file" className="custom-file-input" id="customFile" />
          <label className="custom-file-label" htmlFor="customFile">Choose File</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default FileUploadMulter