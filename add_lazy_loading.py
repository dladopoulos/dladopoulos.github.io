import glob
import re
import os

def add_lazy_loading():
    files = glob.glob("projects/*.html")
    print(f"Found {len(files)} html files in projects/")

    img_tag_pattern = re.compile(r'<img([^>]*)>', re.IGNORECASE)

    for filepath in files:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        modified_content = content
        
        # Function to replace img tag if it doesn't have loading="lazy"
        def replace_img(match):
            attrs = match.group(1)
            if 'loading="lazy"' in attrs or "loading='lazy'" in attrs:
                return match.group(0) # Already has it
            
            # Add loading="lazy" at the beginning of attributes
            return f'<img loading="lazy"{attrs}>'

        new_content = img_tag_pattern.sub(replace_img, content)

        if new_content != content:
            print(f"Updating {filepath}")
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
        else:
            print(f"No changes for {filepath}")

if __name__ == "__main__":
    add_lazy_loading()
