/*///////////////////////////////////////////////////////////  
//Draw the other arcs as well
//////////////////////////////////////////////////////////*/
function Draw3(){

	/*First disable click event on clicker button*/
	stopClicker();

	var arcDelay = [0,1,2,12,13,23,33,34,35,40,47];
	/*Show and run the progressBar*/
	runProgressBar(time=700*(arcDelay[(arcDelay.length-1)]+1));	
		
   /*Fill in the other arcs*/
   svg.selectAll("g.group").select("path")
	.transition().delay(function(d, i) { return 700*arcDelay[i];}).duration(1000)
	.attrTween("d", function(d) {
		if(d.index != 0) {
		   var i = d3.interpolate(d.startAngle, d.endAngle);
		   return function(t) {
			   d.endAngle = i(t);
			 return arc(d);
		   }
		}
    });
 
  /*Make the other strokes black as well*/
  svg.selectAll("g.group")
	.transition().delay(function(d,i) { return 700*arcDelay[i]; }).duration(700)
	.selectAll("g").selectAll("line").style("stroke", "#000");
  /*Same for the %'s*/
  svg.selectAll("g.group")
	.transition().delay(function(d,i) { return 700*arcDelay[i]; }).duration(700)
	.selectAll("g").selectAll("text").style("opacity", 1);
  /*And the Names of each Arc*/	
  svg.selectAll("g.group")
	.transition().delay(function(d,i) { return 700*arcDelay[i]; }).duration(700)
	.selectAll("text").style("opacity", 1);

	/*Change the text of the top section inside the circle accordingly*/
	/*HTC*/
	changeTopText(newText = "HTC has 5% of the market share",
		loc = 6/2, delayDisappear = 0, delayAppear = arcDelay[2]);
	/*LG*/
	changeTopText(newText = "LG has almost 5% of the market",
		loc = 6/2, delayDisappear = arcDelay[3], delayAppear = arcDelay[4]);
	/*Samsung*/
	changeTopText(newText = "Samsung has the biggest share by far, with 38% of respondents using a Samsung as their main phone",
		loc = 3/2, delayDisappear = (arcDelay[5]-1), delayAppear = arcDelay[5]);
	/*Sony*/
	changeTopText(newText = "Sony has slightly more than 4% share",
		loc = 4/2, delayDisappear = arcDelay[6], delayAppear = (arcDelay[8]-1));		
	/*100%*/
	changeTopText(newText = "Together that sums up to 100%",
		loc = 1/2, delayDisappear = (arcDelay[9]-1), delayAppear = arcDelay[9]);		
	/*Chord intro*/
	changeTopText(newText = "This circle shows how the respondents are currently divided between the brands",
		loc = 8/2, delayDisappear = (arcDelay[10]-1), delayAppear = arcDelay[10], finalText = true);					
	
	/*Change the text of the bottom section inside the circle accordingly*/
	/*Huawei*/
	changeBottomText(newText = "Huawei came from practically no share in 2013 to 2.4% in 2014 thereby taking its place in the biggest 7 brands in the Netherlands",
		loc = -2/2, delayDisappear = 0, delayAppear = arcDelay[2]);
	/*Nokia*/
	changeBottomText(newText = "Nokia is still owned by 15% of the respondents. However practically all of these phones are ordinary phones, not smartphones",
		loc = -1/2, delayDisappear = arcDelay[3], delayAppear = arcDelay[4]);	
	/*Other*/
	changeBottomText(newText = "Brands combined in \"Other\" are Blackberry, Motorola, Google Nexus and Operator branded",
		loc = -1/2, delayDisappear = (arcDelay[5]-1), delayAppear = (arcDelay[8]-1));	
	/*Chord intro*/
	changeBottomText(newText = "Now we're going to look at how these respondents flowed from their previous phone to their present one",
		loc = 1/2, delayDisappear = (arcDelay[9]-1), delayAppear = arcDelay[10]);	

};/*Draw3*/