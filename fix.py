import os
import re

files_to_fix = [
    "src/components/Experience.tsx",
    "src/components/Journey.tsx",
    "src/components/ProjectsFundings.tsx",
    "src/components/ResearchInterests.tsx",
    "src/components/Activities.tsx"
]

for file in files_to_fix:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update imports
    content = re.sub(r"import\s+\{\s*([^\}]+)\s*\}\s+from\s+'\.\./data/([^']+)'", 
                     r"import \2Json from '../data/\2.json';\nconst { \1 } = \2Json;", content)
    
    # 2. Add * as Icons if not present
    if "import * as Icons from 'lucide-react';" not in content:
        content = re.sub(r"import\s+\{[^}]+\}\s+from\s+'lucide-react';", 
                         r"\g<0>\nimport * as Icons from 'lucide-react';", content)
    
    # 3. Replace item.icon with Icon component mapping
    content = re.sub(r"const\s+Icon\s*=\s*item\.icon;", 
                     r"const Icon = (Icons as any)[item.icon] || Icons.Circle;", content)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Fixed imports and icons!")
