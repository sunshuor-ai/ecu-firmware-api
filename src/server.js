const http = require("http");
const { getFirmware, listFirmware, getOTAStatus } = require("./firmware");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  const url = new URL(req.url, "http://localhost");

  if (req.method === "GET" && url.pathname === "/api/firmware") {
    return res.end(JSON.stringify(listFirmware()));
  }

  if (req.method === "GET" && url.pathname === "/api/firmware/ota") {
    const ecu = url.searchParams.get("ecu");
    if (!ecu) {
      res.statusCode = 400;
      return res.end(JSON.stringify({ error: "missing ?ecu= parameter" }));
    }
    return res.end(JSON.stringify(getOTAStatus(ecu)));
  }

  if (req.method === "GET" && url.pathname === "/health") {
    return res.end(JSON.stringify({ status: "ok", uptime: process.uptime() }));
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ error: "not found" }));
});

server.listen(PORT, () => {
  console.log(`ECU Firmware API running on port ${PORT}`);
});
