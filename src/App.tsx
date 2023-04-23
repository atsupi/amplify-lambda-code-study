import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { API, graphqlOperation } from "aws-amplify";
import { listContentLists } from "./graphql/queries";
import { ContentList } from "./API";
import { Authenticator } from "@aws-amplify/ui-react";

function App() {
  const [count, setCount] = useState(0);
  const [contentList, setContentList] = useState<Array<ContentList>>();

  const getAllContentList = async () => {
    const allContentList = await API.graphql(
      graphqlOperation(listContentLists)
    );
    return allContentList;
  };
  useEffect(() => {
    getAllContentList().then((data) => {
      console.log(data.data.listContentLists.items);
      setContentList(data.data.listContentLists.items);
    });
  }, []);

  return (
    <>
      <Authenticator>
        <div className="App">
          {contentList &&
            contentList.map((item) => {
              return (
                <>
                  <p>{item.id}</p>
                  <p>{item.bucket}</p>
                  <p>{item.key}</p>
                  <p>{item.thumbnailFile}</p>
                  <p>{item.duration}</p>
                </>
              );
            })}
        </div>
      </Authenticator>
    </>
  );
}

export default App;
