export function graphBuilder (coords) {
    const graph = {};
    for(let i=0;i<coords.length-1;i++) {
        const from = coords[i];
        const to = coords[i + 1];
        const distance = haversine(from,to);

        const fromKey = from.join(",");
        const toKey = to.join(",");

        if (!graph[fromKey]) graph[fromKey] = [];
        if (!graph[toKey]) graph[toKey] = [];

        graph[fromKey].push({ node: toKey, weight: distance });
        // graph[toKey].push({ node: fromKey, weight: distance });
    }
    return graph;
}

function haversine([lon1, lat1], [lon2, lat2]) {
  const toRad = (d) => d * Math.PI / 180;
  const R = 6371; // Earth radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}