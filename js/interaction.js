$(function(){
	$(".note-img").draggable();
	$(".spot").droppable({
		tolerance: "pointer",
		accept: ".note-img",
		drop:function(event,ui){
			$(this).addClass("spot-state-change");
		}
	});

	$("#reset1").click(function() {
    	location.reload();
	});


	$("#next-btn1").click(function(){
		var SpotIds = [];
		$(".spot").each(function(){
			SpotIds.push(this.id);
		});
		var assignedSpot = 0;
		for (var i = 0; i < SpotIds.length; ++i) {
			if ($("#" + SpotIds[i]).hasClass("spot-state-change")) {
				assignedSpot ++;
			}
			else
				break;
		}
		if (assignedSpot == SpotIds.length) {
			$(".board").hide();
			var sortPostIDs = [];
			$("#category-items").find(".sort-post").each(function(){ 
				sortPostIDs.push(this.id);
			});
			var noteIDs = [];
			$(".note-img").each(function(){ 
				noteIDs.push(this.id);
			});
			var flags = [0,0,0,0,0,0];
			for (var i = 0; i < sortPostIDs.length; ++i) {
				var selected_idx = 0;
				do {
					selected_idx = Math.floor(Math.random()*6);
				} while(flags[selected_idx] == 1);
				flags[selected_idx] = 1;
				var src = $("#" + noteIDs[selected_idx]).attr('src');
				console.log(src);
				$("#" + sortPostIDs[i]).attr('src', src);
			}
		} else {
			alert("Please drag all notes on the board!!!");
		}
		
	});

	$("#home-depot").sortable();
	$("#farmers-market").sortable();
	$("#home-depot, #farmers-market").sortable({
		connectWith: "#home-depot, #farmers-market"
	});

	$("#next-btn2").click(function(){
		var homeDepotPrice = 0;
		$("#home-depot").find(".sort-post").each(function(){
			var price = parseInt($(this).attr('src').split("_")[1]);
			console.log(price);
			homeDepotPrice += price;
		})
		$("#hd-number").html("$" + homeDepotPrice);
		var farmersMarketPrice = 0;
		$("#farmers-market").find(".sort-post").each(function(){
			var price = parseInt($(this).attr('src').split("_")[1]);
			console.log(price);
			farmersMarketPrice += price;
		})
		$("#fm-number").html("$" + farmersMarketPrice);
		$("#total-number").html("$" + (homeDepotPrice + farmersMarketPrice));
	});

	$("#reset-all").click(function() {
    	location.reload();
	});
});
