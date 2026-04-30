import urllib.request, json, sys, re
sys.stdout.reconfigure(encoding='utf-8')

url = 'https://music.163.com/playlist?id=2829883282'
try:
    req = urllib.request.Request(url, headers={
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://music.163.com/'
    })
    resp = urllib.request.urlopen(req, timeout=10)
    html = resp.read().decode('utf-8', errors='ignore')

    # Find song id links
    ids = re.findall(r'/song\?id=(\d{7,})', html)
    print('Song links found:', len(set(ids)))
    print('Sample:', list(set(ids))[:15])

    # Check trackIds
    m = re.search(r'trackIds\s*=\s*\[([^\]]+)', html)
    if m:
        print('trackIds:', m.group()[:100])

    # Check trackCount
    m = re.search(r'trackCount["\s:]+(\d+)', html)
    if m:
        print('trackCount:', m.group(1))

    # Check for initial state
    print('Has INITIAL_STATE:', '__INITIAL_STATE__' in html)
    print('Has trackIds:', 'trackIds' in html)
    print('HTML length:', len(html))
    
    # Search for JSON with song names
    names = re.findall(r'"name"\s*:\s*"([^"]{2,30})"', html)
    print('Name fields found:', len(names))
    print('Sample names:', names[:15])

except Exception as e:
    print('Error:', e)