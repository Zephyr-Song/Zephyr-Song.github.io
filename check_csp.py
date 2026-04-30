import re

with open('D:/hugo/Zephyr-Song.github.io/plugins/lib/APlayer.min.js', 'r', encoding='utf-8', errors='ignore') as f:
    c = f.read()

print(f'File length: {len(c)} chars')

# Check for setTimeout/setInterval with string args
found = []
for m in re.finditer(r'setTimeout\s*\(\s*["\']', c):
    found.append(('setTimeout string', m.start(), repr(c[m.start():m.start()+60])))

for m in re.finditer(r'setInterval\s*\(\s*["\']', c):
    found.append(('setInterval string', m.start(), repr(c[m.start():m.start()+60])))

for label, pos, snippet in found:
    print(f'{label} at {pos}: {snippet}')

print(f'Total setTimeout/setInterval string arg calls: {len(found)}')

# Also check for Function constructor
for m in re.finditer(r'new\s+Function\s*\(', c):
    print('new Function at', m.start(), ':', repr(c[m.start():m.start()+80]))