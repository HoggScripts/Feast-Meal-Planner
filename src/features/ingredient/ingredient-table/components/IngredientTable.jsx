import { columns } from "./columns";
import { Card } from "@/components/ui/card";
import DataTable from "./data-table";
import useIngredientStore from "../../hooks/useIngredientStore";

function IngredientTable() {
  const { ingredients } = useIngredientStore();

  return (
    <div>
      <Card>
        <DataTable columns={columns} data={ingredients} />
      </Card>
    </div>
  );
}

export default IngredientTable;
