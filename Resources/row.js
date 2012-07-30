function row (text, color1, color2) {
	var small = 120;
	var big = 200;
	var left = 39;
	
	var rowView = Ti.UI.createTableViewRow({
		selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
		//layout:'horizontal',
		backgroundColor:color2,
		height:Ti.UI.SIZE
	});
	
	var view = Ti.UI.createScrollView({
		contentWidth:'auto',
		showHorizontalScrollIndicator:false,
		height:small,
		//layout:'horizontal'
	});
	
	view.addEventListener('click', function(e) {
		if (lastOne == view) {
			return;
		}
		if (lastOne) {
			lastOne.height = small;
			//lastOne.animate({height:small, duration:300});
			for (i in lastOne.images) {
				lastOne.images[i].animate({
					left:left + (small * i),
					height:small,
					width:small,
					duration:300,
				});
			}
		}
		
		for (i in images) {
			images[i].animate({
				left:left + (big * i),
				height:big,
				width:big,
				duration:300,
			});
		}
		
		view.height = big;
		//view.animate({height:big, duration:300, delay: 1000});
		//view.animate({height:big, duration:300});
		
		lastOne = view;
		lastOne.images = images;
		/*
		setTimeout(function() {
			tableView.scrollToIndex(e.index, {
				animated:true,
				position:Ti.UI.iPhone.TableViewScrollPosition.TOP
			});
		}, 100);
		*/
	});
	
	var tr = Titanium.UI.create2DMatrix({
		rotate:-90,
	});
	
	var tabView = Ti.UI.createView({
		backgroundColor:color1,
		width:120, //30
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
		//left:30
	});
	
	view.add(tabView);
	view.add(miniTab);
	
	var data = [
		{url:'http://www.decoideas.net/wp-content/uploads/2008/01/mobiliario-infantil-fly-2.jpg'},
		{url:'http://www.milideas.net/wp-content/uploads/parque-infantil-bebe.jpg'},
		{url:'http://2.bp.blogspot.com/_JPcXQAa6hu0/RtG0gn58rlI/AAAAAAAAA3g/_8OI33IkyOs/s400/Linda+Bronson6.jpg'},
		{url:'http://www.fotosimagens.net/wp-content/uploads/2012/05/Educa%C3%A7%C3%A3o-infantil-desenhado.jpg'},
		{url:'http://interiores.com/wp-content/uploads/2008/06/cuarto-infantil.jpg'},
		{url:'http://ocioyajedrez.com/images/juguetes_infantiles_barco_pirata_FEBER.jpg'}
	];
	
	var images = [];
	var image = require('image');
	for (i in data) {
		images.push(image(view, data[i].url, left + (small * i)));
	}
	rowView.add(view);
	
	tableView.appendRow(rowView);
	rows.push(rowView);
}

module.exports = row;