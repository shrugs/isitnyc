export default function Layout({ children }: { children: React.ReactNode }) {
	return <main className="flex flex-col items-start gap-4">{children}</main>;
}
