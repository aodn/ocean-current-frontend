import React, { forwardRef, useId, useRef, useEffect } from 'react';

type IconSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | 'xxl';
type Color = 'imos-white' | 'imos-black' | 'imos-sea-blue' | 'imos-grey' | 'imos-deep-blue';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: IconSize;
  color?: Color;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const SIZE_MAP: Record<IconSize, string> = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  base: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
  xxl: 'w-12 h-12',
};

const COLOR_MAP: Record<Color, string> = {
  'imos-white': 'text-white',
  'imos-black': 'text-black',
  'imos-sea-blue': 'text-imos-sea-blue',
  'imos-grey': 'text-imos-grey',
  'imos-deep-blue': 'text-imos-deep-blue',
};

/**
 * NOTICE!!!!
 * to make custom style works for svg, fill must be set to 'currentColor' in the svg file and strokeWidth must be removed in the svg file.
 */
export function withIcon(IconComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>): React.FC<IconProps> {
  // eslint-disable-next-line react/display-name
  const WrappedIcon = forwardRef<SVGSVGElement, IconProps>(
    ({ size = 'base', color = 'imos-grey', className, strokeWidth = 2, ...rest }, ref) => {
      const uniqueId = useId().replace(/:/g, '_');
      const svgRef = useRef<SVGSVGElement>(null);
      const sizeClass = `${SIZE_MAP[size as IconSize]}`;
      const colorClass = `${COLOR_MAP[color as Color]}`;

      // Update IDs within the SVG to ensure uniqueness, as multiple instances may be rendered.
      // this only occures for SVGs that have 'fill', 'mask', 'clip-path', 'filter with ids.
      useEffect(() => {
        if (svgRef.current) {
          const svg = svgRef.current;

          const elementsWithId = svg.querySelectorAll('[id]');
          const idMap = new Map<string, string>();

          elementsWithId.forEach((element) => {
            const oldId = element.getAttribute('id');
            if (oldId) {
              const newId = `${oldId}_${uniqueId}`;
              idMap.set(oldId, newId);
              element.setAttribute('id', newId);
            }
          });

          const allElements = svg.querySelectorAll('*');
          allElements.forEach((element) => {
            const href = element.getAttribute('href') || element.getAttribute('xlink:href');
            if (href && href.startsWith('#')) {
              const oldId = href.substring(1);
              const newId = idMap.get(oldId);
              if (newId) {
                element.setAttribute('href', `#${newId}`);
                element.setAttribute('xlink:href', `#${newId}`);
              }
            }

            ['fill', 'mask', 'clip-path', 'filter'].forEach((attr) => {
              const value = element.getAttribute(attr);
              if (value && value.includes('url(#')) {
                let newValue = value;
                idMap.forEach((newId, oldId) => {
                  newValue = newValue.replace(`url(#${oldId})`, `url(#${newId})`);
                });
                element.setAttribute(attr, newValue);
              }
            });
          });
        }
      }, [uniqueId]);

      return (
        <IconComponent
          ref={(node) => {
            if (ref) {
              (ref as React.MutableRefObject<SVGSVGElement | null>).current = node;
            }
            (svgRef as React.MutableRefObject<SVGSVGElement | null>).current = node;
          }}
          className={`${sizeClass} ${colorClass} ${className || ''}`}
          strokeWidth={strokeWidth}
          {...rest}
        />
      );
    },
  );

  return WrappedIcon;
}
