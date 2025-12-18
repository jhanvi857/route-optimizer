import React from 'react'
import * as ToastPrimitives from '@radix-ui/react-toast'
import { cva } from 'class-variance-authority'
import { X } from 'lucide-react'
import { cn } from '@//lib/utils'

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef(function ToastViewport(
  { className, ...props },
  ref,
) {
  return (
    <ToastPrimitives.Viewport
      ref={ref}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-[99999] flex w-full max-w-md flex-col space-y-2 p-4"
      {...props}
    />
  )
})
ToastViewport.displayName = 'ToastViewport'

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all',
  {
    variants: {
      variant: {
        default:
          'border border-border bg-background text-foreground',

        success:
          'border-green-500 bg-gray-100 text-green-500',

        destructive:
          'border-red-500 bg-gray-100 text-red-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)
const Toast = React.forwardRef(function Toast(
  { className, variant, ...props },
  ref,
) {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = 'Toast'

const ToastAction = React.forwardRef(function ToastAction(
  { className, ...props },
  ref,
) {
  return (
    <ToastPrimitives.Action
      ref={ref}
      className={cn(
        'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive',
        className,
      )}
      {...props}
    />
  )
})
ToastAction.displayName = 'ToastAction'

const ToastClose = React.forwardRef(function ToastClose(
  { className, ...props },
  ref,
) {
  return (
    <ToastPrimitives.Close
      ref={ref}
      className={cn(
        'absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600',
        className,
      )}
      toast-close=""
      {...props}
    >
      <X className="h-4 w-4" />
    </ToastPrimitives.Close>
  )
})
ToastClose.displayName = 'ToastClose'

const ToastTitle = React.forwardRef(function ToastTitle(
  { className, ...props },
  ref,
) {
  return (
    <ToastPrimitives.Title
      ref={ref}
      className={cn('text-sm font-semibold', className)}
      {...props}
    />
  )
})
ToastTitle.displayName = 'ToastTitle'

const ToastDescription = React.forwardRef(function ToastDescription(
  { className, ...props },
  ref,
) {
  return (
    <ToastPrimitives.Description
      ref={ref}
      className={cn('text-sm opacity-90', className)}
      {...props}
    />
  )
})
ToastDescription.displayName = 'ToastDescription'

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}