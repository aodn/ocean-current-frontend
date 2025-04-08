/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect } from 'react';

/**
 * A custom hook for tracking component renders and determining what caused re-renders
 *
 * @param componentName - Name of the component to track
 * @param dependencies - Object containing dependencies to track (props, state, context values)
 * @param options - Optional configuration options
 */
export function useRenderTracker<T extends Record<string, any>>(
  componentName: string,
  dependencies: T,
  options: {
    logFirstRender?: boolean;
    logDetailedDiff?: boolean;
    logColor?: string;
  } = {},
): void {
  const { logFirstRender = true, logDetailedDiff = true, logColor = '#2196F3' } = options;

  const renderCount = useRef<number>(0);
  const prevDeps = useRef<T>(dependencies);
  const renderStartTime = useRef<number>(performance.now());

  useEffect(() => {
    const renderDuration = performance.now() - renderStartTime.current;
    renderCount.current += 1;

    // First render
    if (renderCount.current === 1) {
      if (logFirstRender) {
        console.log(
          `%c[${componentName}] First render (${renderDuration.toFixed(2)}ms)`,
          `color: ${logColor}; font-weight: bold;`,
        );
      }
      prevDeps.current = { ...dependencies };
      renderStartTime.current = performance.now();
      return;
    }

    // Subsequent renders
    console.group(
      `%c[${componentName}] Re-render #${renderCount.current} (${renderDuration.toFixed(2)}ms)`,
      `color: ${logColor}; font-weight: bold;`,
    );

    // Find which dependencies changed
    type Change = {
      key: string;
      from: any;
      to: any;
      type: 'reference' | 'value' | 'function';
    };

    const changes: Change[] = [];

    Object.keys(dependencies).forEach((key) => {
      const prev = prevDeps.current[key];
      const current = dependencies[key];

      if (prev !== current) {
        const change: Change = {
          key,
          from: prev,
          to: current,
          type: 'value',
        };

        // Determine change type
        if (typeof current === 'function' && typeof prev === 'function') {
          change.type = 'function';
        } else if (typeof current === 'object' && current !== null && typeof prev === 'object' && prev !== null) {
          // Check if it's just a reference change or actual value change
          change.type = JSON.stringify(prev) === JSON.stringify(current) ? 'reference' : 'value';
        }

        changes.push(change);
      }
    });

    if (changes.length > 0) {
      console.log(`Found ${changes.length} changes that triggered this re-render:`);

      changes.forEach((change) => {
        if (logDetailedDiff) {
          console.group(`${change.key} (${change.type} change):`);
          console.log('From:', change.from);
          console.log('To:', change.to);

          if (change.type === 'reference' && typeof change.from === 'object') {
            console.log('%cSame values but different object reference!', 'color: #FF5722; font-weight: bold;');
          } else if (change.type === 'function') {
            console.log(
              '%cFunction identity changed! Consider using useCallback.',
              'color: #FF5722; font-weight: bold;',
            );
          }
          console.groupEnd();
        } else {
          console.log(
            `- ${change.key} (${change.type} change)`,
            change.type === 'reference' ? '← Same values, different reference!' : '',
          );
        }
      });
    } else {
      console.log(
        '%cRe-render without dependency changes. Likely caused by parent re-render.',
        'color: #FF9800; font-weight: bold;',
      );
    }

    console.groupEnd();

    // Update refs for next render
    prevDeps.current = { ...dependencies };
    renderStartTime.current = performance.now();
  });
}
