import clsx from 'clsx'

export function Skeleton({
    className,
    ...props
}: React.ComponentPropsWithoutRef<'div'>) {
    return (
        <div
            className={clsx('animate-pulse rounded-md bg-zinc-100 dark:bg-zinc-800', className)}
            {...props}
        />
    )
}
