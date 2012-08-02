function image1 (view, img, left, position) {
	var imageView = Ti.UI.createImageView({
	//var imageView = Ti.UI.createView({	
		image:img,
		preventDefaultImage:true,
		//backgroundImage:img,
		height:120,
		width:120,
		//width:200,
		//height:200,
		left:left,
		//borderColor:'#FFF',
		//borderWidth:1
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
	
	//imageView.add(properties);
	//imageView._properties = properties;
	imageView._title = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
	
	view.add(imageView);
	
	
	return imageView;
}

module.exports = image1;