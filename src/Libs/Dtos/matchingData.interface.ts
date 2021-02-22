export interface IMatcherData {
    id: string;
    avatar: string;
    name: string;
    bio: string;
    age: number;
    gender: number;
}

export interface IMatchingData {
    numSmartChatUsers: number;
    numTraditionalMatchUsers: number;
    nearlyUsers: Array<IMatcherData>
}