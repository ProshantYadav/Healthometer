import React from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function TrackerHistory({ logs }) {
  const todayString = new Date().toISOString().split("T")[0];
  const todaysLog = logs.find((log) => log.date === todayString) || {};
  const chartData = [...logs].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="recharts-custom-tooltip">
          <p className="tooltip-label">{label}</p>
          <p className="tooltip-value">
            {payload[0].value} {payload[0].name === "weight" ? "kg" : "kcal"}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="tracker-right">
      <div className="today-entries">
        <div className="today-card">
          <span className="today-label">Today's Weight</span>
          <span className="today-value-weight">
            {todaysLog.weight ? `${todaysLog.weight} kg` : "--"}
          </span>
        </div>
        <div className="today-card">
          <span className="today-label">Today's Calories</span>
          <span className="today-value-cal">
            {todaysLog.calories ? `${todaysLog.calories} kcal` : "--"}
          </span>
        </div>
      </div>

      {logs.length === 0 ? (
        <div className="tracker-empty graph-empty">
          <p>No data logged yet. Save metrics to generate your graphs!</p>
        </div>
      ) : (
        <>
          <div className="graph-container">
            <h4 className="graph-title-weight">Weight Trend</h4>
            <ResponsiveContainer width="100%" height="85%">
              <LineChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.05)"
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  stroke="rgba(255,255,255,0.2)"
                  tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }}
                />
                <YAxis
                  domain={["auto", "auto"]}
                  stroke="rgba(255,255,255,0.2)"
                  tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="weight"
                  name="weight"
                  stroke="var(--cream)"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "var(--cream)" }}
                  activeDot={{ r: 6, fill: "var(--turmeric)" }}
                  connectNulls
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="graph-container">
            <h4 className="graph-title-cal">Caloric Intake</h4>
            <ResponsiveContainer width="100%" height="85%">
              <AreaChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.05)"
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  stroke="rgba(255,255,255,0.2)"
                  tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }}
                />
                <YAxis
                  domain={[0, "dataMax + 500"]}
                  stroke="rgba(255,255,255,0.2)"
                  tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="calories"
                  name="calories"
                  stroke="var(--turmeric)"
                  fill="rgba(244,168,0,0.2)"
                  strokeWidth={2}
                  connectNulls
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}
