import { Button } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { ContentList } from "./API";
import {
  GetAllContentListValue,
  S3KeyParams,
  getAllContentList,
  getPresignedUrl,
} from "./Utils";

export function ContentDetail() {
  const [contentList, setContentList] = useState<ContentList>();
  const [url, setUrl] = useState("");
  const { id } = useParams();
  const indexNum = Number(id) || 0;

  useEffect(() => {
    getAllContentList().then((data: GetAllContentListValue | any) => {
      if (data) {
        const item: ContentList = data.data.listContentLists.items[indexNum];
        setContentList(item);
        const param: S3KeyParams = {
          Bucket: item.bucket,
          Key: item.key,
        };
        getPresignedUrl(param).then((data) => {
          setUrl(data);
        });
      }
    });
  }, []);

  return (
    <>
      <p>{contentList?.key}</p>
      {url !== "" && (
        <div className="Video_Wrapper">
          <video controls playsInline src={url} itemType="video/mp4" width="300" height="400">
            Not supported format
          </video>{" "}
          : `${contentList?.key}
        </div>
      )}
      <NavLink to="/">
        <Button>Back</Button>
      </NavLink>
    </>
  );
}
