import React, { createContext, useContext, useState, useCallback } from 'react';

export type ColorFilter = 'none' | 'grayscale' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'high-contrast';

type AccessibilityState = {
  colorFilter: ColorFilter;
  fontSize: 'small' | 'normal' | 'large' | 'extra-large';
  setColorFilter: (f: ColorFilter) => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetSettings: () => void;
};

const defaultState: AccessibilityState = {
  colorFilter: 'none',
  fontSize: 'normal',
  setColorFilter: () => {},
  increaseFontSize: () => {},
  decreaseFontSize: () => {},
  resetSettings: () => {},
};

const AccessibilityContext = createContext<AccessibilityState>(defaultState);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [colorFilter, setColorFilterState] = useState<ColorFilter>('none');
  const [fontSize, setFontSize] = useState<AccessibilityState['fontSize']>('normal');

  const setColorFilter = useCallback((f: ColorFilter) => setColorFilterState(f), []);
  const increaseFontSize = useCallback(() => {
    setFontSize((prev) => (prev === 'normal' ? 'large' : prev === 'large' ? 'extra-large' : prev));
  }, []);
  const decreaseFontSize = useCallback(() => {
    setFontSize((prev) => (prev === 'extra-large' ? 'large' : prev === 'large' ? 'normal' : prev));
  }, []);
  const resetSettings = useCallback(() => {
    setColorFilterState('none');
    setFontSize('normal');
  }, []);

  return (
    <AccessibilityContext.Provider
      value={{ colorFilter, fontSize, setColorFilter, increaseFontSize, decreaseFontSize, resetSettings }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext);
