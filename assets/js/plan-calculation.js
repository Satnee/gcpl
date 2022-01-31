function selectPlans(plan){	
	$("#item_number").val(plan);		
	console.log(plan);	
	if(plan == "0") {
		var multiply = "0";
	}if(plan == "3000") {
		var multiply = "650";			
		var multiply1 = " 1 Pin";			
	}if(plan == "6000") {
		var multiply = "1200";
		var multiply1 = " 2 Pins";
	}if(plan == "12000") {
		var multiply = "2000";
		var multiply1 = " 3 Pins";
	}if(plan == "24000") {
		var multiply = "3500";
		var multiply1 = " 4 Pins";
	}if(plan == "48000"){
	   var multiply = "5000";  
	   var multiply1 = " 5 Pins";  
	  }
	$("#onePinAmount").val("₹ "+ multiply);
    $("#pinNos").val( "Get You"+  multiply1);
	$("#totalAmount").val("₹ "+ multiply);
}