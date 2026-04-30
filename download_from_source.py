import subprocess, sys, hashlib
sys.stdout.reconfigure(encoding='utf-8')

base = 'https://zephyrsong.qzz.io'
files = [
    '/lib/APlayer.min.js',
    '/lib/APlayer.min.css',
    '/lib/Meting.min.js',
    '/js/music-loader.js',
    '/css/music-player.css',
]

r = subprocess.run(
    ['powershell', '-Command', '[Console]::OutputEncoding = [System.Text.Encoding]::UTF8; $ProgressPreference = "SilentlyContinue";'],
    capture_output=True, text=True, errors='replace'
)
print(r.stdout)

for f in files:
    url = base + f
    out = 'D:/hugo/Zephyr-Song.github.io/plugins' + f
    cmd = ['powershell', '-Command',
           f'[Console]::OutputEncoding = [System.Text.Encoding]::UTF8; $ProgressPreference = "SilentlyContinue"; '
           f'irm -Uri "{url}" -OutFile "{out}" -TimeoutSec 15; if (Test-Path "{out}") {{ echo OK }} else {{ echo FAIL }}']
    r = subprocess.run(cmd, capture_output=True, text=True, errors='replace', timeout=20)
    print(f.strip(), f, '->', out)
    # Verify hash
    if f.endswith('.js'):
        try:
            with open(out, 'r', encoding='utf-8', errors='ignore') as fh:
                c = fh.read()
            h = hashlib.md5(c.encode()).hexdigest()
            evals = c.count('eval')
            print(f'  MD5:{h}, eval count: {evals}, len: {len(c)}')
        except Exception as e:
            print(f'  Error: {e}')

print('Done!')