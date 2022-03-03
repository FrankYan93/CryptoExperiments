import got from 'got';

const mainnetUrl = "https://api.harmony.one/"; // JSON-RPC API server
const id = "0x25a6a494d1019d7c1db2f58b3ab46775919d81f4"; // your one address
const data = {
  "id": "1",
  "jsonrpc": "2.0",
  "method": "hmyv2_getBalance",
  "params": [
    id
  ]
};

async function handler() {
  const result = await got.post(mainnetUrl, {
		headers: {
			"Content-Type": "application/json"
		},
    body: JSON.stringify(data)
	});
  console.log(result.body);
  const oneBalance = JSON.parse(result.body).result / 1e18;
  console.log(oneBalance);
}

handler();
