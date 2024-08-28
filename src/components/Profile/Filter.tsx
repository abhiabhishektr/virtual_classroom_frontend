import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface FilterProps {
  onFilterChange: (selectedFilters: { categories: string[]; priceRange: string[] }) => void;
}

const categories = ['Programming', 'Science', 'History', 'Mathematics', 'Literature', 'Art'];
const priceRanges = ['500 and below', '1000 and below', '5000 and below', 'Above 5000'];

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string[]>([]);

  const handleCategoryChange = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(cat => cat !== category)
      : [...selectedCategories, category];

    setSelectedCategories(newCategories);
    onFilterChange({ categories: newCategories, priceRange: selectedPriceRange });
  };

  const handlePriceRangeChange = (priceRange: string) => {
    const newPriceRange = selectedPriceRange.includes(priceRange)
      ? selectedPriceRange.filter(pr => pr !== priceRange)
      : [...selectedPriceRange, priceRange];

    setSelectedPriceRange(newPriceRange);
    onFilterChange({ categories: selectedCategories, priceRange: newPriceRange });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold mb-4">Filter Courses</h2>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <div className="font-medium">Categories</div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-col space-y-2">
            {categories.map(category => (
              <label key={category} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="form-checkbox h-4 w-4"
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <div className="font-medium">Price Range</div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-col space-y-2">
            {priceRanges.map(range => (
              <label key={range} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedPriceRange.includes(range)}
                  onChange={() => handlePriceRangeChange(range)}
                  className="form-checkbox h-4 w-4"
                />
                <span>{range}</span>
              </label>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>

      {/* Display selected filters as capsules */}
      <div className="mt-4 space-y-2">
        {selectedCategories.map(category => (
          <span key={category} className="inline-block bg-blue-200 text-blue-800 text-sm px-2 py-1 rounded-full">
            {category}
          </span>
        ))}
        {selectedPriceRange.map(range => (
          <span key={range} className="inline-block bg-green-200 text-green-800 text-sm px-2 py-1 rounded-full">
            {range}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Filter;
