import { useState } from 'react'
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material'

function ImageUploader({ onInsert }) {
  const [imageFile, setImageFile] = useState(null)
  const [imageUrl, setImageUrl] = useState('')
  const [altText, setAltText] = useState('')
  const [align, setAlign] = useState('center')
  const [size, setSize] = useState('medium')

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.size <= 10 * 1024 * 1024) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImageFile(e.target.result)
        setImageUrl('')
      }
      reader.readAsDataURL(file)
    } else {
      alert('La imagen debe ser menor a 10MB')
    }
  }

  const handleUrlChange = (e) => {
    setImageUrl(e.target.value)
    setImageFile(null)
  }

  const handleInsert = () => {
    const src = imageFile || imageUrl
    if (!src) return alert('Por favor, sube una imagen o pega una URL válida.')

    onInsert({
      src,
      alt: altText,
      align,
      size,
    })

    // reset form
    setImageFile(null)
    setImageUrl('')
    setAltText('')
    setAlign('center')
    setSize('medium')
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto my-6">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <TextField
        label="URL externa"
        value={imageUrl}
        onChange={handleUrlChange}
        fullWidth
      />
      <TextField
        label="Texto alternativo"
        value={altText}
        onChange={(e) => setAltText(e.target.value)}
        fullWidth
      />
      <FormControl fullWidth>
        <InputLabel>Alinación</InputLabel>
        <Select value={align} onChange={(e) => setAlign(e.target.value)}>
          <MenuItem value="left">Izquierda</MenuItem>
          <MenuItem value="center">Centrada</MenuItem>
          <MenuItem value="right">Derecha</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Tamaño</InputLabel>
        <Select value={size} onChange={(e) => setSize(e.target.value)}>
          <MenuItem value="small">Pequeña</MenuItem>
          <MenuItem value="medium">Mediana</MenuItem>
          <MenuItem value="large">Grande</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleInsert}>
        Insertar Imagen
      </Button>
    </div>
  )
}

export default ImageUploader