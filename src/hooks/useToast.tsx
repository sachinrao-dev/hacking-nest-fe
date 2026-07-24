import { useState, useCallback } from "react";
import { Snackbar, Alert } from "@mui/material";

interface Toast {
  message: string;
  severity: "success" | "error" | "info" | "warning";
}

export function useToast() {
  const [toast, setToast] = useState<Toast | null>(null);

  const show = useCallback((message: string, severity: Toast["severity"] = "success") => {
    setToast({ message, severity });
  }, []);

  const ToastComponent = (
    <Snackbar
      open={!!toast}
      autoHideDuration={4000}
      onClose={() => setToast(null)}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={() => setToast(null)}
        severity={toast?.severity ?? "success"}
        variant="filled"
        sx={{ width: "100%", fontWeight: 600 }}
      >
        {toast?.message ?? ""}
      </Alert>
    </Snackbar>
  );

  return { show, ToastComponent };
}
