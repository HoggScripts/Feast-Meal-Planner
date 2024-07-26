// src/components/TestComponent.jsx

import { Button as NextUIButton } from "@nextui-org/react";
import { Button as ShadCNButton } from "@/components/ui/button"; // Adjust the path as needed

const TestComponent = () => {
  return (
    <div>
      <h1>Testing ShadCN and NextUI</h1>
      <ShadCNButton>ShadCN Button</ShadCNButton>
      <NextUIButton color="primary">NextUI Button</NextUIButton>
    </div>
  );
};

export default TestComponent;
