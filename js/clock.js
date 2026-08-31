/**
 * CLOCK.JS - Islamic Analog Clock & Digital Precision Time Loop
 */

function createClockTicks() {
    const ticksGroup = document.getElementById('ticksGroup');
    if (!ticksGroup) return;
    ticksGroup.innerHTML = '';
    for (let i = 0; i < 60; i++) {
        if (i % 15 === 0) continue;
        const tick = document.createElement('div');
        tick.className = `tick ${i % 5 === 0 ? 'major' : ''}`;
        tick.style.transform = `translateX(-50%) rotate(${i * 6}deg)`;
        ticksGroup.appendChild(tick);
    }
    updateNumeralDisplay();
}

function updateNumeralDisplay() {
    const marker12 = document.getElementById('marker12');
    const marker3 = document.getElementById('marker3');
    const marker6 = document.getElementById('marker6');
    const marker9 = document.getElementById('marker9');
    const numeralLabel = document.getElementById('numeralLabel');
    const toggleArabicNumBtn = document.getElementById('toggleArabicNumBtn');
    const sidebarNumeralLabel = document.getElementById('sidebarNumeralLabel');

    if (!marker12) return;
    if (state.isArabicNumerals) {
        marker12.textContent = '١٢';
        marker3.textContent = '٣';
        marker6.textContent = '٦';
        marker9.textContent = '٩';
        marker12.classList.add('arabic-num');
        marker3.classList.add('arabic-num');
        marker6.classList.add('arabic-num');
        marker9.classList.add('arabic-num');
        if (numeralLabel) numeralLabel.textContent = 'Arab';
        if (toggleArabicNumBtn) toggleArabicNumBtn.classList.add('active');
        if (sidebarNumeralLabel) sidebarNumeralLabel.textContent = 'Angka Arab (١, ٢, ٣)';
    } else {
        marker12.textContent = '12';
        marker3.textContent = '3';
        marker6.textContent = '6';
        marker9.textContent = '9';
        marker12.classList.remove('arabic-num');
        marker3.classList.remove('arabic-num');
        marker6.classList.remove('arabic-num');
        marker9.classList.remove('arabic-num');
        if (numeralLabel) numeralLabel.textContent = 'Latin';
        if (toggleArabicNumBtn) toggleArabicNumBtn.classList.remove('active');
        if (sidebarNumeralLabel) sidebarNumeralLabel.textContent = 'Angka Latin (1, 2, 3)';
    }
}

function updateGreeting(hours) {
    const greetingText = document.getElementById('greetingText');
    const greetingSub = document.getElementById('greetingSub');
    const greetingIcon = document.getElementById('greetingIcon');

    let greeting = '';
    let sub = "Assalamu'alaikum";
    let iconClass = 'fa-solid fa-moon';

    if (hours >= 4 && hours < 11) {
        greeting = 'Selamat Pagi';
        sub = 'Semangat Menjemput Berkah';
        iconClass = 'fa-solid fa-sun';
    } else if (hours >= 11 && hours < 15) {
        greeting = 'Selamat Siang';
        sub = 'Waktu Istirahat & Sholat Dzuhur';
        iconClass = 'fa-solid fa-cloud-sun';
    } else if (hours >= 15 && hours < 18) {
        greeting = 'Selamat Sore';
        sub = 'Menjelang Petang & Maghrib';
        iconClass = 'fa-solid fa-cloud-sun-rain';
    } else {
        greeting = 'Selamat Malam';
        sub = 'Waktu Istirahat & Qiyamul Lail';
        iconClass = 'fa-solid fa-moon';
    }

    if (greetingText && greetingText.textContent !== greeting) {
        greetingText.textContent = greeting;
        greetingSub.textContent = sub;
        greetingIcon.className = `${iconClass} greeting-icon`;
    }
}

let lastDateKey = '';
function updateDateDisplay(now) {
    const dateKey = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
    if (dateKey === lastDateKey) return;
    lastDateKey = dateKey;

    const liveDayName = document.getElementById('liveDayName');
    const liveFullDate = document.getElementById('liveFullDate');
    const metaTimezone = document.getElementById('metaTimezone');
    const metaDayOfYear = document.getElementById('metaDayOfYear');

    const dayName = indonesianDays[now.getDay()];
    const dateNum = now.getDate();
    const monthName = indonesianMonths[now.getMonth()];
    const yearNum = now.getFullYear();

    if (liveDayName) liveDayName.textContent = dayName;
    if (liveFullDate) liveFullDate.textContent = `${dateNum} ${monthName} ${yearNum} M`;

    const isLeap = (yearNum % 4 === 0 && yearNum % 100 !== 0) || (yearNum % 400 === 0);
    const totalDays = isLeap ? 366 : 365;
    const dayOfYear = getDayOfYear(now);

    if (metaTimezone) metaTimezone.textContent = `Zona Waktu: ${getTimezoneAbbreviation()}`;
    if (metaDayOfYear) metaDayOfYear.textContent = `Hari ke-${String(dayOfYear).padStart(3, '0')} / ${totalDays}`;

    displayDailyMotivationalVerse(now);
    calculateIslamicEventsCountdown(now);
}

let lastSecond = -1;

function updateClock() {
    const now = new Date();
    const ms = now.getMilliseconds();
    const rawSeconds = now.getSeconds();
    const rawMinutes = now.getMinutes();
    const rawHours = now.getHours();

    const secondHand = document.getElementById('secondHand');
    const minuteHand = document.getElementById('minuteHand');
    const hourHand = document.getElementById('hourHand');
    const secondProgress = document.getElementById('secondProgress');
    const digitHours = document.getElementById('digitHours');
    const digitMinutes = document.getElementById('digitMinutes');
    const digitSeconds = document.getElementById('digitSeconds');
    const periodBadge = document.getElementById('periodBadge');

    let secondsAngle, minutesAngle, hoursAngle;

    if (state.isSmooth) {
        const exactSecond = rawSeconds + ms / 1000;
        const exactMinute = rawMinutes + exactSecond / 60;
        const exactHour = (rawHours % 12) + exactMinute / 60;

        secondsAngle = exactSecond * 6;
        minutesAngle = exactMinute * 6;
        hoursAngle = exactHour * 30;
    } else {
        secondsAngle = rawSeconds * 6;
        minutesAngle = (rawMinutes + rawSeconds / 60) * 6;
        hoursAngle = ((rawHours % 12) + rawMinutes / 60) * 30;
    }

    if (secondHand) secondHand.style.transform = `translateX(-50%) rotate(${secondsAngle}deg)`;
    if (minuteHand) minuteHand.style.transform = `translateX(-50%) rotate(${minutesAngle}deg)`;
    if (hourHand) hourHand.style.transform = `translateX(-50%) rotate(${hoursAngle}deg)`;

    if (secondProgress) {
        const progressPercent = ((rawSeconds + (state.isSmooth ? ms / 1000 : 0)) / 60) * 100;
        secondProgress.style.width = `${progressPercent.toFixed(2)}%`;
    }

    if (rawSeconds !== lastSecond) {
        lastSecond = rawSeconds;

        let displayHours = rawHours;
        let period = '24H';

        if (!state.is24Hour) {
            period = displayHours >= 12 ? 'PM' : 'AM';
            displayHours = displayHours % 12 || 12;
        }

        let formattedH = String(displayHours).padStart(2, '0');
        let formattedM = String(rawMinutes).padStart(2, '0');
        let formattedS = String(rawSeconds).padStart(2, '0');

        if (state.isArabicNumerals) {
            formattedH = toArabicDigits(formattedH);
            formattedM = toArabicDigits(formattedM);
            formattedS = toArabicDigits(formattedS);
        }

        if (digitHours) digitHours.textContent = formattedH;
        if (digitMinutes) digitMinutes.textContent = formattedM;
        if (digitSeconds) digitSeconds.textContent = formattedS;
        if (periodBadge) periodBadge.textContent = period;

        updateGreeting(rawHours);
        updateDateDisplay(now);
        updateNextPrayer();
    }

    requestAnimationFrame(updateClock);
}

