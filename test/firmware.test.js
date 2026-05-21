const { describe, it } = require("node:test");
const assert = require("node:assert");
const { getFirmware, listFirmware, getOTAStatus } = require("../src/firmware");

describe("firmware module", () => {
  it("listFirmware returns all ECUs", () => {
    const result = listFirmware();
    assert.equal(result.length, 4);
    assert.ok(result.every(f => f.ecu && f.version && f.status));
  });

  it("getFirmware returns correct ECU", () => {
    const fw = getFirmware("VCU-100");
    assert.equal(fw.version, "v2.3.1");
    assert.equal(fw.status, "production");
  });

  it("getFirmware returns null for unknown ECU", () => {
    assert.equal(getFirmware("UNKNOWN-999"), null);
  });

  it("getOTAStatus returns otaEligible for production firmware", () => {
    const status = getOTAStatus("VCU-100");
    assert.equal(status.otaEligible, true);
  });

  it("getOTAStatus blocks development firmware", () => {
    const status = getOTAStatus("MCU-300");
    assert.equal(status.otaEligible, false);
    assert.equal(status.nextUpdate, "pending validation");
  });
});
