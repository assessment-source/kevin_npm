const API_BASE = process.env.REACT_APP_API_URL || "";

async function readJson(path) {
  const response = await fetch(`${API_BASE}${path}`);
  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error("RentSphere API is unavailable");
  }
  return response.json();
}

export async function fetchProperties() {
  const body = await readJson("/api/properties");
  return body.data;
}

export async function fetchProperty(id) {
  const body = await readJson(`/api/properties/${id}`);
  return body ? body.data : null;
}
