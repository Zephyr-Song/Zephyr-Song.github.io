import urllib.request, json, sys, re
sys.stdout.reconfigure(encoding='utf-8')

# Try to get full playlist from the web page
url = 'https://music.163.com/#/playlist?id=2829883282'
try:
    req = urllib.request.Request(url, headers={
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    })
    resp = urllib.request.urlopen(req, timeout=10)
    html = resp.read().decode('utf-8', errors='ignore')
    
    # Find JSON data in page
    # Look for window.__INITIAL_STATE__ or similar
    m = re.search(r'window\.__INITIAL_STATE__\s*=\s*({.*?});\s*</script>', html, re.DOTALL)
    if m:
        data = json.loads(m.group(1))
        print('Found INITIAL_STATE')
        tracks = data.get('playlist', {}).get('tracks', [])
        print('Tracks:', len(tracks))
        for t in tracks[:5]:
            print(' ', t.get('name'), t.get('id'))
    else:
        # Try finding song ids in other patterns
        ids = re.findall(r'"id"\s*:\s*(\d{7,})', html)
        print('Found %d potential IDs' % len(set(ids)))
        print('Sample:', list(set(ids))[:10])
except Exception as e:
    print('Error:', e)

# Also try the song list API endpoint used by the web player
url2 = 'https://interface3.music.163.com/eapi/playlist/includes颤抖/info?id=2829883282&offset=0&total=true&limit=500'
try:
    req = urllib.request.Request('https://interface3.music.163.com/eapi/playlist/detail', 
        data=b'params=xxx&encSecKey=xxx',
        headers={'User-Agent':'Mozilla/5.0','Referer':'https://music.163.com/','Content-Type':'application/x-www-form-urlencoded'})
    resp = urllib.request.urlopen(req, timeout=5)
    print('eapi:', resp.read()[:200])
except Exception as e:
    print('eapi:', e)