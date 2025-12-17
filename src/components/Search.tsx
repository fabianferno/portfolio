
import { Fragment, useState, useEffect } from 'react'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import clsx from 'clsx'

interface SearchResult {
    category: 'Article' | 'Script' | 'Page'
    title: string
    description: string
    href: string
}

interface SearchProps {
    isOpen: boolean
    onClose: () => void
}

export function Search({ isOpen, onClose }: SearchProps) {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<SearchResult[]>([])
    const router = useRouter()

    useEffect(() => {
        if (isOpen && results.length === 0) {
            fetch('/api/search')
                .then((res) => res.json())
                .then((data) => setResults(data))
        }
    }, [isOpen, results.length])

    useEffect(() => {
        if (!isOpen) {
            setQuery('')
        }
    }, [isOpen])

    const filteredResults =
        query === ''
            ? []
            : results.filter((result) => {
                return (
                    result.title.toLowerCase().includes(query.toLowerCase()) ||
                    result.description.toLowerCase().includes(query.toLowerCase())
                )
            })

    function handleSelect(item: SearchResult) {
        onClose()
        router.push(item.href)
    }

    return (
        <Transition.Root show={isOpen} as={Fragment} afterLeave={() => setQuery('')}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-zinc-400/25 backdrop-blur-sm transition-opacity dark:bg-zinc-950/70" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="mx-auto max-w-xl w-full transform divide-y divide-zinc-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/5 transition-all dark:divide-zinc-800 dark:bg-zinc-900 dark:ring-white/10 text-left align-middle">
                                <Combobox onChange={(item: SearchResult) => handleSelect(item)}>
                                    <div className="relative">
                                        <MagnifyingGlassIcon
                                            className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-zinc-400 dark:text-zinc-500"
                                            aria-hidden="true"
                                        />
                                        <Combobox.Input
                                            className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-0 dark:text-zinc-200 sm:text-sm"
                                            placeholder="Search..."
                                            onChange={(event) => setQuery(event.target.value)}
                                            autoComplete="off"
                                        />
                                    </div>

                                    {filteredResults.length > 0 && (
                                        <Combobox.Options static className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-zinc-800 dark:text-zinc-200">
                                            {filteredResults.map((result) => (
                                                <Combobox.Option
                                                    key={result.href}
                                                    value={result}
                                                    className={({ active }) =>
                                                        clsx(
                                                            'cursor-default select-none px-4 py-2',
                                                            active && 'bg-zinc-100 dark:bg-zinc-800'
                                                        )
                                                    }
                                                >
                                                    {({ active }) => (
                                                        <>
                                                            <div className="flex items-center justify-between">
                                                                <span className={clsx('font-medium', active ? 'text-teal-500 dark:text-teal-400' : 'text-zinc-900 dark:text-white')}>
                                                                    {result.title}
                                                                </span>
                                                                <span className="ml-2 text-xs text-zinc-500 dark:text-zinc-400">
                                                                    {result.category}
                                                                </span>
                                                            </div>
                                                            <p className="mt-1 truncate text-xs text-zinc-500 dark:text-zinc-400">
                                                                {result.description}
                                                            </p>
                                                        </>
                                                    )}
                                                </Combobox.Option>
                                            ))}
                                        </Combobox.Options>
                                    )}

                                    {query !== '' && filteredResults.length === 0 && (
                                        <p className="p-4 text-sm text-zinc-500 dark:text-zinc-400">
                                            No results found.
                                        </p>
                                    )}
                                </Combobox>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
