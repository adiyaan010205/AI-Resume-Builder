export const colorPalettes = {
  // Professional palettes
  professional: {
    name: 'Professional Blue',
    primary: '#2563eb',
    secondary: '#64748b',
    accent: '#0ea5e9',
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#1e293b',
    textSecondary: '#475569'
  },
  
  modern: {
    name: 'Modern Gray',
    primary: '#374151',
    secondary: '#6b7280',
    accent: '#10b981',
    background: '#ffffff',
    surface: '#f9fafb',
    text: '#111827',
    textSecondary: '#6b7280'
  },

  creative: {
    name: 'Creative Purple',
    primary: '#7c3aed',
    secondary: '#a78bfa',
    accent: '#f59e0b',
    background: '#ffffff',
    surface: '#faf5ff',
    text: '#1f2937',
    textSecondary: '#6b7280'
  },

  elegant: {
    name: 'Elegant Navy',
    primary: '#1e40af',
    secondary: '#3b82f6',
    accent: '#ec4899',
    background: '#ffffff',
    surface: '#eff6ff',
    text: '#1e293b',
    textSecondary: '#475569'
  },

  // Dark themes
  darkProfessional: {
    name: 'Dark Professional',
    primary: '#60a5fa',
    secondary: '#94a3b8',
    accent: '#0ea5e9',
    background: '#0f172a',
    surface: '#1e293b',
    text: '#f8fafc',
    textSecondary: '#cbd5e1'
  },

  darkModern: {
    name: 'Dark Modern',
    primary: '#10b981',
    secondary: '#6b7280',
    accent: '#f59e0b',
    background: '#111827',
    surface: '#1f2937',
    text: '#f9fafb',
    textSecondary: '#d1d5db'
  }
};

export const templateColors = {
  azurill: colorPalettes.professional,
  bronzor: colorPalettes.modern,
  chikorita: colorPalettes.creative,
  ditto: colorPalettes.elegant,
  kakuna: colorPalettes.darkProfessional,
  nosepass: colorPalettes.darkModern
};

export const colors = {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  muted: {
    DEFAULT: 'var(--muted)',
    foreground: 'var(--muted-foreground)',
  },
  background: {
    DEFAULT: 'var(--background)',
    foreground: 'var(--background-foreground)',
  }
};

export default colorPalettes; 