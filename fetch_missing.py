import urllib.request, json, ssl, sys
sys.stdout.reconfigure(encoding='utf-8')
ctx = ssl.create_default_context()

req = urllib.request.Request(
    'http://music.163.com/api/playlist/detail?id=2829883282&updateTime=-1',
    headers={'User-Agent': 'Mozilla/5.0', 'Referer': 'https://music.163.com/'}
)
r = urllib.request.urlopen(req, timeout=8, context=ctx)
d = json.load(r)
p = d.get('result', {})
track_ids = [x['id'] for x in p.get('trackIds', [])]
existing = {t['id']: t for t in p.get('tracks', [])}
print('trackIds:', len(track_ids))
print('existing tracks in response:', len(existing))

need = [i for i in track_ids if i not in existing]
print('need to fetch:', len(need), need[:5])

if need:
    req2 = urllib.request.Request(
        'http://music.163.com/api/song/detail?ids=' + json.dumps(need),
        headers={'User-Agent': 'Mozilla/5.0', 'Referer': 'https://music.163.com/'}
    )
    r2 = urllib.request.urlopen(req2, timeout=8, context=ctx)
    d2 = json.load(r2)
    songs = d2.get('songs', [])
    print('fetched songs:', len(songs))
    for s in songs:
        ar_name = s.get('ar', [{}])[0].get('name', '?') if s.get('ar') else '?'
        print('  ' + str(s['id']) + ' ' + s['name'] + ' - ' + ar_name)