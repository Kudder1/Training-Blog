export interface createdAt {
    nanoseconds: number
    seconds: number
}

export interface contentFields {
    type: string, // 'element' https://stackoverflow.com/questions/50376977/generic-type-to-get-enum-keys-as-union-string-in-typescript
    category: string, //'spins'
    title: string,
    description: string,
    status: string, // done
    id: string
    createdAt: createdAt,
}

export interface goalFields extends contentFields {
    deadline: string,
    isDone: boolean,
}