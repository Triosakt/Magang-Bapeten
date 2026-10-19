import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";

const COLORS = ["#1E3A8A", "#3B82F6", "#93C5FD", "#64748B", "#CBD5E1"];
export const STATUS_LABEL = { pending: "Menunggu", approved: "Disetujui", rejected: "Ditolak", draft: "Draft",
  Berlaku: "Berlaku", Tidak_Berlaku: "Tidak berlaku", lembaga: "Lembaga", unit_kerja: "Unit kerja" };

export function YearChart({ data, height = 260 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ left: -16 }}>
        <CartesianGrid stroke="#E2E8F0" vertical={false} />
        <XAxis dataKey="tahun" tick={{ fill: "#64748B", fontSize: 12 }} />
        <YAxis allowDecimals={false} tick={{ fill: "#64748B", fontSize: 12 }} />
        <Tooltip cursor={{ fill: "#F1F5F9" }} />
        <Bar dataKey="total" name="Jumlah SOP" fill="#3B82F6" radius={[4, 4, 0, 0]} isAnimationActive={false} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function UnitChart({ data, height = 320 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} layout="vertical" margin={{ left: 24 }}>
        <CartesianGrid stroke="#E2E8F0" horizontal={false} />
        <XAxis type="number" allowDecimals={false} tick={{ fill: "#64748B", fontSize: 12 }} />
        <YAxis type="category" dataKey="unit" width={90} tick={{ fill: "#0F172A", fontSize: 12 }} />
        <Tooltip cursor={{ fill: "#F1F5F9" }} />
        <Bar dataKey="total" name="Jumlah SOP" fill="#1E3A8A" radius={[0, 4, 4, 0]} isAnimationActive={false} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function DonutChart({ data, nameKey = "status", height = 240 }) {
  const rows = data.map((d) => ({ ...d, name: STATUS_LABEL[d[nameKey]] || d[nameKey] }));
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie data={rows} dataKey="total" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2} isAnimationActive={false}>
          {rows.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" iconType="circle" />
      </PieChart>
    </ResponsiveContainer>
  );
}
