var board = new Array();		// 新建数组
var score = 0;					// 分数
var hasConficted = new Array();


var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;


$(document).ready(function(){
//读取页面，开始新游戏
	prepareForMobile();
	newgame();
});

function prepareForMobile(){
	
	if(documentWidth > 500){
		gridCondainerWidth = 500;
		cellSpace = 20;
		cellSideLength = 100;
	}
	
	
	$("#grid-container").css('width',gridCondainerWidth - 2 *cellSpace);
	$("#grid-container").css('height',gridCondainerWidth - 2 *cellSpace);
	$("#grid-container").css('padding',cellSpace);
	$("#grid-container").css('border-radius',0.02 * gridCondainerWidth);
	
	$(".grid-cell").css('width',cellSideLength);
	$(".grid-cell").css('height',cellSideLength);
	$(".grid-cell").css('border-radius',0.02 * cellSideLength);
}

function newgame(){
	init();						// 初始化棋盘
	generateOneNumber();		// 生成一个随机数字（数字是2或4），下同
	generateOneNumber();
}

function init(){
// 初始化棋盘
	for(var i = 0; i < 4; i ++ ){
		for(var j = 0; j < 4; j++){
			var gridCell = $("#grid-cell-"+ i + "-" + j);
			gridCell.css('top',getPosTop(i,j));
			gridCell.css('left',getPosLeft(i,j));
		}
	}
	
	for(var i = 0; i < 4; i ++ ){
		board[i] = new Array();
		for(var j = 0; j < 4; j ++ ){
	// 使每一格的值为零，变成二维数组
			board[i][j] = 0;
		}
	}
	
	for(var i = 0; i < 4; i ++ ){
		hasConficted[i] = new Array();
		for(var j = 0; j < 4; j ++ ){
			hasConficted[i][j] = false;
		}
	}
	
	updateBoardView();				// 更新棋盘
	score = 0;
	updateScore(score);
}


function updateBoardView(){
	$(".number-cell").remove();		// 每次更新，移除上次残留的元素
	for(var i = 0; i < 4; i ++ )
	{
		for(var j = 0; j < 4; j++)
		{
		// 在棋盘上添加元素块
			$("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
			var theNumbercell = $('#number-cell-'+i+'-'+j);
			
			if( board[i][j] == 0)
			{
			// 隐藏值为零的元素块
				theNumbercell.css('width','0px');
				theNumbercell.css('height','0px');
				theNumbercell.css('top',getPosTop(i,j) + cellSideLength/2);
				theNumbercell.css('left',getPosLeft(i,j) + cellSideLength/2);
			}
			else
			{
			// 显示值不为零的块，为其添加背景颜色、字体颜色、数字
				theNumbercell.css('width',cellSideLength);
				theNumbercell.css('height',cellSideLength);
				theNumbercell.css('top',getPosTop(i,j));
				theNumbercell.css('left',getPosLeft(i,j));
				theNumbercell.css('background-color',getNumberBgcolor(board[i][j]));
				theNumbercell.css('color',getNumberColor(board[i][j]));
				theNumbercell.text(board[i][j]);
			}
			
			hasConficted[i][j] = false;
		}
	}
	
	$(".number-cell").css('line-height',cellSideLength + 'px');
	$(".number-cell").css('font-size',0.6 * cellSideLength + 'px');
}

function generateOneNumber(){
// 生成一个数字
	if(nospace(board)){
	// 判断整个棋盘是否有空间，如果没有空间，则返回false，取消生成数字
		return false;
	}
	
	// 随机一个位置（坐标）
	var randx = parseInt(Math.floor(Math.random()*4));
	var randy = parseInt(Math.floor(Math.random()*4));
	
	while(true){
		if(board[randx][randy] == 0){
		// 如果该位置值为零，则跳出循环
			break;
		}
		// 值不为零则重新生成随机位置（坐标）
		var randx = parseInt(Math.floor(Math.random()*4));
		var randy = parseInt(Math.floor(Math.random()*4));
	}
	
	//随机一个数字（2或4）
	var randNumber = Math.random() < 0.5?2:4;
	
	//在随机位置显示随机数字
	board[randx][randy] = randNumber;
	showNumberWithAnimation(randx,randy,randNumber);
	
	return true;
}

$(document).keydown(function(event){
	switch(event.keyCode){
		case 37: 				//左
			if( moveLeft() ){
				setTimeout("generateOneNumber()",200);
				setTimeout("isgameover()",300);
			}
			break;
		case 38: 				//上
			if( moveUp() ){
				setTimeout("generateOneNumber()",200);
				setTimeout("isgameover()",300);
			}
			break;
		case 39: 				//右
			if( moveRight() ){
				setTimeout("generateOneNumber()",200);
				setTimeout("isgameover()",300);
			}
			break;
		case 40: 				//下
			if( moveDown() ){
				setTimeout("generateOneNumber()",200);
				setTimeout("isgameover()",300);
			}
			break;
		default: 
			break;
	}
});


document.addEventListener('touchstart',function (event){
	startx = event.touches[0].pageX;
	starty = event.touches[0].pageY;
})

document.addEventListener('touchend',function (event){
	endx = event.changedTouches[0].pageX;
	endy = event.changedTouches[0].pageY;
	
	var deltax = endx - startx;
	var deltay = endy - starty;
	
	if(Math.abs(deltax) < 0.2*documentWidth && Math.abs(deltay) < 0.2*documentWidth ){
		return;
	}
	
	if(Math.abs(deltax) >= Math.abs(deltay)){
		if(deltax > 0){
			//move right
			if( moveRight() ){
				setTimeout("generateOneNumber()",200);
				setTimeout("isgameover()",300);
			}
		}else{
			//move left
			if( moveLeft() ){
				setTimeout("generateOneNumber()",200);
				setTimeout("isgameover()",300);
			}
		}
	}else{
		if(deltay > 0){
			//move down
			if( moveDown() ){
				setTimeout("generateOneNumber()",200);
				setTimeout("isgameover()",300);
			}
		}else{
			//move up
			if( moveUp() ){
				setTimeout("generateOneNumber()",200);
				setTimeout("isgameover()",300);
			}
		}
	}
})


function isgameover(){
	if(nospace(board) && nomove(board)){
		gameover();
	}
}

function gameover(){
	alert(" 游 戏 结 束 ");
}


function moveLeft(){
	// 左移
	if(!canMoveLeft(board)){
		return false;
	}
	
	for(var i = 0; i < 4; i ++ )
		for(var j = 1; j < 4; j++){
			if(board[i][j] != 0){
				
				for(var k = 0; k < j; k++){
					if(board[i][k] == 0 && noBlockHorizontal(i,k,j,board)){
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						
						continue;
					}else if(board[i][k] == board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConficted[i][k]){
						//move
						showMoveAnimation(i,j,i,k);
						//add
						board[i][k] += board[i][j];
						board[i][j] = 0;
						
						score += board[i][k];
						updateScore(score);
						
						hasConficted[i][k] = true;
						continue;
					}
				}
			}
		}
		
	setTimeout("updateBoardView()",200);				// 更新棋盘
	return true;
}

function moveRight(){
	// 右移
	if(!canMoveRight(board)){
		return false;
	}
	
	for(var i = 0; i < 4; i ++ )
		for(var j = 2; j >= 0; j--){
			if(board[i][j] != 0){
				
				for(var k = 3; k > j; k--){
					if(board[i][k] == 0 && noBlockHorizontal(i,j,k,board)){
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						
						continue;
					}else if(board[i][k] == board[i][j] && noBlockHorizontal(i,j,k,board) && !hasConficted[i][k]){
						//move
						showMoveAnimation(i,j,i,k);
						//add
						board[i][k] += board[i][j];
						board[i][j] = 0;
						
						score += board[i][k];
						updateScore(score);
						
						hasConficted[i][k] = true;
						continue;
					}
				}
			}
		}
		
	setTimeout("updateBoardView()",200);				// 更新棋盘
	return true;
}

function moveUp(){
	// 上移
	if(!canMoveUp(board)){
		return false;
	}
	
	for(var j = 0; j < 4; j ++ )
		for(var i = 1; i < 4; i++){
			if(board[i][j] != 0){
				
				for(var k = 0; k < i; k++){
					if(board[k][j] == 0 && noBlockVertical(j,k,i,board)){
						//move
						showMoveAnimation(i,j,k,j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						
						continue;
					}else if(board[k][j] == board[i][j] && noBlockVertical(j,k,i,board) && !hasConficted[k][j]){
						//move
						showMoveAnimation(i,j,k,j);
						//add
						board[k][j] += board[i][j];
						board[i][j] = 0;
						
						score += board[k][j];
						updateScore(score);
						
						hasConficted[k][j] = true;
						continue;
					}
				}
			}
		}
		
	setTimeout("updateBoardView()",200);				// 更新棋盘
	return true;
}

function moveDown(){
	// 下移
	if(!canMoveDown(board)){
		return false;
	}
	
	for(var j = 0; j < 4; j ++ )
		for(var i = 2; i >= 0; i--){
			if(board[i][j] != 0){
				
				for(var k = 3; k > i; k--){
					if(board[k][j] == 0 && noBlockVertical(j,i,k,board)){
						//move
						showMoveAnimation(i,j,k,j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						
						continue;
					}else if(board[k][j] == board[i][j] && noBlockVertical(j,i,k,board) && !hasConficted[k][j]){
						//move
						showMoveAnimation(i,j,k,j);
						//add
						board[k][j] += board[i][j];
						board[i][j] = 0;
						
						score += board[k][j];
						updateScore(score);
						
						hasConficted[k][j] = true;
						continue;
					}
				}
			}
		}
		
	setTimeout("updateBoardView()",200);				// 更新棋盘
	return true;
}

