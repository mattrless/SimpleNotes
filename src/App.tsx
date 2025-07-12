import { useState } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Edit, Delete, Confirm, Cancel, Add } from './icons/Icons'

function App() {
  const [notes, setNotes] = useState([
    { id: 1, title: 'Lorem ipsum dolor sit amet consectetur 1', color: 'bg-amber-200', content: '1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus rem atque maiores sit enim assumenda quos error vel, aliquid ab perspiciatis fugit ad quod. Deserunt doloribus saepe molestiae quas pariatur?' },
    { id: 2, title: 'Lorem ipsum dolor sit amet consectetur 2', color: 'bg-indigo-200', content: '2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus rem atque maiores sit enim assumenda quos error vel, aliquid ab perspiciatis fugit ad quod. Deserunt doloribus saepe molestiae quas pariatur?' },
    { id: 3, title: 'Lorem ipsum dolor sit amet consectetur 3', color: 'bg-blue-200', content: '3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus rem atque maiores sit enim assumenda quos error vel, aliquid ab perspiciatis fugit ad quod. Deserunt doloribus saepe molestiae quas pariatur?' },
    { id: 4, title: 'Lorem ipsum dolor sit amet consectetur 4', color: 'bg-pink-200', content: '4 Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus rem atque maiores sit enim assumenda quos error vel, aliquid ab perspiciatis fugit ad quod. Deserunt doloribus saepe molestiae quas pariatur?' },
    { id: 5, title: 'Lorem ipsum dolor sit amet consectetur 5', color: 'bg-red-200', content: ' 5 Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus rem atque maiores sit enim assumenda quos error vel, aliquid ab perspiciatis fugit ad quod. Deserunt doloribus saepe molestiae quas pariatur?' },
    { id: 6, title: 'Lorem ipsum dolor sit amet consectetur 6', color: 'bg-yellow-200', content: '6 Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus rem atque maiores sit enim assumenda quos error vel, aliquid ab perspiciatis fugit ad quod. Deserunt doloribus saepe molestiae quas pariatur?el, aliquid ab perspiciatis fugit ad quod. Deserunt doloribus saepe molestiae quas pariatur?el, aliquid ab perspiciatis fugit ad quod. Deserunt doloribus saepe molestiae quas pariatur?el, aliquid ab perspiciatis fugit ad quod. Deserunt doloribus saepe molestiae quas pariatur?el, aliquid ab perspiciatis fugit ad quod. Deserunt doloribus saepe molestiae quas pariatur?el, aliquid ab perspiciatis fugit ad quod. Deserunt doloribus saepe molestiae quas pariatur?el, aliquid ab perspiciatis fugit ad quod. Deserunt doloribus saepe molestiae quas pariatur?el, aliquid ab perspiciatis fugit ad quod. Deserunt doloribus saepe molestiae quas pariatur?' },
  ])
  const [isEditing, setIsEditing] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [notesAnimate] = useAutoAnimate({ duration: 400 })
  const [actionsAnimate] = useAutoAnimate()
    
  function moveToShow(noteId: number) {
    const newNotes = notes
    const noteToShow = newNotes.find(note => note.id === noteId)

    if (!noteToShow) return newNotes
    
    const remainingNotes = newNotes.filter(note => note.id !== noteId)

    setNotes([...remainingNotes, noteToShow])    
  }

  function handleDelete(noteId: number) {
    setIsCreating(false)    
    const newNotes = notes.filter(note => note.id !== noteId)
    setNotes(newNotes)
  }

  function handleContentChange(noteId: number, newContent: string) {
    const updatedNotes = notes.map(note => 
      note.id === noteId 
        ? { ...note, content: newContent }
        : note,
    )
    setNotes(updatedNotes)
  }

  function handleTitleChange(noteId: number, newTitle: string) {
    const updatedNotes = notes.map(note => 
      note.id === noteId 
        ? { ...note, title: newTitle }
        : note,
    )
    setNotes(updatedNotes)
  }

  function finishUpdate(noteId: number) {
    const noteToFinish = notes.find(note => note.id === noteId)
      
    if (!noteToFinish || !noteToFinish.title.trim() || !noteToFinish.content.trim()) {
      alert('Please fill in both title and content')
      return
    }
  
    console.log('Note updated:', {
      id: noteId,
      title: noteToFinish.title,
      content: noteToFinish.content,
      color: noteToFinish.color,
    })
    setIsEditing(false)
    setIsCreating(false)

  }

  const AddNoteButton = () => {
    function handleAdd() {
      setNotes([...notes, { id: notes.length + 1, title: '', color: 'bg-green-200', content: '' }])
      setIsCreating(true)
    }

    return (
      <button 
        key={-1}
        onClick={handleAdd}
        className={'relative z-0 duration-300 ease-in-out shadow-xl -mt-8 w-full bg-green-200 px-5 pt-5 pb-12 rounded-2xl overflow-hidden hover:-translate-y-2 transition transform flex items-center justify-center'}        
      >        
        <Add />
      </button>
    )    
  }

  return (
    <main className="flex flex-col gap-18 items-center min-h-screen bg-sky-100">
      <section className="pt-8">
        <h1 className="text-3xl">Note App</h1>
      </section>
      <section className="min-w-8/12 max-w-2xl mx-auto px-2 pb-10">
        <AddNoteButton />
        <div ref={notesAnimate}>
          {
            notes.map((note, index) => {            
              const isLast = index === notes.length - 1
              
              return (
                <div 
                  key={note.id}
                  onClick={!isLast ? () => moveToShow(note.id) : undefined}
                  className={`relative z-10 duration-300 ease-in-out shadow-xl -mt-8 w-full ${note.color} px-5 pt-5 pb-8 last:rounded-2xl rounded-t-2xl overflow-hidden ${isLast ? '' : 'hover:-translate-y-2 transition transform'}`}
                >

                  <div className='flex justify-between mb-6'>
                    {/* TITLE */}
                    <input 
                      type="text" 
                      value={note.title}
                      className="border-transparent focus:outline-none bg-transparent leading-relaxed truncate max-w-2xl w-full"
                      onChange={(e) => handleTitleChange(note.id, e.target.value)}
                      readOnly={!isEditing && !isCreating}
                      placeholder='Title'
                    />
                      
                    {/* ACTIONS */}

                    {isLast && !isCreating && (
                      <div ref={actionsAnimate}>
                        {isEditing ? (
                          <div key="editing" className="flex gap-2">
                            <button onClick={() => finishUpdate(note.id)}>
                              <Confirm />
                            </button>
                            <button onClick={()=> setIsEditing(false)}>
                              <Cancel />
                            </button>
                          </div>
                        ) : (
                          <div key="default" className="flex gap-2">
                            <button onClick={()=> setIsEditing(true)}>
                              <Edit />
                            </button>
                            <button onClick={() => handleDelete(note.id)}>
                              <Delete />
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                    {/* CREATING */}
                    {isLast && isCreating && (
                      <div key="creating" className="flex gap-2">
                        <button onClick={() => finishUpdate(note.id)}>
                          <Confirm />
                        </button>
                        <button onClick={()=> handleDelete(note.id)}>
                          <Cancel />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {/* CONTENT */}                  

                  {
                    isLast &&                                        
                    <textarea
                      className="w-full resize-none border-transparent focus:outline-none bg-transparent leading-relaxed min-h-96"
                      value={note.content}
                      onChange={(e) => handleContentChange(note.id, e.target.value)}
                      readOnly={!isEditing && !isCreating}
                      placeholder='Write your note here...'
                    />
                                          
                  }
                  
                </div>
              )
              
            })
          }
        </div>
      </section>
    </main>
  )
}

export default App