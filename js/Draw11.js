/*//////////////////////////////////////////////////////////
//Show all chords that are connected to Apple
//////////////////////////////////////////////////////////*/
function Draw11(){

	/*First disable click event on clicker button*/
	stopClicker();
	/*Show and run the progressBar*/
	runProgressBar(time=700*2);	
	
	changeTopText(newText = "Here are all the chords for those respondents that currently own "+ 
							"an iPhone or that used to own an iPhone",
		loc = 3/2, delayDisappear = 0, delayAppear = 1, finalText = true, xloc=-80, w=200);
		
	/*Remove the Nokia arc*/
	d3.selectAll(".NokiaLoyalArc")
		.transition().duration(1000)
		.attr("opacity", 0)
		.each("end", function() {d3.selectAll(".NokiaLoyalArc").remove();});
			
	/*Only show the chords of Apple*/
	chords.transition().duration(2000)
    .attr("opacity", function(d, i) { 
		if(d.source.index == 0 || d.target.index == 0) {return opacityValueBase;}
		else {return 0;}
	});

	/*Highlight arc of Apple*/
	svg.selectAll("g.group").select("path")
		.transition().duration(2000)
		.style("opacity", function(d) {
			if(d.index != 0) {return opacityValue;}
		});	
		
	/*Show only the ticks and text at Apple*/
	/*Make the other strokes less visible*/
	d3.selectAll("g.group").selectAll("line")
		.transition().duration(700)
		.style("stroke",function(d,i,j) {if (j == 0) {return "#000";} else {return "#DBDBDB";}});
	/*Same for the %'s*/
	svg.selectAll("g.group")
		.transition().duration(700)
		.selectAll(".tickLabels").style("opacity",function(d,i,j) {if (j == 0) {return 1;} else {return opacityValue;}});
	/*And the Names of each Arc*/	
	svg.selectAll("g.group")
		.transition().duration(700)
		.selectAll(".titles").style("opacity", function(d) { if(d.index == 0) {return 1;} else {return opacityValue;}});

};/*Draw11*/