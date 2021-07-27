import argparse
import shutil
import os
from pathlib import Path
from bs4 import BeautifulSoup, element
import glob
import time

parser = argparse.ArgumentParser()

parser.add_argument("--src", type=str)
parser.add_argument("--dest", type=str)
args = parser.parse_args()

src = args.src
dest = args.dest
if os.path.exists(dest):
    shutil.rmtree(dest)
time.sleep(0.5)
shutil.copytree(src, dest)

with open(Path(dest) / "index.html") as index_f:
    data = index_f.read()


for template_name in glob.glob(str(Path(__file__).parents[0] / "templates" / "*.jinja2")):
    print(template_name)
    with open(template_name) as template_f:
        template_data = template_f.read()
    template_soup = BeautifulSoup(template_data, features="html.parser").find("head")

    soup = BeautifulSoup(data, features="html.parser")
    head = soup.find("head")
    for child in reversed(list(template_soup.children)):
        if isinstance(child, element.NavigableString):
            continue
        head.insert(0, child)

    new_file = Path(dest) / Path(template_name).name.replace(".jinja2", ".html")

    with open(new_file, "w") as dest_f:
        dest_f.write(str(soup))
