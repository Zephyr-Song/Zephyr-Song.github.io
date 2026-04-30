import urllib.request, os, sys
sys.stdout.reconfigure(encoding='utf-8')

url = 'https://zephyrsong.qzz.io/js/music-loader.js'
out = 'D:/hugo/Zephyr-Song.github.io/plugins/js/music-loader.js'
os.makedirs(os.path.dirname(out), exist_ok=True)

req = urllib.request.Request(url, headers={
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Accept': '*/*',
    'Accept-Encoding': 'identity',
})
try:
    with urllib.request.urlopen(req, timeout=15) as r:
        data = r.read()
    with open(out, 'wb') as f:
        f.write(data)
    print(f'Downloaded {len(data)} bytes to {out}')
    print('Content preview:', data[:500].decode('utf-8', errors='ignore'))
except Exception as e:
    print(f'Error: {e}')