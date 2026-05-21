// 车载ECU固件版本数据（模拟）
const firmwareDB = [
  { ecu: "VCU-100", version: "v2.3.1", status: "production",  releaseDate: "2026-04-15", checksum: "a1b2c3d4" },
  { ecu: "BMS-200", version: "v1.8.0", status: "testing",     releaseDate: "2026-05-01", checksum: "e5f6g7h8" },
  { ecu: "MCU-300", version: "v3.0.2", status: "development", releaseDate: "2026-05-10", checksum: "i9j0k1l2" },
  { ecu: "TCU-400", version: "v0.9.5", status: "development", releaseDate: "2026-05-18", checksum: "m3n4o5p6" },
];

function getFirmware(ecuModel) {
  return firmwareDB.find(f => f.ecu === ecuModel) || null;
}

function listFirmware() {
  return firmwareDB.map(({ ecu, version, status }) => ({ ecu, version, status }));
}

function getOTAStatus(ecuModel) {
  const fw = getFirmware(ecuModel);
  if (!fw) return { error: "unknown ECU model" };
  return {
    ecu: fw.ecu,
    currentVersion: fw.version,
    otaEligible: fw.status === "production",
    nextUpdate: fw.status === "production" ? null : "pending validation",
  };
}

module.exports = { getFirmware, listFirmware, getOTAStatus };
