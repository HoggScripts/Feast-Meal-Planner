import React, { useState } from "react";
import {
  Badge,
  Input,
  Avatar,
  Tooltip,
  Button,
  Spacer,
} from "@nextui-org/react";

const badgeList = [
  "Quick & Easy",
  "Family Favorite",
  "Healthy",
  "Low Carb",
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Dairy-Free",
  "Keto",
  "Paleo",
  "Budget-Friendly",
  "High Protein",
  "Low Fat",
  "Low Calorie",
  "Comfort Food",
  "Kid-Friendly",
  "Meal Prep",
  "One-Pot",
  "Instant Pot",
  "Slow Cooker",
  "Grilling",
  "Baking",
];

const RecipeTagManager = () => {
  const [selectedBadges, setSelectedBadges] = useState([]);
  const [search, setSearch] = useState("");

  const handleAddBadge = (badge) => {
    if (!selectedBadges.includes(badge)) {
      setSelectedBadges([...selectedBadges, badge]);
    }
  };

  const handleRemoveBadge = (badge) => {
    setSelectedBadges(selectedBadges.filter((b) => b !== badge));
  };

  return (
    <div>
      <Input
        clearable
        bordered
        placeholder="Search badges"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />
      <div className="flex flex-wrap gap-2 mb-4">
        {badgeList
          .filter((badge) => badge.toLowerCase().includes(search.toLowerCase()))
          .map((badge) => (
            <Tooltip content={`Add ${badge}`} key={badge}>
              <Button auto onClick={() => handleAddBadge(badge)}>
                {badge}
              </Button>
            </Tooltip>
          ))}
      </div>
      <Spacer y={1} />
      <div className="flex flex-wrap gap-2">
        {selectedBadges.map((badge) => (
          <Badge
            key={badge}
            color="primary"
            content={
              <Button
                auto
                size="mini"
                color="error"
                onClick={() => handleRemoveBadge(badge)}
              >
                &times;
              </Button>
            }
          >
            {badge}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default RecipeTagManager;
