"use client"
// use commandList instead of commmand group
import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons"


export function DropDown1({ departments: frameworks, value, setValue,searchQuery, setSearchQuery }: { departments: { value: string, label: string }[], value: string, setValue: any,searchQuery:string, setSearchQuery:any }) {
    const [open, setOpen] = React.useState(false)
    
    // React.useEffect(() => {
    //     if (open) {
    //         setSearchQuery('');
    //         setOpen(false);
    //     }
    // }, [open]);

    React.useEffect(() => {
        console.log(frameworks)
        }, [frameworks])
        

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[300px] justify-between overflow-hidden"
                >
                    {value
                        ? frameworks.find((framework) => framework.value === value)?.label
                        : "Select Option..."}
                        {/* {value ? value : "Select Option..."} */}
                    <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
                <Command>
                <CommandInput
                        placeholder="search test..."
                        value={searchQuery}
                        onValueChange={(e) => setSearchQuery(e)}
                    />                    
                    <CommandList>
                        {frameworks?.map((framework) => (
                            <>
                             <div
                             className="p-1 cursor-grab"
                                 key={framework.value}
                                 onClick={() => {
                                     setValue(framework.value)
                                     setOpen(false)
                                 }}
                             >
                                <CheckIcon
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === framework.value ? "opacity-100" : "opacity-0"
                                    )}
                                    />
                                {framework.label}
                            </div>
                                    </>
                        ))}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
