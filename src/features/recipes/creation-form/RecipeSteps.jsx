import { Button } from "@nextui-org/react";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";

const RecipeSteps = ({
  steps,
  handleStepChange,
  handleRemoveStep,
  handleAddStep,
}) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddStepClick = () => {
    if (steps.length === 0 || steps[steps.length - 1].trim() !== "") {
      setErrorMessage("");
      handleAddStep();
    } else {
      setErrorMessage(
        "Please fill in the previous step before adding a new one."
      );
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Steps</h3>
      {steps.map((step, index) => (
        <div key={index} className="flex items-center space-x-2">
          <input
            type="text"
            value={step}
            onChange={(e) => handleStepChange(index, e)}
            placeholder={`Step ${index + 1}`}
            className="flex-1 p-2 border rounded hover:border-submission-blue transition duration-200"
          />
          <Button
            type="button"
            onClick={() => handleRemoveStep(index)}
            className="bg-red-500 text-white"
          >
            <FaTrash />
          </Button>
        </div>
      ))}
      {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
      <Button
        type="button"
        onClick={handleAddStepClick}
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Add Step
      </Button>
    </div>
  );
};

export default RecipeSteps;
