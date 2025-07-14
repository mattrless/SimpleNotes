import { Edit, Delete, Confirm, Cancel } from '../icons/Icons'
import { BG_CLASSES, BORDER_CLASSES } from '../constants'
import type { NoteCardProps } from '../interfaces/note'
import { useAutoAnimate } from '@formkit/auto-animate/react'

export function NoteCard({
  note,
  isLast,
  isEditing,
  isCreating,
  onMoveToShow,
  onTitleChange,
  onContentChange,
  onDelete,
  onEdit,
  onCancelEdit,
  onFinishUpdate,
}: NoteCardProps) {
  const [actionsAnimate] = useAutoAnimate()

  return (
    <div
      key={note.id}
      onClick={!isLast ? () => onMoveToShow(note.id) : undefined}
      className={`border-2 ${BORDER_CLASSES[note.color]} ${BG_CLASSES[note.color]} relative z-10 duration-300 ease-in-out shadow-xl -mt-8 w-full px-5 pt-5 pb-8 last:rounded-2xl rounded-t-2xl overflow-hidden ${isLast ? '' : 'hover:-translate-y-2 transition transform'}`}
    >
      <div className="flex justify-between mb-6">
        <input
          type="text"
          value={note.title}
          className="border-transparent focus:outline-none bg-transparent leading-relaxed truncate max-w-2xl w-full"
          onChange={(e) => onTitleChange(note.id, e.target.value)}
          readOnly={!isEditing && !isCreating}
          placeholder="Title"
        />

        {isLast && (
          <div ref={actionsAnimate}>
            {isCreating ? (
              <div key="creating" className="flex gap-2">
                <button onClick={() => onFinishUpdate(note.id)}>
                  <Confirm />
                </button>
                <button onClick={() => onDelete(note.id)}>
                  <Cancel />
                </button>
              </div>
            ) : isEditing ? (
              <div key="editing" className="flex gap-2">
                <button onClick={() => onFinishUpdate(note.id)}>
                  <Confirm />
                </button>
                <button onClick={() => onCancelEdit(note.id)}>
                  <Cancel />
                </button>
              </div>
            ) : (
              <div key="default" className="flex gap-2">
                <button onClick={() => onEdit(note.id)}>
                  <Edit />
                </button>
                <button onClick={() => onDelete(note.id)}>
                  <Delete />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {isLast && (
        <textarea
          className="w-full resize-none border-transparent focus:outline-none bg-transparent leading-relaxed min-h-96"
          value={note.content}
          onChange={(e) => onContentChange(note.id, e.target.value)}
          readOnly={!isEditing && !isCreating}
          placeholder="Write your note here..."
        />
      )}
    </div>
  )
}
