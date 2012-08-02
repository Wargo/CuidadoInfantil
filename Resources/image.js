function image (view, img, left, position) {
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
	
	var loading = Ti.UI.createActivityIndicator({
		
	});
	imageView.add(loading);
	loading.show();
	imageView._loading = loading;
	
	imageView._position = position;
	/*
	var border = Ti.UI.createView({
		backgroundColor: '#000',
		width: 1,
		top: 0,
		bottom: 0,
		right: 0
	});
	imageView.add(border);
	*/
	
	var shadow = require('shadow');
	imageView.addEventListener('load', function(e) {
		e.source._loading.hide();
		e.source.add(shadow(7, 'left', 0.1));
	});
	
	
	/*
	var properties = Ti.UI.createView({
		backgroundColor:'#000',
		opacity:0,
		top:120,
		left:0,
		//width:200,
		//right:0,
		height:40
	});
	var label = Ti.UI.createLabel({
		color:'#FFF',
		text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		top:4,left:10,right:10,
		height:32,
		font:{fontSize:13}
	});
	properties.add(label);
	imageView.add(properties);
	imageView._properties = properties;
	
	*/
	view.add(imageView);
	
	
	return imageView;
}

module.exports = image;
