import { cn } from "@/lib/utils";
import "./globals.css";

import { SearchHeader } from "@/components/SearchHeader";
import { ThemeButton } from "@/components/ThemeButton";
import { ExternalLink } from "@/components/external-link";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import localFont from "next/font/local";

const fontHeading = localFont({
	src: "../fonts/Fraunces/Fraunces-VariableFont_SOFT,WONK,opsz,wght.ttf",
	variable: "--font-heading",
	display: "swap",
});

const fontBody = localFont({
	src: "../fonts/Source_Serif_4/SourceSerif4-VariableFont_opsz,wght.ttf",
	variable: "--font-body",
	display: "swap",
});

export const metadata: Metadata = {
	title: "Is it NYC?",
	description: "Discover the world through the solipsistic lens of a New Yorker.",
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
					"flex flex-col",
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
					<footer className="flex flex-row justify-between items-center p-4 border-t mt-4">
						<div className="flex flex-row items-center gap-2">
							<ThemeButton />
							<span className="text-sm text-muted-foreground">
								made by{" "}
								<ExternalLink href="https://oneofthemanymatts.com">
									one of the many matts
								</ExternalLink>
							</span>
						</div>
						<div className="flex flex-col gap-1 text-xs items-end">
							<span className="text-muted-foreground">
								Content courtesy of{" "}
								<ExternalLink href="https://claude.ai/">Claude 3.5 Sonnet</ExternalLink>
							</span>
							<span className="text-muted-foreground hidden md:block">
								Map via <ExternalLink href="https://protomaps.com">Protomaps</ExternalLink> &{" "}
								<ExternalLink href="https://maplibre.org">maplibre</ExternalLink>, map data via{" "}
								<ExternalLink href="https://docs.mapbox.com/api/search/search-box/">
									Mapbox
								</ExternalLink>{" "}
								& <ExternalLink href="https://whosonfirst.org/">Who's On First</ExternalLink>
							</span>
						</div>
					</footer>
				</ThemeProvider>
				<Analytics />
			</body>
		</html>
	);
}
