import re

IDS_TO_REMOVE = {'2655065698'}

for path in ['plugins/GmeekMusic.js', 'docs/plugins/GmeekMusic.js']:
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()

    def remove_song(m):
        obj = m.group(0)
        sid = re.search(r'id:\s*["\'](\d+)["\']', obj)
        if sid and sid.group(1) in IDS_TO_REMOVE:
            name = re.search(r'name:\s*"([^"]+)"', obj)
            print(f'  删除: [{sid.group(1)}] {name.group(1) if name else "?"}')
            return '\n'
        return obj

    c2 = re.sub(r'\n\s*\{[^}]*?id:\s*["\']\d+["\'][^}]*?\},\s*\n', remove_song, c, flags=re.DOTALL)
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(c2)
    print(f'已更新: {path}')

# 验证
for path in ['plugins/GmeekMusic.js', 'docs/plugins/GmeekMusic.js']:
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()
    sids = re.findall(r'id:\s*["\'](\d+)["\']', c)
    lids = set(re.findall(r"'(\d+)':\s*`", c))
    print(f'{path}: 歌曲 {len(sids)} 首，歌词 {len(lids)} 条')
