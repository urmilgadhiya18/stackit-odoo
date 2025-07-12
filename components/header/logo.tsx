import Link from 'next/link';

export function Logo() {
  return (
    <div className="flex items-center space-x-2">
        <Link href="/" className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
        <span className="text-white font-bold text-sm">SI</span>
      </div>
      <span className="font-bold text-xl text-gray-900">
        Stack<span className="font-normal">it</span>
      </span>
        </Link>
    </div>
  )
}
