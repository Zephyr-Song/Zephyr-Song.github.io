const https = require('https');
const http = require('http');

function httpGet(url, headers) {
  const lib = url.startsWith('https:') ? https : http;
  return new Promise((resolve, reject) => {
    const req = lib.get(url, { headers, timeout: 8000 }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
  });
}

async function searchSongs(keyword, limit = 30) {
  const url = `https://music.163.com/api/search/get?s=${encodeURIComponent(keyword)}&type=1&limit=${limit}&offset=0`;
  const res = await httpGet(url, {
    'User-Agent': 'Mozilla/5.0',
    'Referer': 'https://music.163.com/',
    'Cookie': 'os=pc;',
  });
  try {
    const json = JSON.parse(res.data);
    return json.result?.songs || [];
  } catch {
    return [];
  }
}

function testUrl(id) {
  return new Promise((resolve) => {
    const url = `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
    const lib = url.startsWith('https:') ? https : http;
    const req = lib.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://music.163.com/',
      },
      timeout: 10000,
    }, (res) => {
      const location = res.headers['location'] || '';
      res.destroy();
      
      // 如果重定向到 .mp3 文件，说明可用
      if (location && (location.includes('.mp3') || location.includes('audio'))) {
        resolve(true);
        return;
      }
      // 如果直接返回 200 且是音频
      const ct = res.headers['content-type'] || '';
      if (ct.includes('audio')) {
        resolve(true);
        return;
      }
      resolve(false);
    });
    req.on('error', () => resolve(false));
    req.on('timeout', () => { req.destroy(); resolve(false); });
  });
}

function getLyrics(id) {
  return new Promise((resolve) => {
    const url = `https://music.163.com/api/song/lyric?id=${id}&lv=-1&tv=-1`;
    const req = https.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0', 'Referer': 'https://music.163.com/', 'Cookie': 'os=pc;' },
      timeout: 8000,
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data).lrc?.lyric || ''); }
        catch { resolve(''); }
      });
    });
    req.on('error', () => resolve(''));
    req.on('timeout', () => { req.destroy(); resolve(''); });
  });
}

(async () => {
  const artists = ['周杰伦', '林俊杰', '薛之谦', '李荣浩'];
  const existingIds = ['186064', '26305536', '5254815', '1468114204'];
  const found = [];

  for (const artist of artists) {
    console.log(`\n=== 搜索 ${artist} 的歌曲 ===`);
    const songs = await searchSongs(artist, 30);
    console.log(`  找到 ${songs.length} 首，测试外链...`);
    
    for (const song of songs) {
      const id = String(song.id);
      if (existingIds.includes(id)) {
        console.log(`  ⏭️  ${id} 《${song.name}》(已添加)`);
        continue;
      }
      
      const ok = await testUrl(id);
      if (ok) {
        console.log(`  ✅ ${id} 《${song.name}》`);
        const lyrics = await getLyrics(id);
        found.push({
          id,
          name: song.name,
          artist: song.artists?.[0]?.name || artist,
          albumId: song.album?.id || '',
          cover: song.album?.picUrl || '',
          lyrics,
        });
        console.log(`    歌词: ${lyrics.length > 0 ? lyrics.split('\n').length + '行' : '无'}`);
      } else {
        console.log(`  ❌ ${id} 《${song.name}》`);
      }
      await new Promise(r => setTimeout(r, 300));
    }
    await new Promise(r => setTimeout(r, 500));
  }

  console.log('\n\n=== 找到的新可播放歌曲 ===');
  console.log(JSON.stringify(found, null, 2));
})();
