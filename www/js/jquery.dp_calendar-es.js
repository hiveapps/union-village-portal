jQuery(function($){
	$.fn.dp_calendar.regional[''] = {
		closeText: 'Cerrar',
		prevText: '&#x3c;Ant',
		nextText: 'Sig&#x3e;',
		currentText: 'Hoy',
		monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
		'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
		monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun',
		'Jul','Ago','Sep','Oct','Nov','Dic'],
		dayNames: ['Domingo','Lunes','Martes','Mi&eacute;rcoles','Jueves','Viernes','S&aacute;bado'],
		dayNamesShort: ['Dom','Lun','Mar','Mi&eacute;','Juv','Vie','S&aacute;b'],
		dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','S&aacute;'],
		DP_LBL_EVENTS: 'Events',
		DP_LBL_NO_ROWS: 'Ning&uacute;n registro fue encontrado en &eacute;sta fecha.',
		DP_LBL_SORT_BY: 'ORDENAR POR:',
		DP_LBL_TIME: 'HORA',
		DP_LBL_TITLE: 'TITULO',
		DP_LBL_TITLE: 'Todo el d&iacute;a',
		DP_LBL_PRIORITY: 'PRIORIDAD'};
	$.datepicker.regional[''] = $.fn.dp_calendar.regional[''];
});