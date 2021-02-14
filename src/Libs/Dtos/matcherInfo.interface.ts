export interface IMatcherMedia {
    type: number,
    url: string;
}

export interface IMatcherInfo {
    matcherId: string;
    name: string;
    age: number;
    gender: number;
    address: string;
    job: string;
    reason: string;
    status: number;
    medias: Array<IMatcherMedia>;
}