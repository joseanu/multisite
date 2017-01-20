export function cambiaTamano(image, mimeType) {

  const maxWidth = 800;
  const maxHeight = 800;

  const width = image.width;
  const height = image.height;

  const shouldResize = (width > maxWidth) || (height > maxHeight);

  if (!shouldResize) {
		return image.src;
	}
  else {
    let newWidth;
    let newHeight;
    if (width > height) {
    	newHeight = height * (maxWidth / width);
    	newWidth = maxWidth;
    } else {
    	newWidth = width * (maxHeight / height);
    	newHeight = maxHeight;
    }
    
    let canvas = document.createElement('canvas');
    canvas.width = newWidth;
    canvas.height = newHeight;
    let context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, newWidth, newHeight);
  
    return canvas.toDataURL(mimeType);
  }
}