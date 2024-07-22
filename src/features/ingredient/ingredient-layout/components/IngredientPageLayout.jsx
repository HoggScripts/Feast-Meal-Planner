import "@/globalStyles.css";
import TabbedCharts from "../../ingredient-charts/components/TabbedCharts";
import IngredientTable from "../../ingredient-table/components/IngredientTable";
import IngredientSearch from "../../ingredient-finder/components/IngredientSearch";
import styles from "../styles/IngredientPageLayout.module.css";

function IngredientPageLayout() {
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <TabbedCharts />
      </div>
      <div className={styles.section}>
        <IngredientTable />
      </div>
      <div className={styles.section}>
        <IngredientSearch />
      </div>
    </div>
  );
}

export default IngredientPageLayout;
