export async function getViewCounts() {
  const response = await fetch("/api/viewCounts");
  const data = await response.json();
  return data;
}

export default getViewCounts;
