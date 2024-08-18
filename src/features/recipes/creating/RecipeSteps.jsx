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
    <div className="">
      <h3 className="text-md mb-1">Steps</h3>
      {steps.map((step, index) => (
        <div key={index} className="flex items-center space-x-2 mb-4">
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
        className="w-full bg-white text-black  text-md shadow-md p-2 rounded border-1 border-slate-600 hover:bg-slate-100 "
      >
        Add Step
      </Button>
    </div>
  );
};

export default RecipeSteps;
