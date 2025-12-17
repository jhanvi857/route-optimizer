class PriorityQueue {
    constructor() {
        this.queue = [];
    }
    enqueue(node,dist) {
        this.queue.push({node,dist});
        this.queue.sort((a,b)=>a.dist-b.dist);
    }
    dequeue() {
        return this.queue.shift();
    }
    isEmpty() {
        return this.queue.length===0;
    }
}
function dijkstra(graph, start) {
    const dist = {};
    const prev = {};
    const pq = new PriorityQueue();

    for (let node in graph) {
        dist[node] = Infinity;
        prev[node] = null;
    }

    dist[start] = 0;
    pq.enqueue(start, 0);

    while (!pq.isEmpty()) {
        const { node: u, dist: currDist } = pq.dequeue();

        if (currDist > dist[u]) continue;

        for (let neighbor of graph[u] || []) {
            const v = neighbor.node;
            const weight = neighbor.weight; // traffic-adjusted

            const alt = currDist + weight;
            if (alt < dist[v]) {
                dist[v] = alt;
                prev[v] = u;
                pq.enqueue(v, alt);
            }
        }
    }

    return { dist, prev };
}
module.exports = dijkstra;