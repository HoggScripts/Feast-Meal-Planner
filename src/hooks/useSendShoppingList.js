import useMealPlanStore from "@/stores/useMealPlanStore";
import { sendShoppingListEmail } from "@/lib/emailApi";
import { useMutation } from "@tanstack/react-query";

const useSendShoppingList = () => {
  const { shoppingList } = useMealPlanStore();

  const mutation = useMutation({
    mutationFn: async () => {
      console.log("useSendShoppingList mutationFn called");
      console.log(shoppingList);

      const thisWeekShoppingList = shoppingList
        .filter((item) => item.week === "currentWeek")
        .map((item) => ({
          name: item.name,
        }));

      const nextWeekShoppingList = shoppingList
        .filter((item) => item.week === "nextWeek")
        .map((item) => ({
          name: item.name,
        }));

      const payload = {
        ThisWeekShoppingList: thisWeekShoppingList,
        NextWeekShoppingList: nextWeekShoppingList,
      };

      console.log("Shopping List Payload:", payload);

      if (
        !payload.ThisWeekShoppingList.length &&
        !payload.NextWeekShoppingList.length
      ) {
        console.warn("No items in the shopping list to send.");
        return;
      }

      const response = await sendShoppingListEmail(payload);
      console.log("Shopping list email response:", response);
      return response;
    },
  });

  return mutation;
};

export default useSendShoppingList;
