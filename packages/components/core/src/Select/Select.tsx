import {
  CloseCircleFilled,
  CloseOutlined,
  DownOutlined,
} from '@ant-design/icons';
import * as Popover from '@radix-ui/react-popover';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import clsx from 'clsx';
import {
  ComponentProps,
  Fragment,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useFormDisabledContext, useFormItemContext } from '../Form';
import { Space } from '../Space';
import { styled } from '../stitches.config';

const Box = styled('div', {
  fontFamily: '$untitled',
  boxSizing: 'border-box',
});

const getColorSchemeVariants = (colorScheme?: string) => {
  return {
    $$primaryColor: colorScheme
      ? `$colors-${colorScheme}9`
      : '$colors-primary9',
    $$hightlightColor: colorScheme
      ? `$colors-${colorScheme}4`
      : '$colors-primary4',
  };
};

const StyledWrapper = styled('div', {
  display: 'inline-grid',
  gridTemplateColumns: 'auto 1fr',
  minWidth: 200,
  position: 'relative',
  $$primaryColor: '$colors-primary9',
  '&:hover': {
    '.select': {
      borderColor: '$$primaryColor',
    },
  },
  variants: {
    hasItem: {
      true: {
        '&:hover': {
          '& .clear-btn': {
            opacity: 1,
          },
        },
      },
    },
    disabled: {
      true: {
        cursor: 'not-allowed',
      },
    },
    fullWidth: {
      true: {
        width: '100%',
      },
    },
  },
});

const StyledSelect = styled('div', {
  display: 'inline-grid',
  gridTemplateColumns: '1fr auto',
  alignItems: 'center',
  borderRadius: '2px',
  border: '1px solid $inputDefaultBorder',
  boxSizing: 'border-box',
  padding: '0 12px',
  background: 'white',
  cursor: 'pointer',
  fontSize: '14px',
  transition:
    'min-height .1s ease-in-out, font-size .1s ease-in-out, border .1s ease-in-out',
  variants: {
    focused: {
      true: {
        borderColor: '$$primaryColor',
      },
    },
    searchable: {
      true: {
        cursor: 'text',
      },
    },
    disabled: {
      true: {
        pointerEvents: 'none',
        '*': {
          pointerEvents: 'none',
        },
        borderColor: '$inputDefaultBorder !important',
        background: '#F5F5F5',
      },
    },
    size: {
      sm: {
        minHeight: '24px',
      },
      md: {
        minHeight: '32px',
      },
      lg: {
        minHeight: '40px',
      },
    },
    isInvalid: {
      true: {
        borderColor: '$inputError !important',
      },
    },
    isWarning: {
      true: {
        borderColor: '$inputWarning !important',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
const StyledArrow = styled(Box, {
  fontSize: '12px',
  display: 'flex',
  alignItems: 'center',
  paddingInlineStart: '6px',
  color: '$blackA9',
  position: 'relative',
});
const StyledClear = styled(Box, {
  fontSize: '12px',
  position: 'absolute',
  right: '0',
  cursor: 'pointer',
  background: 'white',
  color: '$blackA8',
  opacity: 0,
  ':hover': {
    color: '$blackA11',
  },
});

const StyledTrigger = styled('div', {
  width: 0,
  height: '100%',
});

const StyledSelectedSingleItem = styled('span', {
  userSelect: 'none',
  whiteSpace: 'nowrap',
  variants: {
    isOnInput: {
      true: {
        visibility: 'hidden',
      },
    },
  },
});

const StyledPlaceholder = styled('span', {
  color: '$blackA9',
  whiteSpace: 'nowrap',
  pointerEvents: 'none',
  display: 'block',
  variants: {
    hide: {
      true: {
        display: 'none',
      },
    },
    size: {
      sm: {
        fontSize: '14px',
      },
      md: {
        fontSize: '14px',
      },
      lg: {
        fontSize: '16px',
      },
    },
  },
});
const StyledInput = styled('input', {
  position: 'absolute',
  top: 0,
  inset: 0,
  bottom: 0,
  margin: 0,
  padding: 0,
  outline: 0,
  border: 0,
  background: 'transparent',
  fontSize: '14px',
  fontFamily: '$untitled',
  variants: {
    size: {
      sm: {
        fontSize: '14px',
      },
      md: {
        fontSize: '14px',
      },
      lg: {
        fontSize: '16px',
      },
    },
  },
});

const StyledSelected = styled(Space, {
  height: '100%',
  alignItems: 'center',
  position: 'relative',
});
const StyledSelectedItems = styled(Space, {
  alignItems: 'center',
  gap: '5px',
  flexWrap: 'wrap',
  padding: '3px 0',
  variants: {
    size: {
      sm: {
        padding: '0',
      },
      md: {
        padding: '3px 0',
      },
      lg: {
        padding: '3px 0',
      },
    },
  },
});

const StyledSelectedMultipleItem = styled('span', {
  display: 'inline-grid',
  gridTemplateColumns: 'auto auto',
  borderRadius: '2px',
  padding: '0 5px 0 8px',
  border: '1px solid #F0F0F0',
  background: '#F5F5F5',
  height: '24px',
  gap: '4px',
  alignItems: 'center',
  whiteSpace: 'nowrap',
  variants: {
    size: {
      sm: {
        height: '16px',
      },
      md: {
        height: '24px',
      },
      lg: {
        height: '32px',
        span: {
          fontSize: '16px',
        },
      },
    },
  },
});

const StyledBtnRemove = styled('span', {
  height: '100%',
  display: 'inline-flex',
  alignItems: 'center',
  fontSize: '10px',
  color: '$blackA8',
  cursor: 'pointer',
  '&:hover': {
    color: '$blackA12',
  },
});

const StyledInputMultiple = styled('span', {
  margin: 0,
  padding: 0,
  outline: 0,
  background: 'transparent',
  fontSize: '14px',
  fontFamily: '$untitled',
  whiteSpace: 'nowrap',
  minWidth: '4px',
  variants: {
    size: {
      sm: {
        fontSize: '14px',
      },
      md: {
        fontSize: '14px',
      },
      lg: {
        fontSize: '16px',
      },
    },
  },
});

const SCROLLBAR_WIDTH = 4;

const StyledScrollAreaRoot = styled(ScrollArea.Root, {
  minWidth: '100px',
  overflow: 'hidden',
  fontSize: '14px',
  outline: 'none',
  background: 'white',
  boxShadow:
    '0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05)',
  borderRadius: '4px',
});

const StyledScrollAreaViewport = styled(ScrollArea.Viewport, {
  minHeight: '30px',
  padding: '4px 0',
  width: '100%',
  height: '100%',
  $$hightlightColor: '$colors-primary4',
  '&> div > *': {
    display: 'block',
    padding: '5px 12px',
    cursor: 'pointer',
  },
});

const StyledScrollAreaScrollbar = styled(ScrollArea.Scrollbar, {
  display: 'flex',
  userSelect: 'none',
  touchAction: 'none',
  background: '$grayA4',
  padding: '0px 2px',
  transition: 'background 160ms ease-out',
  '&:hover': { background: '$grayA4' },
  '&[data-orientation="vertical"]': { width: SCROLLBAR_WIDTH },
});

const StyledScrollAreaThumb = styled(ScrollArea.Thumb, {
  flex: 1,
  background: '$gray9',
  borderRadius: SCROLLBAR_WIDTH,
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    minWidth: 44,
    minHeight: 44,
  },
});

const StyledOptionItem = styled(Box, {
  padding: '5px 12px',
  cursor: 'pointer',
  '&:hover': {
    background: '#F5F5F5',
  },
  variants: {
    selected: {
      true: {
        background: '$$hightlightColor',
        '&:hover': {
          background: '$$hightlightColor',
        },
      },
    },
  },
});

type SelectedItem = {
  value: string;
  label?: string;
};

export type RenderOptionArgs = {
  option: SelectedItem;
  index: number;
  onSelect?: (option: SelectedItem) => void;
  selected?: boolean;
};

export type SelectProps = {
  options?: SelectedItem[];
  css?: ComponentProps<typeof StyledWrapper>['css'];
  placeholder?: string;
  searchable?: boolean;
  disabled?: boolean;
  allowClear?: boolean;
  itemsToShow?: number;
  colorScheme?: string;
  size?: ComponentProps<typeof StyledSelect>['size'];
  multiple?: boolean;
  fullWidth?: boolean;
  value?: SelectedItem | SelectedItem[];
  onChange?: (value?: SelectedItem | SelectedItem[]) => void;
  className?: string;
  dropdownClassName?: string;
  /**
   * Custom option render
   */
  renderOption?: (args: RenderOptionArgs) => ReactElement;
};

export const Select = ({
  options = [],
  css,
  placeholder = 'Select...',
  searchable,
  itemsToShow = 10,
  multiple,
  allowClear = true,
  size: propSize,
  value: propValue,
  onChange: propOnChange,
  disabled: propDisabled,
  colorScheme,
  className,
  dropdownClassName,
  renderOption,
  fullWidth,
}: SelectProps) => {
  const [open, setOpen] = useState(false);

  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [selectedSingleItem, setSelectedSingleItem] = useState<
    SelectedItem | undefined
  >(undefined);

  const [input, setInput] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState(() => options);
  const [multipleInputFocus, setMultipleInputFocus] = useState(false);
  // used when trigger onchange props
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputMultipleRef = useRef<HTMLSpanElement>(null);
  // to prevent effect when propOnChange changed
  const staticOnChangeFromProp = useRef(propOnChange);

  const formItem = useFormItemContext();
  const size = propSize ?? formItem.size;

  const disabledForm = useFormDisabledContext();
  const disabled = propDisabled || disabledForm;

  const setState = (option?: SelectedItem) => {
    if (typeof propOnChange === 'function' && propValue !== undefined) {
      if (multiple) {
        if (!option) {
          propOnChange([]);
          return;
        }
        const prevValues = (propValue as SelectedItem[]) ?? [];
        if (prevValues.find((it) => it.value === option.value)) {
          // remove it / deselect
          propOnChange(prevValues.filter((it) => it.value !== option.value));
        } else {
          propOnChange([...prevValues, option]);
        }
      } else {
        propOnChange(option);
      }
    } else {
      if (multiple) {
        if (!option) {
          setSelectedItems([]);
          return;
        }
        if (selectedItems.find((it) => it.value === option.value)) {
          setSelectedItems((prev) =>
            prev.filter((it) => it.value !== option.value)
          );
        } else {
          setSelectedItems((prev) => Array.from(new Set([...prev, option])));
        }
      } else {
        // handle when Select has onChange but does not have value
        if (typeof propOnChange === 'function') {
          propOnChange(option);
        }
        setSelectedSingleItem(option);
      }
    }
  };

  const clearInput = () => {
    if (searchable) {
      setInput('');
    }
    if (multiple && inputMultipleRef.current) {
      inputMultipleRef.current.innerText = '';
    }
  };

  const resetFilteredOptions = () => {
    setFilteredOptions(options);
  };

  const deSelect = (opt: SelectedItem) => {
    setSelectedItems((prev) => prev.filter((it) => it.value !== opt.value));
  };

  const onSelect = (option: SelectedItem) => {
    setState(option);
    if (!multiple) {
      setOpen(false);
    }
    clearInput();
    resetFilteredOptions();
  };

  const onClearAll = () => {
    setState();
    clearInput();
    resetFilteredOptions();
  };

  const inputWidth = useMemo(() => {
    return wrapperRef.current?.getBoundingClientRect().width ?? 100;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const focusInput = useCallback(() => {
    if (inputRef.current && !multiple) {
      inputRef.current.focus();
    }
    if (inputMultipleRef.current && multiple) {
      inputMultipleRef.current.focus();
    }
  }, [multiple]);

  const filterOptions = (inputValue: string) => {
    const toLowerNoSpace = (text: string) =>
      text.toLowerCase().replace(/\s+/g, '');
    const lowerInput = toLowerNoSpace(inputValue);
    if (lowerInput.length > 0) {
      const filtered = options.filter((it) => {
        return toLowerNoSpace(it.label || '').includes(lowerInput);
      });
      setFilteredOptions(filtered);
    } else {
      resetFilteredOptions();
    }
  };

  const onChangeInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputVal = e.target.value;
    setInput(inputVal);
    filterOptions(inputVal);
  };
  const onChangeInputMultiple: React.ChangeEventHandler<HTMLSpanElement> = (
    e
  ) => {
    const inputVal = e.currentTarget.innerText;
    setInput(inputVal);
    filterOptions(inputVal);
  };

  useEffect(() => {
    if (open) {
      focusInput();
    }
  }, [focusInput, open]);

  useEffect(() => {
    if (typeof propValue !== undefined) {
      if (propValue instanceof Array) {
        setSelectedItems(propValue);
      } else {
        setSelectedSingleItem(propValue);
      }
    }
  }, [propValue]);

  useEffect(() => {
    if (multiple && typeof staticOnChangeFromProp.current === 'function') {
      staticOnChangeFromProp.current(selectedItems);
    }
  }, [selectedItems, multiple]);

  const hasSelectedItem =
    selectedItems.length > 0 || selectedSingleItem !== undefined;
  const inputExist = input.length > 0;
  const dropdownHeight =
    (itemsToShow > filteredOptions.length
      ? filteredOptions.length
      : itemsToShow) * 26;

  return (
    <StyledWrapper
      hasItem={hasSelectedItem}
      css={{ ...css, ...getColorSchemeVariants(colorScheme) }}
      ref={wrapperRef}
      disabled={disabled}
      className={clsx('select-wrapper', className)}
      fullWidth={fullWidth}
    >
      <Popover.Root open={open}>
        <Popover.Trigger asChild>
          <StyledTrigger />
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            align="start"
            asChild
            onInteractOutside={() => setOpen(false)}
            onOpenAutoFocus={(e) => e.preventDefault()}
            className={clsx('dropdown-select', dropdownClassName)}
          >
            <StyledScrollAreaRoot
              className="scroll-area"
              css={{ minWidth: inputWidth }}
            >
              <StyledScrollAreaViewport
                css={{
                  height: dropdownHeight,
                  ...getColorSchemeVariants(colorScheme),
                }}
                className="options-wrapper"
              >
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option, index) => {
                    const selected =
                      selectedSingleItem?.value === option.value ||
                      selectedItems.find((it) => it.value === option.value) !==
                        undefined;
                    if (renderOption) {
                      return (
                        <Fragment key={index}>
                          {renderOption({
                            option,
                            index,
                            selected,
                            onSelect: () => onSelect(option),
                          })}
                        </Fragment>
                      );
                    }
                    return (
                      <StyledOptionItem
                        onClick={() => onSelect(option)}
                        selected={selected}
                        key={index}
                        className={clsx('option', { selected })}
                      >
                        {option.label}
                      </StyledOptionItem>
                    );
                  })
                ) : (
                  <center>Empty</center>
                )}
              </StyledScrollAreaViewport>
              <StyledScrollAreaScrollbar
                className="scroll-indicator"
                orientation="vertical"
              >
                <StyledScrollAreaThumb className="thumb" />
              </StyledScrollAreaScrollbar>
            </StyledScrollAreaRoot>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
      <StyledSelect
        className="select"
        onClick={() => setOpen((prev) => !prev)}
        focused={open}
        searchable={searchable}
        disabled={disabled}
        size={size}
        isInvalid={formItem.isInvalid}
        isWarning={formItem.isWarning && !formItem.isInvalid}
      >
        <StyledSelected className="input-item-wrapper">
          {searchable && !multiple ? (
            <StyledInput
              value={input}
              onChange={onChangeInput}
              ref={inputRef}
              size={size}
              disabled={disabled}
              className="single-select-input"
            />
          ) : null}
          <StyledPlaceholder
            hide={hasSelectedItem || inputExist || multipleInputFocus}
            size={size}
            className="placeholder"
          >
            {placeholder}
          </StyledPlaceholder>
          {selectedSingleItem ? (
            <StyledSelectedSingleItem
              data-value={selectedSingleItem?.value}
              isOnInput={inputExist}
              className="selected-label"
            >
              {selectedSingleItem?.label}
            </StyledSelectedSingleItem>
          ) : null}
          {multiple ? (
            <StyledSelectedItems size={size} className="selected-items">
              {selectedItems.map((option, index) => (
                <StyledSelectedMultipleItem
                  data-value={option.value}
                  size={size}
                  key={index}
                  className="selected-item"
                >
                  <span>{option.label}</span>
                  {!disabled ? (
                    <StyledBtnRemove
                      onClick={(e) => {
                        e.stopPropagation();
                        deSelect(option);
                      }}
                      className="btn-remove"
                    >
                      <CloseOutlined />
                    </StyledBtnRemove>
                  ) : (
                    <span />
                  )}
                </StyledSelectedMultipleItem>
              ))}
              {multiple && searchable ? (
                <Space
                  css={{
                    display: 'inline-flex',
                    height: '24px',
                    padding: '3px 0',
                  }}
                  className="multiple-select-input-wrapper"
                >
                  <StyledInputMultiple
                    placeholder={placeholder}
                    contentEditable={!disabled}
                    onInput={onChangeInputMultiple}
                    onBlur={() => setMultipleInputFocus(false)}
                    onFocus={() => setMultipleInputFocus(true)}
                    // cause this is span element, need to prevent enter
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                      }
                    }}
                    ref={inputMultipleRef}
                    size={size}
                    className="multiple-select-input"
                  />
                </Space>
              ) : null}
            </StyledSelectedItems>
          ) : null}
        </StyledSelected>
        <StyledArrow className="input-suffix">
          <DownOutlined />
          {allowClear && !disabled ? (
            <StyledClear
              className="clear-btn"
              onClick={(e) => {
                e.stopPropagation();
                onClearAll();
              }}
            >
              <CloseCircleFilled />
            </StyledClear>
          ) : null}
        </StyledArrow>
      </StyledSelect>
    </StyledWrapper>
  );
};

export default Select;
