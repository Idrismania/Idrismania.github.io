"""Given a directory, find the max dimensions, add 15px padding on largest axis and centre all sprites
so they have identical dimensions."""

import os
import numpy as np
from pathlib import Path
from PIL import Image

current_directory = os.path.dirname(os.path.realpath(__file__))
root_directory = os.path.abspath(os.path.join(current_directory, "../../"))

# Create a new directory to save the processed files if it does not exist
os.makedirs(os.path.join(root_directory, Path("enemy_sprites", "centre_cropped")), exist_ok=True)

PADDING = 15
BACKGROUND_COLOUR_RGB = (98, 90, 98)

max_height = 0
max_width = 0

for file in os.listdir(Path(root_directory, "enemy_sprites", "cropped")):
    img = Image.open(Path(root_directory, "enemy_sprites", "cropped", file)).convert("RGB")

    height = img.height
    width = img.width

    if height > max_height:
        max_height = height

    if width > max_width:
        max_width = width

crop_size = max(max_height, max_width) + PADDING

# Paste every file onto the centre of a canvas of crop_size x crop_size
for file in os.listdir(Path(root_directory, "enemy_sprites", "cropped")):
    img = Image.open(Path(root_directory, "enemy_sprites", "cropped", file)).convert("RGB")
    
    paste_x = (crop_size - img.width) // 2
    paste_y = (crop_size - img.height) // 2

    background = np.full((crop_size, crop_size, 3), BACKGROUND_COLOUR_RGB, dtype=np.uint8)

    background[paste_y:paste_y + img.height, paste_x:paste_x + img.width] = np.array(img)

    final_image = Image.fromarray(background)

    final_image.save(Path(root_directory, "enemy_sprites", "centre_cropped", file))
