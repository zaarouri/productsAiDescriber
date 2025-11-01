const professor = document.getElementById('professor');
const speechBubble = document.getElementById('speechBubble');
const speechText = document.getElementById('speechText');
const chatgptLogo = document.getElementById('chatgptLogo');
const storyText = document.getElementById('storyText');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const students = document.querySelectorAll('.student');

const angryQuotes = [
    "Did you REALLY think I wouldn't notice?!",
    "Every single answer is IDENTICAL!",
    "This is ACADEMIC DISHONESTY!",
    "ChatGPT is NOT your co-author!",
    "I've been teaching for 20 YEARS!",
    "You're all getting ZEROS!",
    "I can spot AI writing from a MILE away!",
    "This is UNACCEPTABLE!"
];

let currentScene = 0;
let animationTimeout;

const scenes = [
    {
        story: "The professor begins grading exams...",
        action: () => {
            professor.classList.remove('angry', 'shaking');
            speechBubble.classList.remove('show');
            chatgptLogo.classList.remove('show', 'banned');
            students.forEach(s => s.classList.remove('show', 'scared'));
        }
    },
    {
        story: "Something seems suspicious about these answers...",
        action: () => {
            chatgptLogo.classList.add('show');
        }
    },
    {
        story: "Wait a minute... These answers are TOO perfect!",
        action: () => {
            professor.classList.add('angry');
            speechText.textContent = angryQuotes[0];
            speechBubble.classList.add('show');
        }
    },
    {
        story: "The professor realizes ALL students used ChatGPT!",
        action: () => {
            professor.classList.add('shaking');
            speechText.textContent = angryQuotes[1];
            students.forEach((student, index) => {
                setTimeout(() => {
                    student.classList.add('show');
                }, index * 200);
            });
        }
    },
    {
        story: "The students realize they've been caught...",
        action: () => {
            speechText.textContent = angryQuotes[2];
            students.forEach(student => {
                student.classList.add('scared');
            });
        }
    },
    {
        story: "The professor's fury reaches its peak!",
        action: () => {
            speechText.textContent = angryQuotes[3];
            cycleAngryQuotes();
        }
    },
    {
        story: "ChatGPT is BANNED from this classroom!",
        action: () => {
            speechText.textContent = angryQuotes[5];
            chatgptLogo.classList.add('banned');
            setTimeout(() => {
                chatgptLogo.classList.remove('show');
            }, 500);
        }
    },
    {
        story: "Lesson learned: Academic integrity matters! 📚",
        action: () => {
            speechText.textContent = angryQuotes[7];
        }
    }
];

let quoteInterval;

function cycleAngryQuotes() {
    let quoteIndex = 3;
    quoteInterval = setInterval(() => {
        quoteIndex = (quoteIndex + 1) % angryQuotes.length;
        speechText.textContent = angryQuotes[quoteIndex];
    }, 2000);
}

function playScene(sceneIndex) {
    if (sceneIndex >= scenes.length) {
        currentScene = scenes.length - 1;
        return;
    }

    currentScene = sceneIndex;
    const scene = scenes[sceneIndex];
    
    storyText.textContent = scene.story;
    scene.action();

    if (sceneIndex < scenes.length - 1) {
        animationTimeout = setTimeout(() => {
            playScene(sceneIndex + 1);
        }, 3000);
    }
}

function startAnimation() {
    clearTimeout(animationTimeout);
    clearInterval(quoteInterval);
    currentScene = 0;
    playScene(0);
    startBtn.disabled = true;
    
    setTimeout(() => {
        startBtn.disabled = false;
    }, scenes.length * 3000);
}

function resetAnimation() {
    clearTimeout(animationTimeout);
    clearInterval(quoteInterval);
    
    professor.classList.remove('angry', 'shaking');
    speechBubble.classList.remove('show');
    chatgptLogo.classList.remove('show', 'banned');
    students.forEach(s => {
        s.classList.remove('show', 'scared');
    });
    
    storyText.textContent = 'Click "Start Scene" to witness the professor\'s reaction...';
    currentScene = 0;
    startBtn.disabled = false;
}

startBtn.addEventListener('click', startAnimation);
resetBtn.addEventListener('click', resetAnimation);

document.addEventListener('DOMContentLoaded', () => {
    const professorHead = document.querySelector('.professor-head');
    
    document.addEventListener('mousemove', (e) => {
        if (!professor.classList.contains('angry')) {
            const pupils = document.querySelectorAll('.pupil');
            const rect = professorHead.getBoundingClientRect();
            const headCenterX = rect.left + rect.width / 2;
            const headCenterY = rect.top + rect.height / 2;
            
            const angle = Math.atan2(e.clientY - headCenterY, e.clientX - headCenterX);
            const distance = Math.min(3, Math.hypot(e.clientX - headCenterX, e.clientY - headCenterY) / 100);
            
            const moveX = Math.cos(angle) * distance;
            const moveY = Math.sin(angle) * distance;
            
            pupils.forEach(pupil => {
                pupil.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
            });
        }
    });
});
