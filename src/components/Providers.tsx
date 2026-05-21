"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "next-themes";
import { store } from "@/store";
import { useAppDispatch } from "@/store/hooks";
import { hydrate } from "@/store/authSlice";
import EmergencyModal from "@/components/EmergencyModal";
import EmergencyFab from "@/components/EmergencyFab";
import Toaster from "@/components/Toaster";
import TopProgress from "@/components/TopProgress";
import BackToTop from "@/components/BackToTop";

function AuthHydrator() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(hydrate());
  }, [dispatch]);
  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        storageKey="medxpress-web-theme"
      >
        <AuthHydrator />
        <TopProgress />
        {children}
        <EmergencyFab />
        <BackToTop />
        <EmergencyModal />
        <Toaster />
      </ThemeProvider>
    </Provider>
  );
}
