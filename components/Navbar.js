import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Navmenu from "./Navmenu";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";
import { useTheme } from "next-themes";

const styleButtonCss =
  "dark:border-indigo-500 dark:text-gray-100 dark:hover:bg-indigo-500 dark:hover:bg-opacity-20 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md  text-indigo-700 border border-indigo-100 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);

  const { data: account } = useAccount();
  const { disconnect } = useDisconnect();

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const onChangTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    () => localStorage.setItem(theme);
    dispatchEvent(new Event("storage"));
  };

  return (
    mounted && (
      <header className="bg-white dark:bg-zinc-900 border-b-2 border-gray-100 dark:border-zinc-800">
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          aria-label="Top"
        >
          <div className="w-full py-6 flex flex-wrap items-center justify-between border-b border-indigo-500 lg:border-none">
            <div className="flex items-center">
              <Link href="/">
                <a>web3rsvp</a>
              </Link>
            </div>
            <div className="ml-10 space-x-4 flex items-center">
              <Link href="/create-event">
                <a className={styleButtonCss}>Create Event</a>
              </Link>

              {account ? (
                <Navmenu account={account} disconnect={() => disconnect()} />
              ) : (
                <ConnectButton />
              )}
              <button
                className="text-3xl font-medium hover:ring"
                onClick={onChangTheme}
              >
                {theme === "light" ? "🌚" : "🌞"}
              </button>
            </div>
          </div>
        </nav>
      </header>
    )
  );
}
