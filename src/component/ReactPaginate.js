import React, { useEffect, useState } from "react";
import axios from "axios";
import Page from "./Page";

export default function ReactPaginate() {
  const [image, setImage] = useState();
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/photos");
    setImage(res?.data);
  };
  // console.log(image);
  return (
    <>
      {image?.map((item, i) => (
        <div key={item?.id}>
          <h3>Item #{i + 1}</h3>
          <img src={item?.thumbnailUrl} alt="dfgh" />
        </div>
      ))}
      <Page  data={image} />
    </>
  );
}
