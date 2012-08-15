function row (text, color1, color2, id) {
	var small = 120;
	var big = 200;
	var minleft = 39;
	var time = 300;
	var diff = big - small;
	
	var rowView = Ti.UI.createTableViewRow({
		selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
		backgroundColor:color2,
		height:small
	});
	
	var view = Ti.UI.createScrollView({
		contentWidth:'auto',
		showHorizontalScrollIndicator:false,
		height:Ti.UI.SIZE
	});
	
	view.addEventListener('click', function(e) {
		if (Ti.App.isAnimating) {
			return;
		}
		Ti.App.isAnimating = true;
		if (typeof e.source._position == 'undefined') {
			Ti.App.removeElements(view, true);
			Ti.App.isAnimating = false;
			return;
		}
		Ti.App.removeElements(view, true);
		e.source.opacity = 0.7;

		var auxLeft = e.source._left;
		var w = Ti.Platform.displayCaps.platformWidth;
		if (e.source._position == images.length - 1) {
			view.scrollTo(small * e.source._position - w + small + 39, 0); // - 82
			auxLeft -= diff / 2;
		} else if (e.source._position == 0) {
			view.scrollTo(small * e.source._position, 0);
			auxLeft += diff / 2;
		} else {
			view.scrollTo(small * e.source._position + 39 - w / 2 + small / 2, 0);
		}
		setTimeout(function() {
			//e.source.animate({width:big,height:big});
			//view.setContentOffset({x:view.getContentOffset().x + diff / 2, y:0}, {animated:true});
			var auxImage = Ti.UI.createImageView({
				image:e.source.image,
				//width:small,
				//height:small,
				//left:auxLeft,// - diff / 2,
				//opacity:0,
				//anchorPoint:{x:0.5,y:0.5},
				preventDefaultImage:true,
				//borderColor:'#FFF',
				//borderWidth:2
			});
			Ti.App.aux = Ti.UI.createView({
				//image:e.source.image,
				width:small,
				height:small,
				left:auxLeft,// - diff / 2,
				opacity:0,
				anchorPoint:{x:0.5,y:0.5},
				//preventDefaultImage:true,
				borderColor:'#FFF',
				borderWidth:2
			});
			Ti.App.aux.add(auxImage);
			Ti.App.title = Ti.UI.createView({
				backgroundColor:'#000',
				opacity:0,
				top:120,
				left:0,
				width:200,
				height:40,
				//zIndex:100
			});
			Ti.App.title.add(Ti.UI.createLabel({
				color:'#FFF',
				text:e.source._title,
				top:4,left:10,right:20,
				height:32,
				font:{fontSize:13,fontWeight:'bold'}
			}));
			Ti.App.title.add(Ti.UI.createImageView({
				right:10,
				image:'images/go.png'
			}));
			Ti.App.black = Ti.UI.createView({
				backgroundColor:'#000',
				opacity:0,
				left:39
			});
			view.add(Ti.App.black);
			view.add(Ti.App.aux);
			view.add(Ti.App.title);
			var tr = Ti.UI.create2DMatrix({
				scale:big/small
			});
			Ti.App.aux.animate({opacity:1, transform:tr, duration:time});
			Ti.App.black.animate({opacity:0.7, duration:time})
			setTimeout(function() {
				e.source.opacity = 1;
				Ti.App.title.left = auxLeft - diff/2;
				Ti.App.title.animate({top:70, opacity:0.6, duration:time});
				
				var newWin = Ti.UI.createWindow({url:'article.js', left:320, width:320});
				newWin.color1 = color1;
				newWin.color2 = color2;
				newWin.title = e.source._title;
				newWin.text = e.source._text;
				newWin.images = e.source._images;
				var animateWin = Ti.UI.createAnimation({
					left:0,
					width:320,
					duration:time
				});
				Ti.App.isAnimating = false;
				Ti.App.aux.addEventListener('click', function() {
					newWin.open(animateWin);
				});
				Ti.App.title.addEventListener('click', function() {
					newWin.open(animateWin);
				});
			}, time);
		}, time);
	});
	
	view.addEventListener('scrollEnd', function() {
		//Ti.App.removeElements(view, false);
	});
	
	view.addEventListener('dragStart', function() {
		Ti.App.removeElements(view, false);
	});
	
	var tr = Titanium.UI.create2DMatrix({
		rotate:-90
	});
	
	var tabView = Ti.UI.createView({
		backgroundColor:color1,
		width:120,
		height:Ti.UI.FILL,
		left:-90
	});
	var tabText = Ti.UI.createLabel({
		text:text,
		color:'#FFF',
		transform:tr,
		anchorPoint:{x:1,y:1},
		top:-18,
		right:0
	});
	tabView.add(tabText);

	var miniTab = Ti.UI.createLabel({
		text:'',
		backgroundColor:color2,
		width:7,
		left:30,
		height:Ti.UI.FILL,
		borderColor:color1,
		borderWidth:2,
	});
	
	view.add(tabView);
	view.add(miniTab);
	
	var images = [];
	function showData(data) {
		var image = require('image');
		for (i in data) {
			j = data.length - i - 1;
			images.push(image(view, data[j], minleft + (small * j), j));
		}
	}
	rowView.add(view);
	tableView.appendRow(rowView);
	rows.push(rowView);
	
	var getData = require('bbdd/articles');
	var data = getData(id, showData);
 	
	return view;
}

module.exports = row;