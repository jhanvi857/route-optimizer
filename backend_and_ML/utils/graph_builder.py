import math
from ML.traffic_predictor import get_traffic_multiplier

def haversine(p1, p2):
    lon1, lat1 = p1
    lon2, lat2 = p2

    R = 6371
    to_rad = lambda d: d * math.pi / 180

    dlat = to_rad(lat2 - lat1)
    dlon = to_rad(lon2 - lon1)

    a = (
        math.sin(dlat / 2) ** 2 +
        math.cos(to_rad(lat1)) *
        math.cos(to_rad(lat2)) *
        math.sin(dlon / 2) ** 2
    )

    return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

def graph_builder(coords):
    graph = {}
    traffic_multiplier = get_traffic_multiplier()
    for i in range(len(coords) - 1):
        frm, to = coords[i], coords[i + 1]
        base_distance = haversine(frm, to)
        weight = base_distance * traffic_multiplier
        fk = ",".join(map(str, frm))
        tk = ",".join(map(str, to))
        graph.setdefault(fk, []).append({
            "node": tk,
            "weight": weight
        })
        graph.setdefault(tk, []).append({
            "node": fk,
            "weight": weight
        })
    return graph
