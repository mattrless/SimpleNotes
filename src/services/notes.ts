import axios from 'axios'
import type { Note } from '../interfaces/note'

export async function fetchNotes(): Promise<Note[]> {
  try {
    const response = await axios.get(
      import.meta.env.VITE_API_URL, {
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': import.meta.env.VITE_API_MASTER_KEY,
        },
      },
    )

    const notes: Note[] = response.data?.record

    if (!notes || !Array.isArray(notes)) {
      throw new Error('Notes not found')
    }  
    
    return notes
  } catch (error) {
    console.error('Error fetching notes:', error)
    throw new Error('Error fetching notes')
  }
}

export async function updateNotes(notes: Note[]): Promise<Note[]> {
  const response = await axios.put(
    import.meta.env.VITE_API_URL,
    notes,
    {
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': import.meta.env.VITE_API_MASTER_KEY,
      },
    },
  )

  if (!response.data || !Array.isArray(response.data.record)) {
    throw new Error('Error updating notes')
  }

  console.log('UPDATED notes in JSONBin')
  return response.data.record
}
