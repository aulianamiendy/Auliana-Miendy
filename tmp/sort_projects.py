import re
import urllib.request
import json
import datetime
import os

months_en = {
    'jan': 1, 'feb': 2, 'mar': 3, 'apr': 4, 'may': 5, 'jun': 6,
    'jul': 7, 'aug': 8, 'sep': 9, 'oct': 10, 'nov': 11, 'dec': 12
}

def parse_date(date_str):
    if not date_str or date_str == 'unknown':
        return datetime.datetime(2020, 1, 1)
    m_iso = re.search(r'(\d{4})-(\d{2})-(\d{2})', date_str)
    if m_iso:
        return datetime.datetime(int(m_iso.group(1)), int(m_iso.group(2)), int(m_iso.group(3)))
    m_jp = re.search(r'(\d{4})年(\d{1,2})月(\d{1,2})日', date_str)
    if m_jp:
        return datetime.datetime(int(m_jp.group(1)), int(m_jp.group(2)), int(m_jp.group(3)))
    m_en = re.search(r'([A-Za-z]{3,9})\s+(\d{1,2}),?\s+(\d{4})', date_str)
    if m_en:
        mon_str = m_en.group(1)[:3].lower()
        mon = months_en.get(mon_str, 1)
        return datetime.datetime(int(m_en.group(3)), mon, int(m_en.group(2)))
    return datetime.datetime(2020, 1, 1)

with open('src/App.tsx', 'r') as f:
    text = f.read()

start_marker = 'const initialProjects: ProjectItem[] = ['
end_marker = '\n];\n\n// Framer Motion Animation'
start_idx = text.find(start_marker) + len(start_marker)
end_idx = text.find(end_marker)
proj_block = text[start_idx:end_idx].strip()

raw_items = []
curr = []
in_obj = False
brace_count = 0
for line in proj_block.split('\n'):
    if line.strip().startswith('{') and brace_count == 0:
        in_obj = True
        curr = [line]
        brace_count += line.count('{') - line.count('}')
    elif in_obj:
        curr.append(line)
        brace_count += line.count('{') - line.count('}')
        if brace_count <= 0:
            raw_items.append('\n'.join(curr))
            curr = []
            in_obj = False

print(f'Total project blocks: {len(raw_items)}')

# Load pre-fetched dates or fetch if missing
cache_file = '/tmp/yt_dates_cache.json'
if os.path.exists(cache_file):
    with open(cache_file, 'r') as f:
        cache = json.load(f)
else:
    cache = {}

parsed_projects = []
for idx, item in enumerate(raw_items):
    m_id = re.search(r'id:\s*[\'"]([^\'"]+)[\'"]', item)
    m_title = re.search(r'title:\s*[\'"]([^\'"]+)[\'"]', item)
    m_vurl = re.search(r'videoUrl:\s*[\'"]([^\'"]+)[\'"]', item)
    
    pid = m_id.group(1) if m_id else f'item-{idx}'
    title = m_title.group(1) if m_title else 'Untitled'
    vurl = m_vurl.group(1) if m_vurl else ''
    
    m_yt = re.search(r'(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})', vurl)
    ytid = m_yt.group(1) if m_yt else None
    
    date_val = cache.get(ytid)
    if not date_val and ytid:
        try:
            req = urllib.request.Request(
                f'https://www.youtube.com/watch?v={ytid}',
                headers={
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
                    'Accept-Language': 'en-US,en;q=0.9'
                }
            )
            html = urllib.request.urlopen(req, timeout=5).read().decode('utf-8')
            m = re.search(r'"uploadDate":"([^"]+)"', html) or re.search(r'"publishDate":"([^"]+)"', html) or re.search(r'itemprop="datePublished" content="([^"]+)"', html)
            if m:
                date_val = m.group(1)
            else:
                m2 = re.search(r'"dateText":\{"simpleText":"([^"]+)"\}', html)
                if m2:
                    date_val = m2.group(1)
        except Exception as e:
            print(f'Error fetching {ytid}: {e}')
            date_val = 'unknown'
        cache[ytid] = date_val
    
    parsed_date = parse_date(date_val)
    parsed_projects.append({
        'raw': item,
        'id': pid,
        'title': title,
        'ytid': ytid,
        'date_str': date_val,
        'date_parsed': parsed_date,
        'orig_idx': idx
    })

with open(cache_file, 'w') as f:
    json.dump(cache, f, indent=2)

# Sort: newest upload date first.
# If same date, higher orig_idx comes first (because later additions were added in later turns, e.g. -hUiJsf8Wxk was latest)
parsed_projects.sort(key=lambda x: (x['date_parsed'], x['orig_idx']), reverse=True)

print('\nSorted Projects (Newest to Oldest):')
for i, p in enumerate(parsed_projects):
    print(f"{i+1:2d}. [{p['date_parsed'].strftime('%Y-%m-%d')}] ({p['id']}) {p['title']}")

# Save the sorted raw code
sorted_raw_code = ',\n'.join(p['raw'] for p in parsed_projects)
with open('/tmp/sorted_initial_projects.txt', 'w') as f:
    f.write(sorted_raw_code)

print('\nSuccessfully written sorted project blocks to /tmp/sorted_initial_projects.txt')
