class Figure {
    constructor () {
        return this.generateFiguresList();
    }

    figures () {
        return ([
            {
                rotationIndex: 0,
                maxRotations: 4,
                color: 'middle-blue',
                rotations: [
                    [
                        [1,1,1,1],
                        [0,0,0,0],
                        [0,0,0,0],

                    ], [
                        [0,0,1],
                        [0,0,1],
                        [0,0,1],
                        [0,0,1]
                    ], [
                        [1,1,1,1],
                        [0,0,0,0],
                    ], [
                        [0,1],
                        [0,1],
                        [0,1],
                        [0,1]
                    ]

                ]
            },{
                rotationIndex: 0,
                maxRotations: 4,
                color: 'blurple',
                rotations: [
                    [
                        [2,0,0],
                        [2,2,2],
                        [0,0,0]
                    ],
                    [
                        [0,2,2],
                        [0,2,0],
                        [0,2,0]
                    ],
                    [
                        [2,2,2],
                        [0,0,2]
                    ],
                    [
                        [0,2],
                        [0,2],
                        [2,2]
                    ]
                ]
            },{
                rotationIndex: 0,
                maxRotations: 4,
                color: 'quince-jelly',
                rotations: [
                    [
                        [0,0,3],
                        [3,3,3],
                        [0,0,0],
                    ],
                    [
                        [0,3,0],
                        [0,3,0],
                        [0,3,3]
                    ],
                    [
                        [3,3,3],
                        [3,0,0]
                    ],
                    [
                        [3,3],
                        [0,3],
                        [0,3]
                    ]
                ]
            },{
                rotationIndex: 0,
                maxRotations: 0,
                color: 'turbo',
                rotations: [
                    [
                        [4,4],
                        [4,4]
                    ]
                ]
            },{
                rotationIndex: 0,
                maxRotations: 4,
                color: 'june-bud',
                rotations: [
                    [
                        [0,5,5],
                        [5,5,0],
                        [0,0,0],
                    ],
                    [
                        [0,5,0],
                        [0,5,5],
                        [0,0,5]
                    ],
                    [
                        [0,5,5],
                        [5,5,0],
                    ],
                    [
                        [5,0],
                        [5,5],
                        [0,5]
                    ]
                ]
            },{
                rotationIndex: 0,
                maxRotations: 4,
                color: 'steel-pink',
                rotations: [
                    [
                        [0,6,0],
                        [6,6,6],
                        [0,0,0],
                    ],
                    [
                        [0,6,0],
                        [0,6,6],
                        [0,6,0]
                    ],
                    [
                        [6,6,6],
                        [0,6,0]
                    ],
                    [
                        [0,6],
                        [6,6],
                        [0,6]
                    ]
                ]
            },{
                rotationIndex: 0,
                maxRotations: 4,
                color: 'red',
                rotations: [
                    [
                        [7,7,0],
                        [0,7,7],
                        [0,0,0],
                    ],
                    [
                        [0,0,7],
                        [0,7,7],
                        [0,7,0]
                    ],
                    [
                        [7,7,0],
                        [0,7,7]
                    ],
                    [
                        [0,7],
                        [7,7],
                        [7,0]
                    ]
                ]
            }
        ])
    }

    generateFiguresList() {
        let arr = [];
        for (let i = 0; i < 10; i++)
            arr.push(this.getRandFigure())
        return arr;
    }

    getRandFigure() {
        return this.figures()[this.getRandomInt(0, 6)];
    };

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

class Game {
    constructor (sockets) {
        console.log('=============== CREATING GAME FIELD ==================');
        console.log('[+] sockets : ', sockets);

        this.player = {
            one: {
                map: [],
                figure: {},
                heap: [],
                figuresListMarker: 0,
                socketId: sockets[0],
                blockedLines: 0
            },
            two: {
                map: [],
                figure: {},
                heap: [],
                figuresListMarker: 0,
                socketId: sockets[1],
                blockedLines: 0
            },
            winner: false
        };

        console.log('[+] players : ', this.player);

        this.figuresList = new Figure();

        // this.map = [];
        // this.figure = {
        //     el: [],
        //     onField: false,
        //     lastStep: false,
        //     vPos: 0,
        //     hPos: 0
        // };
        // this.heap = [];
        this.startBool = false;
        this.endGame = false;
        // this.figuresListMarker = 0;

        // console.log('[+] figures list : ');
        // console.log(this.figuresList);
        // generating new field
        // console.log('[+] generating new figure : ', this.figure.el.rotations[this.figure.el.rotationIndex]);
        this.generateMap();

        this.createNewFigure('one');
        this.placeFigureToHeap('one');
        this.placeFigureOnMap('one');

        if (sockets[1]) {
            this.createNewFigure('two');
            this.placeFigureToHeap('two');
            this.placeFigureOnMap('two');
        }

        //generate new figure

        console.log('======================================================');
    }

    placeFigureOnMap (player) {
        console.log('==================== PLACE FIGURE ON MAP ===========================');
        /*
        * Отрисовка фигуры.
        * Отрисовка происходит слева направно, снизу вверх.
        * Слева направо что бы сдвигать в зависимости от позиции отрисовки на нужное кол-во клеток влево.
        * Сверху вниз что бы при начале отрисовки, когда она выводится не вся, отрисовать нужную ее часть.
        * */

        /*
        * Вертикальная отрисовка фигуры.
        * Каждое двжиение фигуры это figureVerticalPostiion (fvp), в зависимости от fvp мы отрисовваем
        * определенную часть фигуры, чем больше fvp тем больше прорисовывется фигура сверху карты.
        *
        * Если fvp 1, значит мы отрисовываем замый низ фигуры с самого верхка карты.
        * [0][...]
        *
        * Если fvp 2 мы отрисовываем 2 последних линии фигуры со второй позиции на карте.
        * [0][...]
        * [1][...]
        *
        * И так далее до момента пока высота фигуры не станет больше чем fwp.
        * */

        /*
        * Горизонтальное позиционирование фигуры
        *
        * Рандомно у нас генерируется горизонтальная позиция фигуры на карте. В зависимости от позиции,
        * нам надо расчитать с какой колонки в карте нам надо начинать переводить фигуру на карту. Для
        * этого, нам нужно взять длину фигуры и в зависимости от нее отодвинуть маркер начала отрисовки
        * фигуры на карте на определенное кол-во клеток.
        * Например:
        *
        * Ширина фигуры 4 клетки, двигаем ее влево на две клетки от позиции.
        * Ширина фигуры 3 клетки, двигаем ее на одну клетку влево от позиции.
        * Ширина фигуры 2 или меньше, отрисовываем ее не сдвигая клетку влево.
        * */

        let figurePosition = this.player[player].figure.hPos;
        let figure = this.player[player].figure.el.rotations[this.player[player].figure.el.rotationIndex];

        if (!figure) {
            // TODO КАКОЙ ТО БАГ, ИНОГДА НЕ НАХОДИТ ФИГУРУ
            console.log('!!!!!!!!!!!!! FIGURE NOT FOUND !!!!!!!!!!!!!!!');
            console.log('[+] player : ', player);
            console.log('[+] this.player[player].figure.el.rotationIndex : ', this.player[player].figure.el.rotationIndex);
            console.log('[+] this.player[player].figure.el.rotations : ', this.player[player].figure.el.rotations);
            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
            throw new Error();
            // this.player[player].figure.el.rotationIndex = 0;
            // figure = this.player[player].figure.el.rotations[0];
        }

        console.log('[+] figure height : ', this.player[player].figure.mH);
        console.log('[+] figure width : ', this.player[player].figure.mW);
        console.log('[+] figure position : ', figurePosition);
        console.log('[+] figure : ', figure);
        console.log('[+] figure position start : ', figurePosition);

        let figureLineToDraw = this.player[player].figure.mH - 1;
        let mapLine = this.player[player].figure.vPos;

        let figureDraw = true;
        if (this.player[player].figure.lastStep && !this.player[player].figure.moved)
            figureDraw = false;

        if (this.player[player].figure.vPos == 0 + this.player[player].figure.mH - this.player[player].figure.fH) {
            for (let mL = this.player[player].figure.vPos, fL = this.player[player].figure.fH - 1; mL >= 0; mL--, fL--) {
                for (let mC = this.player[player].figure.hPos, fC = 0; fC < this.player[player].figure.mW; fC++, mC++) {
                    if (this.player[player].heap[mL][mC] != 0 && figure[fL][fC] != 0) {
                        this.endGame = true;
                        break ;
                    }
                }
                if (this.endGame)
                    break ;
            }
        }

        if (this.endGame) {
            console.log('================== END GAME ===================');
            console.log('[+] player which overflowed map : ', player);
            console.log('[+] player which overflowed map : ', this.player[player].socketId);
            console.log('===============================================');
            if (!this.player.winner)
                this.setWinner(this.anotherPlayer(player));
            return ;
        }

        console.log('[+] figure draw : ', figureDraw);

        console.log('[+] map line : ', mapLine);
        for (let fH = 0; mapLine >= 0 && fH < this.player[player].figure.mH && figureDraw; mapLine--, fH++, figureLineToDraw--) {
            for (let cell = 0, mapPos = figurePosition; cell < this.player[player].map[0].length && cell < this.player[player].figure.mW && mapLine < this.player[player].map.length; cell++, mapPos++) {
                // Условие на случай если угол фигуры пустой, при падении на угол другой фигуры
                // не перерисовывало его в пустоту
                if (this.player[player].map[mapLine][mapPos] == 0)
                    this.player[player].map[mapLine][mapPos] = figure[figureLineToDraw][cell];
            }
        }

        /*
        * Проверка следующего хода.
        *
        * Надо проверить можно ли продолжать двигать фигуру или это последний ее ход.
        *
        * Делаем проверку на дно карты, если карта закончилась значит это конечная ее
        * позиция.
        *
        * Делаем проверку на прилипание к хипу, и если след шаг фигуры в местах отрисовки
        * фигуры пересикается с хипом, значит это последний шаг фигуры.
        * */

        let onHeap = false;
        figureLineToDraw = this.player[player].figure.mH - 1;
        mapLine = this.player[player].figure.vPos + 1;

        if (!this.player[player].map[mapLine - (this.player[player].figure.mH - this.player[player].figure.fH)])
            onHeap = true;

        for (let mL = mapLine, fL = figureLineToDraw; fL >= 0 && mL >= 0; fL--, mL--) {
            for (let i = figurePosition, cell = 0; cell < this.player[player].heap[0].length && cell < this.player[player].figure.mW && !onHeap && mL < this.player[player].heap.length; i++, cell++) {
                if (this.player[player].heap[mL][i] != 0 && figure[fL][cell] != 0) {
                    onHeap = true;
                    break ;
                }
            }

            if (onHeap) break;
        }

        if (this.player[player].figure.moved && !onHeap) {
            this.player[player].figure.lastStep = false;
        }

        // Проверяем упала ли фигура до дна
        if (onHeap) {
            this.player[player].figure.lastStep = true;
            console.log('[+] last step : ', this.player[player].figure.lastStep);
        }

        console.log('[+] figure placed on map : ');
        // console.log(this.map);

        console.log('====================================================================');
    }

    step(player) {
        console.log('================= STEP ===================');
        // console.log('[+] figure : ', this.figure);

        if (player) {
            if (this.player[player].figure.lastStep) {
                this.createNewFigure(player);
                this.placeFigureToHeap(player);
            } else
                this.player[player].figure.vPos++;

            this.addHeapOnMap(player);
            this.placeFigureOnMap(player);
            return ;
        }

        if (this.player.one.figure.lastStep) {
            this.createNewFigure('one');
            this.placeFigureToHeap('one');
        } else {
            this.player.one.figure.vPos++;
        }

        if (this.player.two.figure.lastStep) {
            this.createNewFigure('two');
            this.placeFigureToHeap('two');
        } else {
            this.player.two.figure.vPos++;
        }

        this.addHeapOnMap('one');
        this.placeFigureOnMap('one');
        this.addHeapOnMap('two');
        this.placeFigureOnMap('two');

        console.log('==========================================');
    }

    createNewFigure (player) {
        let figure = {
            maxRotations: this.figuresList[this.player[player].figuresListMarker].maxRotations,
            rotationIndex: this.figuresList[this.player[player].figuresListMarker].rotationIndex,
            color: this.figuresList[this.player[player].figuresListMarker].color,
            rotations: []
        };

        for (let r = 0; r < this.figuresList[this.player[player].figuresListMarker].rotations.length; r++) {
            figure.rotations[r] = [];
            let h = this.figuresList[this.player[player].figuresListMarker].rotations[r].length,
                w = this.figuresList[this.player[player].figuresListMarker].rotations[r][0].length;

            for (let i = 0; i < h; i++) {
                figure.rotations[r][i] = [];
                for (let j = 0; j < w; j++) {
                    figure.rotations[r][i][j] = this.figuresList[this.player[player].figuresListMarker].rotations[r][i][j]
                }
            }
        }

        console.log('[+] new figure : ', figure);

        // this.figuresList[this.player[player].figuresListMarker]

        this.player[player].figure = {
            el: figure,
            onField: false,
            lastStep: false,
            moved: false,
            vPos: 0,
            hPos: 0,
            fW: 0,
            fH: 0,
            mW: 0,
            mH: 0
        };

        let fSize = this.getFigureSize(this.player[player].figure.el.rotations[this.player[player].figure.el.rotationIndex]);
        this.player[player].figure.mH = fSize.mH;
        this.player[player].figure.mW = fSize.mW;
        this.player[player].figure.fW = fSize.w;
        this.player[player].figure.fH = fSize.h;
        this.player[player].figure.vPos += fSize.mH - fSize.h;
        this.player[player].figure.hPos = this.getRandomInt(0, 9 - fSize.w);
        this.player[player].figuresListMarker++;

        if (this.player[player].figuresListMarker >= this.figuresList.length) {
            this.figuresList = this.figuresList.concat(new Figure());
        }
    }

    placeFigureToHeap (player) {
        console.log('================= PLACING TO HEAP ===================');
        this.player[player].heap = [];

        for (let l = 0; l < 20; l++) {
            this.player[player].heap[l] = [];
            for (let c = 0; c < 10; c++) {
                this.player[player].heap[l][c] = this.player[player].map[l][c];
            }
        }

        for (let i = 0; i < this.player[player].heap.length; i++) {
            let filledLine = [];
            for (let j = 0; j < this.player[player].heap[0].length; j++) {
                if (this.player[player].heap[i][j] != 0 && this.player[player].heap[i][j] != 8)
                    filledLine.push(0);
            }

            if (filledLine.length == this.player[player].heap[0].length) {
                this.player[this.anotherPlayer(player)].blockedLines++;

                for (let line = i; line > 0; line--) {
                    this.player[player].heap[line] = this.player[player].heap[line - 1];
                }
            }
        }

        if (this.player[this.anotherPlayer(player)].blockedLines > 0) {
            let aP = this.player[this.anotherPlayer(player)];

            for (let bL = aP.blockedLines, i = aP.heap.length - 1; bL >= 0 && i >= 0; bL--, i--) {
                for (let j = 0; j < aP.heap[0].length; j++) {
                    aP.heap[i][j] = 8;
                }
            }
        }

        // console.log('[+] heap : ');
        // console.log(this.heap);
        console.log('=====================================================');
    }

    getFiguresPosition (player) {
        let res = [];
        for (let i = 0; i < this.player[player].map.length; i++) {
            for (let j = 0; j < this.player[player].map[0].length; j++) {
                if (this.player[player].map[i][j] != 0) {
                    res.push({
                        pos: ((i) * 10) + (j),
                        color: this.figureColors()[this.player[player].map[i][j]]
                    })
                }
            }
        }

        return res;
    }

    getFigureSize(figure) {
        let fW = 0;
        let fH = 0;
        let mH = figure.length;
        let mW = figure[0].length;
        let columnsToCalc = [];

        for (let i = 0, lineNotEmpty = false; i < figure.length; i++, lineNotEmpty = false) {
            columnsToCalc.push(0);
            for (let j = 0; j < figure[0].length; j++) {
                if (i == 0)
                    columnsToCalc.push(0);

                if (figure[i][j] != 0) {
                    columnsToCalc[j] = 1;
                    lineNotEmpty = true;
                }
            }

            if (lineNotEmpty)
                fH++;
        }

        for (let i = 0; i < columnsToCalc.length; i++)
            columnsToCalc[i] == 1 ? fW++ : 0;

        // console.log('=============== CALC FIGURE LENGTH ================');
        // console.log('[+] figure : ', figure);
        // console.log('[+] figure length : ', fW);
        // console.log('[+] figure height : ', fH);
        // console.log('===================================================');

        return ({
            h: fH,
            w: fW,
            mH,
            mW
        })
    }

    figureColors () {
        return ({
            1: 'middle-blue',
            2: 'blurple',
            3: 'quince-jelly',
            4: 'turbo',
            5: 'june-bud',
            6: 'steel-pink',
            7: 'red',
            8: 'lightgrey'
        });
    }

    checkFigurePlacing (move, player) {
        if (move == ' ' || move == 'ArrowDown')
            return ;

        let canDraw = true;
        let figure = this.player[player].figure.el.rotations[this.player[player].figure.el.rotationIndex];
        let hPos = this.player[player].figure.hPos;
        let fSize = this.getFigureSize(this.player[player].figure.el.rotations[this.player[player].figure.el.rotationIndex]);
        let mH = fSize.mH;
        let fW = fSize.w;
        let fH = fSize.h;
        let vPos = this.player[player].figure.vPos;

        if (move == 'ArrowRight') {
            if (!(this.player[player].figure.hPos + this.player[player].figure.fW <= 9 - (figure[0].length - this.player[player].figure.fW)))
                return false;

            hPos++;
        } else if (move == 'ArrowLeft') {
            if (!(this.player[player].figure.hPos - 1 >= 0 - (figure[0].length - this.player[player].figure.fW)))
                return false;

            hPos--;
        } else if (move == 'ArrowUp') {
            if (!(this.player[player].figure.el.maxRotations != 0))
                return false;

            let rotationIndex = this.player[player].figure.el.rotationIndex;

            if (this.player[player].figure.el.rotationIndex + 1 >= this.player[player].figure.el.maxRotations) {
                rotationIndex = 0;
            } else rotationIndex++;

            figure = this.player[player].figure.el.rotations[rotationIndex];
            let fSize = this.getFigureSize(figure);
            mH = fSize.mH;
            fW = fSize.w;
            fH = fSize.h;

            if (vPos > 19)
                vPos = 19 + (mH - fH);

            if (hPos < 0)
                hPos = 0;

            if (hPos + fW > 9)
                hPos -= (hPos + fW) - 10;
        }

        for (let i = vPos, fL = mH - 1; i >= 0 && fL >= 0; i--, fL--) {
            for (let fC = 0, j = hPos; fC < fW + (figure[0].length - fW) && i < this.player[player].heap.length; fC++, j++) {
                if (this.player[player].heap[i][j] != 0 && figure[fL][fC] != 0) {
                    canDraw = false;
                    break ;
                }
            }
            if (!canDraw) break ;
        }

        console.log('[+] can draw : ', canDraw);

        return canDraw;
    }

    generateMap () {
        for (let l = 0; l < 20; l++) {
            this.player.one.map[l] = [];
            this.player.two.map[l] = [];
            for (let c = 0; c < 10; c++) {
                this.player.one.map[l][c] = 0;
                this.player.two.map[l][c] = 0;
            }
        }
    }

    addHeapOnMap (player) {
        console.log('================= ADDING HEAP TO MAP ===================');
        this.player[player].map = [];
        for (let l = 0; l < 20; l++) {
            this.player[player].map[l] = [];
            for (let c = 0; c < 10; c++) {
                this.player[player].map[l][c] = this.player[player].heap[l][c];
            }
        }

        // console.log('[+] map from heap : ', this.map);
        console.log('========================================================');
    }

    move (key, player) {
        console.log('================ FIGURE MOVE ====================');
        console.log('[+] key : ', key);

        this.player[player].figure.moved = true;
        let canDraw = this.checkFigurePlacing(key, player);

        if (key === ' ') {
            if (this.player[player].figure.lastStep)
                return ;

            let figure = this.player[player].figure.el.rotations[this.player[player].figure.el.rotationIndex];
            for (let line = this.player[player].figure.vPos; line >= 0 && line < this.player[player].heap.length; line++) {
                let canDraw = true;

                for (let i = line, fL = 0; i < this.player[player].heap.length && fL < this.player[player].figure.mH; i++, fL++) {
                    for (let fC = 0, j = this.player[player].figure.hPos; fC < this.player[player].figure.fW + (this.player[player].figure.mW - this.player[player].figure.fW); fC++, j++) {
                        if (this.player[player].heap[i][j] != 0 && figure[fL][fC] != 0) {
                            canDraw = false;
                            break ;
                        }

                    }
                    if (!canDraw) break ;
                }

                if (canDraw && line == this.player[player].map.length - 1) {
                    this.player[player].figure.vPos = line + (this.player[player].figure.mH - this.player[player].figure.fH);
                    break ;
                }

                if (!canDraw) {
                    this.player[player].figure.vPos = line + this.player[player].figure.mH - 2;
                    break ;
                }
            }
        } else if (key == 'ArrowRight' && canDraw) {
            this.player[player].figure.hPos++;
        } else if (key == 'ArrowLeft' && canDraw) {
            this.player[player].figure.hPos--;
        } else if (key == 'ArrowUp' && canDraw) {
            if (this.player[player].figure.el.rotationIndex + 1 >= this.player[player].figure.el.maxRotations) {
                this.player[player].figure.el.rotationIndex = 0;
            } else this.player[player].figure.el.rotationIndex++;

            let fSize = this.getFigureSize(this.player[player].figure.el.rotations[this.player[player].figure.el.rotationIndex]);
            this.player[player].figure.mH = fSize.mH;
            this.player[player].figure.mW = fSize.mW;
            this.player[player].figure.fW = fSize.w;
            this.player[player].figure.fH = fSize.h;

            if (this.player[player].figure.vPos >= 19)
                this.player[player].figure.vPos = 19 + (this.player[player].figure.mH - this.player[player].figure.fH);

            if (this.player[player].figure.hPos < 0)
                this.player[player].figure.hPos = 0;

            if (this.player[player].figure.hPos + this.player[player].figure.fW > 9)
                this.player[player].figure.hPos -= (this.player[player].figure.hPos + this.player[player].figure.fW) - 10;
        } else if (key == 'ArrowDown') {
            this.step(player);
        }

        this.addHeapOnMap(player);
        this.placeFigureOnMap(player);

        console.log('=================================================');
    }

    start () {
        this.startBool = true;
    }

    anotherPlayer (player) {
        return player == 'one' ? 'two' : 'one';
    }

    setWinner (player) {
        this.player.winner = this.player[player].socketId;
    }

    getWinner () {
        return this.player.winner;
    }

    alreadyStart () {
        return this.startBool;
    }

    checkEndGame () {
        return this.endGame;
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

module.exports = Game;