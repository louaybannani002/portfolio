CNN-based Invoice OCR — images for this project
Folder: public/projects/invoice-ocr/

Add these files (JPG, landscape):

  cover.jpg   Recommended. Card + hero image. 16:9, ~1600x900 px, < 400 KB.
              If missing, the site shows a generated placeholder (gradient + icon + title).

  1.jpg       Optional gallery image 1 (screenshot, diagram, results chart...)
  2.jpg       Optional gallery image 2
  3.jpg ...   Add as many as you want, numbered in order.

After adding gallery images, list them in data/projects.ts for slug "invoice-ocr":
  gallery: ["/projects/invoice-ocr/1.jpg", "/projects/invoice-ocr/2.jpg"],

The cover path is already set:  coverImage: "/projects/invoice-ocr/cover.jpg"
Want PNG/WebP instead? Change the extension in data/projects.ts too.
