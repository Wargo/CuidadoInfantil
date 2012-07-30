function image (view, image, left) {
	var imageView = Ti.UI.createImageView({
		image:image,
		height:120,
		width:120,
		left:left
	});
	view.add(imageView);
	return imageView;
}

module.exports = image;
