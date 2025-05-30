
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';

// Define search data structure 
interface SearchResult {
  title: string;
  description: string;
  url: string;
  keywords: string[];
}

// Sample search data from the website
const searchData: SearchResult[] = [
  {
    title: "Invisible",
    description: "Virtual Reality Contents",
    url: "/project/invisible-space-museum",
    keywords: ["vr", "virtual reality", "museum", "exhibition", "invisible"]
  },
  {
    title: "Learn",
    description: "Immersive Virtual Reality Experience",
    url: "/project/learn",
    keywords: ["learn", "immersive", "vr", "education"]
  },
  {
    title: "Thermal Trace",
    description: "XR & Exhibition Design",
    url: "/project/project-3",
    keywords: ["thermal", "trace", "xr", "exhibition"]
  },
  {
    title: "Whispers from the Bottom",
    description: "Exhibition Design",
    url: "/project/project-4",
    keywords: ["whispers", "bottom", "exhibition"]
  },
  {
    title: "Seoul Nature history Museum",
    description: "Brand Renewal and Spatial Design",
    url: "/project/project-5",
    keywords: ["seoul", "museum", "nature", "history", "brand", "design"]
  },
  {
    title: "Island",
    description: "Public Space Design",
    url: "/project/project-6",
    keywords: ["island", "public", "space", "design"]
  },
  {
    title: "About Me",
    description: "Information about Dohyun Kim",
    url: "/about",
    keywords: ["about", "profile", "dohyun", "kim"]
  },
  {
    title: "Work",
    description: "Portfolio of Projects",
    url: "/work",
    keywords: ["work", "portfolio", "projects"]
  },
  {
    title: "Contact",
    description: "Get in touch",
    url: "/contacts",
    keywords: ["contact", "email", "message"]
  }
];

const SearchBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredResults = searchQuery === "" 
    ? [] 
    : searchData.filter(item => {
        const query = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(query) || 
          item.description.toLowerCase().includes(query) || 
          item.keywords.some(keyword => keyword.toLowerCase().includes(query))
        );
      });

  const handleSelect = (url: string) => {
    setIsOpen(false);
    navigate(url);
  };

  const handleSearchClick = () => {
    setIsOpen(true);
  };

  return (
    <div className="relative z-50">
      <div className="flex">
        <button 
          className="bg-transparent text-white border border-white/40 px-4 py-2 text-sm flex items-center cursor-pointer hover:bg-white/10 transition-colors"
          onClick={handleSearchClick}
        >
          <Search className="h-4 w-4 mr-2" />
          Search
        </button>
        <Button
          variant="ghost"
          className="rounded-none border-t border-r border-b border-white/40 px-4 py-2 w-64 text-left text-white/70 hover:text-white hover:bg-white/10 flex justify-between items-center transition-colors"
          onClick={handleSearchClick}
        >
          <span>{searchQuery || "Type to search..."}</span>
        </Button>
      </div>

      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <Command className="rounded-lg border border-white/10 bg-black">
          <CommandInput 
            placeholder="Search across site..." 
            value={searchQuery}
            onValueChange={setSearchQuery}
            className="text-white"
            autoFocus
          />
          <CommandList>
            <CommandEmpty className="py-6 text-white/70">No results found.</CommandEmpty>
            <CommandGroup heading="Results">
              {filteredResults.map((item, index) => (
                <CommandItem 
                  key={index} 
                  className="cursor-pointer text-white hover:bg-white/10"
                  onSelect={() => handleSelect(item.url)}
                >
                  <div>
                    <div className="font-medium">{item.title}</div>
                    <div className="text-sm text-white/70">{item.description}</div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
};

export default SearchBox;
