import subprocess, sys
sys.stdout.reconfigure(encoding='utf-8')

repo = 'D:/hugo/Zephyr-Song.github.io'

cmds = [
    ['git', '-C', repo, 'add', 'config.json', 'plugins/'],
    ['git', '-C', repo, 'commit', '-m', 'Music player: 复制 zephyrsong.qzz.io 完整方案（Meting API + APlayer + 同一CSS）'],
    ['git', '-C', repo, 'push'],
]
for c in cmds:
    r = subprocess.run(c, capture_output=True, text=True, errors='replace')
    print('OK:', r.stdout.strip()[:200])
    if r.stderr.strip():
        print('ERR:', r.stderr.strip()[:200])