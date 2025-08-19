const Footer = () => {
  return (
    <footer className="border-t">
      <div className="w-full mx-auto px-10 py-3 md:py-3">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0 space-x-2 rtl:space-x-reverse">
            <img src="/src/assets/imgs/vnpt.png" className="h-7" alt="Flowbite Logo" />
            <span className="self-center text-2xl whitespace-nowrap text-primary font-bold">VNPT</span>
          </a>
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 <a href="#" className="hover:underline">VNPT</a>. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
