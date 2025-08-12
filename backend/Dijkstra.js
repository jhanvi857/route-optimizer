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
    const pq = new PriorityQueue();

    for (let node in graph) {
        dist[node] = Infinity;
    }

    dist[start] = 0;
    pq.enqueue(start, 0);

    while (!pq.isEmpty()) {
        const { node: u, dist: currDist } = pq.dequeue();

        if (!graph[u]) continue;  

        for (let neighbor of graph[u]) {
            const v = neighbor.node;
            const weight = neighbor.weight;

            if (currDist + weight < dist[v]) {
                dist[v] = currDist + weight;
                pq.enqueue(v, dist[v]);
            }
        }
    }

    return dist;
}
module.exports = dijkstra;