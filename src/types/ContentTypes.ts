export interface createdAt {
    nanoseconds: number
    seconds: number
}

export interface elementFields extends contentFields {
    category: string, //'spins'
    status: string, // done
}
export interface contentFields {
    type: string, // 'element' https://stackoverflow.com/questions/50376977/generic-type-to-get-enum-keys-as-union-string-in-typescript
    title: string,
    description: string,
    id: string
    createdAt: createdAt,
}

export interface goalFields extends contentFields {
    deadline: string,
    isDone: boolean,
}