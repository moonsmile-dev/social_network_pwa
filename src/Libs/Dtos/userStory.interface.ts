export interface StoryMediaDto {
    mediaUrl: string;
    id: string;
}

export interface UserStoryDto {
    id: string;
    name: string;
    mediaDatas: Array<StoryMediaDto>;
}