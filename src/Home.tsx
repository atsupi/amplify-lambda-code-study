import { Authenticator } from "@aws-amplify/ui-react";
import { AltItem } from "./types";
import { ContentItem } from "./ContentItem";
import { useEffect, useState } from "react";
import { ContentList } from "./API";
import { GetAllContentListValue, getAllContentList } from "./Utils";

export function Home() {
  const [contentList, setContentList] = useState<Array<ContentList>>();
  let index = 0;

  useEffect(() => {
    getAllContentList().then((data: GetAllContentListValue | any) => {
      if (data) setContentList(data.data.listContentLists.items);
    });
  }, []);

  return (
    <Authenticator>
      <div className="Home" key="Home_Wrapper">
        {contentList &&
          contentList.map((item) => {
            const alt_item: AltItem = {
              indexNum: index,
              ...item,
              thumbnailUrl: "",
            };
            index = index + 1;
            return (
              <div className="Item_Wrapper" key={alt_item.id}>
                <ContentItem item={alt_item} />
              </div>
            );
          })}
      </div>
    </Authenticator>
  );
}
