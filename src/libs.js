const os = require('os');
const path = require('path');
const { Downloader } = require('ytdl-mp3');
const fs = require('fs');
const fspromises = fs.promises;

const getUserDownloadPath = () => {
  const downloadsDir = path.join(path.dirname(__dirname), 'downloads');
  if (!fs.existsSync(downloadsDir)) {
    fs.mkdirSync(downloadsDir);
  }
  return downloadsDir;
}

const getDownloadedSongs = async () => {
  return fspromises.readdir(getUserDownloadPath())
  .then((files) => {
    files = files.map((file) => {
      return path.join(getUserDownloadPath(), file);
    });
    return files;
  })
}

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
}

/**
 * Downloads a song from a Youtube URL
 * @param {*} url Youtube URL
 * @returns Promise<string> Path to the downloaded song
 */
const downloadSongFromUrl = async (url) => {
  const downloader = new Downloader({
    getTags: false, // Enabling may not download all songs
    outputDir: getUserDownloadPath(),
  });
  return downloader.downloadSong(url)
  .then((songPath) => {
    return songPath;
  })
}

module.exports = {
  getUserDownloadPath,
  getDownloadedSongs,
  isValidUrl,
  downloadSongFromUrl,
};