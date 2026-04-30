import urllib.request, json, sys
sys.stdout.reconfigure(encoding='utf-8')

# Try multiple API endpoints to get all 35 songs
urls = [
    'https://netease-cloud-music-api-sand-psi.vercel.app/playlist/track/all?id=2829883282&limit=50',
    'http://music.163.com/api/playlist/detail?id=2829883282&updateTime=-1',
]

for url in urls:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0', 'Referer': 'http://music.163.com/'})
        resp = urllib.request.urlopen(req, timeout=15)
        raw = resp.read()
        data = json.loads(raw)
        
        # Try different response structures
        tracks = None
        source = 'unknown'
        
        if 'songs' in data:
            tracks = data['songs']
            source = 'songs field'
        elif 'playlist' in data and 'tracks' in data['playlist']:
            tracks = data['playlist']['tracks']
            source = 'playlist.tracks'
        elif 'result' in data and 'tracks' in data['result']:
            tracks = data['result']['tracks']
            source = 'result.tracks'
        
        if tracks:
            print(f'URL: {url}')
            print(f'Source: {source}, Got: {len(tracks)} songs')
            for i, t in enumerate(tracks[:35]):
                if 'ar' in t:
                    artists = ', '.join(a.get('name','') for a in t['ar'])
                    tid = t.get('id')
                    print(f'{i+1}. {t["name"]} | {artists} | {tid}')
            break
        else:
            print(f'URL: {url} - no tracks found, keys: {list(data.keys())}')
    except Exception as e:
        print(f'Error: {e}')