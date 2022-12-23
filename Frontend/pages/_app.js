import "../styles/auth.css";
import "../styles/chats.css";
import "../styles/index.css";
import { ContextProvider } from '.././Appcontext/index'

export default function App({ Component, pageProps }) {
  return (
     <ContextProvider>
    <Component {...pageProps} />
    </ContextProvider>
  );
}
