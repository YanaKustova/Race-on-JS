/*  //получаем элемент со страницы
const score = document.querySelector('.score'), //один элемент, all- несколько
    start = document.querySelector('.start'),
    gameArea = document.querySelector('.gameArea'),
    car = document.createElement('div'); //создали элемент 

    car.classList.add('car');

/*обработчик события console.dir();
start.oneclick = function (){
    start.classList.add('hide');

}; //устаревшее */

/* 
start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun) //срабатывает. когда нажимается любая клавиша
document.addEventListener('keyup',stopRun) //когда отпускаем кнопку машина останавливается


//когда выполняется скрипт и машина едет, если arrow up true то машина поедет быстрее
const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
};

const setting = {
    start: false,
    score: 0,
    apeed: 3
};


function startGame(){
    start.classList.add('hide');
    setting.start = true;
    gameArea.appendChild
    requestAnimationFrame(playGame);  //анимация для функции playGame

};

function playGame() {
    console.log ('Play game!');
    if(setting.start){
        requestAnimationFrame(playGame);
    }
};

//2 обработчика нажатие кнопки 
function startRun(event){
    event.preventDefailt();
    //console.log(event.key); //выводит в консоль какую клавишу нажали
    keys[event.key] = true; 
};




function stopRun(event){
    event.preventDefailt();
    keys[event.key] = false;  //чтобы машина остановилась 
}; */


const score = document.querySelector('.score'),
start = document.querySelector('.start'),
gameArea = document.querySelector('.gameArea'),
car = document.createElement('div');

car.classList.add('car');

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
};

const setting = {
    start: false,
    score: 0,
    speed: 3,
    traffic: 3 //чтобы были дргуие машины, 3 - сложность игры
};


//сколько элементов поместится на страницу
function getQuantityElements(heightElement){
    return document.documentElement.clientHeight / heightElement + 1;

};


function startGame(){
    start.classList.add('hide');
    gameArea.innerHTML = '';
    
    

    //циле для линий, добавляем линии на страницу 
    for (let i = 0; i<20; i++) { //линий 20
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i*100)+'px'; //100 - расстояние между линий
        line.y = i*100; //в саму линию добавляем свойство
        gameArea.appendChild(line); //располгаем линии 
    }


    //создаем автомобили,  высота 100px
    for (let i =0; i< getQuantityElements(100* setting.traffic); i++){
        const enemy = document.createElement ('div');
        enemy.classList.add('enemy');
        enemy.y = -100* setting.traffic * (i+1); //высота автомобиля умноженная на трафик, i - чтобы автомобили были на расстоянии
        enemy.style.left = Math.floor (Math.random() * (gameArea.offsetWidth - 50)) + 'px'; //floor - округлили
        enemy.style.top = enemy.y + 'px'; //расстояние от верха игрового пространта
        enemy.style.background = 'transparent url("image/enemy2.png") center / cover no-repeat';
        gameArea.appendChild(enemy);
    } 


    setting.score = 0;
    setting.start = true;
    
    gameArea.appendChild(car);

    car.style.left = gameArea.offsetWidth/2 - car.offsetWidth/2;
    car.style.top = 'auto';
    car.style.bottom = '10px';

    setting.x = car.offsetLeft; //добавим свойство х
    setting.y = car.offsetTop;

    requestAnimationFrame(playGame);
}

function playGame(){

    //console.log('Play Game!')
    setting.score += setting.speed;
    score.innerHTML = 'SCORE<br>' + setting.score;
    moveRoad();
    moveEnemy();

   
    if(setting.start){
        //какая кнопка зажата, туда и двигаем
        if (keys.ArrowLeft && setting.x > 0){  //ограничиваем, чтобы машина не выходила за поле
            setting.x-= setting.speed; //присваиваем операцию setting.x - setting.speed
        }
        if(keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth) ){ //ограничиваем меньше чем ширина дороги - ширина автомобиля
            setting.x+= setting.speed;
        }

        if(keys.ArrowDown && setting.y > 0 ){
            setting.y += setting.speed;
        }

        if(keys.ArrowUp && setting.y < (gameArea.offsetHeight - car.offsetHeight) ){
            setting.y -= setting.speed; //чтобы вверх двигался, уменьшаем значение высоты
        }

        car.style.left = setting.x + 'px'; //строка с добавлением px
        car.style.top = setting.y + 'px';
        requestAnimationFrame(playGame);
    }
    
}

function startRun(event){
    event.preventDefault();
    keys[event.key] = true;
    
}

function stopRun(event){
    event.preventDefault(); 
    keys[event.key] = false;
}


function moveRoad(){
    let lines = document.querySelectorAll('.line'); // получили все линии и нужно менять положение
    lines.forEach(function(line){ //элемент, который перебирается
        line.y += setting.speed;//берем элемент и меняем значение y 
        line.style.top = line.y + 'px';

        if(line.y >= document.documentElement.clientHeight) { //получили высоту страницы
            line.y = -110;
        }
    });
}


//получит все автомобили в дороге
function moveEnemy() {
    let enemy = document.querySelectorAll('.enemy');

    enemy.forEach(function(item){ //item - автомобили\
        let carRect = car.getBoundingClientRect();
        let enemyRect = item.getBoundingClientRect();

        if (carRect.top <= enemyRect.bottom &&
            carRect.right >= enemyRect.left &&
            carRect.left <= enemyRect.right &&
            carRect.bottom >= enemyRect.top) {
                setting.start = false; 
            console.warn('ДТП');
            start.classList.remove('hide');
            score.style.top = start.offsetHeight; //чтобы не пропали очки в конце игры, полуичли  высоту
            //start.style.top = score.offsetHeight; //2 вариант
        } 

        item.y += setting.speed/2;
        item.style.top = item.y + 'px';
        if (item.y >= document.documentElement.clientHeight){
            item.y = -100 * setting.traffic;
            item.style.left = Math.floor (Math.random() * (gameArea.offsetWidth - 50)) + 'px'; //рандомное появление 
        }
    });

    
};

