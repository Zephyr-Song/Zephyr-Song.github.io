const https = require('https');

const url = 'https://music.163.com/api/playlist/detail?id=2829883282';
const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Referer': 'https://music.163.com/',
    'Accept': 'application/json'
  }
};

const req = https.get(url, options, (res) => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    try {
      const d = JSON.parse(data);
      const tracks = d.result && d.result.tracks ? d.result.tracks : [];
      console.log('TOTAL:' + tracks.length);
      console.log('PLAYLIST_NAME:' + (d.result ? d.result.name : 'unknown'));
      tracks.slice(0, 30).forEach((t, i) => {
        const artists = t.artists.map(a => a.name).join(',');
        const al = t.album ? t.album.name : '';
        console.log((i+1) + '. ' + t.name + '|' + artists + '|' + t.id + '|' + al);
      });
      // Save all to file
      const fs = require('fs');
      fs.writeFileSync('D:/hugo/Zephyr-Song.github.io/playlist_raw.json', JSON.stringify(d, null, 2), 'utf8');
      console.log('SAVED to playlist_raw.json');
    } catch(e) {
      console.log('PARSE_ERR:' + e.message);
      console.log('RAW:' + data.slice(0, 200));
    }
  });
});

req.on('error', e => console.log('REQ_ERR:' + e.message));
req.setTimeout(10000, () => { req.destroy(); console.log('TIMEOUT'); });