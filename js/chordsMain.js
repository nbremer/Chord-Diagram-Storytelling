/*//////////////////////////////////////////////////////////
////////////////// Set up the Data /////////////////////////
//////////////////////////////////////////////////////////*/

var NameProvider = ["Apple","HTC","Huawei","LG","Nokia","Samsung","Sony","Other"];
	
var matrix = [
[9.6899,0.8859,0.0554,0.443,2.5471,2.4363,0.5537,2.5471], /*Apple 19.1584*/
[0.1107,1.8272,0,0.4983,1.1074,1.052,0.2215,0.4983], /*HTC 5.3154*/
[0.0554,0.2769,0.2215,0.2215,0.3876,0.8306,0.0554,0.3322], /*Huawei 2.3811*/
[0.0554,0.1107,0.0554,1.2182,1.1628,0.6645,0.4983,1.052], /*LG 4.8173*/
[0.2215,0.443,0,0.2769,10.4097,1.2182,0.4983,2.8239], /*Nokia 15.8915*/
[1.1628,2.6024,0,1.3843,8.7486,16.8328,1.7165,5.5925], /*Samsung 38.0399*/
[0.0554,0.4983,0,0.3322,0.443,0.8859,1.7719,0.443], /*Sony 4.4297*/
[0.2215,0.7198,0,0.3322,1.6611,1.495,0.1107,5.4264] /*Other 9.9667*/
];
/*Sums up to exactly 100*/

var colors = ["#C4C4C4","#69B40F","#EC1D25","#C8125C","#008FC8","#10218B","#134B24","#737373"];

/*Initiate the color scale*/
var fill = d3.scale.ordinal()
    .domain(d3.range(NameProvider.length))
    .range(colors);
	
/*//////////////////////////////////////////////////////////
/////////////// Initiate Chord Diagram /////////////////////
//////////////////////////////////////////////////////////*/

var margin = {top: 20, right: 25, bottom: 20, left: 25},
	width = 700 - margin.left - margin.right,
    height = 650 - margin.top - margin.bottom,
    innerRadius = Math.min(width, height) * .39,
    outerRadius = innerRadius * 1.04;

/*Initiate the SVG*/
var svg = d3.select("#chart").append("svg:svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
	.append("svg:g")
    .attr("transform", "translate(" + (margin.left + width / 2) + "," + (margin.top + height / 2) + ")");

	
var chord = d3.layout.chord()
    .padding(.04)
    .sortSubgroups(d3.descending) /*sort the chords inside an arc from high to low*/
    .sortChords(d3.descending) /*which chord should be shown on top when chords cross. Now the biggest chord is at the bottom*/
	.matrix(matrix);
	

/*//////////////////////////////////////////////////////////
////////////////// Draw outer Arcs /////////////////////////
//////////////////////////////////////////////////////////*/

var arc = d3.svg.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);
	
var g = svg.selectAll("g.group")
	.data(chord.groups)
	.enter().append("svg:g")
	.attr("class", function(d) {return "group " + NameProvider[d.index];});
	
g.append("svg:path")
	  .attr("class", "arc")
	  .style("stroke", function(d) { return fill(d.index); })
	  .style("fill", function(d) { return fill(d.index); })
	  .attr("d", arc)
	  .style("opacity", 0)
	  .transition().duration(1000)
	  .style("opacity", 0.4);

/*//////////////////////////////////////////////////////////
////////////////// Initiate Ticks //////////////////////////
//////////////////////////////////////////////////////////*/

var ticks = svg.selectAll("g.group").append("svg:g")
	.attr("class", function(d) {return "ticks " + NameProvider[d.index];})
	.selectAll("g.ticks")
	.attr("class", "ticks")
    .data(groupTicks)
	.enter().append("svg:g")
    .attr("transform", function(d) {
      return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
          + "translate(" + outerRadius+40 + ",0)";
    });

/*Append the tick around the arcs*/
ticks.append("svg:line")
	.attr("x1", 1)
	.attr("y1", 0)
	.attr("x2", 5)
	.attr("y2", 0)
	.attr("class", "ticks")
	.style("stroke", "#FFF");
	
/*Add the labels for the %'s*/
ticks.append("svg:text")
	.attr("x", 8)
	.attr("dy", ".35em")
	.attr("class", "tickLabels")
	.attr("transform", function(d) { return d.angle > Math.PI ? "rotate(180)translate(-16)" : null; })
	.style("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
	.text(function(d) { return d.label; })
	.attr('opacity', 0);
	
/*//////////////////////////////////////////////////////////
////////////////// Initiate Names //////////////////////////
//////////////////////////////////////////////////////////*/

g.append("svg:text")
  .each(function(d) { d.angle = (d.startAngle + d.endAngle) / 2; })
  .attr("dy", ".35em")
  .attr("class", "titles")
  .attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
  .attr("transform", function(d) {
		return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
		+ "translate(" + (innerRadius + 55) + ")"
		+ (d.angle > Math.PI ? "rotate(180)" : "");
  })
  .attr('opacity', 0)
  .text(function(d,i) { return NameProvider[i]; });  

/*//////////////////////////////////////////////////////////
//////////////// Initiate inner chords /////////////////////
//////////////////////////////////////////////////////////*/

var chords = svg.selectAll("path.chord")
	.data(chord.chords)
	.enter().append("svg:path")
	.attr("class", "chord")
	.style("stroke", function(d) { return d3.rgb(fill(d.source.index)).darker(); })
	.style("fill", function(d) { return fill(d.source.index); })
	.attr("d", d3.svg.chord().radius(innerRadius))
	.attr('opacity', 0);

/*//////////////////////////////////////////////////////////	
///////////// Initiate Progress Bar ////////////////////////
//////////////////////////////////////////////////////////*/
/*Initiate variables for bar*/
var progressColor = ["#D1D1D1","#949494"],
	progressClass = ["prgsBehind","prgsFront"],
	prgsWidth = 0.4*650,
	prgsHeight = 3;
/*Create SVG to visualize bar in*/
var progressBar = d3.select("#progress").append("svg")
	.attr("width", prgsWidth)
	.attr("height", 3*prgsHeight);
/*Create two bars of which one has a width of zero*/
progressBar.selectAll("rect")
	.data([prgsWidth, 0])
	.enter()
	.append("rect")
	.attr("class", function(d,i) {return progressClass[i];})
	.attr("x", 0)
	.attr("y", 0)
	.attr("width", function (d) {return d;})
	.attr("height", prgsHeight)
	.attr("fill", function(d,i) {return progressColor[i];});

/*//////////////////////////////////////////////////////////	
/////////// Initiate the Center Texts //////////////////////
//////////////////////////////////////////////////////////*/
/*Create wrapper for center text*/
var textCenter = svg.append("g")
					.attr("class", "explanationWrapper");

/*Starting text middle top*/
var middleTextTop = textCenter.append("text")
	.attr("class", "explanation")
	.attr("text-anchor", "middle")
	.attr("x", 0 + "px")
	.attr("y", -24*10/2 + "px")
	.attr("dy", "1em")
	.attr("opacity", 1)
	.text("For the Dutch version of the Deloitte Global Mobile Consumer Survey, Deloitte asked 2000 residents of the Netherlands about their mobile phone behavior")
	.call(wrap, 350);

/*Starting text middle bottom*/
var middleTextBottom = textCenter.append("text")
	.attr("class", "explanation")
	.attr("text-anchor", "middle")
	.attr("x", 0 + "px")
	.attr("y", 24*3/2 + "px")
	.attr("dy", "1em")
	.attr('opacity', 1)
	.text("The respondents gave us information about the brand of their current main phone, and the brand of their previous main phone")
	.call(wrap, 350);


/*//////////////////////////////////////////////////////////
//////////////// Storyboarding Steps ///////////////////////
//////////////////////////////////////////////////////////*/

var counter = 1,
	buttonTexts = ["Ok","Go on","Continue","Okay","Go on","Continue","Okay","Continue",
				   "Continue","Continue","Continue","Continue","Continue","Finish"],
	opacityValueBase = 0.8,
	opacityValue = 0.4;

/*Reload page*/
d3.select("#reset")
	.on("click", function(e) {location.reload();});

/*Skip to final visual right away*/
d3.select("#skip")
	.on("click", finalChord);
	
/*Order of steps when clicking button*/
d3.select("#clicker")      
	.on("click", function(e){
	
		//Introduction
		if(counter == 1) Draw1();
		//Show Arc of Apple
		else if(counter == 2) Draw2();
		//Draw the other arcs as well
		else if(counter == 3) Draw3();
		//Show the chord between Samsung and Nokia
		else if(counter == 4) Draw4();
		//Samsung side of Samsung-Nokia chord
		else if(counter == 5) Draw5();
		//Samsung from Nokia
		else if(counter == 6) Draw6();
		//Nokia side of Samsung-Nokia chord
		else if(counter == 7) Draw7();
		// Samsung net gain from Nokia
		else if(counter == 8) Draw8();
		//Show Loyalty hills
		else if(counter == 9) Draw9();
		//Show Loyalty hills - explain Nokia
		else if(counter == 10) Draw10();
		//Show all chords that are connected to Apple
		else if(counter == 11) Draw11();
		//All Apple are grey
		else if(counter == 12) Draw12();
		//Apple lost almost nobody
		else if(counter == 13) Draw13();
		//Final wrap up
		else if(counter == 14) Draw14();
		//Draw the original Chord diagram
		else if(counter == 15) finalChord();
		
		counter = counter + 1;
	});

