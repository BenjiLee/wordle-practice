export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (<div>
            <text>Games Layout</text>
            <html lang="en">
            <body>{children}</body>
            </html>
        </div>
    )
}
