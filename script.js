const playBtn = document.getElementById('play-btn');
const submitBtn = document.getElementById('submit-btn');
const feedback = document.getElementById('feedback');
const answerInput = document.getElementById('answer');

// Correct answer: consecutive beep counts
const correctAnswer = "211";

// Single AudioContext
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Function to play beep with visual dot
function playBeep(duration = 300) {
    // Visual dot
    const dot = document.createElement('span');
    dot.textContent = '●';
    dot.style.color = '#ff1a1a';
    dot.style.fontSize = '24px';
    document.getElementById('container').appendChild(dot);
    
    setTimeout(() => { dot.remove(); }, duration);

    // Audio beep
    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(1000, audioCtx.currentTime);
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + duration/1000);
}

// Sequence definition: true = beep, false = pause
const sequence = [true, true, false, true, false, true];

function playSequence() {
    let timeOffset = 0;
    sequence.forEach(item => {
        setTimeout(() => {
            if(item) playBeep(300);
        }, timeOffset);
        timeOffset += 300 + 100; // beep duration + gap
    });
}

// Event listeners
playBtn.addEventListener('click', playSequence);

submitBtn.addEventListener('click', () => {
    if(answerInput.value.trim() === correctAnswer){
        feedback.textContent = "✅ Correct!";
        feedback.style.color = "#00ff00";
    } else {
        feedback.textContent = "⚠ Incorrect! Listen and try again.";
        feedback.style.color = "#ff3333";
    }
});
