import heapq

def dijkstra(graph, start):
    dist = {node: float("inf") for node in graph}
    prev = {node: None for node in graph}
    dist[start] = 0

    pq = [(0, start)]

    while pq:
        curr_dist, u = heapq.heappop(pq)
        if curr_dist > dist[u]:
            continue

        for neighbor in graph[u]:
            v = neighbor["node"]
            weight = neighbor["weight"]
            alt = curr_dist + weight

            if alt < dist[v]:
                dist[v] = alt
                prev[v] = u
                heapq.heappush(pq, (alt, v))

    return dist, prev
