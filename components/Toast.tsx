export function Toast({ message, type }: { message: string; type: "success" | "error" }) {
  return (
    <div
      className={`${type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        } p-4 rounded-md
        absolute bottom-4 left-1/2 transform -translate-x-1/2
        `}
    >
      {message}
    </div>
  );
}