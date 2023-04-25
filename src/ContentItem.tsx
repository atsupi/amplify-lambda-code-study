import { useEffect, useState } from "react";
import { Storage } from 'aws-amplify';
import { ContentList } from "./API";

type S3KeyParams = {
  Key: string;
  Bucket: string;
};

async function getPresignedUrl(params: S3KeyParams) {
  const presignedUrl = Storage.get(params.Key, {level: "public"});
  return presignedUrl;
}

type Props = {
  item: ContentList;
}

export const ContentItem = (props: Props): JSX.Element => {
  const [url, setUrl] = useState("");
  const {item} = props;

  useEffect(() => {
    const param: S3KeyParams = {
      Bucket: item.bucket,
      Key: item.thumbnailFile
    };
    getPresignedUrl(param).then((data) => {
      setUrl(data);
    });
  }, []);

  return (
    <>
      <div className="Item">
        <p>{item.id}</p>
        <p>{item.bucket}</p>
        <p>{item.key}</p>
        <p>{item.thumbnailFile}</p>
        <p>{item.duration}</p>
        {url ? <img src={url} width="120" height="160" /> : <p>No Image</p>}
      </div>
    </>
  )
}
