var win = Ti.UI.createWindow({
	backgroundColor:'#000',
	layout:'vertical'
});
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

var tableView = Ti.UI.createTableView({
	backgroundColor:'#000',
	separatorColor:'#666',
	separatorStyle:'none'
});

win.add(menu);
win.add(tableView);

var rows = [];
var lastOne = null;

var row = require('row');
row(L('Blog'), '#3388CC1', '#43B3FC');
row(L('Recetas'), '#28795F', '#97D0C2');
row(L('Manualidades'), '#FF6600', '#FF9900');
row(L('Juegos'), '#FFCC00', '#FFEE66');
row(L('Blog'), '#3388CC1', '#43B3FC');
row(L('Recetas'), '#28795F', '#97D0C2');
row(L('Manualidades'), '#FF6600', '#FF9900');
row(L('Juegos'), '#FFCC00', '#FFEE66');
