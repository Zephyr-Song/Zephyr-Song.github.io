with open('plugins/GmeekMusic.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 在 HARDCODED_LYRICS 中替换歌词 key
# HARDCODED_LYRICS 的范围是 var HARDCODED_LYRICS = { 到  \n  };
lyrics_start = content.find("var HARDCODED_LYRICS = {")
lyrics_end = content.find("\n  };", lyrics_start)
if lyrics_end == -1:
    lyrics_end = len(content)

before = content[:lyrics_start]
lyrics_block = content[lyrics_start:lyrics_end+5]
after = content[lyrics_end+5:]

# 替换歌词 key
lyrics_block = lyrics_block.replace("'190072':", "'5255640':")
lyrics_block = lyrics_block.replace("'189688':", "'28196411':")

content = before + lyrics_block + after

with open('plugins/GmeekMusic.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("完成")
print(f"歌词块起始: {lyrics_start}, 结束: {lyrics_end}")
print(f"190072出现次数: {content.count(\"190072\")}")
print(f"5255640出现次数: {content.count(\"5255640\")}")
print(f"189688出现次数: {content.count(\"189688\")}")
print(f"28196411出现次数: {content.count(\"28196411\")}")
