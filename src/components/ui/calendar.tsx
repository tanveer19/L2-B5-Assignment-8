"use client"

import * as React from "react"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
} from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-900 dark:to-gray-800/50 group/calendar p-4 rounded-xl shadow-lg border border-blue-100/50 dark:border-gray-700/50 [--cell-size:--spacing(10)]",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "flex gap-4 flex-col md:flex-row relative",
          defaultClassNames.months
        ),
        month: cn("flex flex-col w-full gap-4", defaultClassNames.month),
        nav: cn(
          "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-9 aria-disabled:opacity-50 p-0 select-none rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 hover:scale-110",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-9 aria-disabled:opacity-50 p-0 select-none rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 hover:scale-110",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex items-center justify-center h-10 w-full px-10",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "w-full flex items-center text-sm font-semibold justify-center h-10 gap-1.5",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "relative has-focus:border-blue-400 border border-blue-200 dark:border-gray-600 shadow-sm has-focus:ring-blue-400/30 has-focus:ring-[3px] rounded-lg bg-white dark:bg-gray-800",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "absolute bg-white dark:bg-gray-800 inset-0 opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "select-none font-semibold text-gray-800 dark:text-gray-100",
          captionLayout === "label"
            ? "text-base tracking-wide"
            : "rounded-lg pl-3 pr-2 flex items-center gap-1 text-sm h-9 [&>svg]:text-blue-500 [&>svg]:size-4",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex mb-1", defaultClassNames.weekdays),
        weekday: cn(
          "text-blue-600/70 dark:text-blue-400/70 rounded-md flex-1 font-semibold text-xs uppercase tracking-wider select-none py-2",
          defaultClassNames.weekday
        ),
        week: cn("flex w-full mt-1", defaultClassNames.week),
        week_number_header: cn(
          "select-none w-10",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-xs select-none text-blue-400/60",
          defaultClassNames.week_number
        ),
        day: cn(
          "relative w-full h-full p-0.5 text-center [&:last-child[data-selected=true]_button]:rounded-r-xl group/day aspect-square select-none",
          props.showWeekNumber
            ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-xl"
            : "[&:first-child[data-selected=true]_button]:rounded-l-xl",
          defaultClassNames.day
        ),
        range_start: cn(
          "rounded-l-xl bg-gradient-to-r from-blue-500/20 to-blue-400/10",
          defaultClassNames.range_start
        ),
        range_middle: cn("rounded-none bg-blue-100/50 dark:bg-blue-900/20", defaultClassNames.range_middle),
        range_end: cn("rounded-r-xl bg-gradient-to-l from-blue-500/20 to-blue-400/10", defaultClassNames.range_end),
        today: cn(
          "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-xl font-semibold ring-2 ring-blue-400/30 data-[selected=true]:rounded-none",
          defaultClassNames.today
        ),
        outside: cn(
          "text-gray-300 dark:text-gray-600 aria-selected:text-gray-400 dark:aria-selected:text-gray-500",
          defaultClassNames.outside
        ),
        disabled: cn(
          "text-gray-300 dark:text-gray-600 opacity-50 cursor-not-allowed",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn("size-5", className)} {...props} />
            )
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className={cn("size-5", className)}
                {...props}
              />
            )
          }

          return (
            <ChevronDownIcon className={cn("size-5", className)} {...props} />
          )
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-10 items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        // Base styles
        "flex aspect-square size-auto w-full min-w-10 flex-col gap-1 leading-none font-medium rounded-xl transition-all duration-200",
        // Hover states
        "hover:bg-blue-100 hover:text-blue-700 hover:scale-105 dark:hover:bg-blue-900/40 dark:hover:text-blue-300",
        // Selected single day
        "data-[selected-single=true]:bg-gradient-to-br data-[selected-single=true]:from-blue-500 data-[selected-single=true]:to-blue-600 data-[selected-single=true]:text-white data-[selected-single=true]:shadow-lg data-[selected-single=true]:shadow-blue-500/30 data-[selected-single=true]:scale-105",
        // Range middle
        "data-[range-middle=true]:bg-blue-100/70 data-[range-middle=true]:text-blue-700 dark:data-[range-middle=true]:bg-blue-900/30 dark:data-[range-middle=true]:text-blue-300 data-[range-middle=true]:rounded-none",
        // Range start
        "data-[range-start=true]:bg-gradient-to-br data-[range-start=true]:from-blue-500 data-[range-start=true]:to-blue-600 data-[range-start=true]:text-white data-[range-start=true]:shadow-lg data-[range-start=true]:shadow-blue-500/30 data-[range-start=true]:rounded-l-xl data-[range-start=true]:rounded-r-none",
        // Range end
        "data-[range-end=true]:bg-gradient-to-br data-[range-end=true]:from-blue-500 data-[range-end=true]:to-blue-600 data-[range-end=true]:text-white data-[range-end=true]:shadow-lg data-[range-end=true]:shadow-blue-500/30 data-[range-end=true]:rounded-r-xl data-[range-end=true]:rounded-l-none",
        // Focus states
        "group-data-[focused=true]/day:border-blue-400 group-data-[focused=true]/day:ring-blue-400/30 group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px]",
        // Span styles
        "[&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
