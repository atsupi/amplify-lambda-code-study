/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createContentList = /* GraphQL */ `
  mutation CreateContentList(
    $input: CreateContentListInput!
    $condition: ModelContentListConditionInput
  ) {
    createContentList(input: $input, condition: $condition) {
      id
      bucket
      key
      thumbnailFile
      duration
    }
  }
`;
export const updateContentList = /* GraphQL */ `
  mutation UpdateContentList(
    $input: UpdateContentListInput!
    $condition: ModelContentListConditionInput
  ) {
    updateContentList(input: $input, condition: $condition) {
      id
      bucket
      key
      thumbnailFile
      duration
    }
  }
`;
export const deleteContentList = /* GraphQL */ `
  mutation DeleteContentList(
    $input: DeleteContentListInput!
    $condition: ModelContentListConditionInput
  ) {
    deleteContentList(input: $input, condition: $condition) {
      id
      bucket
      key
      thumbnailFile
      duration
    }
  }
`;
