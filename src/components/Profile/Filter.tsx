import React, { useState } from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../ui/accordion';
import { Input } from '../ui/input';

interface FilterProps {
  onFilterChange: (categories: string, priceRange: string) => void;
}

type Category = 'Programming' | 'Science' | 'History' | 'Mathematics' | 'Literature' | 'Art';
const categories: Category[] = ['Programming', 'Science', 'History', 'Mathematics', 'Literature', 'Art'];

interface PriceRange {
  label: string;
  value: string;
}

const priceRanges: PriceRange[] = [
  { label: '500 and below', value: '$lte:500' },
  { label: '1000 and below', value: '$lte:1000' },
  { label: '5000 and below', value: '$lte:5000' },
  { label: 'Above 5000', value: '$gt:5000' },
];

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);

  const handleCategoryChange = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(cat => cat !== category)
      : [...selectedCategories, category];

    setSelectedCategories(newCategories);
    applyFilters(newCategories, selectedPriceRange);
  };

  const handlePriceRangeChange = (priceRange: string) => {
    const newPriceRange = selectedPriceRange === priceRange ? null : priceRange;
    setSelectedPriceRange(newPriceRange);
    applyFilters(selectedCategories, newPriceRange);
  };

  const applyFilters = (categories: string[], priceRange: string | null) => {
    const categoriesString = categories.join(',');
    const priceRangeString = priceRange || '';
    onFilterChange(categoriesString, priceRangeString);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold mb-4">Filter Courses</h2>

      <Accordion type="multiple">
        <AccordionItem value="categories">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            {categories.map(category => (
              <label key={category} className="flex items-center space-x-3">
                <Input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="form-checkbox h-4 w-4"
                />
                <span>{category}</span>
              </label>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="priceRange">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            {priceRanges.map(range => (
              <label key={range.label} className="flex items-center space-x-3">
                <Input
                  type="radio"
                  checked={selectedPriceRange === range.value}
                  onChange={() => handlePriceRangeChange(range.value)}
                  className="form-radio h-4 w-4"
                />
                <span>{range.label}</span>
              </label>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-4 space-y-2">
        {selectedCategories.map(category => (
          <span key={category} className="inline-block bg-blue-200 text-blue-800 text-sm px-2 py-1 rounded-full mr-2">
            {category}
          </span>
        ))}
        {selectedPriceRange && (
          <span
            className="inline-block bg-green-200 text-green-800 text-sm px-2 py-1 rounded-full cursor-pointer"
            onClick={() => handlePriceRangeChange(selectedPriceRange)} // Allows clearing of price range
          >
            {priceRanges.find(range => range.value === selectedPriceRange)?.label}
          </span>
        )}
      </div>
    </div>
  );
};

export default Filter;
