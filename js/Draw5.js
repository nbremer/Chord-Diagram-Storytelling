/*//////////////////////////////////////////////////////////////////////////*/
//Samsung side of Samsung-Nokia chord
/*//////////////////////////////////////////////////////////////////////////*/
function Draw5(){

	/*First disable click event on clicker button*/
	stopClicker();
	/*Show and run the progressBar*/
	runProgressBar(time=700*2);	
	
	/*Samsung and Nokia text*/
	changeTopText(newText = "On the left, touching the arc of Samsung, we can see that the chord runs from 17% to almost 26%. Which is a thickness spanning 9%",
		loc = 5, delayDisappear = 0, delayAppear = 1, finalText = true);
	
    /*Make the non Samsung & Nokia arcs less visible*/
    svg.selectAll("g.group").select("path")
		.transition().duration(1000)
		.style("opacity", opacityValue);		

	/*Show only the Samsung Nokia part at Samsung*/
	var arcSamsung = d3.svg.arc()
				.innerRadius(innerRadius)
				.outerRadius(outerRadius)
				.startAngle(4.040082626337902)
				.endAngle(4.561777856121815);
				
	svg.append("path")
		.attr("class","SamsungToNokiaArc")
		.attr("d", arcSamsung)
		.attr("fill", colors[5])
		.style('stroke', colors[5]);
		
	repeat();
	
	/*Repeatedly let an arc change colour*/
	function repeat() {
		d3.selectAll(".SamsungToNokiaArc")
			.transition().duration(700)
			.attr("fill", "#9FA6D0")
			.style('stroke', "#9FA6D0")
			.transition().duration(700)
			.attr("fill", colors[5])
			.style('stroke', colors[5])
			.each("end", repeat)
			;
	};
	
};/*Draw5*/