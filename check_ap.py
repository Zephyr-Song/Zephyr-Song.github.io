import base64, sys
sys.stdout.reconfigure(encoding='utf-8')

with open(r'D:\hugo\Zephyr-Song.github.io\plugins\lib\APlayer.min.js', 'rb') as f:
    data = f.read()
b64 = base64.b64encode(data).decode()
print(f'File size: {len(data)} bytes')
print(f'Base64 length: {len(b64)} chars')

# Find a good chunk to display
with open(r'D:\hugo\Zephyr-Song.github.io\plugins\lib\APlayer.min.js', 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

# Search for CSP eval pattern
import re
matches = list(re.finditer(r'.{60}eval.{60}', content, re.DOTALL))
for m in matches:
    print(repr(m.group()))
    print('---')