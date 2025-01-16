import noble from "@abandonware/noble";

const HEART_RATE_SERVICE_UUID = "180d";
const HEART_RATE_MEASUREMENT_UUID = "2a37";

let currentHeartRate = 0;

noble.on("stateChange", (state) => {
  if (state === "poweredOn") {
    noble.startScanning([HEART_RATE_SERVICE_UUID], false);
    console.log("Scanning gestart...");
  } else {
    noble.stopScanning();
  }
});

noble.on("discover", (peripheral) => {
  console.log(`Gevonden apparaat: ${peripheral.advertisement.localName}`);
  noble.stopScanning();

  peripheral.connect((error) => {
    if (error) {
      console.error("Fout bij verbinden:", error);
      return;
    }
    console.log("Verbonden met apparaat");

    peripheral.discoverServices([HEART_RATE_SERVICE_UUID], (err, services) => {
      if (err) {
        console.error("Service ontdekking mislukt:", err);
        return;
      }

      const heartRateService = services[0];
      heartRateService.discoverCharacteristics([HEART_RATE_MEASUREMENT_UUID], (err, characteristics) => {
        const heartRateCharacteristic = characteristics[0];
        heartRateCharacteristic.on("data", (data) => {
          currentHeartRate = data.readUInt8(1); // Lees hartslag
          console.log(`Hartslag: ${currentHeartRate} bpm`);
        });

        heartRateCharacteristic.subscribe((err) => {
          if (err) {
            console.error("Fout bij notificaties:", err);
          } else {
            console.log("Notificaties gestart");
          }
        });
      });
    });
  });

  peripheral.on("disconnect", () => {
    console.log("Apparaat losgekoppeld");
    noble.startScanning([HEART_RATE_SERVICE_UUID], false);
  });
});

export const getCurrentHeartRate= () => {
  return currentHeartRate;
}
