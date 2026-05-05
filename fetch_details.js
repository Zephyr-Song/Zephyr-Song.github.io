const https = require('https');

const ids = [
  // 周杰伦
  '5257138',   // 屋顶
  // 林俊杰
  '399354373',  // 可惜没如果(Live)
  '399353368',  // 不为谁而作的歌(Live)
  '108298',     // 背对背拥抱(Live)
  '2751381348', // 黑夜问白天(Live)
  // 薛之谦
  '3375826417', // 人字拖
  '3368387749', // 顽疾
  '1473782328', // 小尖尖
  // 李荣浩
  '2661806453', // 走走(Live)
  '479223381',  // 嗯
  '32317482',   // 行走的力量
];

function getDetail(id) {
  return new Promise((resolve) => {
    const url = `https://music.163.com/api/song/detail?ids=[${id}]`;
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://music.163.com/',
        'Cookie': 'os=pc;',
      },
      timeout: 8000,
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const song = json.songs?.[0];
          if (song) {
            resolve({
              id,
              name: song.name,
              artist: song.artists?.[0]?.name || '',
              cover: song.album?.picUrl || '',
              albumName: song.album?.name || '',
            });
          } else {
            resolve(null);
          }
        } catch {
          resolve(null);
        }
      });
    });
    req.on('error', () => resolve(null));
    req.on('timeout', () => { req.destroy(); resolve(null); });
  });
}

function getLyrics(id) {
  return new Promise((resolve) => {
    const url = `https://music.163.com/api/song/lyric?id=${id}&lv=-1&tv=-1`;
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://music.163.com/',
        'Cookie': 'os=pc;',
      },
      timeout: 8000,
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const lrc = json.lrc?.lyric || '';
          resolve(lrc);
        } catch {
          resolve('');
        }
      });
    });
    req.on('error', () => resolve(''));
    req.on('timeout', () => { req.destroy(); resolve(''); });
  });
}

(async () => {
  const results = [];
  for (const id of ids) {
    const d = await getDetail(id);
    if (d) {
      console.log(`✅ ${id} 《${d.name}》 - ${d.artist}`);
      console.log(`  专辑: ${d.albumName}`);
      console.log(`  封面: ${d.cover}`);
      const lyrics = await getLyrics(id);
      console.log(`  歌词: ${lyrics.length} 字符`);
      results.push({ ...d, lyrics });
    } else {
      console.log(`❌ ${id} 获取失败`);
    }
    await new Promise(r => setTimeout(r, 500));
  }

  console.log('\n=== 结果 JSON ===');
  console.log(JSON.stringify(results, null, 2));
})();
