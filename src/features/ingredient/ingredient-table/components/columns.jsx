import { Button } from "@/components/ui/button";
import useIngredientStore from "../../hooks/useIngredientStore";

export const useColumns = () => {
  const { removeIngredient } = useIngredientStore();

  return [
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ getValue }) => (
        <img
          src={getValue()}
          alt="ingredient"
          className="h-16 w-16 rounded-md border"
          onError={(e) => (e.target.style.display = "none")}
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
      cell: ({ row }) => (
        <Button
          variant="outline"
          onClick={() => removeIngredient(row.original.id)}
        >
          Delete
        </Button>
      ),
    },
  ];
};
