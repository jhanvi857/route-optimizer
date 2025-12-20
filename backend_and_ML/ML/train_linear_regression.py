import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from joblib import dump
df = pd.read_csv("data/traffic.csv")

# Time : hr
df["hour"] = pd.to_datetime(
    df["Time"], format="%I:%M:%S %p"
).dt.hour

# Day : numeric
day_map = {
    "Monday": 0, "Tuesday": 1, "Wednesday": 2,
    "Thursday": 3, "Friday": 4, "Saturday": 5, "Sunday": 6
}
df["day"] = df["Day of the week"].map(day_map)

X = df[["hour", "day", "CarCount", "BikeCount", "BusCount", "TruckCount"]]
y = df["Total"]

X_train, _, y_train, _ = train_test_split(
    X, y, test_size=0.2, random_state=42
)
model = LinearRegression()
model.fit(X_train, y_train)

dump(model, "models/traffic_lr.pkl")

print("Traffic Linear Regression model trained successfully")
