
import { Fragment, FormEvent, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { supabase } from '@/lib/supabase'
import { Container } from '@/components/Container'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface Message {
    id: string
    name: string
    message: string
    created_at: string
}

interface GuestbookModalProps {
    isOpen: boolean
    closeMsg: () => void
}

export function GuestbookModal({ isOpen, closeMsg }: GuestbookModalProps) {
    const [messages, setMessages] = useState<Message[]>([])
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (isOpen) {
            fetchMessages()
        }
    }, [isOpen])

    const fetchMessages = async () => {
        setIsLoading(true)
        const { data, error } = await supabase
            .from('guestbook')
            .select('id, name, message, created_at')
            .order('created_at', { ascending: false })
            .limit(100)

        if (error) {
            console.error('Error fetching messages:', error)
        } else {
            setMessages(data || [])
        }
        setIsLoading(false)
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError('')

        try {
            const response = await fetch('/api/guestbook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, message }),
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error || 'Failed to submit message')
            }

            setName('')
            setMessage('')
            fetchMessages()
        } catch (err: any) {
            setError(err.message || 'Something went wrong. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={closeMsg}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-zinc-800/40 backdrop-blur-sm dark:bg-black/80" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-zinc-900 ring-1 ring-zinc-900/5 dark:ring-white/10">
                                <div className="flex justify-between items-center mb-6">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-2xl font-bold leading-6 text-zinc-800 dark:text-zinc-100"
                                    >
                                        Guestbook
                                    </Dialog.Title>
                                    <button
                                        type="button"
                                        className="rounded-md text-zinc-400 hover:text-zinc-500 focus:outline-none"
                                        onClick={closeMsg}
                                    >
                                        <span className="sr-only">Close</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                <div className="mt-2">
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                        Thanks for visiting! Leave a comment below to say hello.
                                    </p>

                                    <form onSubmit={handleSubmit} className="mt-6 border-b border-zinc-100 dark:border-zinc-700/40 pb-6">
                                        <div className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2">
                                            <div className="sm:col-span-2">
                                                <label htmlFor="name-modal" className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">
                                                    Name
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        id="name-modal"
                                                        required
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        className="block w-full rounded-md border-zinc-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100 sm:text-sm h-10 px-3"
                                                    />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-2">
                                                <label htmlFor="message-modal" className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">
                                                    Message
                                                </label>
                                                <div className="mt-1">
                                                    <textarea
                                                        id="message-modal"
                                                        name="message"
                                                        rows={3}
                                                        required
                                                        value={message}
                                                        onChange={(e) => setMessage(e.target.value)}
                                                        className="block w-full rounded-md border-zinc-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100 sm:text-sm p-3"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {error && (
                                            <p className="mt-4 text-sm text-red-600 dark:text-red-400">
                                                {error}
                                            </p>
                                        )}

                                        <div className="mt-6 flex justify-end">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="inline-flex justify-center rounded-md border border-transparent bg-teal-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-teal-500/10 dark:text-teal-500 dark:hover:bg-teal-500/20 dark:hover:text-teal-400"
                                            >
                                                {isSubmitting ? 'Signing...' : 'Sign Guestbook'}
                                            </button>
                                        </div>
                                    </form>

                                    <div className="mt-6 max-h-96 overflow-y-auto pr-2">
                                        <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 mb-4">Recent Messages</h4>
                                        {isLoading ? (
                                            <p className="text-sm text-zinc-600 dark:text-zinc-400">Loading messages...</p>
                                        ) : messages.length === 0 ? (
                                            <p className="text-sm text-zinc-600 dark:text-zinc-400">No messages yet.</p>
                                        ) : (
                                            <div className="space-y-6">
                                                {messages.map((msg) => (
                                                    <div key={msg.id} className="flex flex-col space-y-1">
                                                        <div className="flex items-center space-x-2">
                                                            <span className="font-medium text-zinc-800 dark:text-zinc-100 text-sm">
                                                                {msg.name}
                                                            </span>
                                                            <span className="text-zinc-400 dark:text-zinc-500 text-xs">
                                                                • {new Date(msg.created_at).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap">
                                                            {msg.message}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
