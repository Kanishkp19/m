import re

file_path = 'public/voiceverse-case-study.html'

with open(file_path, 'r') as f:
    content = f.read()

replacements = [
    # Hex Colors
    (r'#4F46E5', '#0E9B8B'),
    (r'#3730A3', '#0B7A6D'),
    (r'#EEF2FF', '#E6F7F5'),
    (r'#C7D2FE', '#B2E8E2'),
    # Lowercase hex
    (r'#4f46e5', '#0e9b8b'),
    (r'#3730a3', '#0b7a6d'),
    (r'#eef2ff', '#e6f7f5'),
    (r'#c7d2fe', '#b2e8e2'),
    
    # RGBA values
    (r'rgba\(79,\s*70,\s*229', 'rgba(14, 155, 139'),
    (r'rgba\(79,70,229', 'rgba(14,155,139'),
    (r'rgba\(199,\s*210,\s*254', 'rgba(178, 232, 226'), # Indigo Mid RGB
    (r'rgba\(199,210,254', 'rgba(178,232,226'),
    
    # CSS variables and class names
    (r'--indigo', '--teal'),
    (r'badge-indigo', 'badge-teal'),
    (r'hl-indigo', 'hl-teal'),
]

for pattern, repl in replacements:
    content = re.sub(pattern, repl, content)

with open(file_path, 'w') as f:
    f.write(content)

print("Updated VoiceVerse colors to Careflow Teal.")
