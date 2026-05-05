const https = require('https');
const http = require('http');

const candidates = [
  // 周杰伦
  { id: '186064', name: '刀马旦' },
  { id: '186016', name: '夜曲' },
  { id: '186011', name: '龙卷风' },
  { id: '186076', name: '双截棍' },
  { id: '186133', name: '简单爱' },
  { id: '186010', name: '反方向的钟' },
  { id: '185809', name: '七里香' },
  { id: '139902', name: '晴天' },
  { id: '185807', name: '稻香' },
  { id: '436514312', name: '告白气球' },
  { id: '1305178998', name: 'Mojito' },
  // 林俊杰
  { id: '26305536', name: '西界' },
  { id: '26307036', name: '醉赤壁' },
  { id: '26754037', name: '江南' },
  { id: '53662337', name: '那些你很冒险的梦' },
  { id: '64024551', name: '修炼爱情' },
  // 薛之谦
  { id: '5254815', name: '认真的雪' },
  { id: '30835325', name: '演员' },
  { id: '31029616', name: '丑八怪' },
  { id: '5273798', name: '你还要我怎样' },
  { id: '489119503', name: '动物世界' },
  // 李荣浩
  { id: '1468114204', name: '年少有为' },
  { id: '1298158966', name: '不将就' },
  { id: '32782636', name: '李白' },
  { id: '1345891087', name: '麻雀' },
  { id: '498523358', name: '作曲家' },
  { id: '1459459155', name: '老街' },
];

function httpGet(url, options, callback) {
  const lib = url.startsWith('https:') ? https : http;
  return lib.get(url, options, callback);
}

function testUrl(id) {
  return new Promise((resolve) => {
    const url = `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
    const req = httpGet(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://music.163.com/',
      },
      timeout: 10000,
    }, (res) => {
      const contentType = res.headers['content-type'] || '';
      const location = res.headers['location'];

      // 如果是重定向，直接检查重定向目标的 URL 是否像音频文件
      if ((res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307 || res.statusCode === 308) && location) {
        res.destroy();
        // 检查重定向目标 URL 是否以 .mp3 结尾，或者再发一次请求确认
        const isAudioUrl = location.includes('.mp3') || location.includes('audio');
        if (isAudioUrl) {
          resolve({ id, ok: true, redirected: true });
          return;
        }
        // 再跟一次
        const redirectUrl = location.startsWith('http') ? location : `https://music.163.com${location}`;
        const req2 = httpGet(redirectUrl, {
          headers: { 'User-Agent': 'Mozilla/5.0' },
          timeout: 10000,
        }, (res2) => {
          const ct2 = res2.headers['content-type'] || '';
          res2.destroy();
          resolve({
            id,
            ok: ct2.includes('audio/mpeg') || ct2.includes('audio/mp3') || ct2.includes('application/octet-stream'),
            contentType: ct2,
            status: res2.statusCode,
          });
        });
        req2.on('error', () => resolve({ id, ok: false }));
        req2.on('timeout', () => { req2.destroy(); resolve({ id, ok: false }); });
        return;
      }

      // 直接返回音频
      res.destroy();
      resolve({
        id,
        ok: contentType.includes('audio/mpeg') || contentType.includes('audio/mp3'),
        contentType,
        status: res.statusCode,
      });
    });
    req.on('error', () => resolve({ id, ok: false }));
    req.on('timeout', () => { req.destroy(); resolve({ id, ok: false }); });
  });
}

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
              album: song.album?.id || '',
              cover: song.album?.picUrl || '',
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
  console.log('=== 测试外链可用性 ===');
  const results = [];
  for (const c of candidates) {
    const r = await testUrl(c.id);
    if (r.ok) {
      console.log(`✅ ${c.id} ${c.name}`);
      results.push(c.id);
    } else {
      console.log(`❌ ${c.id} ${c.name}`);
    }
    await new Promise(r => setTimeout(r, 300));
  }

  console.log(`\n=== 找到 ${results.length} 首可播放，获取详情 ===`);
  
  const details = [];
  for (const id of results) {
    const d = await getDetail(id);
    if (d) {
      console.log(`✅ ${id} 《${d.name}》 - ${d.artist}`);
      const lyrics = await getLyrics(id);
      console.log(`   歌词: ${lyrics.length > 0 ? lyrics.split('\n').length + ' 行' : '无'}`);
      details.push({ ...d, lyrics });
    }
    await new Promise(r => setTimeout(r, 500));
  }

  console.log('\n=== 结果 JSON ===');
  console.log(JSON.stringify(details, null, 2));
})();
