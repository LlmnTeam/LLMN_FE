import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface HistoryData {
  time: string;
}

interface CpuHistory extends HistoryData {
  cpuUsage: number;
}

interface MemoryHistory extends HistoryData {
  memoryUsage: number;
}

interface NetworkInHistory extends HistoryData {
  networkReceived: number;
}

interface NetworkOutHistory extends HistoryData {
  networkSent: number;
}

interface MultiLineChartProps<T extends HistoryData> {
  data: T[];
  lines: { key: string; color: string; label: string }[];
  isNetworkData?: boolean;
}

export default function MultiLineChart<T extends HistoryData>({
  data,
  lines,
  isNetworkData = false,
}: MultiLineChartProps<T>) {
  // const maxValue = Math.max(
  //   ...data.map((item) =>
  //     Math.max(...lines.map((line) => Number(item[line.key]) || 0))
  //   )
  // );
  // const adjustedMaxValue = maxValue * 1.1;

  return (
    <ResponsiveContainer width="100%" aspect={2}>
      <LineChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          interval={30}
          tick={{ fontSize: 13, fill: "#374151", fontWeight: "bold" }}
        />
        <YAxis
          domain={isNetworkData ? [0.001, 10000] : [0, 100]}
          scale={isNetworkData ? "log" : "auto"}
          tick={{ fontSize: 13, fill: "#374151", fontWeight: "bold" }}
        />
        <Tooltip />
        {/* <Legend verticalAlign="top" height={36} /> */}
        {lines.map((line) => (
          <Line
            key={line.key}
            type="linear"
            dataKey={line.key}
            name={line.label}
            stroke={line.color}
            strokeWidth={1}
            dot={{ r: 0, strokeWidth: 1, stroke: "black", fill: "#FFAD61" }}
            activeDot={{
              r: 0,
              strokeWidth: 1,
              stroke: "black",
              fill: "#FF7A00",
            }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
