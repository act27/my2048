function showNumberWithAnimation(i,j,randNumber){
	var numberCell = $("#number-cell-"+i+"-"+j);
	
	numberCell.css('background-color',getNumberBgcolor(randNumber));
	numberCell.css('color',getNumberColor(randNumber));
	numberCell.text(randNumber);
	
	numberCell.animate({
		width:cellSideLength,
		height:cellSideLength,
		top:getPosTop(i,j),
		left:getPosLeft(i,j)
	},50)
}

function showMoveAnimation(formx,formy,tox,toy){
	var numberCell = $("#number-cell-" + formx + "-" + formy);
	numberCell.animate({
		top:getPosTop(tox,toy),
		left:getPosLeft(tox,toy)
	},200);
}

function updateScore(score){
	console.log(score);
	$("#score").text(score);
	
}