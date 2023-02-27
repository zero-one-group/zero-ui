import { RightOutlined } from '@ant-design/icons';
import { CheckedState } from '@radix-ui/react-checkbox';
import { ReactNode, useMemo } from 'react';
import { Checkbox } from '../Checkbox';
import { styled } from '../stitches.config';
import { CascaderOption, CascaderProps, CascaderValue } from './Cascader';

const StyledCascaderMenu = styled('ul', {
  all: 'unset',
  width: '100%',
  minWidth: '111px',
  height: '180px',
  padding: '$1',
  listStyle: 'none',
  overflowY: 'auto',
  overflowX: 'none',
  backgroundColor: 'transparent',
});

const StyledCascaderMenuItem = styled('li', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '$1',
  cursor: 'pointer',
  color: '$gray12',
  p: '$1 $2',
  br: '$1',
  '&:hover': {
    backgroundColor: '$gray3',
  },
  variants: {
    active: {
      true: {
        backgroundColor: '$$bgCascaderActive',
        color: '$gray12',
        fontWeight: '600',
      },
    },
    disabled: {
      true: {
        backgroundColor: '$gray1',
        color: '$gray6',
        pointerEvents: 'none',
        '&:hover': {
          backgroundColor: '$gray1',
        },
      },
    },
  },
});

const StyledCascaderMenuContent = styled('div', {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontFamily: '$untitled',
});

const StyledCascaderMenuWrapperMultiple = styled('div', {
  display: 'flex',
  gap: '$1',
  alignItems: 'center',
});

const StyledCascaderMenuExpandIcon = styled('div', {
  fontSize: '.7rem',
  color: '$gray9',
});

export type CascaderColumnProps = {
  options: CascaderOption[];
  parentPath: CascaderValue[];
  handleChangeCell: (path: CascaderValue[], isLeaf: boolean) => void;
  handleSelectCell: (
    value: CascaderValue,
    isSelected: CheckedState,
    path: CascaderValue[]
  ) => void;
  selectedValues: Set<CascaderValue>;
  indeterminateValues: Set<CascaderValue>;
  active: CascaderValue;
  trigger: CascaderProps['trigger'];
  multiple?: boolean;
  colorScheme?: string;
  arrowIcon?: ReactNode;
};

const CascaderColumn = ({
  options,
  parentPath,
  handleChangeCell,
  handleSelectCell,
  selectedValues,
  indeterminateValues,
  active,
  trigger,
  multiple,
  colorScheme,
  arrowIcon,
}: CascaderColumnProps) => {
  const optionList = useMemo(
    () =>
      options.map((option) => {
        const { children, disabled, label, value } = option;
        const isLeaf = !Array.isArray(children);

        const path: CascaderValue[] = [...parentPath, value];
        const pathString = path.join('/');
        const isActive = value === active;
        const isIndeterminated = indeterminateValues.has(value);
        const isSelected: CheckedState = isIndeterminated
          ? 'indeterminate'
          : selectedValues.has(value);

        return {
          option,
          children,
          label,
          value,
          path,
          pathString,
          isLeaf,
          isActive,
          isDisabled: disabled,
          isSelected,
        };
      }),
    [options, parentPath, active, selectedValues, indeterminateValues]
  );

  return (
    <StyledCascaderMenu role="menu">
      {optionList
        ? optionList.map(
            ({
              pathString,
              path,
              label,
              isDisabled,
              isLeaf,
              isActive,
              value,
              option,
              isSelected,
            }) => (
              <StyledCascaderMenuItem
                key={pathString}
                role="menuitem"
                onClick={() => handleChangeCell(path, isLeaf)}
                onMouseEnter={() => {
                  if (trigger === 'hover' && !isLeaf) {
                    handleChangeCell(path, isLeaf);
                  }
                }}
                title={label as string}
                disabled={isDisabled}
                active={isActive}
              >
                {multiple ? (
                  <StyledCascaderMenuWrapperMultiple>
                    <Checkbox
                      checked={isSelected}
                      boxSize="$3"
                      colorScheme={colorScheme}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectCell(value, isSelected, path);
                      }}
                    >
                      {isLeaf ? (
                        <StyledCascaderMenuContent
                          css={{
                            width: '80px',
                          }}
                        >
                          {label}
                        </StyledCascaderMenuContent>
                      ) : null}
                    </Checkbox>
                    {!isLeaf ? (
                      <StyledCascaderMenuContent
                        css={{
                          width: '80px',
                        }}
                      >
                        {label}
                      </StyledCascaderMenuContent>
                    ) : null}
                  </StyledCascaderMenuWrapperMultiple>
                ) : (
                  <StyledCascaderMenuContent>{label}</StyledCascaderMenuContent>
                )}
                {!isLeaf ? (
                  <StyledCascaderMenuExpandIcon>
                    {arrowIcon ? arrowIcon : <RightOutlined />}
                  </StyledCascaderMenuExpandIcon>
                ) : null}
              </StyledCascaderMenuItem>
            )
          )
        : null}
    </StyledCascaderMenu>
  );
};

export default CascaderColumn;
