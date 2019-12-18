import React, { useState } from 'react'

const FileUpload = () => {
  const [file, setFile] = useState('')
  const [filename, setFilename] = useState('Choose File')

  const onChangeHandler = (event) => {
    setFile(event.target.files[0])
    setFilename(event.target.files[0].name)


    console.log(event.target.files[0])
  }

  console.log(file)
  console.log(filename)

  return (
    <>
      <form className="col-md-4 mt-4">
        <div className="custom-file">
          <input type="file" className="custom-file-input" id="customFile" onChange={onChangeHandler} />
          <label className="custom-file-label" htmlFor="customFile">{filename}</label>
        </div>

        <input type="submit" value="Upload" className="btn btn-primary btn-block" />

      </form>
    </>
  )
}

export default FileUpload