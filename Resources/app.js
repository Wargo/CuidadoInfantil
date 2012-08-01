Ti.App.dataURL = '';

var win = Ti.UI.createWindow({
	backgroundColor:'#000',
	//layout:'vertical'
});

var vertical = false;

win.open();

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

var tools = Ti.UI.createImageView({
	image:'images/tools.png',
	left:10
});
menu.add(tools);
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
	text:L('Vertical'),
	color:'#FFF',
	top:20
})
var option = Ti.UI.createSwitch({
	value:vertical,
	bottom:30
});
//toolsMenu.add(label);
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

var tableView = Ti.UI.createTableView({
	backgroundColor:'#000',
	separatorColor:'#000',
	//separatorStyle:'none',
	top:40
});

var scrollView = Ti.UI.createScrollView({
	contentHeight:'auto',
	showVerticalScrollIndicator:false,
	top:40
});

win.add(menu);
setTimeout(function() {
	win.add(tableView);
}, 300);
//win.add(scrollView);

var rows = [];
var lastView = null;

var categories = [
	{name:L('Blog'), color1:'#3388CC1', color2:'#43B3FC'},
	{name:L('Recetas'), color1:'#28795F', color2:'#97D0C2'},
	{name:L('Manualidades'), color1:'#FF6600', color2:'#FF9900'},
	{name:L('Juegos'), color1:'#FFCC00', color2:'#FFEE66'},
	{name:L('Blog'), color1:'#3388CC1', color2:'#43B3FC'},
	//{name:L('Recetas'), color1:'#28795F', color2:'#97D0C2'},
	//{name:L('Manualidades'), color1:'#FF6600', color2:'#FF9900'},
	//{name:L('Juegos'), color1:'#FFCC00', color2:'#FFEE66'}
];

var row = require('row2');
for (i in categories) {
	categories[i]._view = row(categories[i].name, categories[i].color1, categories[i].color2, i);
}
