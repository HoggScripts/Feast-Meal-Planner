import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";

function IngredientCard({ ingredient }) {
  if (!ingredient) {
    return null;
  }

  return (
    <Card>
      <CardBody>
        <Image
          alt={ingredient.name}
          src={ingredient.image}
          className="object-contain w-full h-32"
        />
        <h2>{ingredient.name}</h2>
      </CardBody>
      <CardFooter>
        <Button>Add to Recipe</Button>
      </CardFooter>
    </Card>
  );
}

export default IngredientCard;
