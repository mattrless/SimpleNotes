import { useEffect, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchNotes, updateNotes } from '../services/notes'
import { toast } from 'react-hot-toast'
import type { Note } from '../interfaces/note'
import { BG_CLASSES } from '../constants'

export function useNotes() {
  const [displayNotes, setDisplayNotes] = useState<Note[]>([])
  const [originalCurrentNote, setOriginalCurrentNote] = useState<Note>()
  const [isEditing, setIsEditing] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const queryClient = useQueryClient()

  const { data: notes = [] } = useQuery<Note[]>({
    queryKey: ['notes'],
    queryFn: fetchNotes,
  })

  const updateNotesMutation = useMutation({
    mutationFn: updateNotes,
    onSuccess: (data) => {
      queryClient.setQueryData(['notes'], data)
      console.log('Notes updated successfully')
    },
    onError: (error) => {
      console.error('Error updating notes:', error)
      toast.error('Error updating notes')
    },
  })

  useEffect(() => {
    if (notes.length > 0) {
      setDisplayNotes(notes)
    }
  }, [notes])

  const moveToShow = (noteId: number) => {
    const noteToShow = displayNotes.find(note => note.id === noteId)
    if (!noteToShow) return

    const remainingNotes = displayNotes.filter(note => note.id !== noteId)
    setDisplayNotes([...remainingNotes, noteToShow])
  }

  const handleDelete = (noteId: number) => {
    const updatedNotes = displayNotes.filter(note => note.id !== noteId)
    setDisplayNotes(updatedNotes)
    updateNotesMutation.mutate(updatedNotes)

    toast.success(isCreating ? 'Discarded note' : 'Note deleted')
    setIsCreating(false)
  }

  const handleContentChange = (noteId: number, newContent: string) => {
    setDisplayNotes(prev =>
      prev.map(note => note.id === noteId ? { ...note, content: newContent } : note),
    )
  }

  const handleTitleChange = (noteId: number, newTitle: string) => {
    setDisplayNotes(prev =>
      prev.map(note => note.id === noteId ? { ...note, title: newTitle } : note),
    )
  }

  const finishUpdate = (noteId: number) => {
    const note = displayNotes.find(note => note.id === noteId)
    if (!note || !note.title.trim() || !note.content.trim()) {
      toast.error('Please complete your note before saving')
      return
    }

    const updatedNotes = displayNotes.map(n =>
      n.id === noteId ? { ...n, title: note.title, content: note.content } : n,
    )

    setDisplayNotes(updatedNotes)
    updateNotesMutation.mutate(updatedNotes)
    setIsEditing(false)
    setIsCreating(false)
    toast.success('Note saved')
  }

  const handleEdit = (noteId: number) => {
    const note = displayNotes.find(note => note.id === noteId)
    setOriginalCurrentNote(note)
    setIsEditing(true)
  }

  const handleCancelEdit = (noteId: number) => {
    if (!originalCurrentNote || originalCurrentNote.id !== noteId) return

    setDisplayNotes(prev =>
      prev.map(note => note.id === noteId ? originalCurrentNote : note),
    )
    setIsEditing(false)
    setOriginalCurrentNote(undefined)
  }

  const handleAddNote = () => {
    const colors = Object.keys(BG_CLASSES)
    const newColor = colors[Math.floor(Math.random() * colors.length)]
    const newNote: Note = {
      id: displayNotes.length + 1,
      title: '',
      content: '',
      color: newColor,
    }
    setDisplayNotes([...displayNotes, newNote])
    setIsCreating(true)
  }

  return {
    displayNotes,
    isEditing,
    isCreating,
    moveToShow,
    handleAddNote,
    handleDelete,
    handleEdit,
    handleCancelEdit,
    handleContentChange,
    handleTitleChange,
    finishUpdate,
  }
}