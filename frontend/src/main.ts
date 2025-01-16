import "./style.css";
import { fetchHeartRate } from "./_utils/FetchFunction";

setInterval(fetchHeartRate, 1000);