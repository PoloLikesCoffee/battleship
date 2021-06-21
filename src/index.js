import initializeControl from './gameControl';

initializeControl.renderGameboard();

//event listeners
const openBtn = document.querySelector('#open');
openBtn.addEventListener('click', initializeControl.openGame);

const startBtn = document.querySelector('#start');
startBtn.addEventListener('click', initializeControl.startGame);

const reloadBtn = document.querySelector('#reload');
reloadBtn.addEventListener('click', () => {
	location.reload();
});
