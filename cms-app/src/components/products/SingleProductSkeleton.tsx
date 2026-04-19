export default function SingleProductSkeleton() {
    return (
        <div className="group relative block overflow-hidden animate-pulse">
      

      <div 
        className="h-64 w-full bg-gray-300 object-cover transition duration-500 group-hover:scale-105 sm:h-72"
      > </div>

      <div className="relative border border-gray-100 bg-white p-6">
        <p className="bg-gray-300 h-2 rounded-full"></p>

        <p className="mt-1.5 bg-gray-300 h-2.5"></p>

        <p className="mt-1.5 h-1.5 text-gray-300"></p>

        <form className="mt-4 flex gap-4">
          <button className="block w-full rounded-sm bg-gray-300 px-4 py-3 text-sm font-medium text-gray-400 transition hover:scale-105">
          </button>

          <button
            type="button"
            className="block w-full rounded-sm bg-gray-400 px-4 py-3 text-sm font-medium text-white transition hover:scale-105"
          >
          </button>
        </form>
      </div>
    </div>
    )
}