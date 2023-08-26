import React, { useState } from "react";
function MyForm() {
  const [formData, setFormData] = useState({
    formdata: "",
    comments: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="formdata">Choose any One:</label>
          <select
            name="formdata"
            id="formdata"
            value={formData.formdata}
            onChange={handleChange}
          >
            <option value="">Select any Feeling</option>
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="angry">Angry</option>
            <option value="excited">Excited</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="comments">Comments:</label>
          <textarea
            name="comments"
            id="comments"
            value={formData.comments}
            onChange={handleChange}
            rows="4"
            cols="50"
          />
        </div>
      </form>

      <div>
        <button type="submit">Submit</button>
      </div>
    </div>
  );
}
export default MyForm;
