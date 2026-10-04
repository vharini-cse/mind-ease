/* =========================================
   MIND EASE - JAVASCRIPT
   ========================================= */

/* ---------- MOOD SELECTION ---------- */

const moodButtons = document.querySelectorAll(".mood-btn");
const moodMessage = document.getElementById("mood-message");

const moodResponses = {
    happy: "That's wonderful. Take a moment to appreciate what is making you feel good today.",
    calm: "Beautiful. Give yourself permission to enjoy this peaceful moment.",
    neutral: "It's okay to simply be where you are. You don't need to feel a certain way.",
    sad: "Be gentle with yourself today. Difficult emotions deserve patience, not judgment.",
    stressed: "Take a slow breath. You don't have to solve everything at once."
};

moodButtons.forEach(button => {

    button.addEventListener("click", () => {

        moodButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const mood = button.dataset.mood;

        if (moodMessage && moodResponses[mood]) {
            moodMessage.textContent = moodResponses[mood];
        }

    });

});


/* ---------- BREATHING EXERCISE ---------- */

const breathingCircle =
    document.querySelector(".breathing-circle");

const breathingText =
    document.querySelector(".breathing-text");

const breathingTimer =
    document.querySelector(".breathing-timer");

const breathingButton =
    document.getElementById("breathing-start");

let breathingRunning = false;
let breathingTimeout;

function startBreathing() {

    if (breathingRunning) {
        stopBreathing();
        return;
    }

    breathingRunning = true;

    if (breathingButton) {
        breathingButton.textContent = "Stop Exercise";
    }

    runBreathingCycle();
}

function stopBreathing() {

    breathingRunning = false;

    clearTimeout(breathingTimeout);

    if (breathingCircle) {
        breathingCircle.classList.remove(
            "inhale",
            "exhale"
        );
    }

    if (breathingText) {
        breathingText.textContent = "Ready";
    }

    if (breathingTimer) {
        breathingTimer.textContent = "Take a moment";
    }

    if (breathingButton) {
        breathingButton.textContent = "Start Breathing";
    }
}

function runBreathingCycle() {

    if (!breathingRunning) {
        return;
    }

    /* INHALE - 4 seconds */

    breathingCircle.classList.remove("exhale");
    breathingCircle.classList.add("inhale");

    breathingText.textContent = "Breathe In";

    countdown(4, () => {

        if (!breathingRunning) return;

        /* EXHALE - 6 seconds */

        breathingCircle.classList.remove("inhale");
        breathingCircle.classList.add("exhale");

        breathingText.textContent = "Breathe Out";

        countdown(6, () => {

            if (!breathingRunning) return;

            runBreathingCycle();

        });

    });
}

function countdown(seconds, callback) {

    let remaining = seconds;

    if (breathingTimer) {
        breathingTimer.textContent =
            `${remaining} seconds`;
    }

    const interval = setInterval(() => {

        remaining--;

        if (breathingTimer) {
            breathingTimer.textContent =
                `${remaining} seconds`;
        }

        if (remaining <= 0) {

            clearInterval(interval);

            callback();

        }

    }, 1000);
}

if (breathingButton) {

    breathingButton.addEventListener(
        "click",
        startBreathing
    );

}


/* ---------- DAILY AFFIRMATIONS ---------- */

const affirmations = [

    "I am allowed to slow down and take care of myself.",

    "I don't need to have everything figured out today.",

    "I choose to focus on what I can control.",

    "I am making progress, even when it feels slow.",

    "I deserve moments of peace and rest.",

    "I can take things one step at a time.",

    "Today, I choose patience with myself."

];

const affirmationText =
    document.getElementById("affirmation-text");

const newAffirmationButton =
    document.getElementById("new-affirmation");

if (newAffirmationButton) {

    newAffirmationButton.addEventListener(
        "click",
        () => {

            const randomIndex =
                Math.floor(
                    Math.random() *
                    affirmations.length
                );

            if (affirmationText) {

                affirmationText.style.opacity = "0";

                setTimeout(() => {

                    affirmationText.textContent =
                        `"${affirmations[randomIndex]}"`;

                    affirmationText.style.opacity = "1";

                }, 250);

            }

        }
    );

}


/* ---------- JOURNAL ---------- */

const journalInput =
    document.getElementById("journal-entry");

const saveJournalButton =
    document.getElementById("save-journal");

const journalStatus =
    document.getElementById("journal-status");

if (saveJournalButton) {

    saveJournalButton.addEventListener(
        "click",
        () => {

            const entry =
                journalInput.value.trim();

            if (entry === "") {

                journalStatus.textContent =
                    "Write something before saving your reflection.";

                return;
            }

            localStorage.setItem(
                "mindEaseJournal",
                entry
            );

            journalStatus.textContent =
                "Your reflection has been saved on this device 🌿";

            journalInput.value = "";

        }
    );

}


/* ---------- LOAD SAVED JOURNAL ---------- */

window.addEventListener("DOMContentLoaded", () => {

    const savedEntry =
        localStorage.getItem(
            "mindEaseJournal"
        );

    if (savedEntry && journalStatus) {

        journalStatus.textContent =
            "You have a previous reflection saved on this device.";

    }

});


/* ---------- SMOOTH SCROLL ---------- */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(link => {

    link.addEventListener(
        "click",
        function (event) {

            const target =
                document.querySelector(
                    this.getAttribute("href")
                );

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }
    );

});


/* ---------- SCROLL REVEAL ---------- */

const revealElements =
    document.querySelectorAll(
        ".feature-card, .affirmation, .journal-box"
    );

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform =
                        "translateY(0)";

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );

revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(25px)";

    element.style.transition =
        "opacity 0.6s ease, transform 0.6s ease";

    observer.observe(element);

});