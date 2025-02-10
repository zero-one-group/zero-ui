import { type VariantProps, tv } from "tailwind-variants";

export const dropdownMenuStyles = tv({
  slots: {
    trigger: [
      "flex h-10 items-center justify-center gap-1.5 rounded-md border border-gray-200 bg-gray-50 px-3.5 text-base font-medium text-gray-900 select-none shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-gray-400 active:bg-gray-100",
      "dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700",
    ],
    triggerIcon: "ml-auto size-4",
    content: [
      "z-50 min-w-[9rem] overflow-hidden rounded-md border-none outline outline-1 outline-gray-200 bg-popover p-1 text-popover-foreground shadow-md",
      "dark:shadow-none dark:bg-gray-800 dark:outline-gray-800",

      "data-[state=open]:motion-safe:motion-opacity-in-0",
      "data-[state=open]:motion-safe:motion-translate-y-in-[-30%]",
      "data-[state=open]:motion-safe:motion-duration-200",

      "data-[state=closed]:motion-safe:motion-opacity-out-0",
      "data-[state=closed]:motion-safe:motion-translate-y-out-[-30%]",
      "data-[state=closed]:motion-safe:motion-duration-150",
    ],
    item: [
      "relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-100 focus:bg-accent focus:text-accent-foreground",
      "dark:hover:bg-gray-600 dark:hover:text-white",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:mb-1",
    ],
    checkboxItem: [
      "relative flex cursor-pointer select-none items-center rounded-sm pr-2 pl-8 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-gray-100",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      "dark:hover:bg-gray-600 dark:hover:text-white",
    ],
    checkboxItemIndicator: [
      "absolute left-2 flex size-4 mb-1 rounded-sm items-center justify-center bg-gray-200",
      "dark:bg-gray-700 dark:border-gray-100",
    ],
    checkboxItemIcon: "size-4",
    radioItem: [
      "relative flex cursor-pointer select-none items-center rounded-sm pr-2 pl-8 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-gray-100",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      "dark:hover:bg-gray-600 dark:hover:text-white",
    ],
    radioItemIndicator: [
      "absolute left-2 flex size-3.5 mb-1 items-center justify-center",
      "dark:bg-gray-700 dark:border-gray-100",
    ],
    radioItemIcon: "size-4 fill-current",
    itemText: "px-2 py-1.5 text-sm",
    separator: ["-mx-1 my-1 h-px bg-muted", "dark:bg-gray-700"],
    shortcut: "ml-auto text-xs tracking-widest opacity-60",
    subTrigger: [
      "relative flex gap-2 cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:mb-1 hover:bg-gray-100 focus:text-accent-foreground",
      "dark:hover:bg-gray-600 dark:hover:text-white",
    ],
    subContent:
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=closed]:animate-out data-[state=open]:animate-in",
  },
  variants: {
    inset: {
      true: {
        item: "pl-8",
        label: "pl-8",
        subTrigger: "pl-8",
      },
    },
  },
});

export type DropdownMenuVariants = VariantProps<typeof dropdownMenuStyles>;
