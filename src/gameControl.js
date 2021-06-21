import Ship from './ship';
import { ships } from './ships';

const initializeControl = (() => {
	//global elements
	const width = 10;
	//user elements
	const userGrid = document.querySelector('.grid-user');
	const userSquares = [];
	//computer elements
	const computerGrid = document.querySelector('.grid-computer');
	const computerSquares = [];
	//ships elements
	const shipArray = [];
	let destroyerHorizontal = true;
	let submarineHorizontal = true;
	let cruiserHorizontal = true;
	let battleshipHorizontal = true;
	let carrierHorizontal = true;
	let selectedShipClassName;
	let draggedShip;
	let draggedShipLength;

	//create gameboard grid feature
	const createGameboard = (user, squares) => {
		for (let i = 0; i < width * width; i++) {
			const square = document.createElement('div');
			square.dataset.id = i;
			user.appendChild(square);
			squares.push(square);
		}
	};

	//render ship feature
	const renderShip = () => {
		const displayShipContainer = document.querySelector('.garage-container');
		ships.forEach((ship) => {
			const name = ship.name;
			const dir1 = ship.directions[0];
			const dir2 = ship.directions[1].map((element) => {
				return element * width;
			});
			const obj = createShip(name, [dir1, dir2]);

			//display;
			const shipContainer = document.createElement('div');
			shipContainer.classList.add('ship', `${name}-container`);
			shipContainer.style.width = `${ship.directions[1].length * 5}vmin`;
			shipContainer.style.height = `5vmin`;
			shipContainer.draggable = 'true';
			for (let y = 0; y < ship.directions[0].length; y++) {
				const shipDiv = document.createElement('div');
				shipDiv.classList.add(`${name}-${y}`);
				shipContainer.appendChild(shipDiv);
			}
			shipContainer.firstChild.innerText = '⇲';
			shipContainer.lastChild.innerText = '↻';
			shipContainer.lastChild.addEventListener('click', (event) => {
				rotateShip(event);
			});

			shipContainer.addEventListener('mousedown', (event) => {
				selectedShipClassName = event.target.className;
			});
			shipContainer.addEventListener('dragstart', dragStart);
			shipContainer.addEventListener('dragend', dragEnd);

			displayShipContainer.appendChild(shipContainer);

			shipArray.push(obj);
		});
		return shipArray;
	};

	//create ship feature
	const createShip = (name, dir) => {
		let ship = Object.create(Ship.prototype);
		ship.name = name;
		ship.directions = dir;
		return ship;
	};

	// set one ship in random location feature
	const setShipAtRandomLocation = (playerSquares, ship) => {
		let direction;
		let randomDirectionOfShip = Math.floor(
			Math.random() * ship.directions.length
		);
		let current = ship.directions[randomDirectionOfShip];
		if (randomDirectionOfShip === 0) direction = 1;
		if (randomDirectionOfShip === 1) direction = 10;

		let randomStartInGrid = Math.abs(
			Math.floor(
				Math.random() * playerSquares.length -
					ship.directions[0].length * direction
			)
		);

		// square taken on computer grid
		const squareIsTakenOnGrid = current.some((index) =>
			playerSquares[randomStartInGrid + index].classList.contains('taken')
		);
		// square is at extreme left of the computer grid
		const squareIsAtLeftEdge = current.some(
			(index) => (randomStartInGrid + index) % width === 0
		);
		// square is at extreme right of the computer grid
		const squareIsAtRightEdge = current.some(
			(index) => (randomStartInGrid + index) % width === width - 1
		);

		// check grid and place ship
		if (!squareIsTakenOnGrid && !squareIsAtLeftEdge && !squareIsAtRightEdge) {
			current.forEach((index) => {
				playerSquares[randomStartInGrid + index].classList.add(
					'taken',
					ship.name
				);
			});
		} else {
			// start again
			setShipAtRandomLocation(playerSquares, ship);
		}
	};

	// generate random locations of all ships of computer feature
	const generateRandomLocation = () => {
		setShipAtRandomLocation(computerSquares, shipArray[0]);
		setShipAtRandomLocation(computerSquares, shipArray[1]);
		setShipAtRandomLocation(computerSquares, shipArray[2]);
		setShipAtRandomLocation(computerSquares, shipArray[3]);
		setShipAtRandomLocation(computerSquares, shipArray[4]);
	};

	// rotate user ships feature
	const rotateShip = (event) => {
		const name = event.target.parentNode.className
			.replace('-container', '')
			.replace('ship', '')
			.replace(' ', '');
		const nameHorizontal = `${name}Horizontal`;
		if (nameHorizontal === 'destroyerHorizontal') {
			if (destroyerHorizontal) {
				event.target.parentNode.style.height = `${
					event.target.parentNode.childNodes.length * 5
				}vmin`;
				event.target.parentNode.style.width = '5vmin';
				destroyerHorizontal = false;
				return;
			} else if (!destroyerHorizontal) {
				event.target.parentNode.style.width = `${
					event.target.parentNode.childNodes.length * 5
				}vmin`;
				event.target.parentNode.style.height = '5vmin';
				destroyerHorizontal = true;
				return;
			}
		} else if (nameHorizontal === 'submarineHorizontal') {
			if (submarineHorizontal) {
				event.target.parentNode.style.height = `${
					event.target.parentNode.childNodes.length * 5
				}vmin`;
				event.target.parentNode.style.width = '5vmin';
				submarineHorizontal = false;
				return;
			} else if (!submarineHorizontal) {
				event.target.parentNode.style.width = `${
					event.target.parentNode.childNodes.length * 5
				}vmin`;
				event.target.parentNode.style.height = '5vmin';
				submarineHorizontal = true;
				return;
			}
		} else if (nameHorizontal === 'cruiserHorizontal') {
			if (cruiserHorizontal) {
				event.target.parentNode.style.height = `${
					event.target.parentNode.childNodes.length * 5
				}vmin`;
				event.target.parentNode.style.width = '5vmin';
				cruiserHorizontal = false;
				return;
			} else if (!cruiserHorizontal) {
				event.target.parentNode.style.width = `${
					event.target.parentNode.childNodes.length * 5
				}vmin`;
				event.target.parentNode.style.height = '5vmin';
				cruiserHorizontal = true;
				return;
			}
		} else if (nameHorizontal === 'battleshipHorizontal') {
			if (battleshipHorizontal) {
				event.target.parentNode.style.height = `${
					event.target.parentNode.childNodes.length * 5
				}vmin`;
				event.target.parentNode.style.width = '5vmin';
				battleshipHorizontal = false;
				return;
			} else if (!battleshipHorizontal) {
				event.target.parentNode.style.width = `${
					event.target.parentNode.childNodes.length * 5
				}vmin`;
				event.target.parentNode.style.height = '5vmin';
				battleshipHorizontal = true;
				return;
			}
		} else if (nameHorizontal === 'carrierHorizontal') {
			if (carrierHorizontal) {
				event.target.parentNode.style.height = `${
					event.target.parentNode.childNodes.length * 5
				}vmin`;
				event.target.parentNode.style.width = '5vmin';
				carrierHorizontal = false;
				return;
			} else if (!carrierHorizontal) {
				event.target.parentNode.style.width = `${
					event.target.parentNode.childNodes.length * 5
				}vmin`;
				event.target.parentNode.style.height = '5vmin';
				carrierHorizontal = true;
				return;
			}
		}
	};

	//render gameboard
	const renderGameboard = () => {
		createGameboard(userGrid, userSquares);
		createGameboard(computerGrid, computerSquares);
		renderShip();
		userSquares.forEach((square) => {
			square.addEventListener('dragstart', dragStart);
		});
		userSquares.forEach((square) => {
			square.addEventListener('dragover', dragOver);
		});
		userSquares.forEach((square) => {
			square.addEventListener('dragenter', dragEnter);
		});
		userSquares.forEach((square) => {
			square.addEventListener('dragleave', dragLeave);
		});
		userSquares.forEach((square) => {
			square.addEventListener('drop', (event) => {
				dragDrop(event);
			});
		});
		userSquares.forEach((square) => {
			square.addEventListener('dragend', dragEnd);
		});
	};

	// darg and drop feature
	const dragStart = (event) => {
		draggedShip = event.target;
		draggedShipLength = draggedShip.childNodes.length;
		draggedShip.classList.add('dragging');
	};

	const dragOver = (event) => {
		event.preventDefault();
	};

	const dragEnter = (event) => {
		event.preventDefault();
	};

	const dragLeave = () => {};

	const dragDrop = (event) => {
		const displayShipContainer = document.querySelector('.garage-container');
		let lastChildOfShipClassName = draggedShip.lastChild.className;
		let shipClassName = lastChildOfShipClassName.slice(0, -2);
		let lastChildShipIndex = parseInt(lastChildOfShipClassName.substr(-1));
		let shipLastId = lastChildShipIndex + parseInt(event.target.dataset.id);
		let selectedShipIndex = parseInt(lastChildOfShipClassName.substr(-1));
		shipLastId = shipLastId - selectedShipIndex;

		if (event.target.classList.contains('taken')) {
			return;
		} else {
			if (shipClassName === 'destroyer') {
				if (destroyerHorizontal) {
					for (let i = 0; i < draggedShipLength; i++) {
						userSquares[
							// parseInt(event.target.dataset.id) - selectedShipIndex + i
							parseInt(event.target.dataset.id) + i
						].classList.add('taken', shipClassName);
					}
				} else if (!destroyerHorizontal) {
					for (let i = 0; i < draggedShipLength; i++) {
						userSquares[
							// parseInt(event.target.dataset.id) - selectedShipIndex + width * i
							parseInt(event.target.dataset.id) + width * i
						].classList.add('taken', shipClassName);
					}
				}
			} else if (shipClassName === 'submarine') {
				if (submarineHorizontal) {
					for (let i = 0; i < draggedShipLength; i++) {
						userSquares[parseInt(event.target.dataset.id) + i].classList.add(
							'taken',
							shipClassName
						);
					}
				} else if (!submarineHorizontal) {
					for (let i = 0; i < draggedShipLength; i++) {
						userSquares[
							parseInt(event.target.dataset.id) + width * i
						].classList.add('taken', shipClassName);
					}
				}
			} else if (shipClassName === 'cruiser') {
				if (cruiserHorizontal) {
					for (let i = 0; i < draggedShipLength; i++) {
						userSquares[parseInt(event.target.dataset.id) + i].classList.add(
							'taken',
							shipClassName
						);
					}
				} else if (!cruiserHorizontal) {
					for (let i = 0; i < draggedShipLength; i++) {
						userSquares[
							parseInt(event.target.dataset.id) + width * i
						].classList.add('taken', shipClassName);
					}
				}
			} else if (shipClassName === 'battleship') {
				if (battleshipHorizontal) {
					for (let i = 0; i < draggedShipLength; i++) {
						userSquares[parseInt(event.target.dataset.id) + i].classList.add(
							'taken',
							shipClassName
						);
					}
				} else if (!battleshipHorizontal) {
					for (let i = 0; i < draggedShipLength; i++) {
						userSquares[
							parseInt(event.target.dataset.id) + width * i
						].classList.add('taken', shipClassName);
					}
				}
			} else if (shipClassName === 'carrier') {
				if (carrierHorizontal) {
					for (let i = 0; i < draggedShipLength; i++) {
						userSquares[parseInt(event.target.dataset.id) + i].classList.add(
							'taken',
							shipClassName
						);
					}
				} else if (!carrierHorizontal) {
					for (let i = 0; i < draggedShipLength; i++) {
						userSquares[
							parseInt(event.target.dataset.id) + width * i
						].classList.add('taken', shipClassName);
					}
				}
			} else return;
		}
		displayShipContainer.removeChild(draggedShip);
		if (isEmpty(displayShipContainer)) {
			const btnStartGame = document.querySelector('.btn-start-game');
			btnStartGame.classList.remove('hide');
		}
	};

	const dragEnd = () => {
		draggedShip.classList.remove('dragging');
	};

	const isEmpty = (elem) => {
		return elem.innerHTML.trim() == '';
	};

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//game logic feature

	// DOM
	const userDetailsDisplay = document.querySelector('#user-details');
	const computerDetailsDisplay = document.querySelector('#computer-details');
	const startBtn = document.querySelector('#start');
	const finalDisplay = document.querySelector('.final-screen');
	const finalText = document.getElementById('winning-text');

	//global variables
	let gameOver = false;
	let currentPlayer = 'user';
	let winner = false;
	//user ships life
	let userDestroyerLife = ships[0].life;
	let userSubmarineLife = ships[1].life;
	let userCruiserLife = ships[2].life;
	let userBattleshipLife = ships[3].life;
	let userCarrierLife = ships[4].life;
	//computer ships life
	let cpuDestroyerLife = ships[0].life;
	let cpuSubmarineLife = ships[1].life;
	let cpuCruiserLife = ships[2].life;
	let cpuBattleshipLife = ships[3].life;
	let cpuCarrierLife = ships[4].life;

	const playGame = () => {
		if (currentPlayer === 'user') {
			computerSquares.forEach((square) =>
				square.addEventListener('click', function (e) {
					revealMissOrHit(square);
				})
			);
		} else if (currentPlayer === 'computer') {
			setTimeout(computerPlay(), 1000);
		}
		if (gameOver) {
			return;
		}
	};

	const revealMissOrHit = (target) => {
		if (
			target.classList.contains('taken') &&
			!target.classList.contains('hit') &&
			!target.classList.contains('miss')
		) {
			target.classList.add('hit');
			if (target.classList.contains('destroyer')) cpuDestroyerLife--;
			if (target.classList.contains('submarine')) cpuSubmarineLife--;
			if (target.classList.contains('cruiser')) cpuCruiserLife--;
			if (target.classList.contains('battleship')) cpuBattleshipLife--;
			if (target.classList.contains('carrier')) cpuCarrierLife--;
		} else if (
			!target.classList.contains('taken') &&
			!target.classList.contains('hit') &&
			!target.classList.contains('miss')
		) {
			target.classList.add('miss');
		} else {
			return;
		}
		checkWinner();
		currentPlayer = 'computer';
		playGame();
	};

	const computerPlay = () => {
		let randomSquareGuess = Math.floor(Math.random() * userSquares.length);
		if (
			userSquares[randomSquareGuess].classList.contains('taken') &&
			!userSquares[randomSquareGuess].classList.contains('hit') &&
			!userSquares[randomSquareGuess].classList.contains('miss')
		) {
			userSquares[randomSquareGuess].classList.add('hit');
			if (userSquares[randomSquareGuess].classList.contains('destroyer'))
				userDestroyerLife--;
			if (userSquares[randomSquareGuess].classList.contains('submarine'))
				userSubmarineLife--;
			if (userSquares[randomSquareGuess].classList.contains('cruiser'))
				userCruiserLife--;
			if (userSquares[randomSquareGuess].classList.contains('battleship'))
				userBattleshipLife--;
			if (userSquares[randomSquareGuess].classList.contains('carrier'))
				userCarrierLife--;
			checkWinner();
		} else if (
			!userSquares[randomSquareGuess].classList.contains('taken') &&
			!userSquares[randomSquareGuess].classList.contains('hit') &&
			!userSquares[randomSquareGuess].classList.contains('miss')
		) {
			userSquares[randomSquareGuess].classList.add('miss');
			checkWinner();
		} else {
			computerPlay();
		}
		currentPlayer = 'user';
	};

	const checkWinner = () => {
		//computer lose
		if (cpuDestroyerLife === 0) {
			const destroyerSpan =
				computerDetailsDisplay.querySelector('[data-destroyer]');
			destroyerSpan.classList.add('line');

			const destroyer = computerGrid.querySelectorAll('.destroyer');
			destroyer.forEach((element) => {
				element.classList.add('sunk');
			});
		}
		if (cpuSubmarineLife === 0) {
			const submarineSpan =
				computerDetailsDisplay.querySelector('[data-submarine]');
			submarineSpan.classList.add('line');

			const submarine = computerGrid.querySelectorAll('.submarine');
			submarine.forEach((element) => {
				element.classList.add('sunk');
			});
		}
		if (cpuCruiserLife === 0) {
			const cruiserSpan =
				computerDetailsDisplay.querySelector('[data-cruiser]');
			cruiserSpan.classList.add('line');

			const cruiser = computerGrid.querySelectorAll('.cruiser');
			cruiser.forEach((element) => {
				element.classList.add('sunk');
			});
		}
		if (cpuBattleshipLife === 0) {
			const battleshipSpan =
				computerDetailsDisplay.querySelector('[data-battleship]');
			battleshipSpan.classList.add('line');

			const battleship = computerGrid.querySelectorAll('.battleship');
			battleship.forEach((element) => {
				element.classList.add('sunk');
			});
		}
		if (cpuCarrierLife === 0) {
			const carrierSpan =
				computerDetailsDisplay.querySelector('[data-carrier]');
			carrierSpan.classList.add('line');

			const carrier = computerGrid.querySelectorAll('.carrier');
			carrier.forEach((element) => {
				element.classList.add('sunk');
			});
		}
		//user lose
		if (userDestroyerLife === 0) {
			const destroyerSpan =
				userDetailsDisplay.querySelector('[data-destroyer]');
			destroyerSpan.classList.add('line');
			const destroyer = userGrid.querySelectorAll('.destroyer');
			destroyer.forEach((element) => {
				element.classList.add('sunk');
			});
		}
		if (userSubmarineLife === 0) {
			const submarineSpan =
				userDetailsDisplay.querySelector('[data-submarine]');
			submarineSpan.classList.add('line');

			const submarine = userGrid.querySelectorAll('.submarine');
			submarine.forEach((element) => {
				element.classList.add('sunk');
			});
		}
		if (userCruiserLife === 0) {
			const cruiserSpan = userDetailsDisplay.querySelector('[data-cruiser]');
			cruiserSpan.classList.add('line');

			const cruiser = userGrid.querySelectorAll('.cruiser');
			cruiser.forEach((element) => {
				element.classList.add('sunk');
			});
		}
		if (userBattleshipLife === 0) {
			const battleshipSpan =
				userDetailsDisplay.querySelector('[data-battleship]');
			battleshipSpan.classList.add('line');

			const battleship = userGrid.querySelectorAll('.battleship');
			battleship.forEach((element) => {
				element.classList.add('sunk');
			});
		}
		if (userCarrierLife === 0) {
			const carrierSpan = userDetailsDisplay.querySelector('[data-carrier]');
			carrierSpan.classList.add('line');

			const carrier = userGrid.querySelectorAll('.carrier');
			carrier.forEach((element) => {
				element.classList.add('sunk');
			});
		}
		if (
			cpuDestroyerLife +
				cpuSubmarineLife +
				cpuCruiserLife +
				cpuBattleshipLife +
				cpuCarrierLife ===
			0
		) {
			userDetailsDisplay.innerHTML = 'YOU WIN!';
			winner = 'YOU';
			setGameOver(winner);
		}
		if (
			userDestroyerLife +
				userSubmarineLife +
				userCruiserLife +
				userBattleshipLife +
				userCarrierLife <=
			0
		) {
			infoDetailsDisplay.innerText = 'COMPUTER WIN!';
			winner = 'COMPUTER';
			setGameOver(winner);
		}
	};

	const setGameOver = (winner) => {
		gameOver = true;
		startBtn.removeEventListener('click', playGame());
		showFinalScreen(winner);
	};

	const showFinalScreen = (winner) => {
		finalDisplay.classList.add('show');
		finalText.innerHTML = `${winner} won the battle!`;
	};

	const openGame = () => {
		const container = document.querySelector('.container');
		container.classList.add('show');
		const infoContainer = document.querySelector('.info-container');
		infoContainer.classList.add('show');
		const garageContainer = document.querySelector('.garage-container');
		garageContainer.classList.add('show');
		const startScreen = document.querySelector('.start-screen');
		startScreen.classList.add('hide');
	};

	const startGame = (event) => {
		generateRandomLocation();
		playGame();
		const btnContainer = document.querySelector('.btn-container');
		btnContainer.classList.add('hide');
		const garageContainer = document.querySelector('.garage-container');
		garageContainer.classList.remove('show');
	};

	return {
		renderGameboard,
		openGame,
		startGame,
	};
})();

export default initializeControl;
