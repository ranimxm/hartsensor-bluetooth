// Function to fetch the heart rate data from the backend
export const fetchHeartRateData = async () => {
    const response = await fetch("http://localhost:8080/hartslag");
    return response.json();
};

// Function to update the heart rate in the DOM
export const updateHeartRateInDOM = (hartslag: number) => {
    const heartRateElement = document.querySelector("[data-hartslag]");
    if (heartRateElement) {
        heartRateElement.innerHTML = `Hartslag: ${hartslag} bpm`;
    } else {
        document.body.innerHTML += `
            <p data-hartslag="hartslag">Hartslag: ${hartslag} bpm</p>
        `;
    }
};

// Function to fetch the heart rate and update the DOM
export const fetchHeartRate = async () => {
    try {
        const data = await fetchHeartRateData();
        updateHeartRateInDOM(data.hartslag);
    } catch (error) {
        console.error("Fout bij ophalen hartslag:", error);
    }
};
