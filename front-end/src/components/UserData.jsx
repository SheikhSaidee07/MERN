import React from "react";

function onUpdate(event) {}
function onDelete(event) {}

export const UserData = () => {
  return (
    <div className="image-card">
      <img src={""} alt={""} />
      <div className="image-info">
        <div className="image-tags">
          <span>Tags: {}</span>
        </div>
        <div className="image-comments">
          <span>Comments: {}</span>
        </div>
      </div>
      <div className="image-actions">
        <button onClick={() => onUpdate()}>Update</button>
        <button onClick={() => onDelete()}>Delete</button>
      </div>
    </div>
  );
};
