            var tileImages = []     //the main container for game images
            var tileArray = []
            var tileFlippedOver = []
            var gamePlay = false    //controls if we rebuild the board restart
            var cardFlipped = -1
            var timer = ''
            var playLockout = false
            
            var startButton = document.getElementById("start")
            var gameBoard = document.getElementById("gameboard")
            var message = document.getElementById("message")

            startButton.addEventListener("click", startGame)
            
            function startGame()
            {
                cardFlipped = -1
                playLockout = false

                startButton.style.display = "none"
                // it worked without the if
                if(!gamePlay)
                {
                    gamePlay = true
                    buildArray()
                    tileArray = tileImages.concat(tileImages)
                    shuffleArray(tileArray)
                    buildBoard()
                    message.innerHTML = "روی یکی از کاشی ها بزن"
                }
            }

            function buildArray()
            {
                for (var x = 1; x < 7; x++)
                {
                    tileImages.push(x + ".jpg")
                }
            }

            function buildBoard()
            {
                var html = ""
                for (var x = 0; x <= (tileArray.length - 1); x++)
                {
                    html += '<div class="gameTile"><div class="gameTile">'
                    html += '<img id="cardz' + x + '" src="mein/back.jpg" onclick="pickCard(' + x + ', this)" class="flipImage"></div></div>'
                }
                gameBoard.innerHTML = html
            }

            function pickCard(tileIndex, t)
            {
                // check if it's already flipped
                
                if (!isinArray(t.id, tileFlippedOver) && !playLockout)
                {
                    if (cardFlipped >= 0)
                    {
                        cardFlip(t, tileIndex)
                        playLockout = true
                        if (checkSrc(tileFlippedOver[tileFlippedOver.length - 1]) == checkSrc(tileFlippedOver[tileFlippedOver.length - 2]))
                        {
                            //match
                            message.innerHTML = "ایول! ادامه بده"
                            playLockout = false
                            cardFlipped = -1
                            
                            // check if game is over
                            if(tileFlippedOver.length == tileArray.length)
                            {
                                endLevel1()
                            }
                        }
                        else
                        {
                            //no match
                            message.innerHTML = "این نشد. یکی دیگه انتخاب کن"
                            timer = setInterval(hideCard, 1000)
                        }
                    }
                    else
                    {
                        cardFlipped = tileIndex
                        cardFlip(t, tileIndex)
                    }
                }
                else
                {
                    message.innerHTML = "قبلا انتخابش کردی. یکی دیگه انتخاب کن."
                }

            }

            function hideCard() 
            {
                for (var x = 0; x < 2; x++)
                {
                    var vid = tileFlippedOver.pop()
                    document.getElementById(vid).src = "mein/back.jpg"
                }
                clearInterval(timer)
                playLockout = false
                cardFlipped = -1
                message.innerHTML = "روی یکی از کاشی ها بزن"
            }

            function endLevel1()
            {
                startButton.style.display = "block"
                message.innerHTML = "بزن بریم مرحله‌ی بعد!"
                gamePlay = false
                tileImages = [] // tileArray[]
                tileFlippedOver = []
                startGame2()
            }

            function isinArray(v, array)
            {
                return array.indexOf(v) > -1
            }

            function cardFlip(t, ti)
            {
                t.src = "mein/" + tileArray[ti]
                tileFlippedOver.push(t.id)
            }

            function checkSrc(v)
            {
                var v = document.getElementById(v).src
                return v
            }   

            function shuffleArray(array)
            {
                for(var x = array.length - 1; x > 0; x--)
                {
                    
                    array.sort(() => Math.random() - 0.5)
                    
                    //Array randomization another way
                    // var holder = Math.floor(Math.random() * ( x + 1 ))
                    // var itemValue = array[x]
                    // array[x] = array[holder]
                    // array[holder] = itemValue
                }
                return array
}

// LEVEL 2 ______________________________________________________________________________________________

function startGame2()
{
    cardFlipped = -1
    playLockout = false

    startButton.style.display = "none"
    // it worked without the if
    if(!gamePlay)
    {
        gamePlay = true
        buildArray()
        tileArray = tileImages.concat(tileImages)
        shuffleArray(tileArray)
        buildBoard2()
        message.innerHTML = "روی یکی از کاشی ها بزن"
    }
}

function buildBoard2()
{
    var html = ""
    for (var x = 0; x <= (tileArray.length - 1); x++)
    {
        html += '<div class="gameTile"><div class="gameTile">'
        html += '<img id="cardz' + x + '" src="mein/back.jpg" onclick="pickCard2(' + x + ', this)" class="flipImage"></div></div>'
    }
    gameBoard.innerHTML = html
}

function pickCard2(tileIndex, t)
            {
                // check if it's already flipped
                
                if (!isinArray(t.id, tileFlippedOver) && !playLockout)
                {
                    if (cardFlipped >= 0)
                    {
                        cardFlip2(t, tileIndex)
                        playLockout = true
                        if (checkSrc(tileFlippedOver[tileFlippedOver.length - 1]) == checkSrc(tileFlippedOver[tileFlippedOver.length - 2]))
                        {
                            //match
                            message.innerHTML = "ایول! ادامه بده"
                            playLockout = false
                            cardFlipped = -1
                            
                            // check if game is over
                            if(tileFlippedOver.length == tileArray.length)
                            {
                                endLevel2()
                            }
                        }
                        else
                        {
                            //no match
                            message.innerHTML = "این نشد. یکی دیگه انتخاب کن"
                            timer = setInterval(hideCard, 1000)
                        }
                    }
                    else
                    {
                        cardFlipped = tileIndex
                        cardFlip2(t, tileIndex)
                    }
                }
                else
                {
                    message.innerHTML = "قبلا انتخابش کردی. یکی دیگه انتخاب کن."
                }

}

function cardFlip2(t, ti)
{
    t.src = "level2/" + tileArray[ti]
    tileFlippedOver.push(t.id)
}

function endLevel2()
{
    startButton.style.display = "block"
    message.innerHTML = "بزن بریم مرحله‌ی بعد!"
    gamePlay = false
    tileImages = [] // tileArray[]
    tileFlippedOver = []
    startGame3()
}

//level3_________________________________________________________________________________________________

function startGame3()
{
    cardFlipped = -1
    playLockout = false

    startButton.style.display = "none"
    // it worked without the if
    if(!gamePlay)
    {
        gamePlay = true
        buildArray3()
        tileArray = tileImages.concat(tileImages)
        shuffleArray(tileArray)
        buildBoard3()
        message.innerHTML = "روی یکی از کاشی ها بزن"
    }
}

function buildArray3()
{
    for (var x = 1; x < 9; x++)
    {
        tileImages.push(x + ".jpg")
    }
}

function buildBoard3()
{
    var html = ""
    for (var x = 0; x <= (tileArray.length - 1); x++)
    {
        html += '<div class="gameTile"><div class="gameTile">'
        html += '<img id="cardz' + x + '" src="mein/back.jpg" onclick="pickCard3(' + x + ', this)" class="flipImage"></div></div>'
    }
    gameBoard.innerHTML = html
}

function pickCard3(tileIndex, t)
            {
                // check if it's already flipped
                
                if (!isinArray(t.id, tileFlippedOver) && !playLockout)
                {
                    if (cardFlipped >= 0)
                    {
                        cardFlip3(t, tileIndex)
                        playLockout = true
                        if (checkSrc(tileFlippedOver[tileFlippedOver.length - 1]) == checkSrc(tileFlippedOver[tileFlippedOver.length - 2]))
                        {
                            //match
                            message.innerHTML = "ایول! ادامه بده"
                            playLockout = false
                            cardFlipped = -1
                            
                            // check if game is over
                            if(tileFlippedOver.length == tileArray.length)
                            {
                                endLevel3()
                            }
                        }
                        else
                        {
                            //no match
                            message.innerHTML = "این نشد. یکی دیگه انتخاب کن"
                            timer = setInterval(hideCard, 1000)
                        }
                    }
                    else
                    {
                        cardFlipped = tileIndex
                        cardFlip3(t, tileIndex)
                    }
                }
                else
                {
                    message.innerHTML = "قبلا انتخابش کردی. یکی دیگه انتخاب کن."
                }

}

function cardFlip3(t, ti)
{
    t.src = "level3/" + tileArray[ti]
    tileFlippedOver.push(t.id)
}

function endLevel3()
{
    startButton.style.display = "block"
    message.innerHTML = "بزن بریم مرحله‌ی بعد!"
    gamePlay = false
    tileImages = [] // tileArray[]
    tileFlippedOver = []
    startGame4()
}

// level4 _____________________________________________________________________________________________

function startGame4()
{
    cardFlipped = -1
    playLockout = false

    startButton.style.display = "none"
    // it worked without the if
    if(!gamePlay)
    {
        gamePlay = true
        buildArray4()
        tileArray = tileImages.concat(tileImages)
        shuffleArray(tileArray)
        buildBoard4()
        message.innerHTML = "روی یکی از کاشی ها بزن"
    }
}

function buildArray4()
{
    for (var x = 1; x < 11; x++)
    {
        tileImages.push(x + ".jpg")
    }
}

function buildBoard4()
{
    var html = ""
    for (var x = 0; x <= (tileArray.length - 1); x++)
    {
        html += '<div class="gameTile"><div class="gameTile">'
        html += '<img id="cardz' + x + '" src="mein/back.jpg" onclick="pickCard4(' + x + ', this)" class="flipImage"></div></div>'
    }
    gameBoard.innerHTML = html
}

function pickCard4(tileIndex, t)
            {
                // check if it's already flipped
                
                if (!isinArray(t.id, tileFlippedOver) && !playLockout)
                {
                    if (cardFlipped >= 0)
                    {
                        cardFlip4(t, tileIndex)
                        playLockout = true
                        if (checkSrc(tileFlippedOver[tileFlippedOver.length - 1]) == checkSrc(tileFlippedOver[tileFlippedOver.length - 2]))
                        {
                            //match
                            message.innerHTML = "ایول! ادامه بده"
                            playLockout = false
                            cardFlipped = -1
                            
                            // check if game is over
                            if(tileFlippedOver.length == tileArray.length)
                            {
                                endLevel4()
                            }
                        }
                        else
                        {
                            //no match
                            message.innerHTML = "این نشد. یکی دیگه انتخاب کن"
                            timer = setInterval(hideCard, 1000)
                        }
                    }
                    else
                    {
                        cardFlipped = tileIndex
                        cardFlip4(t, tileIndex)
                    }
                }
                else
                {
                    message.innerHTML = "قبلا انتخابش کردی. یکی دیگه انتخاب کن."
                }

}

function cardFlip4(t, ti)
{
    t.src = "level4/" + tileArray[ti]
    tileFlippedOver.push(t.id)
}

function endLevel4()
{
    startButton.style.display = "block"
    message.innerHTML = "بزن بریم مرحله‌ی بعد!"
    gamePlay = false
    tileImages = [] // tileArray[]
    tileFlippedOver = []
    //startGame3()
}