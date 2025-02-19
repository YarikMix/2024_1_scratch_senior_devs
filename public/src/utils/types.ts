export type NoteType = {
    id: string,
    parent: string,
    children: SubNoteType[],
    tags: string[],
    data: {
        title: string
        content: any[],
    },
    update_time: string,
    owner_id: string
}

export type NoteDataType = {
    title: string
    content: any[],
}

export type SubNoteType = {
    id: string,
    title: string
}
