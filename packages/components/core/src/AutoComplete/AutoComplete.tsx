import React, {
  ComponentProps,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Box } from '../Box';
import { keyframes, styled } from '../stitches.config';

const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const StyledAutoComplete = styled('input', {});

const StyledListBoxWrapper = styled(Box, {
  position: 'relative',
  display: 'inline-block',
});

const StyledListBox = styled(Box, {
  position: 'absolute',
  top: 'calc(100% + .3rem)',
  width: '100%',
  p: '$1',
  borderRadius: '$1',
  background: 'White',
  animationDuration: '400ms',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  willChange: 'transform, opacity',
  border: '1px solid $gray10',
  '&[data-state="open"]': {
    animationName: slideUpAndFade,
  },
});

const StyledListBoxItem = styled(Box, {
  cursor: 'pointer',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  borderRadius: '$1',
  py: '$1',
  px: '$2',
  variants: {
    hovered: {
      true: {
        background: '$blue3',
      },
    },
  },
});

export type AutoCompleteItem = string;

export interface AutoCompleteProps
  extends ComponentProps<typeof StyledAutoComplete> {
  options: AutoCompleteItem[];
  onValuesChange?: (value: AutoCompleteItem) => void;
}

export type AutoCompleteComponent = (props: AutoCompleteProps) => ReactElement;

export const AutoComplete: AutoCompleteComponent = ({
  options,
  onFocus,
  onClick,
  onKeyDown,
  onValuesChange,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const listBoxRef = useRef<HTMLDivElement>(null);

  const [listBoxOpened, setListBoxOpened] = useState<boolean>(false);
  const [hovered, setHovered] = useState<number>(-1);
  const [value, setValue] = useState<string>('');

  const filteredData = options.filter((option) =>
    option.toLowerCase().trim().includes(value.toLowerCase().trim())
  );

  const shouldListBoxOpened = listBoxOpened && filteredData.length > 0;

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (inputRef.current && listBoxRef.current) {
        if (
          !inputRef.current.contains(event.target as Node) &&
          !inputRef.current.contains(listBoxRef.current)
        ) {
          setListBoxOpened(false);
        }
      }
    };
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [inputRef, listBoxRef]);

  const handleNext = () => {
    setHovered((current) =>
      current < filteredData.length - 1 ? current + 1 : current
    );
  };

  const handlePrevious = () => {
    setHovered((current) => (current > 0 ? current - 1 : current));
  };

  const handleInputFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    if (typeof onFocus === 'function') {
      onFocus(event);
    }
    setListBoxOpened(true);
  };

  const handleInputClick = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    if (typeof onClick === 'function') {
      onClick(event);
    }
    setListBoxOpened(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (typeof onKeyDown === 'function') {
      onKeyDown(event);
    }

    switch (event.key) {
      case 'ArrowUp': {
        event.preventDefault();
        handlePrevious();
        break;
      }

      case 'ArrowDown': {
        event.preventDefault();
        handleNext();
        break;
      }

      case 'Enter': {
        if (shouldListBoxOpened && filteredData[hovered]) {
          event.preventDefault();
          setListBoxOpened(false);
          setValue(filteredData[hovered]);
        }
        break;
      }

      case 'Escape': {
        event.preventDefault();
        setListBoxOpened(false);
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof onValueChanges === 'function') {
      onValuesChange(event.target.value);
    }

    if (!shouldListBoxOpened) {
      setListBoxOpened(true);
    }

    setValue(event.target.value);
    setHovered(-1);
  };

  const handleHovered = (
    event: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    setHovered(index);
  };

  const handleItemClick = (
    event: React.MouseEvent<HTMLDivElement>,
    value: AutoCompleteItem
  ) => {
    setValue(value);
    setListBoxOpened(false);
  };

  return (
    <StyledListBoxWrapper role="combobox">
      <StyledAutoComplete
        ref={inputRef}
        type="text"
        autoComplete="off"
        autoCorrect="off"
        value={value}
        onChange={handleChange}
        onFocus={handleInputFocus}
        onClick={handleInputClick}
        onKeyDown={handleKeyDown}
        aria-autocomplete="list"
        aria-expanded={shouldListBoxOpened}
        {...props}
      />
      {shouldListBoxOpened ? (
        <StyledListBox data-state="open" role="list" ref={listBoxRef}>
          {filteredData.map((option, idx) => (
            <StyledListBoxItem
              role="listitem"
              key={`${option}-${idx}`}
              onClick={(e) => handleItemClick(e, option)}
              onMouseEnter={(e) => handleHovered(e, idx)}
              hovered={idx === hovered}
            >
              {option}
            </StyledListBoxItem>
          ))}
        </StyledListBox>
      ) : null}
    </StyledListBoxWrapper>
  );
};

export default AutoComplete;