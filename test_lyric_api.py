import urllib.request
import json

song_id = "3317235944"

# 测试多个歌词 API
apis = [
    f"https://neteasecloudmusicapi-fcow.vercel.app/lyric?id={song_id}",
    f"https://ncm-api.zekdot.com/api/lyric?id={song_id}",
    f"https://music-api.greazyai.com/lyric?id={song_id}",
]

for api_url in apis:
    print(f"\n测试: {api_url}")
    try:
        req = urllib.request.Request(api_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            if 'lrc' in data and data['lrc'] and 'lyric' in data['lrc']:
                print("✓ 有歌词!")
                print(data['lrc']['lyric'][:300])
                break
            elif 'lyric' in data:
                print("✓ 有歌词!")
                print(data['lyric'][:300])
                break
            else:
                print("✗ 无歌词字段")
                print(json.dumps(data, ensure_ascii=False, indent=2)[:500])
    except Exception as e:
        print(f"✗ 错误: {e}")
