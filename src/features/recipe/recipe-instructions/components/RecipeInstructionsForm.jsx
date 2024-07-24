import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import "@/index.css";

const RecipeInstructionsForm = ({ onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState([{ step: "" }]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleStepChange = (index, event) => {
    const newSteps = [...steps];
    newSteps[index].step = event.target.value;
    setSteps(newSteps);
  };

  const handleAddStep = () => {
    setSteps([...steps, { step: "" }]);
  };

  const handleRemoveStep = (index) => {
    const newSteps = steps.filter((_, stepIndex) => stepIndex !== index);
    setSteps(newSteps);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, description, steps });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Recipe Instructions</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Recipe Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter the recipe title"
              className="mt-1 block w-full"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              General Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Enter a general description of the recipe"
              className="mt-1 block w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Steps
            </label>
            {steps.map((step, index) => (
              <div key={index} className="flex items-center space-x-2 mt-2">
                <Input
                  type="text"
                  value={step.step}
                  onChange={(e) => handleStepChange(index, e)}
                  placeholder={`Step ${index + 1}`}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => handleRemoveStep(index)}
                  className="ml-2"
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" onClick={handleAddStep} className="mt-4">
              Add Step
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button type="submit" onClick={handleSubmit} className="btn">
          Save Instructions
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecipeInstructionsForm;
