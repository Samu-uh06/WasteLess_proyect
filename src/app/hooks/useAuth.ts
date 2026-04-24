// ============================================================
// useAuth.ts  (MODIFICADO)
// Ubicación: src/app/hooks/useAuth.ts
//
// CAMBIO: Re-exporta useAuth directamente desde AuthContext.
// Cualquier componente que importe desde este archivo
// seguirá funcionando sin cambios.
// ============================================================

export { useAuth } from "../context/AuthContext";