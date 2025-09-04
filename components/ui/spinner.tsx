export function Spinner() {
    return (
        <span
            role="status"
            aria-live="polite"
            className="ml-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent align-[-0.125em]"
        />
    );
}