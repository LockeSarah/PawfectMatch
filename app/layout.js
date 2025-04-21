import "./globals.css";
import { Provider } from "./Components/MyContext";
import NavBar from "./Components/NavBar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <NavBar />
          {children}
        </Provider>
      </body>
    </html>
  );
}