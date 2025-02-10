import * as React from "react";
import * as Lucide from "lucide-react";
import { Menu as MenuPrimitive } from "@ark-ui/react/menu";
import { Portal as PortalPrimitive } from "@ark-ui/react/portal";
import {
  type DropdownMenuVariants,
  dropdownMenuStyles,
} from "@repo/core-ui/dropdown-menu.css";

const DropdownPortal = PortalPrimitive;
const DropdownMenu = MenuPrimitive.Root;

interface DropdownTriggerProps {
  withIcon?: boolean;
}

const DropdownTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.Trigger> &
    DropdownTriggerProps
>(({ children, withIcon, ...props }, ref) => {
  const styles = dropdownMenuStyles();

  return (
    <MenuPrimitive.Trigger ref={ref} className={styles.trigger()} {...props}>
      {children}
      {withIcon ? (
        <Lucide.ChevronDown strokeWidth={2} className={styles.triggerIcon()} />
      ): null}
    </MenuPrimitive.Trigger>
  );
});
DropdownTrigger.displayName = "DropdownTrigger";

const DropdownPositioner = MenuPrimitive.Positioner;

const DropdownContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.Content>
>(({ className, ...props }, ref) => {
  const styles = dropdownMenuStyles({ className });
  return (
    <MenuPrimitive.Content ref={ref} className={styles.content()} {...props} />
  );
});
DropdownContent.displayName = "DropdownContent";

// const DropdownItem
const DropdownItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.Item> &
    DropdownMenuVariants
>(({ ...props }, ref) => {
  const styles = dropdownMenuStyles();
  return <MenuPrimitive.Item ref={ref} className={styles.item()} {...props} />;
});
DropdownItem.displayName = "DropdownItem";

// DropdownItemGroup
const DropdownItemGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.ItemGroup>
>((props, ref) => {
  return <MenuPrimitive.ItemGroup ref={ref} {...props} />;
});
DropdownItemGroup.displayName = "DropdownItemGroup";

// DropdownItemGroupLabel
const DropdownItemGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.ItemGroupLabel>
>((props, ref) => {
  const styles = dropdownMenuStyles();
  return (
    <MenuPrimitive.ItemGroupLabel
      ref={ref}
      className={styles.itemText()}
      {...props}
    />
  );
});
DropdownItemGroupLabel.displayName = "DropdownItemGroupLabel";

// DropdownSeparator
const DropdownSeparator = React.forwardRef<
  HTMLHRElement,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.Separator>
>(({ className, ...props }, ref) => {
  const styles = dropdownMenuStyles();
  return (
    <MenuPrimitive.Separator
      ref={ref}
      className={styles.separator()}
      {...props}
    />
  );
});
DropdownSeparator.displayName = "DropdownSeparator";

const DropdownArrow = MenuPrimitive.Arrow;
const DropdownArrowTip = MenuPrimitive.ArrowTip;
const DropdownContextTrigger = MenuPrimitive.ContextTrigger;

const DropdownCheckboxItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.CheckboxItem>
>(({ children, className, ...props }, ref) => {
  const styles = dropdownMenuStyles();
  return (
    <MenuPrimitive.CheckboxItem
      ref={ref}
      className={styles.checkboxItem()}
      {...props}
    >
      <MenuPrimitive.Indicator className={styles.checkboxItemIndicator()}>
        {props.checked ? (
          <Lucide.Check strokeWidth={2} className={styles.checkboxItemIcon()} />
        ) : null}
      </MenuPrimitive.Indicator>
      <MenuPrimitive.ItemText className={styles.itemText()}>
        {children}
      </MenuPrimitive.ItemText>
    </MenuPrimitive.CheckboxItem>
  );
});
DropdownCheckboxItem.displayName = "DropdownCheckboxItem";

const DropdownRadioGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.RadioItemGroup>
>(({ children, ...props }, ref) => {
  return (
    <MenuPrimitive.RadioItemGroup ref={ref} {...props}>
      {children}
    </MenuPrimitive.RadioItemGroup>
  );
});

const DropdownRadioItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.RadioItem>
>(({ children, ...props }, ref) => {
  const styles = dropdownMenuStyles();
  return (
    <MenuPrimitive.RadioItem
      ref={ref}
      className={styles.radioItem()}
      {...props}
    >
      <MenuPrimitive.ItemIndicator className={styles.radioItemIndicator()}>
        <Lucide.Circle className={styles.radioItemIcon()} />
      </MenuPrimitive.ItemIndicator>
      <MenuPrimitive.ItemText className={styles.itemText()}>
        {children}
      </MenuPrimitive.ItemText>
    </MenuPrimitive.RadioItem>
  );
});
DropdownRadioItem.displayName = "DropdownRadioItem";

const DropdownSubTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof MenuPrimitive.Trigger>
>(({ children, ...props }, ref) => {
  const styles = dropdownMenuStyles();
  return (
    <MenuPrimitive.Trigger ref={ref} className={styles.subTrigger()} {...props}>
      {children}
      <Lucide.ChevronRight strokeWidth={2} className={styles.triggerIcon()} />
    </MenuPrimitive.Trigger>
  );
});
DropdownSubTrigger.displayName = "DropdownSubTrigger";

export {
  DropdownPortal,
  DropdownMenu,
  DropdownTrigger,
  DropdownPositioner,
  DropdownContent,
  DropdownItem,
  DropdownItemGroup,
  DropdownItemGroupLabel,
  DropdownSeparator,
  DropdownArrow,
  DropdownArrowTip,
  DropdownContextTrigger,
  DropdownCheckboxItem,
  DropdownRadioGroup,
  DropdownRadioItem,
  DropdownSubTrigger,
};
