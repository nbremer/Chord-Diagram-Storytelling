/*//////////////////////////////////////////////////////////
//All Apple are grey
//////////////////////////////////////////////////////////*/
function Draw12(){

	/*First disable click event on clicker button*/
	stopClicker();
	/*Show and run the progressBar*/
	runProgressBar(time=700*11);	

	changeTopText(newText = "One thing that stands out for Apple is that all chords connected to " +
							"Apple are the color of the Apple arc: grey",
		loc = 3/2, delayDisappear = 0, delayAppear = 1, finalText = false, xloc=-80, w=210);
	changeTopText(newText = "This means that Apple has always had the net gain. " + 
							"They received more customers from other brands than they lost to them",
		loc = 3/2, delayDisappear = 9, delayAppear = 10, finalText = true, xloc=-80, w=210);

};/*Draw12*/