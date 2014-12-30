/*//////////////////////////////////////////////////////////////////////////*/
// Samsung net gain from Nokia
/*//////////////////////////////////////////////////////////////////////////*/
function Draw8(){

	/*First disable click event on clicker button*/
	stopClicker();
	/*Show and run the progressBar*/
	runProgressBar(time=700*11);	
	
	/*Samsung and Nokia text*/
	changeTopText(newText = "Since the chord is much wider at the Samsung side, Samsung has taken a lot more clients from Nokia than Nokia managed to take from Samsung",
		loc = 5, delayDisappear = 0, delayAppear = 1);
	changeTopText(newText = "Therefore, the chord is the color of Samsung blue, since Samsung has the net gain from the exchange of people between Nokia and Samsung",
		loc = 5, delayDisappear = 9, delayAppear = 10, finalText = true);
		
	/*Stop the colour changing on the Nokia side*/
	d3.selectAll(".NokiaToSamsungArc")
		.transition().duration(700)
		.attr("fill", colors[4])
		.style("stroke", colors[4]);
				
};/*Draw8*/