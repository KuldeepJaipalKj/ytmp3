import ytdlp from 'yt-dlp-wrapper';

export default async function handler(req, res) {
  const videoUrl = req.query.videoUrl;

  try {
    const ytdlpInstance = new ytdlp.YtDlp();
    const info = await ytdlpInstance.getInfo(videoUrl);

    // Download the video as MP3
    const output = await ytdlpInstance.download(videoUrl, {
      format: 'bestaudio/best',
      postprocessors: [
        {
          key: 'FFmpegExtractAudio',
          preferredcodec: 'mp3',
          preferredquality: '192',
        },
      ],
    });

    // Return the MP3 file
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Disposition', `attachment; filename="${info.title}.mp3"`);
    res.send(output);
  } catch (error) {
    // Handle error
    res.status(500).json({ error: 'Failed to download video' });
  }
}
