import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import type { ComingSoonContextType } from "../types";

const ComingSoonContext = createContext<ComingSoonContextType | undefined>(
  undefined
);

interface ComingSoonProviderProps {
  children: ReactNode;
}

export function ComingSoonProvider({ children }: ComingSoonProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      openModal,
      closeModal,
    }),
    [isOpen, openModal, closeModal]
  );

  return (
    <ComingSoonContext.Provider value={value}>
      {children}
    </ComingSoonContext.Provider>
  );
}

export function useComingSoon(): ComingSoonContextType {
  const context = useContext(ComingSoonContext);
  if (context === undefined) {
    throw new Error("useComingSoon must be used within a ComingSoonProvider");
  }
  return context;
}
