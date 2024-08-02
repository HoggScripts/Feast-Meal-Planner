import { Button } from "@nextui-org/react";
import { FaTrash } from "react-icons/fa";

const RecipeSteps = ({
  steps,
  handleStepChange,
  handleRemoveStep,
  handleAddStep,
}) => (
  <div className="space-y-2">
    <h3 className="text-xl font-semibold">Steps</h3>
    {steps.map((step, index) => (
      <div key={index} className="flex items-center space-x-2">
        <input
          type="text"
          value={step}
          onChange={(e) => handleStepChange(index, e)}
          placeholder={`Step ${index + 1}`}
          className="flex-1 p-2 border rounded"
        />
        <Button
          type="button"
          onClick={() => handleRemoveStep(index)}
          className="bg-destructive-red text-white"
        >
          <FaTrash />
        </Button>
      </div>
    ))}
    <Button
      type="button"
      onClick={handleAddStep}
      className="w-full bg-submission-blue text-white p-2 rounded"
    >
      Add Step
    </Button>
  </div>
);

export default RecipeSteps;
