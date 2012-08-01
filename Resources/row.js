function row (text, color1, color2, num) {
	var small = 120;
	var big = 200;
	var diff = big - small;
	var left = 39;
	var duration = 300;
	
	/*
	var rowView = Ti.UI.createTableViewRow({
		selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
		//layout:'horizontal',
		backgroundColor:color2,
		height:Ti.UI.SIZE
	});
	*/
	
	var view = Ti.UI.createScrollView({
		contentWidth:'auto',
		showHorizontalScrollIndicator:false,
		height:small,
		borderColor:'#000',
		borderWidth:1,
		backgroundColor:color2,
		//layout:'horizontal'
	});
	
	view.addEventListener('click', function(e) {
		click(e);
	});
	
	var tr = Titanium.UI.create2DMatrix({
		rotate:-90,
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
	
	var data = [
		{url:'http://www.nutricion.pro/wp-content/uploads/2011/05/Nutrici%C3%B3n-infantil-alimentaci%C3%B3n-adecuada.jpg'},
		{url:'http://www.ecured.cu/images/b/b5/Estrabismo_infantil.jpg'},
		{url:'http://cuidadoinfantil.net/wp-content/uploads/2009/06/rotavirus-infantil.jpg'},
		{url:'http://cuidadoinfantil.net/wp-content/uploads/2009/06/muerte-subita-infantil-1.jpg'},
		{url:'http://m1.paperblog.com/i/133/1331837/masaje-infantil-L-yD144M.jpeg'},
		{url:'http://www.coveralia.com/noticias/images/Shakira-escribe-un-cuento-infantil-1960.jpg'}
	];
	shuffle = function(o){
		for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	};
	
	function click(e) {
		if (lastView == view) {
			return;
		}
		if (lastView) {
			//lastView.animate({height:small, duration:duration});
			for (i in lastView.images) {
				/*
				lastView.images[i].animate({
					left:left + (small * i),
					duration:duration,
					height:small,
					width:small
				});
				*/
				lastView.images[i]._properties.animate({height:10, opacity:0});
			}
		}
		//view.animate({height:big, duration:duration});
		for (i in images) {
			var enlarge = Ti.UI.createAnimation({
				left:left + (big * i),
				duration:duration,
				height:big,
				width:big
			});
			images[i].animate(enlarge);
			images[i]._properties.animate({height:big, opacity:0.6});
		}
		
		if (false && lastView) {
			lastView.animate({height:small, duration:duration, delay:duration});
		}
		setTimeout(function() {
			if (vertical) {
				view.animate({height:big, duration:duration});
			}
			for (i in categories) {
				if (i > num) {
					if (vertical) {
						categories[i]._view.animate({top:categories[i]._view.top + diff, duration:duration});
					} else {
						categories[i]._view.animate({top:categories[i]._view.top, duration:duration});
					}
				} else {
					categories[i]._view.animate({top:categories[i]._view.top, duration:duration});
				}
			}
		}, duration);
		
		lastView = view;
		lastView.images = images;
		
		scrollView.scrollTo(0, num * small);
		
		if (e.source._position == images.length - 1) {
			view.scrollTo(big * e.source._position - 82, 0);
		} else if (e.source._position == 0) {
			view.scrollTo(big * e.source._position, 0);
		} else {
			view.scrollTo(big * e.source._position - 30, 0);
		}
	}
	
	data = shuffle(data);
	
	var images = [];
	var image = require('image');
	for (i in data) {
		images.push(image(view, data[i].url, left + (small * i), i));
	}
	//rowView.add(view);
	
	//tableView.appendRow(rowView);
	//rows.push(rowView);
	view.top = num * small;
	scrollView.add(view);
	
	return view;
}

module.exports = row;