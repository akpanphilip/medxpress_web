import DashboardShell from "@/components/DashboardShell";

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell role="patient">{children}</DashboardShell>;
}
