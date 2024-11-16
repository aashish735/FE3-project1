const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const startTimerBtn = document.getElementById('startTimerBtn');
const activeTimersContainer = document.querySelector('.active-timers');

let timers = [];

startTimerBtn.addEventListener('click', () => {
    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;

    if (hours + minutes + seconds > 0) {
        const timerId = Date.now();
        const timerElement = document.createElement('div');
        timerElement.classList.add('timer');
        timerElement.innerHTML = `
            <p>Timer ${timers.length + 1}</p>
            <p id="timer-${timerId}">${hours}:${minutes}:${seconds}</p>
            <button class="stop-timer" data-timer-id="${timerId}">Stop Timer</button>
        `;
        activeTimersContainer.appendChild(timerElement);

        const timerInterval = setInterval(() => {
            const timerElement = document.getElementById(`timer-${timerId}`);
            const timeParts = timerElement.textContent.split(':');
            let hours = parseInt(timeParts[0]);
            let minutes = parseInt(timeParts[1]);
            let seconds = parseInt(timeParts[2]);

            if (seconds === 0) {
                if (minutes === 0) {
                    if (hours === 0) {
                        clearInterval(timerInterval);
                        timerElement.parentElement.classList.add('ended');
                        return;
                    } else {
                        hours--;
                        minutes = 59;
                    }
                } else {
                    minutes--;
                    seconds = 59;
                }
            } else {
                seconds--;
            }

            timerElement.textContent = `${hours}:${minutes}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);

        timers.push({ id: timerId, interval: timerInterval });

        hoursInput.value = '';
        minutesInput.value = '';
        secondsInput.value = '';
    }
});

activeTimersContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('stop-timer')) {
        const timerId = event.target.dataset.timerId;
        const timerIndex = timers.findIndex(timer => timer.id === timerId);
        if (timerIndex !== -1) {
            clearInterval(timers[timerIndex].interval);
            timers.splice(timerIndex, 1);
            event.target.parentElement.remove();
        }
    }
});