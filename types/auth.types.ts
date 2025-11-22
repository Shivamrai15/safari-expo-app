export type User = {
    tokens : {
        accessToken : string;
        refreshToken : string;
    };
    user : {
        id : string;
        email : string;
        name : string;
        image ?: string;
        emailVerified : boolean;
        createdAt : string;
    }
}

export type Ad = {
    id : string
    name : string
    color : string
    image : string
    url : string
    duration : number
}