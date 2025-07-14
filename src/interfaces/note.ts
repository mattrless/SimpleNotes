export interface Note {
    id:      number
    title:   string
    color:   string
    content: string
}

export interface NoteCardProps {
  note: Note
  isLast: boolean
  isEditing: boolean
  isCreating: boolean
  onMoveToShow: (noteId: number) => void
  onTitleChange: (noteId: number, title: string) => void
  onContentChange: (noteId: number, content: string) => void
  onDelete: (noteId: number) => void
  onEdit: (noteId: number) => void
  onCancelEdit: (noteId: number) => void
  onFinishUpdate: (noteId: number) => void
}

export interface AddNoteButtonProps {
  onClick: () => void
}