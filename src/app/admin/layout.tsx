import AdminLayout from '@/components/admin/AdminLayout'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AdminLayout>{children}</AdminLayout>
}