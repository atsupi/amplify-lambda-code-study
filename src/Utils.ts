import { API, Storage, graphqlOperation } from "aws-amplify";
import { listContentLists } from "./graphql/queries";
import { ContentList } from "./API";

export type S3KeyParams = {
    Key: string;
    Bucket: string;
};

export async function getPresignedUrl(params: S3KeyParams) {
    const presignedUrl = Storage.get(params.Key, { level: "public" });
    return presignedUrl;
}

export type GetAllContentListValue = {
    data: { listContentLists: { items: Array<ContentList> } };
};

export const getAllContentList = async () => {
    const allContentList = await API.graphql(
        graphqlOperation(listContentLists)
    );
    return allContentList;
};

