import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="es">
        <Head />
        <Main />
        <NextScript />
      </Html>
    );
  }
}
export default MyDocument;
