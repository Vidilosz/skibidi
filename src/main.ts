import type { Weather } from "./class"

const days: Weather[] = [];

document.addEventListener("DOMContentLoaded", () => {
    getWeather();

    const form = document.getElementById("form") as HTMLFormElement;

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const temperature = Number(
            (document.getElementById("temperature") as HTMLInputElement).value
        );

        const date = new Date();

        const dayNames = [
            "Vasárnap",
            "Hétfő",
            "Kedd",
            "Szerda",
            "Csütörtök",
            "Péntek",
            "Szombat"
        ];

        days.push({
            day: dayNames[date.getDay()],
            temperature: temperature
        });

        megjelenites();

        form.reset();
    });

    const exportButton = document.getElementById("export") as HTMLButtonElement;

    exportButton.addEventListener("click", () => {
        const textarea = document.getElementById("exportText") as HTMLTextAreaElement;

        textarea.value = JSON.stringify(days, null, 2);
    });
});

async function getWeather() {
    const response = await fetch(
        "https://petrik-idojaras-default-rtdb.europe-west1.firebasedatabase.app/.json"
    );

    const data = await response.json() as Weather[];

    days.push(...data);

    megjelenites();
}

function megjelenites() {
    const tbody = document.getElementById("tbody") as HTMLTableSectionElement;

    tbody.innerHTML = "";

    days.forEach(element => {
        const row = document.createElement("tr");
        const day = document.createElement("td");
        const temp = document.createElement("td");

        day.textContent = element.day;
        temp.textContent = element.temperature.toString();

        if (element.temperature < 10) {
            row.style.backgroundColor = "lightblue";
        }

        if (element.temperature >= 30) {
            row.style.backgroundColor = "lightcoral";
        }

        row.appendChild(day);
        row.appendChild(temp);

        tbody.appendChild(row);
    });
}
