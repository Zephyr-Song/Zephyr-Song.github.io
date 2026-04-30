with open(r'D:\hugo\Zephyr-Song.github.io\plugins\lib\APlayer.min.js', 'rb') as f:
    content = f.read()

# The CSP eval pattern: Function("return this")()||(0,eval)("this")
# Replace with: window  (which works in browser context without eval)
old = b'Function("return this")()||(0,eval)("this")'
new = b'window'
count = content.count(old)
print('Double-quote occurrences:', count)
if count > 0:
    content = content.replace(old, new)
    print('Replaced (double quotes)')
else:
    # Try single quotes
    old2 = b"Function('return this')()||(0,eval)('this')"
    count2 = content.count(old2)
    print('Single-quote occurrences:', count2)
    if count2 > 0:
        content = content.replace(old2, b'window')
        print('Replaced (single quotes)')
    else:
        # Find context around 'eval' to debug
        idx = content.find(b'eval')
        if idx >= 0:
            print('Context around eval:')
            print(repr(content[idx-80:idx+80]))
        else:
            print('No eval found at all')

with open(r'D:\hugo\Zephyr-Song.github.io\plugins\lib\APlayer.min.js', 'wb') as f:
    f.write(content)
print('Done')