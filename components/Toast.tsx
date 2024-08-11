export function Toast({ message, type }: { message: string; type: "success" | "error" }) {
  return (
    <div
      className={`${type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        } p-4 rounded-md
        fixed bottom-4 right-4 z-50
        `}
    >
      {message}
    </div>
  );
}