documentWidth = window.screen.availWidth;
gridCondainerWidth = 0.92 * documentWidth;
cellSideLength = 0.18 * documentWidth;
cellSpace = 0.04 * documentWidth;

function getPosTop(i,j){
	return cellSpace + i*(cellSpace + cellSideLength);
}

function getPosLeft(i,j){
	return cellSpace + j*(cellSpace + cellSideLength);
}

function getNumberBgcolor(number){
	switch(number){
		case 2 :return "#eee4da";break;
		case 4 :return "#ede0c8";break;
		case 8 :return "#fed179";break;
		case 16 :return "#f59563";break;
		case 32 :return "#f67c5f";break;
		case 64 :return "#f65e3d";break;
		case 128 :return "#edcf72";break;
		case 256 :return "#edcc61";break;
		case 512 :return "#9c0";break;
		case 1024 :return "#33d5e5";break;
		case 2048 :return "#09c";break;
		case 4096 :return "#a6c";break;
		case 8192 :return "#93c";break;
	}
	
	return "break";
}

function getNumberColor(number){
	if(number <= 4){
		return "#776e65";
	}
	return "white";
}

function nospace(board){
	// 遍历整个数组（棋盘）如果没有剩余空间，则返回false
	for(var i = 0; i < 4; i ++ ){
		for(var j = 0; j < 4; j++){
			if(board[i][j] == 0){
				return false;
			}
		}
	}
	return true;
}


function canMoveLeft(board){
	for(var i = 0; i < 4; i ++ )
		for(var j = 1; j < 4; j++)
			if(board[i][j] != 0)
				if(board[i][j-1] == 0 || board[i][j-1] == board[i][j])
					return true;
	return false;
}

function canMoveRight(board){
	for(var i = 0; i < 4; i ++ )
		for(var j = 0; j < 3; j++)
			if(board[i][j] != 0)
				if(board[i][j+1] == 0 || board[i][j+1] == board[i][j])
					return true;
	return false;
}

function canMoveUp(board){
	for(var j = 0; j < 4; j ++ )
		for(var i = 1; i < 4; i++)
			if(board[i][j] != 0)
				if(board[i-1][j] == 0 || board[i-1][j] == board[i][j])
					return true;
	return false;
}

function canMoveDown(board){
	for(var j = 0; j < 4; j ++ )
		for(var i = 0; i < 3; i++)
			if(board[i][j] != 0)
				if(board[i+1][j] == 0 || board[i+1][j] == board[i][j])
					return true;
	return false;
}

function noBlockHorizontal(row,col1,col2,board){
	for(var n = col1 + 1; n < col2; n++)
		if(board[row][n] != 0)
			return false;
	
	return true;
}

function noBlockVertical(col,col1,col2,board){
	for(var n = col1 + 1; n < col2; n++)
		if(board[n][col] != 0)
			return false;
	
	return true;
}

function nomove(board){
	if( canMoveLeft(board) ||
		canMoveRight(board) ||
		canMoveUp(board) ||
		canMoveDown(board))
		return false;
	return true;
}