let countdownInterval;

function startCountdown() {
    clearInterval(countdownInterval);

    const input = document.getElementById("datetime").value;
    const targetDate = new Date(input);

    if (isNaN(targetDate.getTime())) {
        alert("Please enter a valid date and time.");
        return;
    }

    document.getElementById("message").innerText = "";
    localStorage.setItem("targetDate", targetDate); // Save target date to localStorage

    alert("Countdown started!"); // Alert for starting countdown
    runCountdown(targetDate);
}

function runCountdown(targetDate) {
    countdownInterval = setInterval(() => {
        const now = new Date();
        const difference = targetDate - now;

        if (difference <= 0) {
            clearInterval(countdownInterval);
            alert("Event has started!"); // Alert when event starts
            document.getElementById("message").innerText = "Event has started!";
            localStorage.removeItem("targetDate"); // Remove target date from localStorage
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        document.getElementById("days").innerText = days;
        document.getElementById("hours").innerText = hours;
        document.getElementById("minutes").innerText = minutes;
        document.getElementById("seconds").innerText = seconds;
    }, 1000);
}

function stopCountdown() {
    clearInterval(countdownInterval); // Stop the countdown
    localStorage.removeItem("targetDate"); // Remove the saved target date
    document.getElementById("days").innerText = "0";
    document.getElementById("hours").innerText = "0";
    document.getElementById("minutes").innerText = "0";
    document.getElementById("seconds").innerText = "0";
    document.getElementById("message").innerText = "Countdown stopped.";
    
    alert("Countdown stopped!"); // Alert for stopping countdown
}

// Check if there's a saved target date in localStorage
window.onload = function() {
    const savedDate = localStorage.getItem("targetDate");
    if (savedDate) {
        const targetDate = new Date(savedDate);
        alert("Resuming countdown from last saved time."); // Alert for resuming countdown
        runCountdown(targetDate);
    }
};
