import urllib.request
import json

# 尝试直接从网易云官方 API 获取歌词（不需要登录）
song_id = "3317235944"

# 网易云官方歌词 API
url = f"https://music.163.com/api/song/lyric?id={song_id}&lv=1&kv=1&tv=-1"

print(f"测试网易云官方API: {url}")
try:
    req = urllib.request.Request(url, headers={
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://music.163.com/'
    })
    with urllib.request.urlopen(req, timeout=15) as resp:
        data = json.loads(resp.read().decode('utf-8'))
        print(json.dumps(data, ensure_ascii=False, indent=2)[:1000])
except Exception as e:
    print(f"Error: {e}")
