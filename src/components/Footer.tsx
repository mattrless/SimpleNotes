import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-2 left-2 text-xs text-gray-500 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-md shadow-md">
      <p>
        Made by <span className="font-semibold">Carlos Cárcamo</span> —{' '}
        <a
          href="https://github.com/mattrless/SimpleNotes"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Source code
        </a>
      </p>
    </footer>
  )
}

export default Footer
