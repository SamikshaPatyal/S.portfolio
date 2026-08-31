from PIL import Image

# Open the existing image
img = Image.open('samp.jpeg')

# Get image dimensions
width, height = img.size
print(f"Original image size: {width}x{height}")

# Crop to upper body only - from top to approximately 65% of height
# This excludes feet and lower legs, keeps head, shoulders, and torso
crop_box = (0, 0, width, int(height * 0.65))

# Crop the image
cropped_img = img.crop(crop_box)

# Save back as samp.jpeg
cropped_img.save('samp.jpeg', quality=95)

new_height = cropped_img.height
print(f"Cropped image size: {width}x{new_height}")
print("✅ Image cropped successfully - Upper body only!")
