let count = parseInt(localStorage.getItem('userClicks')) || 0;
const btn = document.getElementById('clickBtn');
const counterDisplay = document.getElementById('counter');
const rankDisplay = document.getElementById('rank');
const nextGoalDisplay = document.getElementById('nextGoal');
const progressBar = document.getElementById('progressBar');
const giftMsg = document.getElementById('giftMessage');
const giftBox = document.getElementById('giftBox');

// Масив подарунків
const milestones = [
    { goal: 50, msg: "Bronze Style Unlocked!", class: "bronze", rank: "Active Clicker" },
    { goal: 100, msg: "Silver Skin Active!", class: "silver", rank: "Stronger" },
    { goal: 200, msg: "Gold Power!", class: "gold", rank: "Pro Master" },
    { goal: 300, msg: "Crystal Shine!", class: "silver", rank: "Elite" },
    { goal: 500, msg: "Diamond Touch!", class: "gold", rank: "Unstoppable" },
    { goal: 1000, msg: "Legendary Status!", class: "gold", rank: "The Legend" },
    { goal: 5000, msg: "GOD MODE ACTIVATED!", class: "ultra", rank: "Click God" }
];

function updateUI() {
    counterDisplay.innerText = count;
    
    // Знаходимо наступну ціль
    let next = milestones.find(m => count < m.goal) || { goal: 5000, msg: "Max Rank!" };
    nextGoalDisplay.innerText = next.goal;
    
    // Прогрес до наступної цілі
    let prevGoal = 0;
    let currentMilestone = [...milestones].reverse().find(m => count >= m.goal);
    
    if (currentMilestone) {
        btn.className = "main-circle " + currentMilestone.class;
        rankDisplay.innerText = currentMilestone.rank;
        giftMsg.innerText = currentMilestone.msg;
        giftBox.classList.add('active');
    }

    let progress = (count / next.goal) * 100;
    progressBar.style.width = progress + "%";
}

// КЛІК - тільки вручну!
btn.addEventListener('click', () => {
    count++;
    localStorage.setItem('userClicks', count);
    updateUI();
});

// ПОВНЕ СКИНУТТЯ ДО 0
document.getElementById('reset-game').addEventListener('click', () => {
    if(confirm("Everything will be deleted. Are you sure?")) {
        count = 0;
        localStorage.setItem('userClicks', 0);
        btn.className = "main-circle";
        rankDisplay.innerText = "Beginner";
        giftMsg.innerText = "Keep clicking!";
        giftBox.classList.remove('active');
        updateUI();
    }
});

// Тема
document.getElementById('theme-toggle').onclick = () => {
    document.body.classList.toggle('light-theme');
};

updateUI();
