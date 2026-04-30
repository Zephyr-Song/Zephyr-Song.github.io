const d = require('./playlist_data.json');
console.log('Playlist:', d.name);
console.log('Songs:', d.tracks.length);
d.tracks.forEach((t, i) => {
  const artists = t.artists.map(a => a.name).join(',');
  const m = t.mMusic || t.bMusic;
  const bitrate = m ? m.bitrate : 'N/A';
  console.log((i+1) + '. ' + t.name + ' | ' + artists + ' | ' + t.id + ' | ' + bitrate);
});

// Generate APlayer song list
console.log('\n--- APlayer songs array ---');
const songs = d.tracks.map(t => ({
  name: t.name,
  artist: t.artists.map(a => a.name).join(', '),
  url: 'https://music.163.com/song/media/outer/url?id=' + t.id + '.mp3',
  lrc: 'https://gc.ihcr.top/lrc?id=' + t.id,
  theme: '#1db969'
}));
console.log(JSON.stringify(songs, null, 2));