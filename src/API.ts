/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateContentListInput = {
  id?: string | null,
  bucket: string,
  key: string,
  thumbnailFile: string,
  duration: string,
};

export type ModelContentListConditionInput = {
  bucket?: ModelStringInput | null,
  key?: ModelStringInput | null,
  thumbnailFile?: ModelStringInput | null,
  duration?: ModelStringInput | null,
  and?: Array< ModelContentListConditionInput | null > | null,
  or?: Array< ModelContentListConditionInput | null > | null,
  not?: ModelContentListConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ContentList = {
  __typename: "ContentList",
  id: string,
  bucket: string,
  key: string,
  thumbnailFile: string,
  duration: string,
};

export type UpdateContentListInput = {
  id: string,
  bucket?: string | null,
  key?: string | null,
  thumbnailFile?: string | null,
  duration?: string | null,
};

export type DeleteContentListInput = {
  id: string,
};

export type ModelContentListFilterInput = {
  id?: ModelIDInput | null,
  bucket?: ModelStringInput | null,
  key?: ModelStringInput | null,
  thumbnailFile?: ModelStringInput | null,
  duration?: ModelStringInput | null,
  and?: Array< ModelContentListFilterInput | null > | null,
  or?: Array< ModelContentListFilterInput | null > | null,
  not?: ModelContentListFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelContentListConnection = {
  __typename: "ModelContentListConnection",
  items:  Array<ContentList | null >,
  nextToken?: string | null,
};

export type CreateContentListMutationVariables = {
  input: CreateContentListInput,
  condition?: ModelContentListConditionInput | null,
};

export type CreateContentListMutation = {
  createContentList?:  {
    __typename: "ContentList",
    id: string,
    bucket: string,
    key: string,
    thumbnailFile: string,
    duration: string,
  } | null,
};

export type UpdateContentListMutationVariables = {
  input: UpdateContentListInput,
  condition?: ModelContentListConditionInput | null,
};

export type UpdateContentListMutation = {
  updateContentList?:  {
    __typename: "ContentList",
    id: string,
    bucket: string,
    key: string,
    thumbnailFile: string,
    duration: string,
  } | null,
};

export type DeleteContentListMutationVariables = {
  input: DeleteContentListInput,
  condition?: ModelContentListConditionInput | null,
};

export type DeleteContentListMutation = {
  deleteContentList?:  {
    __typename: "ContentList",
    id: string,
    bucket: string,
    key: string,
    thumbnailFile: string,
    duration: string,
  } | null,
};

export type GetContentListQueryVariables = {
  id: string,
};

export type GetContentListQuery = {
  getContentList?:  {
    __typename: "ContentList",
    id: string,
    bucket: string,
    key: string,
    thumbnailFile: string,
    duration: string,
  } | null,
};

export type ListContentListsQueryVariables = {
  filter?: ModelContentListFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListContentListsQuery = {
  listContentLists?:  {
    __typename: "ModelContentListConnection",
    items:  Array< {
      __typename: "ContentList",
      id: string,
      bucket: string,
      key: string,
      thumbnailFile: string,
      duration: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateContentListSubscription = {
  onCreateContentList?:  {
    __typename: "ContentList",
    id: string,
    bucket: string,
    key: string,
    thumbnailFile: string,
    duration: string,
  } | null,
};

export type OnUpdateContentListSubscription = {
  onUpdateContentList?:  {
    __typename: "ContentList",
    id: string,
    bucket: string,
    key: string,
    thumbnailFile: string,
    duration: string,
  } | null,
};

export type OnDeleteContentListSubscription = {
  onDeleteContentList?:  {
    __typename: "ContentList",
    id: string,
    bucket: string,
    key: string,
    thumbnailFile: string,
    duration: string,
  } | null,
};
