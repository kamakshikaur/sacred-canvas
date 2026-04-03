import React, { createContext, useContext, useState } from 'react';

interface UIContextType {
  isGalleryOpen: boolean;
  openGallery: () => void;
  closeGallery: () => void;
  toggleGallery: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider = ({ children }: { children: React.ReactNode }) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // Close gallery on Escape key is handled in the overlay itself usually, but we can do it there
  return (
    <UIContext.Provider value={{
      isGalleryOpen,
      openGallery: () => setIsGalleryOpen(true),
      closeGallery: () => setIsGalleryOpen(false),
      toggleGallery: () => setIsGalleryOpen(prev => !prev)
    }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) throw new Error("useUI must be used within UIProvider");
  return context;
};
