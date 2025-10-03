import { NextApiRequest, NextApiResponse } from 'next';
import { spawn } from 'child_process';

const convertToMp3 = async (req: NextApiRequest, res: NextApiResponse) => {
  const youtubeUrl = req.query.url;

  if (!youtubeUrl) {
    return res.status(400).json({ error: 'YouTube URL is required' });
  }

  try {
    const ytDlp = spawn('npx', ['yt-dlp', '-x', '--audio-format', 'mp3', youtubeUrl]);

    ytDlp.stdout.on('data', (data) => {
      console.log(`Received chunk of data: ${data}`);
    });

    ytDlp.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    ytDlp.on('close', (code) => {
      if (code === 0) {
        res.json({ message: 'MP3 conversion successful' });
      } else {
        res.status(500).json({ error: 'Failed to convert to MP3' });
      }
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to convert to MP3', details: error });
  }
};

export default convertToMp3;
