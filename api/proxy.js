exports.handler = async (event) => {
  const API_URL = "https://stg-k-api.indodana.com/chermes/dev-tool/v1/merchant/generate-merchant-token"; // URL target

  // Handle OPTIONS request untuk CORS
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
      body: "",
    };
  }

  try {
    const response = await fetch(`${API_URL}${event.path.replace('/.netlify/functions/proxy', '')}`, {
      method: event.httpMethod,
      headers: {
        "Content-Type": "application/json",
        "Authorization": event.headers.authorization || "",
      },
      body: event.body,
    });

    const data = await response.json();

    return {
      statusCode: response.status,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Proxy error" }),
    };
  }
};
