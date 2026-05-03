#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
update_music.py
一键更新 GmeekMusic.js 歌单和歌词

用法：
  python update_music.py
"""
import json, time, os, subprocess

# ========= 配置 =========
PLAYLIST_ID = "2829883282"
FILE_JS = "D:/hugo/Zephyr-Song.github.io/plugins/GmeekMusic.js"
FILE_DOCS_JS = "D:/hugo/Zephyr-Song.github.io/docs/plugins/GmeekMusic.js"
# ========================

def curl(url):
    r = subprocess.run(
        ["curl", "-s", url,
         "-H", "Referer: https://music.163.com",
         "-H", "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0",
         "-H", "Cookie: appver=8.9.70"],
        capture_output=True)
    return r.stdout.decode("utf-8", errors="replace")

def fetch_playlist():
    data = json.loads(curl(f"https://music.163.com/api/playlist/detail?id={PLAYLIST_ID}&limit=500"))
    t = data.get("playlist", {}) or data.get("result", {})
    tracks = t.get("tracks", [])
    print(f"  拉取到 {len(tracks)} 首")
    return tracks

def fetch_lyric(sid):
    data = json.loads(curl(f"https://music.163.com/api/song/lyric?id={sid}&lv=1&kv=1"))
    parts = []
    for key in ("lrc", "klyric", "tlyric"):
        if data.get(key, {}).get("lyric"):
            parts.append(data[key]["lyric"])
    return "\n".join(parts) or None

def get_ids(path, pattern):
    with open(path, "r", encoding="utf-8") as f:
        return set(re.findall(pattern, f.read()))
import re

def replace_block(content, marker, new_block):
    idx = content.find(marker)
    if idx < 0:
        print(f"  ERROR: 找不到 {marker}"); return None
    pos, brace, in_bt = idx + len(marker), 1, False
    while pos < len(content) and brace > 0:
        c = content[pos]
        if c == "`" and (pos == 0 or content[pos-1] != "\\"): in_bt = not in_bt
        elif not in_bt:
            if c == "{": brace += 1
            elif c == "}": brace -= 1
        pos += 1
    semi = content.find(";", pos - 1)
    if semi < 0: print("  ERROR: 找不到分号"); return None
    return content[:idx] + new_block + "\n" + content[semi+1:]

def main():
    print("=" * 50)
    print("  GmeekMusic.js 一键更新")
    print("=" * 50)

    cur_ids = get_ids(FILE_JS, r'id:\s*[\'"](\d+)[\'"]')
    cur_lrc = get_ids(FILE_JS, r"\'(\d+)\':\s*`")
    print(f"\n当前歌单 {len(cur_ids)} 首，已有歌词 {len(cur_lrc)} 首")

    print("\n[1/2] 拉取歌单...")
    tracks = fetch_playlist()
    if not tracks:
        print("拉取失败，尝试只补歌词...")
        missing = cur_ids - cur_lrc
        if missing:
            for tid in sorted(missing, key=int):
                print(f"  歌词 {tid}...", end=" ")
                l = fetch_lyric(tid)
                print("✓" if l else "✗")
                time.sleep(0.3)
        return

    fetched = set(str(t["id"]) for t in tracks)
    print(f"\n  新增 {len(fetched - cur_ids)} 首，移除 {len(cur_ids - fetched)} 首")

    # 生成歌单 JS
    songs = []
    for t in tracks:
        sid = str(t["id"])
        nm = t["name"].replace("\\","\\\\").replace('"', '\\"')
        ar = " / ".join((t.get("ar") or t.get("artists") or [{}])[0].get("name","").split()[:3])
        ar = ar.replace("\\","\\\\").replace('"', '\\"')
        al = (t.get("al") or t.get("album") or {}).get("picUrl","")
        songs.append(f'{{ name: "{nm}", artist: "{ar}", url: "https://music.163.com/song/media/outer/url?id={sid}.mp3", cover: "{al}", id: "{sid}" }}')
    songs_js = "  var HARDCODED_SONGS = [\n  " + ",\n  ".join(songs) + "\n  ];"

    # 生成歌词
    print("\n[2/2] 获取歌词...")
    lyrics = []
    for i, t in enumerate(tracks):
        sid = str(t["id"])
        print(f"  [{i+1}/{len(tracks)}] {t['name'][:18]}...", end=" ")
        l = fetch_lyric(sid)
        if l:
            lyrics.append(f"    '{sid}': `{l.replace('`','\\`')}`")
            print("✓")
        else:
            print("(无歌词)")
        time.sleep(0.3)
    lyrics_js = "  var HARDCODED_LYRICS = {\n" + ",\n".join(lyrics) + "\n  };"
    print(f"\n  歌词获取 {len(lyrics)}/{len(tracks)} 首")

    # 更新文件
    for path in [FILE_JS, FILE_DOCS_JS]:
        print(f"\n更新: {os.path.basename(path)}")
        with open(path, "r", encoding="utf-8") as f: c = f.read()
        c = replace_block(c, "  var HARDCODED_SONGS = [", songs_js) or c
        c = replace_block(c, "  var HARDCODED_LYRICS = {", lyrics_js) or c
        with open(path, "w", encoding="utf-8") as f: f.write(c)
        print("  ✓")

    # Git
    print("\n[Git] 提交推送...")
    repo = os.path.dirname(FILE_JS)
    subprocess.run(f'cd "{repo}" && git add plugins/GmeekMusic.js docs/plugins/GmeekMusic.js', shell=True)
    subprocess.run(f'cd "{repo}" && git commit -m "music: 更新歌单{len(tracks)}首+歌词{len(lyrics)}首"', shell=True)
    subprocess.run(f'cd "{repo}" && git pull origin main --rebase 2>/dev/null', shell=True)
    r = subprocess.run(f'cd "{repo}" && git push origin main', shell=True, capture_output=True)
    if r.returncode == 0:
        print("  ✓ 已推送，GitHub Pages 约1-3分钟部署完成")
    else:
        print(f"  ✗ 推送失败（可能需手动处理）")

if __name__ == "__main__":
    main()
