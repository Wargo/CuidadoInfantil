function row2 (text, color1, color2, num) {
	var small = 120;
	var big = 200;
	var minleft = 39;
	var time = 300;
	var diff = big - small;
	
	var rowView = Ti.UI.createTableViewRow({
		selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
		//layout:'horizontal',
		backgroundColor:color2,
		//height:Ti.UI.SIZE
		height:small
	});
	
	var view = Ti.UI.createScrollView({
		contentWidth:'auto',
		showHorizontalScrollIndicator:false,
		//height:small,
		height:Ti.UI.SIZE
		//layout:'horizontal'
	});
	
	rowView.addEventListener('click', function(e) {
		if (lastView == view) {
			return;
		}
		
		images[e.source._position].animate({
			height:big,
			width:big,
			duration:time
		});
		
		for (i in images) {
			var anim = Ti.UI.createAnimation({
				//left:minleft + (big * i),
				left:images[i].left + diff,
				//height:big,
				//width:big,
				duration:time,
			});
			if (i > e.source._position) {
				images[i].animate(anim);
			}
		}
		anim._position = e.source._position;
		anim.addEventListener('complete', function(e2) {
			if (e2.source._position == images.length - 1) {
				view.setContentOffset({x:small * e2.source._position - 82, y:0},{animated:true});
			} else if (e2.source._position == 0) {
				view.setContentOffset({x:small * e2.source._position, y:0},{animated:true});
			} else {
				view.setContentOffset({x:small * e2.source._position - 30, y:0},{animated:true});
			}
		});
		
		
		/*
		setTimeout(function() {
			tableView.scrollToIndex(e.index, {
				animated:true,
				position:Ti.UI.iPhone.TableViewScrollPosition.TOP
			});
		}, 100);
		*/
		
		if (lastView) {
			//lastView.setContentOffset({x:0,y:0},{animated:true});
			//lastView.height = small;
			//lastRow.height = small;
			for (i in lastView.images) {
				lastView.images[i].animate({
					left:minleft + (small * i),
					height:small,
					width:small,
					duration:time/2,
				});
				
				//lastView.images[i].left = minleft + (small * i);
				//lastView.images[i].height = small;
				//lastView.images[i].width = small;
				//lastView.images[i]._properties.animate({opacity:0, duration:time});
				//lastView.images[i]._properties.opacity = 0;
			}
		}
		
		lastRow = rowView;
		lastView = view;
		lastView.images = images;
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
	
	data = shuffle(data);
	
	var images = [];
	var image = require('image');
	for (i in data) {
		images.push(image(view, data[i].url, minleft + (small * i), i));
	}
	rowView.add(view);
	
	tableView.appendRow(rowView);
	rows.push(rowView);
 	
	return view;
}

module.exports = row2;