with open(r'D:\hugo\Zephyr-Song.github.io\plugins\lib\APlayer.min.css', 'rb') as f:
    content = f.read()

# APlayer fixed mode: position bottom-left by default
# Change to bottom-right for right-side panel
replacements = [
    (b'.aplayer.aplayer-fixed{position:fixed;bottom:0;left:0;right:0;',
     b'.aplayer.aplayer-fixed{position:fixed;bottom:0;left:auto;right:0;'),
    (b'.aplayer.aplayer-fixed .aplayer-body{position:fixed;bottom:0;left:0;right:0;',
     b'.aplayer.aplayer-fixed .aplayer-body{position:fixed;bottom:0;left:auto;right:0;'),
    (b'.aplayer.aplayer-fixed .aplayer-lrc{display:block;position:fixed;bottom:10px;left:0;right:0;',
     b'.aplayer.aplayer-fixed .aplayer-lrc{display:block;position:fixed;bottom:10px;left:auto;right:0;'),
    (b'.aplayer.aplayer-fixed .aplayer-info{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:0 0;transform-origin:0 0;',
     b'.aplayer.aplayer-fixed .aplayer-info{-webkit-transform:scaleX(1);transform:scaleX(1);-webkit-transform-origin:100% 0;transform-origin:100% 0;'),
]

for old, new in replacements:
    count = content.count(old)
    print(f'{old[:50]}... -> {count} occurrences')
    content = content.replace(old, new)

with open(r'D:\hugo\Zephyr-Song.github.io\plugins\lib\APlayer.min.css', 'wb') as f:
    f.write(content)
print('Done')