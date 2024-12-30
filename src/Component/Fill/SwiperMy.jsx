import React, { useState } from "react";

const SwiperMy = ({ value }) => {
  const [image, setImg] = useState ([value])
  return (
    <div className="kbfvbmvnswipercss">
      {image.map((item) => (
        <div key={item._id} className="jshkjsswipehere">
          <img src={item ? URL.createObjectURL(item):null} alt="" />
        </div>
      ))}
    </div>
  );
};

export default SwiperMy;