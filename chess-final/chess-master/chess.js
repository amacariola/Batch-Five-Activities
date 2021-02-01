function InitializeGame() {
	
	var rows = new Array(),
	SourceCell = {'row' : 0, 'column' : 0},
	PossibleDestinationCell = new Array(),
	UndoSteps = new Array(),
	Steps = function(row, column, cell) {
		this.row = row;
		this.column = column;
		this.cell = cell;
	},
	Cell = function(team_color, name, text) {
		
		this.css_class = [ team_color, name ];
		this.text = text;
		this.piece_name = name;
	}, 
	RowCells = function(row_no) {
		
		var cells = new Array();
		
		if(row_no == 3 || row_no == 4 || row_no == 5 || row_no == 6) {
			
			return EmptyCells();
		} else if(row_no == 2 || row_no == 7) {
			
			return PawnCells(row_no);
		} else {
			
			return MainCells(row_no);
		}
	},
	MainCells = function(row_no) {
		//if row_no == 1, white  else black
		if(row_no == 1) {
			color = 'white';
			return ['', {'data' : new Cell(color, 'rook', '&#9814;'), 'td' : ''   }, {'data' : new Cell(color, 'knight', '&#9816;'), 'td': ''   }, 
						{'data' : new Cell(color, 'bishop', '&#9815;'), 'td' : '' }, {'data' : new Cell(color, 'king', '&#9812;'), 'td' : ''    }, 
						{'data' : new Cell(color, 'queen', '&#9813;'), 'td' : ''  }, {'data' : new Cell(color, 'bishop', '&#9815;'),  'td' : '' },
						{'data' : new Cell(color, 'knight', '&#9816;'), 'td' : '' }, {'data' : new Cell(color, 'rook', '&#9814;'), 'td' : ''    } ];
		} else {
			color = 'black';
			return ['', {'data' : new Cell(color, 'rook', '&#9820;'), 'td' : ''   }, {'data' : new Cell(color, 'knight', '&#9822;'), 'td' : '' }, 
						{'data' : new Cell(color, 'bishop', '&#9821;'), 'td' : '' }, {'data' : new Cell(color, 'queen', '&#9819;'), 'td' : ''  },
						{'data' : new Cell(color, 'king', '&#9818;'), 'td' : ''   }, {'data' : new Cell(color, 'bishop', '&#9821;'), 'td' : '' }, 
						{'data' : new Cell(color, 'knight', '&#9822;'), 'td' : '' }, {'data' : new Cell(color, 'rook', '&#9820;'), 'td' : ''   } ];
		}
		
	}
	EmptyCells = function() {
		return ['', {'data' : new Cell('', '', ''), 'td' : '' }, {'data' : new Cell('', '', ''), 'td' : '' }, 
					{'data' : new Cell('', '', ''), 'td' : '' }, {'data' : new Cell('', '', ''), 'td' : '' }, 
					{'data' : new Cell('', '', ''), 'td' : '' }, {'data' : new Cell('', '', ''), 'td' : '' },
					{'data' : new Cell('', '', ''), 'td' : '' }, {'data' : new Cell('', '', ''), 'td' : '' } ];
	},
	PawnCells = function(row_no) {
		
		//if row_no == 2, white Pawn else black pawn
		if(row_no == 2) {
			color = 'white';
			text = '&#9817;';
		} else {
			color = 'black';
			text = '&#9823;';
		}

		name = 'pawn';
		return ['', {'data' : new Cell(color, name, text), 'td' : '' }, {'data' : new Cell(color, name, text), 'td' : '' },
					{'data' : new Cell(color, name, text), 'td' : '' }, {'data' : new Cell(color, name, text), 'td' : '' },
					{'data' : new Cell(color, name, text), 'td' : '' }, {'data' : new Cell(color, name, text), 'td' : '' },
					{'data' : new Cell(color, name, text), 'td' : '' }, {'data' : new Cell(color, name, text), 'td' : '' }];
	}
	InitializeBoard = function() {
		
		//white chess piece row
		rows[1] = new Array();
		rows[1] = RowCells(1);
		
		//white pawn row
		rows[2] = new Array();
		rows[2] = RowCells(2);
		
		//empty rows
		rows[3] = new Array();
		rows[3] = RowCells(3);
		rows[4] = new Array();
		rows[4] = RowCells(4);
		rows[5] = new Array();
		rows[5] = RowCells(5);
		rows[6] = new Array();
		rows[6] = RowCells(6);

		//black pawn row
		rows[7] = new Array();
		rows[7] = RowCells(7);
		
		//white chess piece row
		rows[8] = new Array();
		rows[8] = RowCells(8);
		
	},
	DrawBoard = function() {
		InitializeBoard();
		var table = document.createElement('table');
		table.cellSpacing = 0;
		table.className = 'table';

		for(i = 1; i< 9; i++) {
			
			var row = document.createElement('tr');
			for(j = 1; j< 9; j++) {
				var column = document.createElement('td');
				rows[i][j].td = column;
				column.id = i * 8 + j;
				column.innerHTML = rows[i][j].data.text;
				if((i + j) % 2 == 0) {
					column.className = 'cell';
				} else {
					column.className = 'cell alternate-bg';
				}
				AttachEvents(column, i, j);
				row.appendChild(column);
			}
			table.appendChild(row);
		}
		document.body.appendChild(table);
		div = document.createElement('div');
		div.className = 'info';
		div.innerHTML = '';
		document.body.appendChild(div);
		
		button = document.createElement('button');
		button.innerHTML = 'Undo';
		button.onclick = function() {
			var last_step = UndoSteps.pop();
			rows[last_step.source.row][last_step.source.column].data = last_step.source.cell.data; 
			rows[last_step.source.row][last_step.source.column].td.innerHTML = last_step.source.cell.data.text;

			rows[last_step.destination.row][last_step.destination.column].data = last_step.destination.cell.data; 
			rows[last_step.destination.row][last_step.destination.column].td.innerHTML = last_step.destination.cell.data.text; 

		}
		document.body.appendChild(button);
		

	},
	AttachEvents = function (td, row, column) {
		td.onclick = function() {
			if(SourceCell.row === 0 && SourceCell.column === 0) {
				SourceCell = {'row': row, 'column' : column};
				td.className += ' selectedcell';
				GetPossibleDestinationCells(row, column);
			} else {
				if( rows[row][column].data.text.length !== 0 ) {
					if(row === SourceCell.row && column === SourceCell.column) {
						rows[SourceCell.row][SourceCell.column].td.className = rows[SourceCell.row][SourceCell.column].td.className.replace(/\bselectedcell\b/,'');
						ResetPossibleDestinationCells();
						SourceCell = {'row' : 0, 'column' : 0};;
					} else {
						for(var i = 0; i < PossibleDestinationCell.length; i++) {
							if( rows[row][column].td === PossibleDestinationCell[i]) {
								break;
							}
						}
					}
				} 
				for(var i = 0; i < PossibleDestinationCell.length; i++) {
					if( rows[row][column].td === PossibleDestinationCell[i]) {
						break;
					}
				}
				
				//push into undo array
				UndoSteps.push({'source' : new Steps(SourceCell.row, SourceCell.column, rows[SourceCell.row][SourceCell.column]),
								'destination' : new Steps(row, column, rows[row][column])});
				var team_color = rows[SourceCell.row][SourceCell.column].data.css_class[0];
				var name = rows[SourceCell.row][SourceCell.column].data.css_class[1];
				var text = rows[SourceCell.row][SourceCell.column].data.text;
				rows[row][column] = {'data' : new Cell (team_color, name, text), 'td' :   rows[row][column].td};

				rows[SourceCell.row][SourceCell.column].td.innerHTML = '';
				rows[SourceCell.row][SourceCell.column].td.className = rows[SourceCell.row][SourceCell.column].td.className.replace(/\bselectedcell\b/,'');
				td.innerHTML = rows[row][column].data.text;
				rows[SourceCell.row][SourceCell.column] = { 'data' :new Cell('', '', ''), 'td' : rows[SourceCell.row][SourceCell.column].td};

				ResetPossibleDestinationCells();
				SourceCell = {'row' : 0, 'column' : 0};
			}
		}
	},
	GetPossibleDestinationCells = function(row, column) {
		
		PossibleDestinationCell = new Array();
		
		if(rows[row][column].data.css_class[1] == 'pawn') {
			GetPossibleDestinationCellsForPawn(row, column);
		} else if(rows[row][column].data.css_class[1] == 'rook') {
			GetPossibleDestinationCellsForRook(row, column);
		} else if(rows[row][column].data.css_class[1] == 'knight') {
			GetPossibleDestinationCellsForKnight(row, column);
		} else if(rows[row][column].data.css_class[1] == 'bishop') {
			GetPossibleDestinationCellsForBishop(row, column);
		} else if(rows[row][column].data.css_class[1] == 'king') {
			GetPossibleDestinationCellsForRook(row, column);
			GetPossibleDestinationCellsForBishop(row, column);
		} else if(rows[row][column].data.css_class[1] == 'queen') {
			GetPossibleDestinationCellsForQueen(row, column);
		} 
		
		ShowPossibleDestinationCells();
	},
	ShowPossibleDestinationCells = function () {
		for(i = 0; i < PossibleDestinationCell.length; i++) {
			PossibleDestinationCell[i].className += ' selectedcell';
		}
	},
	ResetPossibleDestinationCells = function() {
		if(PossibleDestinationCell.length == 0){
			return false;
		}
		while(PossibleDestinationCell.length) {
			var td = PossibleDestinationCell.pop();
			td.className = td.className.replace(/\bselectedcell\b/,'');
		}
	},
	GetPossibleDestinationCellsForPawn = function(row, column) {
	
		if(rows[row][column].data.css_class[0] == 'white') {
			if(rows[row+1][column].data.css_class[0] == '') {
				PossibleDestinationCell.push(rows[row+1][column].td);
			}
			if(row === 2 && (rows[row+2][column].data.css_class[0] == '' && rows[row+1][column].data.css_class[0] == '')) {
				PossibleDestinationCell.push(rows[row+2][column].td);
			}
			if(row + 1 < 9 && column + 1 < 9) {
				if(rows[row+1][column+1].data.css_class[0] == 'black') {
					PossibleDestinationCell.push(rows[row+1][column+1].td);
				}
			}
			if(row + 1 < 9 && column - 1 > 0) {
				if(rows[row+1][column-1].data.css_class[0] == 'black') {
					PossibleDestinationCell.push(rows[row+1][column-1].td)
				}
			}
		}
		if(rows[row][column].data.css_class[0] == 'black') {
			if(rows[row-1][column].data.css_class[0] == '') {
				PossibleDestinationCell.push(rows[row-1][column].td);
			}
			if(row === 7 && (rows[row-2][column].data.css_class[0] == '' && rows[row+1][column].data.css_class[0] == '')) {
				PossibleDestinationCell.push(rows[row-2][column].td);
			}
			if(row - 1 > 0 && column - 1 > 0) {
				if(rows[row-1][column-1].data.css_class[0] == 'white') {
					PossibleDestinationCell.push(rows[row-1][column-1].td);
				}
			}
			if(row - 1 > 0 && column + 1 < 9) {
				if(rows[row-1][column+1].data.css_class[0] == 'white') {
					PossibleDestinationCell.push(rows[row-1][column+1].td)
				}
			}
		}
	},
	GetPossibleDestinationCellsForRook = function(row, column) {
		
		//rowwise low to high
		for(i = row + 1 ; i < 9; i++) {
			if(rows[row][column].data.css_class[0] == 'white') {
				if(rows[i][column].data.css_class[0] != 'white') {
					PossibleDestinationCell.push(rows[i][column].td);
					if(rows[i][column].data.css_class[0] == 'black') {
						break;
					}
				} else {
					break;
				}
			} else {
				if(rows[i][column].data.css_class[0] != 'black') {
					PossibleDestinationCell.push(rows[i][column].td);
					if(rows[i][column].data.css_class[0] == 'white') {
						break;
					}
				} else {
					break;
				}
			}
		}
		
		//rowwise high to low
		for(i = row - 1 ; i > 0; i--) {
			if(rows[row][column].data.css_class[0] == 'white') {
				if(rows[i][column].data.css_class[0] != 'white') {
					PossibleDestinationCell.push(rows[i][column].td);
					if(rows[i][column].data.css_class[0] == 'black') {
						break;
					}
				} else {
					break;
				}
			} else {
				if(rows[i][column].data.css_class[0] != 'black') {
					PossibleDestinationCell.push(rows[i][column].td);
					if(rows[i][column].data.css_class[0] == 'white') {
						break;
					}
				} else {
					break;
				}
			}
		}
		
		//columns from left to right
		for(j = column + 1; j < 9; j++) {
			
			if(rows[row][column].data.css_class[0] == 'white') {
				if(rows[row][j].data.css_class[0] != 'white') {
					PossibleDestinationCell.push(rows[row][j].td);
					if(rows[row][j].data.css_class[0] == 'black') {
						break;
					}
				} else {
					break;
				}
			} else {
				if(rows[row][j].data.css_class[0] != 'black') {
					PossibleDestinationCell.push(rows[row][j].td);
					if(rows[row][j].data.css_class[0] == 'white') {
						break;
					}
				} else {
					break;
				}
			}
		}

		//columns from right to left
		for(j = column - 1; j > 0; j--) {

			if(rows[row][column].data.css_class[0] == 'white') {
				if(rows[row][j].data.css_class[0] != 'white') {
					PossibleDestinationCell.push(rows[row][j].td);
					if(rows[row][j].data.css_class[0] == 'black') {
						break;
					}
				} else {
					break;
				}
			} else {
				if(rows[row][j].data.css_class[0] != 'black') {
					PossibleDestinationCell.push(rows[row][j].td);
					if(rows[row][j].data.css_class[0] == 'white') {
						break;
					}
				} else {
					break;
				}
			}
		}
	},
	GetPossibleDestinationCellsForKnight = function(row, column) {
		var knight_next_steps = [
									{'row' : row+1, 'column' : column + 2}, {'row' : row + 2, 'column' : column + 1},
									{'row' : row-1, 'column' : column + 2}, {'row' : row - 2, 'column' : column + 1},
									{'row' : row+1, 'column' : column - 2}, {'row' : row + 2, 'column' : column - 1},
									{'row' : row-1, 'column' : column - 2}, {'row' : row - 2, 'column' : column - 1},
								];

		for(var i = 0 ; i < knight_next_steps.length; i++) {
			if(knight_next_steps[i].row > 0 && knight_next_steps[i].row < 9 &&
				knight_next_steps[i].column > 0 && knight_next_steps[i].column < 9 &&
				rows[knight_next_steps[i].row][knight_next_steps[i].column].data.css_class[0] != rows[row][column].data.css_class[0]) {
					
					PossibleDestinationCell.push(rows[knight_next_steps[i].row][knight_next_steps[i].column].td);
			}
		}
		
	},
	GetPossibleDestinationCellsForBishop = function(row, column) {
		
		//rowwise low to high
		var i = 1;
		while(row + i < 9 && column + i < 9) {
			if(rows[row][column].data.css_class[0] == 'white') {
				if(rows[row + i][column + i].data.css_class[0] != 'white') {
					PossibleDestinationCell.push(rows[row + i][column + i].td);
					if(rows[row + i][column + i].data.css_class[0] == 'black') {
						break;
					}
				} else {
					break;
				}
			} else {
				if(rows[row + i][column + i].data.css_class[0] != 'black') {
					PossibleDestinationCell.push(rows[row + i][column + i].td);
					if(rows[row + i][column + i].data.css_class[0] == 'white') {
						break;
					}
				} else {
					break;
				}
			}
			i++;
		}
		
		i = 1;
		while(row + i < 9 && column + i < 9) {
			if(rows[row][column].data.css_class[0] == 'white') {
				if(rows[row + i][column + i].data.css_class[0] != 'white') {
					PossibleDestinationCell.push(rows[row + i][column + i].td);
					if(rows[row + i][column + i].data.css_class[0] == 'black') {
						break;
					}
				} else {
					break;
				}
			} else {
				if(rows[row + i][column + i].data.css_class[0] != 'black') {
					PossibleDestinationCell.push(rows[row + i][column + i].td);
					if(rows[row + i][column + i].data.css_class[0] == 'white') {
						break;
					}
				} else {
					break;
				}
			}
			i++;
		}

		i = 1;
		while(row + i < 9 && column - i > 0) {
			if(rows[row][column].data.css_class[0] == 'white') {
				if(rows[row + i][column - i].data.css_class[0] != 'white') {
					PossibleDestinationCell.push(rows[row + i][column - i].td);
					if(rows[row + i][column - i].data.css_class[0] == 'black') {
						break;
					}
				} else {
					break;
				}
			} else {
				if(rows[row + i][column - i].data.css_class[0] != 'black') {
					PossibleDestinationCell.push(rows[row + i][column - i].td);
					if(rows[row + i][column - i].data.css_class[0] == 'white') {
						break;
					}
				} else {
					break;
				}
			}
			i++;
		}
		i = 1;
		while(row - i > 0 && column + i < 9) {
			if(rows[row][column].data.css_class[0] == 'white') {
				if(rows[row - i][column + i].data.css_class[0] != 'white') {
					PossibleDestinationCell.push(rows[row - i][column + i].td);
					if(rows[row - i][column + i].data.css_class[0] == 'black') {
						break;
					}
				} else {
					break;
				}
			} else {
				if(rows[row - i][column + i].data.css_class[0] != 'black') {
					PossibleDestinationCell.push(rows[row - i][column + i].td);
					if(rows[row - i][column + i].data.css_class[0] == 'white') {
						break;
					}
				} else {
					break;
				}
			}
			i++;
		}
		
		i = 1;
		while(row - i > 0 && column - i > 0) {
			if(rows[row][column].data.css_class[0] == 'white') {
				if(rows[row - i][column - i].data.css_class[0] != 'white') {
					PossibleDestinationCell.push(rows[row - i][column - i].td);
					if(rows[row - i][column - i].data.css_class[0] == 'black') {
						break;
					}
				} else {
					break;
				}
			} else {
				if(rows[row - i][column - i].data.css_class[0] != 'black') {
					PossibleDestinationCell.push(rows[row - i][column - i].td);
					if(rows[row - i][column - i].data.css_class[0] == 'white') {
						break;
					}
				} else {
					break;
				}
			}
			i++;
		}
	},
	GetPossibleDestinationCellsForQueen = function(row, column) {
		var king_next_steps = [
									{'row' : row + 1, 'column' : column}, {'row' : row + 1, 'column' : column -1}, {'row' : row + 1, 'column' : column + 1},
									{'row' : row , 'column' : column - 1}, {'row' : row , 'column' : column + 1},
									{'row' : row - 1, 'column' : column}, {'row' : row - 1, 'column' : column -1}, {'row' : row - 1, 'column' : column + 1}
							  ];
		for(var i = 0; i < king_next_steps.length; i++) {
			if(king_next_steps[i].row < 9 && king_next_steps[i].column < 9 && 
				king_next_steps[i].row > 0 && king_next_steps[i].column > 0 && 
				rows[row][column].data.css_class[0] != rows[king_next_steps[i].row][king_next_steps[i].column].data.css_class[0]) {
				PossibleDestinationCell.push(rows[king_next_steps[i].row][king_next_steps[i].column].td);
			}
		}
		
	};
	DrawBoard();	
}

function StartGame() {
	var game = new InitializeGame();
}
