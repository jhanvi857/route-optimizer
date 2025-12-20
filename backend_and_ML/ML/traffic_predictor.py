from joblib import load
import datetime

model = load("ML/models/traffic_lr.pkl")

def get_traffic_multiplier(
    car=30, bike=5, bus=3, truck=2
):
    now = datetime.datetime.now()
    features = [[
        now.hour,
        now.weekday(),
        car,
        bike,
        bus,
        truck
    ]]

    predicted_total = model.predict(features)[0]
    multiplier = 1 + min(predicted_total / 200, 2)

    return multiplier
