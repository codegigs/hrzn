var companytable;
$(function () {

	loadCompanies();

    		$('#companyData tbody').on( 'click', 'tr', function () {
    	        if ( $(this).hasClass('active') ) {
    	            $(this).removeClass('active');
    	        }
    	        else {
    	        	companytable.$('tr.active').removeClass('active');
    	            $(this).addClass('active');
    	        }
    	    } );

    		$('#companyEditBtn').on( 'click', function () {
    			var selected = companytable.$('tr.active');
    			$(selected).find('td').each(function() {
    				var tdValue = $(this).text();
    				var tableHeader = $(this).closest('table').find('th').eq($(this).index()).text();
    				$('#'+tableHeader).val(tdValue);
    			  });

    	    } );

    		$('#createcompanysubmit').on( 'click', function () {
    			//$('#companyCreateModal').modal('toggle');
    		});

  });

function loadCompanies(){

	 var request = $.ajax({
		 url: "/shop/companies/list",
		  method: "GET",
		  dataType: 'json'
		});

		request.done(function( data ) {
			  $.each(data, function(idx, obj) {
				  $('#companyData tbody').append(
						  "<tr>" +
						  "<td>" +obj.address+ "</td>" +
						  "<td>" +obj.city+ "</td>" +
						  "<td>" +obj.createTS+ "</td>" +
						  "<td>" +obj.lastUpdateTS+ "</td>" +
						  "</tr>"
						  )
				});
			  companytable = $("#companyData").DataTable();
		});

		request.fail(function( jqXHR, textStatus ) {
		  alert( "Request failed: " + textStatus );
		});

}