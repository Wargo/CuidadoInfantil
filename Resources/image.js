function image (view, data, left, position) {
	img = data.url;
	var imageView = Ti.UI.createImageView({
		preventDefaultImage:true,
		height:120,
		width:120,
		image:img,
		left:left
	});
	
	var loading = Ti.UI.createActivityIndicator();
	imageView.add(loading);
	loading.show();
	imageView._loading = loading;
	
	imageView._position = position;
	
	var border1 = Ti.UI.createView({
		backgroundColor: '#FFF',
		width: 3,
		top: 0, bottom: 0, left: 0
	});
	var border2 = Ti.UI.createView({
		backgroundColor: '#FFF',
		width: 3,
		top: 0, bottom: 0, right: 0
	});
	var border3 = Ti.UI.createView({
		backgroundColor: '#FFF',
		height: 3,
		top: 0, right: 0, left: 0
	});
	var border4 = Ti.UI.createView({
		backgroundColor: '#FFF',
		height: 3,
		right: 0, bottom: 0, left: 0
	});
	imageView.add(border1);
	imageView.add(border2);
	imageView.add(border3);
	imageView.add(border4);
	
	var shadow = require('shadow');
	imageView.addEventListener('load', function(e) {
		e.source._loading.hide();
		e.source.add(shadow(7, 'left', 0.1));
	});
	
	imageView._title = data.title;
	imageView._text = data.text;
	imageView._images = data.images;
	
	view.add(imageView);
	
	return imageView;
}

module.exports = image;