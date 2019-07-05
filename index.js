class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = document.querySelector(selector);
    this.targetDate = targetDate;
    this.refs = {
      daysValue: document.querySelector('[data-value="days"]'),
      hoursValue: document.querySelector('[data-value="hours"]'),
      minsValue: document.querySelector('[data-value="mins"]'),
      secsValue: document.querySelector('[data-value="secs"]'),
    };
  }
  start() {
    let currentDate = Date.now();
    this.math(currentDate);
    this.timer = setInterval(() => {
      {
        if (this.targetDate <= currentDate) {
          this.stop();
          return;
        }
      }
      currentDate = Date.now();
      this.math(currentDate);
    }, 1000);
  }

  math(date) {
    const time = this.targetDate - date;
    /*
     * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
     * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
     */
    const days = Math.floor(time / (1000 * 60 * 60 * 24));

    /*
     * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
     * остатка % и делим его на количество миллисекунд в одном часе
     * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
     */
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    /*
     * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
     * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
     */
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

    /*
     * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
     * миллисекунд в одной секунде (1000)
     */
    const secs = Math.floor((time % (1000 * 60)) / 1000);
    this.updateClockface(days, hours, mins, secs);
  }

  updateClockface(...args) {
    args.map((e, index) => {
      Object.values(this.refs)[index].textContent = this.pad(e);
    });
  }
  pad(value) {
    return String(value).padStart(2, "0");
  }
  stop() {
      clearInterval(this.timer);
  }
}

const timer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Jul 17, 2019"),
});

timer.start();
