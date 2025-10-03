import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [conversionStatus, setConversionStatus] = useState('');

  const handleConvertToMp3 = async () => {
    try {
      const response = await fetch(`/api/convertToMp3?url=${youtubeUrl}`);
      const data = await response.json();

      if (data.message) {
        setConversionStatus('MP3 conversion successful!');
      } else {
        setConversionStatus('Failed to convert to MP3');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Head>
        <title>YouTube to MP3 Converter</title>
      </Head>
      <main>
        <h1>YouTube to MP3 Converter</h1>
        <input
          type="text"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          placeholder="Enter YouTube URL"
        />
        <button onClick={handleConvertToMp3}>Convert to MP3</button>
        <p>{conversionStatus}</p>
      </main>
    </div>
  );
}
