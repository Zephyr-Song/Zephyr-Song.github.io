import json, sys, urllib.request
sys.stdout.reconfigure(encoding='utf-8')

# Fetch playlist 2829883282
url = 'http://music.163.com/api/playlist/detail?id=2829883282&updateTime=-1'
req = urllib.request.Request(url, headers={
    'User-Agent': 'Mozilla/5.0',
    'Referer': 'http://music.163.com/'
})
resp = urllib.request.urlopen(req, timeout=10)
data = json.loads(resp.read())

d = data.get('result', data) if 'result' in data else data
name = d.get('name', 'unknown')
print(f'Playlist: {name}')
tracks = d.get('tracks', [])
print(f'Songs: {len(tracks)}')
for i, t in enumerate(tracks[:15]):
    artists = ', '.join(a.get('name','') for a in t.get('artists', []))
    mid = t.get('mMusic') or t.get('bMusic')
    bitrate = mid['bitrate'] if mid else 'N/A'
    print(f'{i+1}. {t["name"]} | {artists} | {t["id"]} | {bitrate}')

# Save
with open(r'D:\hugo\Zephyr-Song.github.io\playlist_data.json', 'w', encoding='utf-8') as f:
    json.dump(d, f, ensure_ascii=False, indent=2)
print('Saved playlist_data.json')