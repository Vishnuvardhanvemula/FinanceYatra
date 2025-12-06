import { useEffect, useRef } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

/**
 * Hook to run a guided tour for a calculator.
 * @param {string} tourKey - Unique key for localStorage (e.g., 'sip_tour_seen').
 * @param {Array} steps - Driver.js steps array.
 */
export function useCalculatorTour(tourKey, steps) {
    const driverObj = useRef(null);

    useEffect(() => {
        // Check if tour has already been seen
        const hasSeenTour = localStorage.getItem(tourKey);

        if (!hasSeenTour) {
            // Initialize driver
            driverObj.current = driver({
                showProgress: true,
                steps: steps,
                onDestroyed: () => {
                    // Mark as seen when tour is finished or skipped
                    localStorage.setItem(tourKey, 'true');
                },
                popoverClass: 'finance-tour-theme', // Custom class for styling if needed
            });

            // Simple delay to ensure DOM is ready
            setTimeout(() => {
                driverObj.current.drive();
            }, 1000);
        }
    }, [tourKey, steps]);

    // Function to manually restart tour
    const restartTour = () => {
        if (driverObj.current) {
            driverObj.current.drive();
        } else {
            // Re-init if reference lost (e.g. strict mode remount)
            const drv = driver({
                showProgress: true,
                steps: steps,
                onDestroyed: () => localStorage.setItem(tourKey, 'true'),
            });
            drv.drive();
        }
    };

    return { restartTour };
}
