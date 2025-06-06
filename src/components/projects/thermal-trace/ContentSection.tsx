
import React from 'react';

interface ContentSectionProps {
  title: string;
  children: React.ReactNode;
  layout?: 'default' | 'two-column';
  titleWidth?: string;
}

const ContentSection = ({ title, children, layout = 'default', titleWidth = 'min-w-[200px]' }: ContentSectionProps) => {
  if (layout === 'two-column') {
    return (
      <div className="rounded-lg bg-transparent">
        <div className="flex flex-col md:flex-row md:items-start md:space-x-16 mt-40 mb-40">
          <h2 className={`text-2xl font-light md:text-xl text-gray-300 whitespace-nowrap ${titleWidth} mb-40`}>
            {title}
          </h2>
          <div className="text-lg md:text-xl leading-relaxed text-gray-400 font-light">
            {children}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-transparent">
      <h2 className="text-2xl font-light mb-8 text-gray-300 md:text-xl">{title}</h2>
      {children}
    </div>
  );
};

export default ContentSection;
