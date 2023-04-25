import { useEffect, useState } from "react";
import "./App.css";
import { API, graphqlOperation } from "aws-amplify";
import { listContentLists } from "./graphql/queries";
import { ContentList } from "./API";
import { Authenticator } from "@aws-amplify/ui-react";
import { ContentItem } from "./ContentItem";
import { AltItem } from "./types";

function App() {
  const [contentList, setContentList] = useState<Array<ContentList>>();

  const getAllContentList = async () => {
    const allContentList = await API.graphql(
      graphqlOperation(listContentLists)
    );
    return allContentList;
  };
  useEffect(() => {
    getAllContentList().then((data: {data: {listContentLists: {items: Array<ContentList>} } } | any ) => {
      if ( data )
        setContentList(data.data.listContentLists.items);
    });
  }, []);

  return (
    <>
      <Authenticator>
        <div className="App">
          {contentList &&
            contentList.map((item) => {
              const alt_item: AltItem = {
                ...item,
                thumbnailUrl: "",
              };
              // const alt_item: AltItem  = {
              //   id: item.id,
              //   key: item.key,
              //   bucket: item.bucket,
              //   duration: item.duration,
              //   thumbnailFile: item.thumbnailFile,
              //   thumbnailUrl: ""
              // }
              return (
                <>
                  <div className="Item_Wrapper" key={alt_item.id}>
                    <ContentItem item={alt_item} key={alt_item.id}/>
                  </div>
                </>
              );
            })}
        </div>
      </Authenticator>
    </>
  );
}

export default App;
