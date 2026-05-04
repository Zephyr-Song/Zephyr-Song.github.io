import re

with open('plugins/GmeekMusic.js', 'r', encoding='utf-8') as f:
    c = f.read()

all_ids = re.findall(r'id:\s*["\'](\d+)["\']\s*}', c)
lyric_ids = set(re.findall(r"'(\d+)':\s*`", c))

print('共', len(all_ids), '首歌')
print('有歌词', len(lyric_ids), '首')
print()
print('没有歌词的歌曲：')
for sid in all_ids:
    if sid not in lyric_ids:
        m = re.search(r'name:\s*"([^"]+)"[\s\S]*?id:\s*["\']' + sid, c)
        name = m.group(1) if m else '?'
        print(f'  - [{sid}] {name}')
