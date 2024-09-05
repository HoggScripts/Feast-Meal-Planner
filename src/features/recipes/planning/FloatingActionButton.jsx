import React from "react";
import { Fab } from "@mui/material";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const FloatingActionButton = ({
  onConfirm,
  children,
  label,
  size = "large",
  style = {},
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Fab
          aria-label={label || "add"}
          size={size}
          style={{
            backgroundColor: "#00f995",
            position: "fixed",
            bottom: 20,
            right: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            width: 80,
            height: 80,
            padding: "5px",
            color: "#FFFFFF",
            animation: "bounce 2s infinite",
            ...style,
          }}
        >
          {children}

          <style>
            {`
              @keyframes bounce {
                0%, 20%, 50%, 80%, 100% {
                  transform: translateY(0);
                }
                40% {
                  transform: translateY(-10px);
                }
                60% {
                  transform: translateY(-5px);
                }
              }
            `}
          </style>
        </Fab>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Action</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you are ready to email the shopping list and upload
            events to Google Calendar?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FloatingActionButton;
