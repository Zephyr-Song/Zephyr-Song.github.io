import re

with open('plugins/GmeekMusic.js', 'r', encoding='utf-8') as f:
    c = f.read()

all_ids = re.findall(r'id:\s*["\'](\d+)["\']', c)
lyric_ids = set(re.findall(r"'(\d+)':\s*`", c))

print('无歌词剩余:')
for sid in all_ids:
    if sid not in lyric_ids:
        m = re.search(r'name:\s*"([^"]+)".*?id:\s*["\']' + sid, c, re.DOTALL)
        name = m.group(1) if m else '?'
        print(f'  [{sid}] {name}')
