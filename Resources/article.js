var win = Ti.UI.currentWindow;
win.backgroundColor = '#FFF';
//win.layout = 'vertical';
var heightImage = 200;

var menu = Ti.UI.createView({
	height:40,
	top:0,
	backgroundImage:'images/topBar1.png',
	zIndex:100
});
var borderMenu = Ti.UI.createView({
	backgroundColor:'#FFF',
	height:2,
	right:0,left:0,
	top:38
});
menu.add(borderMenu);

var logo = Ti.UI.createImageView({
	image:'images/logo.png',
	height:25
});
menu.add(logo);

var back = Ti.UI.createView({
	left:5,
	width:30,
	height:30
});
var backIco = Ti.UI.createImageView({image:'images/back.png'});
back.add(backIco);
var animateWin = Ti.UI.createAnimation({
	left:320,
	width:320,
	duration:300
});
back.addEventListener('click', function() {
	Ti.App.isAnimating = false;
	win.close(animateWin);
})
menu.add(back);

win.add(menu);

var view = Ti.UI.createScrollView({
	top:0,
	//layout:'vertical',
	contentHeight:'auto',
	showVerticalScrollIndicator:true
});

var data = [
	{url:'http://1.bp.blogspot.com/_WnUMpPhaVL8/S8cs057kZ8I/AAAAAAAACz8/2NZq08D38rY/s1600/Alimentacion-de-bebes.JPG'},
	{url:'http://pequelia.es/files/2009/04/caca-500x375.jpg'},
	{url:'http://www.jorgemartinschwab.com/blogfotos/fotografia-bebes-nacimientos-recien-nacidos-2.jpg'},
	{url:'http://3.bp.blogspot.com/_sFfxrpD7OTc/TAGTx-ZEm1I/AAAAAAAAAKM/cj3QK3vAdcg/s1600/bebe.jpg'},
];

var views = [];
for (i in data) {
	eval('var view' + i + ' = Ti.UI.createImageView({preventDefaultImage:true,width:320,height:320,image:"' + data[i].url + '"});');
	var loading = Ti.UI.createActivityIndicator();
	eval("view" + i + ".add(loading);");
	eval("view" + i + "._loading = loading");
	loading.show();
	eval("view" + i + ".addEventListener('load', function(e) { e.source._loading.hide(); });");
	
	eval("views.push(view" + i + ");");
}

var images = Ti.UI.createScrollableView({
	top:40,
	cacheSize:3,
	//currentPage:0,
	height:heightImage,
	pagingControlColor:win.color2,
	pagingControlHeight:15,
	showPagingControl:true,
	//views:[view0, view1, view2, view3]
	views:views
});

var title = Ti.UI.createLabel({
	text:win.title,
	font:{fontSize:22},
	color:'#333',
	top:0,
	left:0
})
var text = Ti.UI.createLabel({
	text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porta porta semper. Cras aliquam massa a sem fringilla in vehicula leo vestibulum. Praesent lobortis congue sodales.\r\n\r\nFusce nisi diam, rhoncus sed porta venenatis, porta nec massa. Praesent porta diam in libero vulputate et fermentum justo hendrerit. Phasellus a augue vel magna placerat porttitor id quis ligula. Maecenas metus urna, faucibus vitae eleifend in, consequat ut mi. Mauris placerat augue laoreet lorem mattis eu sagittis nisl luctus.\r\n\r\nSuspendisse potenti. Aliquam mattis gravida tellus pretium tincidunt. Nulla ac justo enim. Donec a elit lectus. Cras id nulla ut turpis pretium congue...',
	color:'#333',
	top:10,
	font:{fontSize:14},
	left:0
});
var article = Ti.UI.createView({
	top:heightImage + 10 + 40,
	left:50,
	right:10,
	layout:'vertical'
});
article.add(title);
article.add(text);

var border = Ti.UI.createView({
	backgroundColor:win.color1,
	width:35,
	top:heightImage + 40,
	left:0
});
var border2 = Ti.UI.createView({
	backgroundColor:win.color2,
	width:4,
	top:heightImage + 40,
	left:35
});

view.add(images);
view.add(article);
view.add(border);
view.add(border2);

win.add(view);

var oldY = 0;
var animateUp = true;
var animateDown = true;
var menuShown = true;
var canAnimate = true;
view.addEventListener('dragEnd', function() {
	canAnimate = false;
});
view.addEventListener('dragStart', function() {
	canAnimate = true;
});
view.addEventListener('scroll', function(e) {
	if (e.y > oldY && e.y > 40) {
		if (menuShown && canAnimate) {
			Ti.API.error('hide ' + e.y + ' ' + oldY);
			var anim = Ti.UI.createAnimation({
				top:-40
			});
			menu.animate(anim);
			//view.animate({top:0});
			menuShown = false;
			anim.addEventListener('complete', function() {
				Ti.API.error('animation completed');
			});
		}
	} else {
		if (!menuShown && canAnimate) {
			Ti.API.error('show ' + e.y + ' ' + oldY);
			var anim = Ti.UI.createAnimation({
				top:0
			});
			menu.animate(anim);
			//view.animate({top:40});	
			menuShown = true;
			anim.addEventListener('complete', function() {
				Ti.API.error('animation completed');
			});
		}
	}
	oldY = e.y;
});