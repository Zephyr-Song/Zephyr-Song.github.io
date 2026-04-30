import subprocess, sys, json
sys.stdout.reconfigure(encoding='utf-8')

# Check the GitHub Actions build status
r = subprocess.run(
    ['powershell', '-Command',
     'irm -Uri "https://api.github.com/repos/Zephyr-Song/Zephyr-Song.github.io/pages"'],
    capture_output=True, text=True, errors='replace', timeout=15
)
print('Pages API:', r.stdout[:500] if r.stdout else 'no output')
print('Stderr:', r.stderr[:200] if r.stderr else '')

# Check remote hash
r2 = subprocess.run(
    ['git', '-C', 'D:/hugo/Zephyr-Song.github.io', 'rev-parse', 'origin/main'],
    capture_output=True, text=True, errors='replace', timeout=10
)
print('Origin main:', r2.stdout.strip())