import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import './NavBar.css'

export default function NavBarBoost() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link to={'/'} className="-m-1.5 p-1.5">
              <img
                className="h-8 w-auto"
                src="/img/letterlist_logo1.png"
                alt="logo"
              />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="links hidden text-white lg:flex lg:gap-x-8">
            <Link to={'/notelist'}>Note List</Link>
            <Link to={'/user'}>Create User</Link>
            <Link to={'/create'}>Create Note</Link>
          </div>
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="responsive-menu fixed inset-y-0 right-0 z-50 w-full overflow-y-auto px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
            <Link to={'/'} className="-m-1.5 p-1.5">
              <img
                className="h-8 w-auto"
                src="/img/letterlist_logo1.png"
                alt="logo"
              />
            </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Link to={'/notelist'} className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white'>Note List</Link>
                  <Link to={'/user'} className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white'>Create User</Link>
                  <Link to={'/create'} className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white'>Create Note</Link>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
  )
}
