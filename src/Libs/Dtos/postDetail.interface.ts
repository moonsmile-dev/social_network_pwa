export interface IPostMedia {
    url: string;
    type: string;
}

export interface IUserComment {
    id: string;
    content: string;
    accountId: string;
}

export interface IUserReact {
    type: string;
    accountIds: Array<string>;
}

export interface IPostDetail {
    id: string;
    content: string;
    medias: Array<IPostMedia>;
    userCommentCount: number;
    userReactCount: number;
    userComments: Array<IUserComment>;
    userReacts: Array<IUserReact>;
}

