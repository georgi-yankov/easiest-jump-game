// Video tutorial:
// https://youtu.be/bG2BmmYr9NQ

(function() {

    var character = document.getElementById("character");
    var block = document.getElementById("block");
    var counter = 0;
    const jumpAudio = new Audio('audio/jump.mp3');
    const scoreAudio = new Audio('audio/score.mp3');

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
        let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));

        if(blockLeft < 20 && blockLeft > -20 && characterTop >= 130){
            block.style.animation = "none";
            alert("Game Over. score: " + Math.floor(counter/100));
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