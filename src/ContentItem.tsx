import { useEffect, useState } from "react";
import { AltItem } from "./types";
import { NavLink } from "react-router-dom";
import { S3KeyParams, getPresignedUrl } from "./Utils";

type Props = {
  item: AltItem;
};

export const ContentItem = (props: Props): JSX.Element => {
  const [url, setUrl] = useState("");
  const { item } = props;

  useEffect(() => {
    const param: S3KeyParams = {
      Bucket: item.bucket,
      Key: item.thumbnailFile,
    };
    getPresignedUrl(param).then((data) => {
      setUrl(data);
    });
  }, []);

  return (
    <>
      <div className="Item">
        <p>{item.indexNum}</p>
        <p>{item.id}</p>
        <p>{item.bucket}</p>
        <p>{item.key}</p>
        <p>{item.thumbnailFile}</p>
        <p>{item.duration}</p>
        <NavLink to={`/detail/${item.indexNum}`}>
          {url ? <img src={url} width="120" height="160" /> : <p>No Image</p>}
        </NavLink>
      </div>
    </>
  );
};
