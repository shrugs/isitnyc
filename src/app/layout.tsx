import { cn } from "@/lib/utils";
import "./globals.css";

import { SearchHeader } from "@/components/SearchHeader";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Fraunces, Source_Serif_4 } from "next/font/google";

const fontHeading = Fraunces({
	variable: "--font-heading",
	weight: "600",
	subsets: ["latin"],
	display: "swap",
});

const fontBody = Source_Serif_4({
	variable: "--font-body",
	weight: "400",
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body
				className={cn(
					fontHeading.variable,
					fontBody.variable,
					"supports-[height:100cqh]:min-h-[100cqh] supports-[height:100svh]:min-h-[100svh]",
					"flex flex-col gap-4",
				)}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<main className="flex-1 w-full max-w-screen-md mx-auto flex flex-col py-2 px-4 gap-2">
						<SearchHeader />
						{children}
					</main>
					<footer className="flex flex-row justify-end items-center p-4 border-t ">
						<span className="text-muted-foreground">isitbrooklyn.com</span>
					</footer>
				</ThemeProvider>
			</body>
		</html>
	);
}
