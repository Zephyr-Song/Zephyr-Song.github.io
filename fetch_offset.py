import urllib.request, json, sys
sys.stdout.reconfigure(encoding='utf-8')

for offset in [0, 10, 20, 30]:
    url = 'http://music.163.com/api/playlist/track/all?id=2829883282&limit=50&offset=%d' % offset
    try:
        req = urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0','Referer':'http://music.163.com/'})
        resp = urllib.request.urlopen(req, timeout=5)
        data = json.loads(resp.read())
        tracks = data.get('songs', data.get('tracks', []))
        print('offset=%d: %d songs' % (offset, len(tracks)))
        for t in tracks[:3]:
            print('  %s | %s' % (t.get('name'), t['id']))
        if len(tracks) < 50:
            print('  (less than 50, stopped)')
            break
    except Exception as e:
        print('offset=%d: %s' % (offset, e))