import urllib.request, json, ssl, time, sys
sys.stdout.reconfigure(encoding='utf-8')
ctx = ssl.create_default_context()

def fetch(url, referer=True):
    h = {'User-Agent': 'Mozilla/5.0'}
    if referer:
        h['Referer'] = 'https://music.163.com/'
    req = urllib.request.Request(url, headers=h)
    return json.loads(urllib.request.urlopen(req, timeout=8, context=ctx).read())

# Get trackIds from v6 endpoint
d = fetch('https://music.163.com/api/v6/playlist/detail?id=2829883282&n=1000')
p = d.get('result', {})
track_ids = [x['id'] for x in p.get('trackIds', [])]
existing = {t['id']: t for t in p.get('tracks', [])}
print('Total trackIds:', len(track_ids))
print('Existing tracks:', len(existing))
print('Need to fetch:', len(track_ids) - len(existing))

# Fetch missing songs in batches of 20
need_ids = [i for i in track_ids if i not in existing]
all_songs = list(existing.values())

for i in range(0, len(need_ids), 20):
    batch = need_ids[i:i+20]
    ids_str = ','.join(str(x) for x in batch)
    # Try song/detail endpoint
    try:
        d2 = fetch(f'https://music.163.com/api/song/detail?ids=[{ids_str}]')
        songs = d2.get('songs', [])
        all_songs.extend(songs)
        print(f'Batch {i//20+1}: fetched {len(songs)} songs')
    except Exception as e:
        print(f'Batch {i//20+1} failed: {e}')
        # Fallback: song/detail
        try:
            d3 = fetch(f'https://music.163.com/api/v3/song/detail/?id={batch[0]}&c=[{json.dumps({"id":batch[0]})}]')
            print('Fallback result:', str(d3)[:100])
        except Exception as e2:
            print('Fallback2:', e2)
    time.sleep(0.3)

print('\nTotal songs collected:', len(all_songs))
print('\nAll song names:')
for s in all_songs:
    print(f"  {s.get('name')} - {s.get('ar',[{}])[0].get('name','?')}")