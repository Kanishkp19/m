import glob
import re

files = glob.glob('public/*case-study.html')

replacements = [
    # Root variables
    (r'--ink:\s*#[0-9A-Fa-f]+;', '--ink: #ffffff;'),
    (r'--ink-2:\s*#[0-9A-Fa-f]+;', '--ink-2: #e5e7eb;'),
    (r'--ink-3:\s*#[0-9A-Fa-f]+;', '--ink-3: #9ca3af;'),
    (r'--ink-4:\s*#[0-9A-Fa-f]+;', '--ink-4: #6b7280;'),
    (r'--surface:\s*#[0-9A-Fa-f]+;', '--surface: #131316;'),
    (r'--bg:\s*#[0-9A-Fa-f]+;', '--bg: #0b0b0d;'),
    (r'--border:\s*#[0-9A-Fa-f]+;', '--border: rgba(255, 255, 255, 0.08);'),
    (r'--border-2:\s*#[0-9A-Fa-f]+;', '--border-2: rgba(255, 255, 255, 0.15);'),
    
    # Nav
    (r'background:\s*rgba\(255,\s*255,\s*255,\s*0\.92\);', 'background: rgba(11, 11, 13, 0.85);'),
    
    # Hero Background (Replace all linear gradients in .hero with a dark chemical burn aesthetic)
    (r'\.hero\s*{\s*\n\s*background:\s*linear-gradient\([^;]+;\n\s*padding:\s*100px\s*56px\s*90px;\n\s*position:\s*relative;\s*overflow:\s*hidden;\n\s*}', 
     '.hero {\n    background: #0b0b0d;\n    padding: 100px 56px 90px;\n    position: relative; overflow: hidden;\n  }'),
     
    # More aggressive hero background replacement in case regex above fails
    (r'background:\s*linear-gradient\(135deg,[^;]+;', 'background: linear-gradient(135deg, #1f1f2e 0%, #1a1a24 20%, #15151d 40%, #111118 60%, #0d0d12 80%, #0b0b0d 100%);'),
    
    # Screen Placeholder overrides
    (r'\.screen-wrap\s*{[^}]+}', '.screen-wrap {\n    background: #1E2025; border-radius: 14px; margin: 36px 0;\n    overflow: hidden; box-shadow: var(--shadow-lg);\n    border: 1px solid rgba(255,255,255,0.05);\n  }'),
    (r'\.screen-placeholder\s*{[^}]+}', '.screen-placeholder {\n    min-height: 340px; display: flex; flex-direction: column;\n    align-items: center; justify-content: center; gap: 12px;\n    background: #111115; border-top: 1px solid rgba(255,255,255,0.05);\n    color: #6b7280; font-family: var(--mono); font-size: 13px;\n  }'),
    (r'\.screen-img\s*{\s*width:\s*100%;\s*display:\s*block;\s*/\*\s*height:\s*auto\s*will\s*preserve\s*aspect\s*ratio\s*\*/\s*min-height:\s*300px;\s*background:\s*#F3F4F6;([^}]+)}', 
     '.screen-img {\n    width: 100%; display: block;\n    min-height: 300px;\n    background: #111115;\\1}'),

    # Hardcoded background colors in lofi screens
    (r'background:\s*#FFF5F5;', 'background: rgba(220,38,38,0.1);'),
    (r'background:\s*#F0FDF4;', 'background: rgba(22,163,74,0.1);'),
    (r'background:\s*#F9FAFB;', 'background: var(--surface);'),
    (r'background:\s*#FFFBEB;', 'background: rgba(245,158,11,0.1);'),
    
    # Misc text and border colors
    (r'border-color:\s*#FDE68A;', 'border-color: rgba(245,158,11,0.3);'),
    (r'border:\s*1px\s*solid\s*#BBF7D0;', 'border: 1px solid rgba(22,163,74,0.3);'),
    
    # Text colors
    (r'color:\s*#111827;', 'color: #ffffff;'),
    (r'color:\s*#374151;', 'color: #e5e7eb;'),
]

for file in files:
    with open(file, 'r') as f:
        content = f.read()
        
    for pattern, repl in replacements:
        content = re.sub(pattern, repl, content)
        
    # Replace some specific stuff like "background:#fff;" directly to "background:var(--surface);"
    content = content.replace('background:#fff;', 'background:var(--surface);')
    content = content.replace('background:#FFF;', 'background:var(--surface);')
    content = content.replace('background: #fff;', 'background: var(--surface);')
    content = content.replace('background: #FFF;', 'background: var(--surface);')

    with open(file, 'w') as f:
        f.write(content)

print(f"Updated {len(files)} files.")
