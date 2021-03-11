import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document<{}> {
    render() {
        return (
            <Html>
                <Head />
                <body className="font-display bg-gray-50 dark:bg-dark transition-colors text-gray-700 dark:text-gray-200">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
