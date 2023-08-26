import { useState } from "react";

function Filter({ filterValue, setFilterValue }) {
  const category = ["all", "happy", "sad", "angry", "excited"];

  return (
    <div className="filter-wrapper">
      <label htmlFor="filter-category " className="filter">
        Filter by Category
      </label>
      <select
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
        id="filter-category"
        className="filter-select"
      >
        {category.map((ele) => (
          <option value={ele} key={ele}>
            {ele}
          </option>
        ))}
      </select>
    </div>
  );
}
export default Filter;
