import re

IDS_TO_REMOVE = {'1984760613', '2655065698', '3319370284', '3324439039', '2754658627'}

for path in ['plugins/GmeekMusic.js', 'docs/plugins/GmeekMusic.js']:
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()

    # 去掉没有歌词的歌曲（以 }, 结尾的完整对象）
    def remove_song(m):
        obj = m.group(0)
        sid = re.search(r'id:\s*["\'](\d+)["\']', obj)
        if sid and sid.group(1) in IDS_TO_REMOVE:
            print(f'  删除: [{sid.group(1)}] {re.search(r'name:\s*"([^"]+)"', obj).group(1) if re.search(r'name:\s*"([^"]+)"', obj) else "?"}')
            return '\n'
        return obj

    # 匹配每首歌的JS对象
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
