import subprocess, sys
sys.stdout.reconfigure(encoding='utf-8')

repo = 'D:/hugo/Zephyr-Song.github.io'

cmds = [
    ['git', '-C', repo, 'add', 'plugins/GmeekMusic.js'],
    ['git', '-C', repo, 'commit', '-m', 'GmeekMusic: 纯 Audio API 重写，0 eval，彻底解决 CSP'],
    ['git', '-C', repo, 'push'],
]
for c in cmds:
    r = subprocess.run(c, capture_output=True, text=True, errors='replace')
    out = r.stdout or ''
    err = r.stderr or ''
    print('OK:', out.strip()[:300])
    if err.strip():
        print('ERR:', err.strip()[:200])