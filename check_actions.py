import subprocess, sys, json
sys.stdout.reconfigure(encoding='utf-8')

# Check GitHub Actions workflow runs
r = subprocess.run(
    ['powershell', '-Command',
     'irm -Uri "https://api.github.com/repos/Zephyr-Song/Zephyr-Song.github.io/actions/runs?per_page=3" -Headers @{"Authorization"="Bearer"}'],
    capture_output=True, text=True, errors='replace', timeout=15
)
print('Actions runs:', r.stdout[:1000] if r.stdout else 'no output')
print('Status:', r.returncode)