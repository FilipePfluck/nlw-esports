import * as RadixSelect from '@radix-ui/react-select'
import { CaretDown } from 'phosphor-react'

interface SelectProps {
  options: string[]
}

export const Select = ({ options }: SelectProps) => {
  return (
    <RadixSelect.Root>
      <RadixSelect.Trigger className="bg-zinc-900 py-3 px-4 rounded text-sm flex items-center text-zinc-500">
        <RadixSelect.Value placeholder="Selecione o game que quer jogar" />
        <RadixSelect.Icon>
          <CaretDown />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content className="overflow-hidden bg-zinc-800 rounded">
          <RadixSelect.ScrollUpButton />
          <RadixSelect.Viewport className="px-1">
            {options.map((option) => (
              <RadixSelect.Item
                key={option}
                value={option}
                className="text-sm text-zinc-300 h-4 mt-10 w-full flex items-center content-center px-3 relative"
              >
                <RadixSelect.ItemText>{option}</RadixSelect.ItemText>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
          <RadixSelect.ScrollDownButton />
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  )
}
