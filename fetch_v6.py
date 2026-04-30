import urllib.request, json, ssl, time, sys
sys.stdout.reconfigure(encoding='utf-8')
ctx = ssl.create_default_context()

def fetch_http(url):
    req = urllib.request.Request(url, headers={
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://music.163.com/',
        'Accept': 'application/json'
    })
    raw = urllib.request.urlopen(req, timeout=8, context=ctx).read()
    # Try UTF-8 first, then GBK
    try:
        return json.loads(raw.decode('utf-8'))
    except:
        return json.loads(raw.decode('gbk', errors='replace'))

# v1 HTTP endpoint got trackIds before
d = fetch_http('http://music.163.com/api/playlist/detail?id=2829883282&updateTime=-1')
p = d.get('result', {})
track_ids = [x['id'] for x in p.get('trackIds', [])]
print('trackIds count:', len(track_ids))
print('trackCount:', p.get('trackCount'))
print('trackIds sample:', track_ids[:10])

existing = {t['id']: t for t in p.get('tracks', [])}
print('Existing tracks:', len(existing))

# Now fetch details for trackIds not in existing
need_ids = [i for i in track_ids if i not in existing]
print('Need to fetch:', len(need_ids))

all_songs = list(existing.values())

# Fetch in batches
for i in range(0, len(need_ids), 20):
    batch = need_ids[i:i+20]
    ids_str = ','.join(str(x) for x in batch)
    try:
        d2 = fetch_http(f'http://music.163.com/api/song/detail?ids=[{ids_str}]')
        songs = d2.get('songs', [])
        all_songs.extend(songs)
        print(f'Batch {i//20+1}: got {len(songs)} songs')
    except Exception as e:
        print(f'Batch {i//20+1} error: {e}')
    time.sleep(0.3)

print('\nTotal songs:', len(all_songs))
for s in all_songs:
    artists = '/'.join(a.get('name','?') for a in s.get('ar',[]))
    print(f"  [{s.get('id')}] {s.get('name')} - {artists}")