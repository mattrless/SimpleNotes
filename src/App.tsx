import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useNotes } from './hooks/useNotes'
import { AddNoteButton } from './components/AddNoteButton'
import { Header } from './components/Header'
import { NoteCard } from './components/NoteCard'
import type { JSX } from 'react'

function App(): JSX.Element {
  const [notesAnimate] = useAutoAnimate({ duration: 400 })  
  const {
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
  } = useNotes()

  return (
    <main className="flex flex-col gap-18 items-center min-h-screen bg-sky-100">
      <Header />
      <section className="min-w-8/12 max-w-2xl mx-auto px-2 pb-10">
        <AddNoteButton onClick={handleAddNote} />
        <div ref={notesAnimate}>
          {
            displayNotes.map((note, index) => {
              const isLast = index === displayNotes.length - 1

              return (
                <NoteCard
                  key={note.id}
                  note={note}
                  isLast={isLast}
                  isEditing={isEditing}
                  isCreating={isCreating}
                  onMoveToShow={moveToShow}
                  onTitleChange={handleTitleChange}
                  onContentChange={handleContentChange}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  onCancelEdit={handleCancelEdit}
                  onFinishUpdate={finishUpdate}
                />
              )
            })
          }
        </div>
      </section>
    </main>
  )
}

export default App