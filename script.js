// Video tutorial:
// https://youtu.be/bG2BmmYr9NQ

(function() {

    const game = document.querySelector(".game");
    const gameHeight = parseInt(window.getComputedStyle(game).getPropertyValue("height"));
    const character = document.getElementById("character");
    const characterWidth = parseInt(window.getComputedStyle(character).getPropertyValue("width"));
    const characterHeight = parseInt(window.getComputedStyle(character).getPropertyValue("height"));
    const characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    const block = document.getElementById("block");
    const blockWidth = parseInt(window.getComputedStyle(block).getPropertyValue("width"));
    const blockHeight = parseInt(window.getComputedStyle(block).getPropertyValue("height"));
    const jumpAudio = new Audio('audio/jump.mp3');
    const scoreAudio = new Audio('audio/score.mp3');
    let counter = 0;

    function jump(){
        jumpAudio.play();

        if(character.classList == "animate") { return }

        character.classList.add("animate");

        setTimeout(function(){
            character.classList.remove("animate");
        }, 300);
    }

    function checkPressedKey(e) {
        const keyCode = e.keyCode;
        // If "Space" or "ArrowUp" key pressed
        if (keyCode === 32 || keyCode === 38) {
            jump();
        }
    }

    var checkDead = setInterval(function() {
        const characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        const blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));

        if((blockLeft <= characterLeft + characterWidth) &&
            (blockLeft + blockWidth >= characterLeft) &&
            (characterTop + characterHeight >= gameHeight - blockHeight)) {
            block.style.animation = "none";
            alert("Game Over. score: " + Math.floor(counter / 100));
            counter = 0;
            block.style.animation = "block 1s infinite linear";
        }else{
            let currentScore;
            counter++;
            currentScore = Math.floor(counter / 100);

            // Play sound on every 5 scores
            if(currentScore >=5 && !(currentScore % 5)) {
                scoreAudio.play();
            }

            document.getElementById("scoreSpan").innerHTML = currentScore;
        }
    }, 10);

    document.addEventListener("keydown", checkPressedKey);

})();