/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getContentList = /* GraphQL */ `
  query GetContentList($id: ID!) {
    getContentList(id: $id) {
      id
      bucket
      key
      thumbnailFile
      duration
    }
  }
`;
export const listContentLists = /* GraphQL */ `
  query ListContentLists(
    $filter: ModelContentListFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContentLists(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        bucket
        key
        thumbnailFile
        duration
      }
      nextToken
    }
  }
`;
