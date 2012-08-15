function image (view, data, left, position) {
	img = data.url;
	var imageInside = Ti.UI.createImageView({
		preventDefaultImage:true,
		//height:120,
		//width:120,
		image:img,
		opacity:0
		//left:left
	});
	var imageView = Ti.UI.createView({
		width:120,
		height:120,
		left:left
	});
	
	imageView.add(imageInside);
	imageView._image = imageInside;
	imageInside._left = left;
	
	var loading = Ti.UI.createActivityIndicator();
	imageView.add(loading);
	loading.show();
	imageView._image._loading = loading;
	
	imageView._image._position = position;
	
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
	
	var shadow = require('shadow');
	imageView._image.addEventListener('load', function(e) {
		imageView.setShadow({
			shadowRadius:8,
			shadowOpacity:0.8,
			shadowOffset:{x:8, y:0}
		});
		e.source.animate({opacity:1});
		e.source.add(border1);
		e.source.add(border2);
		e.source.add(border3);
		e.source.add(border4);
		e.source._loading.hide();
		//e.source.add(shadow(7, 'left', 0.1));
	});
	
	imageView._image._title = data.title;
	imageView._image._text = data.text;
	imageView._image._images = data.images;
	
	view.add(imageView);
	
	return imageView;
}

module.exports = image;