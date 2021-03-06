function categories(showData) {
	var path = 'http://www.cuidadoinfantil.net/appMovil/categories.php';
	var client = Ti.Network.createHTTPClient({
		onload: function(e) {
			Ti.API.error('success ' + this.responseText);
			var result = eval('(' + this.responseText + ')');
			if (result.status == 'ok') {
				categories = result.data;
				showData(result.data);
			} else {
				if (result.message == '') {
					result.message = L('No hay conexión a internet');
				}
				var alert = Ti.UI.createAlertDialog({
					title:L('Error'),
					message:result.message,
					ok:L('Ok')
				});
				alert.show();
			}
		},
		onerror: function(e) {
			var alert = Ti.UI.createAlertDialog({
				title:L('Error'),
				message:L('Error en la conexión'),
				ok:L('Ok')
			});
			alert.show();
			Ti.API.error(e);
		},
		timeout: 15000
	});
	
	client.open('GET', path);
	client.send();
}

module.exports = categories;