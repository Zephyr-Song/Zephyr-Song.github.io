const https = require('https');

function fetchPlaylist(id, retries = 3) {
  return new Promise((resolve) => {
    const doReq = (attempt) => {
      const options = {
        hostname: 'music.163.com',
        path: '/api/playlist/detail?id=' + id + '&csrf_token=',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Referer': 'https://music.163.com/',
          'Accept': '*/*',
          'Accept-Language': 'zh-CN,zh;q=0.9'
        },
        timeout: 12000
      };

      const req = https.get(options, (res) => {
        let data = '';
        res.on('data', c => data += c);
        res.on('end', () => {
          try {
            const j = JSON.parse(data);
            if (j.code === 200 && j.result && j.result.tracks && j.result.tracks.length > 0) {
              console.log('SUCCESS! Playlist:', j.result.name, 'Total songs:', j.result.tracks.length);
              j.result.tracks.forEach((t, i) => {
                const artists = t.artists.map(a => a.name).join(',');
                console.log((i+1) + '. ' + t.name + '|' + artists + '|' + t.id);
              });
              // Write to file
              const fs = require('fs');
              fs.writeFileSync('D:/hugo/Zephyr-Song.github.io/playlist_data.json', JSON.stringify(j.result, null, 2), 'utf8');
              console.log('Saved to playlist_data.json');
              resolve(true);
            } else {
              console.log('Attempt', attempt, '- Response code:', j.code, 'msg:', j.message || j.msg || 'no tracks');
              if (attempt < retries) {
                setTimeout(() => doReq(attempt + 1), 2000);
              } else {
                resolve(false);
              }
            }
          } catch(e) {
            console.log('Parse error:', e.message, '| Raw:', data.slice(0, 100));
            if (attempt < retries) {
              setTimeout(() => doReq(attempt + 1), 2000);
            } else {
              resolve(false);
            }
          }
        });
      });

      req.on('error', e => {
        console.log('Network error:', e.message);
        if (attempt < retries) {
          setTimeout(() => doReq(attempt + 1), 2000);
        } else {
          resolve(false);
        }
      });

      req.setTimeout(12000, () => {
        req.destroy();
        console.log('Timeout, retry', attempt + 1);
        if (attempt < retries) {
          setTimeout(() => doReq(attempt + 1), 2000);
        } else {
          resolve(false);
        }
      });
    };

    doReq(1);
  });
}

fetchPlaylist('2829883282');