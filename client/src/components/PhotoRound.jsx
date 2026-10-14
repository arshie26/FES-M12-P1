import { useState } from 'react';

// Lets the player pick an image, previews it, and hands the image data
// up to App as base64 + mime type when they ask for a question.
export default function PhotoRound({ onSubmit, loading }) {
  const [preview, setPreview] = useState(null);
  const [fileData, setFileData] = useState(null);

  function handleFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      // reader.result is a data URL like "data:image/png;base64,iVBORw0K..."
      // We split it into the mime type and the raw base64 string.
      const [meta, base64] = reader.result.split(',');
      const mimeType = meta.match(/:(.*?);/)[1];
      setPreview(reader.result);
      setFileData({ base64, mimeType });
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="photo-round">
      <input type="file" accept="image/*" onChange={handleFile} />
      {preview && <img className="preview" src={preview} alt="your upload" />}
      <button disabled={!fileData || loading} onClick={() => onSubmit(fileData)}>
        {loading ? 'Thinking…' : 'Make a question from this photo'}
      </button>
    </div>
  );
}
