export interface createdAt {
    nanoseconds: number
    seconds: number
}
export interface elementFields extends contentFields {
    category: string //'spins'
    status: string // done
}
export interface contentFields {
    type: string // 'element' https://stackoverflow.com/questions/50376977/generic-type-to-get-enum-keys-as-union-string-in-typescript
    title: string
    description: string
    id: string
    createdAt: createdAt
}
export interface goalFields extends contentFields {
    deadline: string
    isDone: boolean
}
export interface activity {
    name: string,
    completed: number
    planned: number
}
export interface weekEdges {
    weekStart: number | Date,
    weekEnd: number | Date,
}
export interface trainingWeek {
    createdAt: createdAt
    activities: activity[]
    uid: string
    id: string
    weekEdges: weekEdges
}

export interface weekProps {
    week: trainingWeek
    setWeek: (week: trainingWeek) => void
    postPlanned: () => void
    postCompleted: () => void
}
export interface stateLocation extends Location {
    state: {
        from?: string
    }
}