export default class Time {

    static minutesToSeconds(minutes) {
        return (minutes || 0) * 60;
    }

    static saveUnmountTimestamp() {
        localStorage.setItem("TIME_UNMOUNTED", new Date().getTime().toString());
    }

    static getUnmountTimestamp() {
        return Number(localStorage.getItem("TIME_UNMOUNTED"));
    }

    static savePomodoroGlobalTime(time) {
        localStorage.setItem("POMODORO", time);
    }

    static getPomodoroGlobalTime() {
        return Number(localStorage.getItem("POMODORO"));
    }

    static getPomodoroActualTime() {
        const unmountTime = Time.getUnmountTimestamp();
        const now = new Date().getTime();
        const diff = Math.ceil(Math.abs(unmountTime - now) / 1000);
        console.log(diff)
        return (Time.getPomodoroGlobalTime() - diff).toFixed(0);
    }

    static weekdays() {
        return {
            0: "Domingo",
            1: "Segunda-feira",
            2: "Terça-feira",
            3: "Quarta-feira",
            4: "Quinta-feira",
            5: "Sexta-feira",
            6: "Sábado"
        }
    }
}
