import { useColumns } from "./columns";
import { Card } from "@/components/ui/card";
import DataTable from "./data-table";
import useIngredientStore from "../../hooks/useIngredientStore";
import "@/index.css";

function IngredientTable() {
  const { ingredients } = useIngredientStore();
  const columns = useColumns();

  return (
    <Card className="p-4">
      <DataTable columns={columns} data={ingredients} />
    </Card>
  );
}

export default IngredientTable;
