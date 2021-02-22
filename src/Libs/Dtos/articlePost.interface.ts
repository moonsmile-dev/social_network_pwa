export interface IMediaPost {
    url: string;
    type: string;
}

export interface IArticlePost {
    id: string;
    accountId: string;
    content: string;
    medias: Array<IMediaPost>;
    userReactCount: number;
    userCommentCount: number;
    reactStatus: string;
}
