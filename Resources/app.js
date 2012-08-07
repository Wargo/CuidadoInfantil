Ti.App.dataURL = '';
Ti.App.aux = null;
Ti.App.black = null;
Ti.App.title = null;
Ti.App.currentView = null;
Ti.App.isAnimating = false;
Ti.App.categories = [];
var vertical = false;

function removeElements(view, animate) {
	if (Ti.App.black) {
		if (view != Ti.App.currentView) {
			remove_animated(view);
		} else {
			if (animate) {
				remove_animated(view);
			} else {
				Ti.App.title.opacity = Ti.App.black.opacity = Ti.App.aux.opacity = 0;
				//Ti.App.currentView.remove(Ti.App.black);
				//Ti.App.currentView.remove(Ti.App.aux);
				//Ti.App.currentView.remove(Ti.App.title);
				Ti.App.title = Ti.App.black = Ti.App.aux = null;
				Ti.App.currentView = view;
			}
		}
	} else {
		Ti.App.currentView = view;
	}
}

function remove_animated(view) {
	var deleted = false;
	var auxAnim = Ti.UI.createAnimation({opacity:0, duration: 300});
	Ti.App.black.animate(auxAnim);
	Ti.App.aux.animate(auxAnim);
	Ti.App.title.animate(auxAnim);
	auxAnim.addEventListener('complete', function(e) {
		if (deleted) {
			return;
		}
		deleted = true;
		if (Ti.App.currentView) {
			Ti.App.currentView.remove(Ti.App.black);
			Ti.App.currentView.remove(Ti.App.aux);
			Ti.App.currentView.remove(Ti.App.title);
		}
		//Ti.App.title = Ti.App.black = Ti.App.aux = null;
		Ti.App.currentView = view;
	});
}

Ti.App.removeElements = removeElements;

var win = Ti.UI.createWindow({
	backgroundColor:'#000',
	//layout:'vertical'
});

win.open();

var loading = Ti.UI.createActivityIndicator();
loading.show();

var menu = Ti.UI.createView({
	height:40,
	top:0,
	backgroundImage:'images/topBar.png'
});

var logo = Ti.UI.createImageView({
	image:'images/logo.png',
	height:25
});
menu.add(logo);
logo.addEventListener('click', function() {
	var categories = Ti.App.categories;
	for (i in categories) {
		categories[i]._view.setContentOffset({x:0,y:0},{animated:true});
	}
	setTimeout(function() {
		removeElements(null, true);
	}, 300);
});

var tools = Ti.UI.createImageView({
	image:'images/tools.png',
	left:10,
	opacity:1
});
//menu.add(tools);
var toolsMenu = Ti.UI.createView({
	backgroundColor:'#000',
	borderColor:'#000',
	borderWidth:2,
	borderRadius:5,
	width:200,
	height:10,
	left:5,
	top:45,
	opacity:0,
	zIndex:100
});
win.add(toolsMenu);
var label = Ti.UI.createLabel({
	text:L('Configuración sin terminar'),
	color:'#FFF',
	top:20,
	left:15,right:15
})
var option = Ti.UI.createSwitch({
	value:vertical,
	bottom:30
});
toolsMenu.add(label);
//toolsMenu.add(option);
option.addEventListener('change', function(e) {
	vertical = e.value;
	setTimeout(function() {
		toolsMenu.animate({height:1, opacity:0})
		tools.opacity = 1;
	}, 1000);
});
tools.addEventListener('click', function() {
	if (tools.opacity == 1) {
		tools.opacity = 0.3;
		toolsMenu.animate({height:100, opacity:0.9});
	} else {
		tools.opacity = 1;
		toolsMenu.animate({height:1, opacity:0});
	}
});

var reload = Ti.UI.createImageView({
	image:'images/reload.png',
	right:10,
	width:20,
	height:20
});
reload.addEventListener('click', function() {
	tableView.data = [];
	Ti.App.categories = [];
	win.remove(tableView);
	loading.show();
	getData(showData);
	win.add(tableView);
	tableView.animate({opacity:1, duration:1000});
});
menu.add(reload);

var tableView = Ti.UI.createTableView({
	backgroundColor:'#000',
	separatorColor:'#000',
	top:40,
	opacity:0
});

win.add(menu);

var getData = require('bbdd/categories');

var rows = [];
var lastView = null;
var lastImage = null;

function showData(categories) {
	var row = require('row');
	for (i in categories) {
		categories[i]._view = row(categories[i].name, categories[i].color1, categories[i].color2, categories[i].id);
	}
	Ti.App.categories = categories;
}

win.add(tableView);
tableView.animate({opacity:1, duration:1000});
setTimeout(function() {
	loading.hide();
}, 1000);

win.add(loading);
getData(showData);

