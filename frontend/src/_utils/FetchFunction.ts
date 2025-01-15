export const fetchHeartRate = async () => {
    try {
        const response = await fetch("http://localhost:8080/hartslag");
        const data = await response.json();

        const heartRateElement = document.querySelector("[data-hartslag]");
        if (heartRateElement) {
            heartRateElement.innerHTML = `Hartslag: ${data.hartslag} bpm`;
        } else {
            document.body.innerHTML += `
                <p data-hartslag="hartslag" >Hartslag: ${data.hartslag} bpm</p>
            `;
        }
    } catch (error) {
        console.error("Fout bij ophalen hartslag:", error);
    }
};