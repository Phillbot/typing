/*jslint es6 */
/*jslint browser */

window.onload = function () {

    'use strict';
    let words;
    let wordsArr = [];


    //main let place

    let button = document.getElementById('btn-push'),
        textArea = document.getElementById('new-words'),
        main = document.getElementById('main'),
        refresh = document.getElementById('refresh'),
        gameMain = document.getElementById('game-main'),
        score = document.getElementById('score'),
        errors = document.getElementById('errors'),
        wordsArrPlace = document.getElementById('wordsArrPlace'),
        info = document.getElementById('info'),
        rules = document.getElementById('rules'),

        // let about = document.getElementById('about');
        // let aboutDiv = document.getElementById('about-div');

        temp = document.getElementById('temp'),
        speed = document.getElementById('speed'),

        statusDiv = document.getElementById('status'),

        // let pacman = document.getElementsByClassName('pacman')[0];


        soundButton = document.getElementById('sound'),
        audio = document.createElement("audio");
    audio.src = "./mp3/main.ogg";

    //first place

    soundButton.addEventListener('click', function () {
        soundButton.classList.toggle('s-onn');
        if (soundButton.classList.contains('s-onn')) {
            audio.play();
        }
        soundButton.classList.toggle('s-off');
        if (soundButton.classList.contains('s-off')) {
            audio.pause();
        }

    });


    let text = "Добро пожаловать." +
        " Вводите текст сюда. Помните, что вы всегда можете начать заново." +
        " Вы можете ознакомиться с информацией, наведя на нужную иконку справа." +
        " Чтобы начать - нажмите на большую кнопку внизу.\n" +

        "Удачи!";

    let delay = 30, // Скорость печатания
        elem = textArea;

    let print_text = function (text, elem, delay) {

        if (text.length > 0) {
            elem.append(text[0]);
            setTimeout(
                function () {
                    print_text(text.slice(1), elem, delay);
                }, delay
            );
        }
    };

    print_text(text, elem, delay);


    textArea.focus();

    info.addEventListener('mouseover', function () {
        info.classList.add("bring");
        rules.classList.add("rules");

    });

    info.addEventListener('mouseout', function () {
        info.classList.remove("bring");
        rules.classList.remove("rules");

    });

    button.addEventListener('click', function () {

        audio.pause();
        if (textArea.value === '') {
            alert('Введите текст');

        } else {
            document.body.classList.add('body');
            words = textArea.value.toString();


            for (let i = 0, max = words.length - 1; i <= max; i++) {
                wordsArr.push(words[i]);
            }


           //  for (let i = 0, max = wordsArr.length - 1; i <= max; i++) {
           //
           //      console.log(wordsArr[i].charCodeAt()); //8212 //45
           // // – и — и -
           //  }


            for (let i = 0, max = wordsArr.length - 1; i <= max; i++) {
                let newElWorld = document.createElement('span');

                wordsArrPlace.appendChild(newElWorld);
                newElWorld.innerText = wordsArr[i];

            }


            main.style.display = 'none';
            gameMain.style.display = 'block';

            let allWrdNow = wordsArrPlace.querySelectorAll('span');
            let countSpan = 0;
            let errorMax = allWrdNow.length / 100 * 8;
            let scoreCount = 0;
            let errorsCount = 0;

            let codes = [];

            for (let i = 0, max = allWrdNow.length - 1; i <= max; i++) {
                codes.push(allWrdNow[i].innerHTML.charCodeAt(0));

            }

            for (let i = 0, max = codes.length - 1; i <= max; i++) {
                if (codes[i] === 60) {
                    codes[i] = 13;
                }

                if (codes[i] === 8212 || codes[i] === 8211) {
                    codes[i] = 45;
                }

                //TYT Tupe
            }

            let spaces = [];


            for (let i = 0, max = allWrdNow.length - 1; i <= max; i++) {


                if (allWrdNow[i].innerHTML === " ") { //|| allWrdNow[i].innerHTML === "<br>" для переноса
                    spaces.push(allWrdNow[i]);
                }
            }

            // console.log(spaces);


            // for (let i = 0; i <= spaces.length - 1 ; i++) {  Сразу добавить пробелам классы
            //     spaces[i].classList.add('space');
            // }

            statusDiv.addEventListener('click', function () {

                statusDiv.classList.toggle('on');
                statusDiv.classList.toggle('off');


                for (let i = 0, max = spaces.length - 1; i <= max; i++) {
                    if (statusDiv.classList.contains('on')) {
                        spaces[i].classList.add('space');

                    }

                    if (statusDiv.classList.contains('off')) {
                        spaces[i].classList.remove('space');
                    }

                }

            });


            let pressCount = 0;
            let codesCount = 0;
            //   let a = 0;  pacman add


            window.addEventListener("keypress", (e) => {

                    let normPress = document.createElement("audio");
                    let failPress = document.createElement("audio");
                    let winPlay = document.createElement("audio");
                    let gg = document.createElement("audio");


                    normPress.src = "./mp3/press.ogg";
                    failPress.src = "./mp3/miss.ogg";
                    winPlay.src = "./mp3/win.ogg";
                    gg.src = "./mp3/lose.ogg";


                    if (codesCount === codes.length || errorsCount >= errorMax) {
                        return false;
                    }


                    let charCodeEnter = e.which;


                    let intervalId = null;
                    let time = 0;

                    function tickHandler() {
                        time++;
                        temp.innerHTML = time.toString();
                        speed.innerText = Math.round((pressCount * 60) / time).toString();
                        codes[0] = null;


                        if (codesCount === codes.length || errorsCount >= errorMax) {
                            clearInterval(intervalId);
                            speed.innerText = Math.round((pressCount * 60) / time).toString();
                            time = undefined;

                        }

                    }

                    if (charCodeEnter === codes[0]) {
                        intervalId = setInterval(tickHandler, 1000);

                    }


                    if (charCodeEnter === codes[codesCount]) {

                        normPress.play();

                        //a = a + 10; pacman add
                        // pacman.style.left = a +  'px';
                        allWrdNow[countSpan].classList.add('out');
                        allWrdNow[countSpan].classList.remove('err1');
                        pressCount++;
                        countSpan++;
                        codesCount++;
                        score.innerHTML = scoreCount + 10;
                        scoreCount = scoreCount + 10;


                    } else {

                        failPress.play();
                        allWrdNow[countSpan].classList.add('err1');
                        errors.innerHTML = errorsCount + 1;
                        errorsCount++;
                        scoreCount = scoreCount - 100;
                        score.innerHTML = scoreCount;
                    }


                    let imgEnd = document.createElement('img');
                    imgEnd.classList.add('end-game');

                    if (errorsCount >= errorMax) {

                        gg.play();

                        imgEnd.setAttribute('src', './img/lose.png');
                        wordsArrPlace.innerText = '';
                        wordsArrPlace.appendChild(imgEnd);


                        codesCount = 0;
                    }


                    if (countSpan === allWrdNow.length) {

                        winPlay.play();

                        imgEnd.setAttribute('src', './img/win.png');
                        wordsArrPlace.innerText = '';
                        wordsArrPlace.appendChild(imgEnd);

                        countSpan = 0;

                    }
                }
            );
        }
    });


    refresh.addEventListener('click', function () {
        location.reload();
    });

    //Сохранение статы || выгрузка статы


    setInterval(function clock() {

        let clockBlock = document.querySelector('.clock');
        let clockTime = new Date();
        let hours = clockTime.getHours();
        let minutes = clockTime.getMinutes();
        let seconds = clockTime.getSeconds();

        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (hours < 10) {
            hours = "0" + hours;
        }

        clockBlock.innerHTML = hours + ":" + minutes + ":" + seconds;

    }, 1000);


};

