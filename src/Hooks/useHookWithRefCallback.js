import { useCallback, useRef } from 'react'

export default function useHookWithRefCallback(loadData) {
    const ref = useRef(null)
    const intRef = useRef(new IntersectionObserver((entries) => {
        const first = entries[0];
        if (first.intersectionRatio === 1) {
            loadData();
        }

    }, {
        root: null,
        rootMargin: '0px',
        threshold: 1
    }));
    const setRef = useCallback(node => {
        if (ref.current) {
            // Make sure to cleanup any events/references added to the last instance
            intRef.current.unobserve(ref.current)
        }

        if (node) {
            // Check if a node is actually passed. Otherwise node would be null.
            // You can now do what you need to, addEventListeners, measure, etc.
            intRef.current.observe(node);

        }

        // Save a reference to the node
        ref.current = node
    }, [])

    return [setRef]
}
