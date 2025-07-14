import { Add } from '../icons/Icons'
import type { AddNoteButtonProps } from '../interfaces/note'

export function AddNoteButton({ onClick }: AddNoteButtonProps) {
  return (
    <button 
      onClick={onClick}
      className="relative z-0 duration-300 ease-in-out shadow-xl -mt-8 w-full bg-green-200 px-5 pt-5 pb-12 rounded-2xl overflow-hidden hover:-translate-y-2 transition transform flex items-center justify-center"
    >
      <Add />
    </button>
  )
}
