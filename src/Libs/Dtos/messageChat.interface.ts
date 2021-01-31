export interface IMediaMessage {
    url: string;
    type: string;
}
export interface IMessageChat {
    id: string;
    senderId: string;
    content: string;
    createdAt: Date;
    mediaData: Array<IMediaMessage>;
}
