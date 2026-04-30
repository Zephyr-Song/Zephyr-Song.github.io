import urllib.request, json, ssl, sys
sys.stdout.reconfigure(encoding='utf-8')
ctx = ssl.create_default_context()

def fetch(url):
    req = urllib.request.Request(url, headers={
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://music.163.com/'
    })
    return json.loads(urllib.request.urlopen(req, timeout=8, context=ctx).read())

# Get playlist with trackIds from v6
d = fetch('https://music.163.com/api/v6/playlist/detail?id=2829883282&n=1000')
p = d.get('playlist', {})
track_ids = [x['id'] for x in p.get('trackIds', [])]
existing = {t['id']: t for t in p.get('tracks', [])}
print('Total trackIds:', len(track_ids))
print('Existing tracks in response:', len(existing))

need_ids = [i for i in track_ids if i not in existing]
print('Need to fetch:', len(need_ids))

all_songs = list(existing.values())

# Fetch missing songs in batches of 20
for i in range(0, len(need_ids), 20):
    batch = need_ids[i:i+20]
    ids_json = json.dumps(batch)
    try:
        d2 = fetch('http://music.163.com/api/song/detail?ids=' + ids_json)
        songs = d2.get('songs', [])
        all_songs.extend(songs)
        print('Batch ' + str(i//20+1) + ': fetched ' + str(len(songs)) + ' songs')
    except Exception as e:
        print('Batch ' + str(i//20+1) + ' error: ' + str(e))
        # Try https
        try:
            d2 = fetch('https://music.163.com/api/song/detail?ids=' + ids_json)
            songs = d2.get('songs', [])
            all_songs.extend(songs)
            print('Batch ' + str(i//20+1) + ' (https): fetched ' + str(len(songs)) + ' songs')
        except Exception as e2:
            print('Batch ' + str(i//20+1) + ' (https) error: ' + str(e2))

# Sort by original trackIds order
ordered = []
for tid in track_ids:
    for s in all_songs:
        if s['id'] == tid:
            ordered.append(s)
            break

# Deduplicate
seen = set()
final = []
for s in ordered:
    if s['id'] not in seen:
        seen.add(s['id'])
        final.append(s)

print('\nTotal songs: ' + str(len(final)))
for s in final:
    ar = '/'.join(a.get('name','?') for a in s.get('ar',[]))
    print(str(s['id']) + ' | ' + s.get('name','') + ' | ' + ar)

# Save playlist data
with open('D:/hugo/Zephyr-Song.github.io/playlist_full.json', 'w', encoding='utf-8') as f:
    json.dump({'playlist_id': 2829883282, 'songs': final}, f, ensure_ascii=False, indent=2)
print('\nSaved to playlist_full.json')