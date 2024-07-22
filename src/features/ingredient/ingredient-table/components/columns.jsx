export const columns = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ getValue }) => (
      <img
        src={getValue()}
        alt="ingredient"
        className="h-16 w-16 rounded-md"
        onError={(e) => (e.target.style.display = "none")} // Hide image if src is null or loading fails
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "unit",
    header: "Unit",
  },
  {
    accessorKey: "calories",
    header: "Calories",
  },
  {
    accessorKey: "carbohydrates",
    header: "Carbs",
  },
  {
    accessorKey: "fat",
    header: "Fat",
  },
  {
    accessorKey: "protein",
    header: "Protein",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div>
        <button onClick={() => alert(`Editing ${row.original.name}`)}>
          Edit
        </button>
        <button onClick={() => alert(`Deleting ${row.original.name}`)}>
          Delete
        </button>
      </div>
    ),
  },
];
