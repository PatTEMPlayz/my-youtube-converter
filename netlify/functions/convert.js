const ytdl = require('ytdl-core'); // Import ytdl-core to fetch YouTube videos

exports.handler = async function(event, context) {
  const { url } = JSON.parse(event.body);  // Parse the URL from the POST request

  if (!url) {
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, message: "URL is required" })
    };
  }

  try {
    // Fetch video info from YouTube
    const info = await ytdl.getInfo(url);
    const videoFormat = ytdl.chooseFormat(info.formats, { quality: 'highestvideo' });

    // In a real implementation, you'd download or store the video here.
    // For now, return the URL to stream the video in the chosen format.
    const downloadUrl = videoFormat.url;

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, downloadUrl })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: error.message })
    };
  }
};
