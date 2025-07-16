import { useState } from 'react'
import './App.css'
import { Button } from '@mui/material'
import ImageUploader from './components/ImageUploader'

function App() {
  const [count, setCount] = useState(0)
  const [imageData, setImageData] = useState(null)

  const handleImageInsert = (data) => {
    setImageData(data)
  }

  const getImageSize = (size) => {
    switch (size) {
      case 'small': return 'w-32'
      case 'medium': return 'w-64'
      case 'large': return 'w-96'
      default: return 'w-64'
    }
  }

  const getImageAlignment = (align) => {
    switch (align) {
      case 'left': return 'justify-start'
      case 'right': return 'justify-end'
      case 'center': return 'justify-center'
      default: return 'justify-center'
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <h1 className='text-3xl font-bold text-yellow-300 mb-4'>
          ¡Probando!
        </h1>
        <Button variant='contained' color='primary'>
          ¡Click aquí!
        </Button>
      </div>

      <div className="min-h-screen p-8 bg-gray-100 text-gray-800">
        <h1 className="text-3xl font-bold mb-4 text-center">Editor de imágenes</h1>
        <ImageUploader onInsert={handleImageInsert} />

        {imageData && (
          <div className={`flex ${getImageAlignment(imageData.align)} mt-6`}>
            <img
              src={imageData.src}
              alt={imageData.alt}
              className={`${getImageSize(imageData.size)} rounded shadow`}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default App

