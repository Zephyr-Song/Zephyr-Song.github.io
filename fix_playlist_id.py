import json, sys
sys.stdout.reconfigure(encoding='utf-8')

with open(r'D:\hugo\Zephyr-Song.github.io\playlist_data.json', 'rb') as f:
    content = f.read()
content = content.replace(b'28298883282', b'2829883282')
with open(r'D:\hugo\Zephyr-Song.github.io\playlist_data.json', 'wb') as f:
    f.write(content)

with open(r'D:\hugo\Zephyr-Song.github.io\playlist_data.json', 'r', encoding='utf-8') as f:
    d = json.load(f)

name = d.get('name', 'unknown')
print(f'Playlist: {name}')
if 'tracks' in d:
    print(f'Songs: {len(d["tracks"])}')
    for i, t in enumerate(d['tracks'][:15]):
        artists = ', '.join(a['name'] for a in t.get('artists', []))
        mid = t.get('mMusic') or t.get('bMusic')
        bitrate = mid['bitrate'] if mid else 'N/A'
        print(f'{i+1}. {t["name"]} | {artists} | {t["id"]} | {bitrate}')