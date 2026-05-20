// Just a simple red banner to show at the top if something breaks, like a dropped connection
export default function ErrorBanner({ message }) {
  return (
    <div className="bg-red-500 text-white text-xs text-center py-2 px-4">
      {message}
    </div>
  );
}
