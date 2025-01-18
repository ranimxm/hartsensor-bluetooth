import { describe, it, expect, vi } from "vitest";
import { fetchHeartRateData, updateHeartRateInDOM } from "../_utils/FetchFunction";

describe("fetchHeartRateData", () => {
  it("roept fetch aan en retourneert de juiste data", async () => {
    vi.stubGlobal("fetch",
      vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve({ hartslag: 80 }),
        })
      )
    );

    const data = await fetchHeartRateData();
    expect(fetch).toHaveBeenCalledWith("http://localhost:8080/hartslag");
    expect(data).toEqual({ hartslag: 80 });
  });
});

describe("updateHeartRateInDOM", () => {
  it("update een bestaand element met de hartslag", () => {
    document.body.innerHTML = `<div data-hartslag></div>`;
    updateHeartRateInDOM(80);

    const el = document.querySelector("[data-hartslag]");
    expect(el?.textContent).toBe("Hartslag: 80 bpm");
  });

  it("voegt een nieuw element toe als er geen [data-hartslag] is", () => {
    document.body.innerHTML = "";
    updateHeartRateInDOM(80);

    const newEl = document.querySelector("[data-hartslag='hartslag']");
    expect(newEl).not.toBeNull();
    expect(newEl?.textContent).toBe("Hartslag: 80 bpm");
  });
});
