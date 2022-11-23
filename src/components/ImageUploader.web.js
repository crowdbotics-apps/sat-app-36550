import React from "react"
import { useDispatch } from "react-redux"
import { updateProfile } from "../redux/app/actions"

function ImageUploader({ children, values }) {
  const dispatch = useDispatch()
  const fileChangedHandler = event => {
    const file = event?.target?.files[0]
    const d = {
      first_name: values.name,
      last_name: values.surname,
      email: values.email,
      "profile.location": values.location
    }
    if (file) {
      d.profile_picture = file
    }
    dispatch(updateProfile(d))
  }
  return (
    <div>
      <label className="custom-file-upload">
        <input
          onChange={event => fileChangedHandler(event)}
          type="file"
          accept="*"
          style={{ display: "none" }}
          id="contained-button-files"
        />
        {children}
      </label>
    </div>
  )
}
export default ImageUploader
