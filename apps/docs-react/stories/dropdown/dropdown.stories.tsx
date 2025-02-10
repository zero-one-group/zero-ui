import {
  DropdownCheckboxItem,
  DropdownContent,
  DropdownItem,
  DropdownItemGroup,
  DropdownItemGroupLabel,
  DropdownMenu,
  DropdownPortal,
  DropdownPositioner,
  DropdownRadioGroup,
  DropdownRadioItem,
  DropdownSeparator,
  DropdownSubTrigger,
  DropdownTrigger,
} from "@repo/ui-react/dropdown-menu";
import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import * as Lucide from "lucide-react";

const meta: Meta<typeof DropdownMenu> = {
  title: "Basic Components/DropdownMenu",
  component: DropdownMenu,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex h-[200px] items-center justify-center gap-8">
      <DropdownMenu>
        <DropdownTrigger>Open Menu</DropdownTrigger>
        <DropdownPositioner>
          <DropdownContent>
            <DropdownItem value="1">
              <Lucide.Instagram />
              Item 1
            </DropdownItem>
            <DropdownItem value="2">
              <Lucide.Slack />
              Item 2
            </DropdownItem>
            <DropdownItem value="3">
              <Lucide.Bitcoin />
              Item 3
            </DropdownItem>
          </DropdownContent>
        </DropdownPositioner>
      </DropdownMenu>
    </div>
  ),
};

export const CheckboxesShowcase: Story = {
  render: () => {
    const DropdownComponent = () => {
      const [items, setItems] = React.useState([
        { id: "react", value: "React", checked: false },
        { id: "solid", value: "Solid", checked: false },
        { id: "vue", value: "Vue", checked: false },
        { id: "angular", value: "Angular", checked: false },
      ]);
      const handleCheckedChange = (id: string, checked: boolean) => {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, checked } : item
          )
        );
      };
      return (
        <div className="flex h-[200px] items-center justify-center gap-8">
          <DropdownMenu>
            <DropdownTrigger>Open Menu</DropdownTrigger>
            <DropdownPositioner>
              <DropdownContent>
                {items.map((item) => (
                  <DropdownCheckboxItem
                    key={item.id}
                    value={item.id}
                    checked={item.checked}
                    onCheckedChange={(checked) =>
                      handleCheckedChange(item.id, checked)
                    }
                  >
                    {item.value}
                  </DropdownCheckboxItem>
                ))}
              </DropdownContent>
            </DropdownPositioner>
          </DropdownMenu>
        </div>
      );
    };
    return <DropdownComponent />;
  },
};

export const RadioGroupShowcase: Story = {
  render: () => {
    const DropdownRadioComponent = () => {
      const datas = [
        { id: "react", value: "React" },
        { id: "solid", value: "Solid" },
        { id: "vue", value: "Vue" },
        { id: "angular", value: "Angular" },
      ];
      const [value, setValue] = React.useState("React");
      return (
        <div className="flex h-[200px] items-center justify-center gap-8">
          <DropdownMenu>
            <DropdownTrigger>Open Menu</DropdownTrigger>
            <DropdownPositioner>
              <DropdownContent>
                <DropdownRadioGroup
                  value={value}
                  onValueChange={(e) => setValue(e.value)}
                >
                  {datas.map((data) => (
                    <DropdownRadioItem key={data.id} value={data.value}>
                      {data.value}
                    </DropdownRadioItem>
                  ))}
                </DropdownRadioGroup>
              </DropdownContent>
            </DropdownPositioner>
          </DropdownMenu>
        </div>
      );
    };
    return <DropdownRadioComponent />;
  },
};

export const NestedShowcase: Story = {
  render: () => {
    const DropdownComponent = () => {
      return (
        <div className="flex h-[200px] items-center justify-center gap-8">
          <DropdownMenu>
            <DropdownTrigger>Open Menu</DropdownTrigger>
            <DropdownPositioner>
              <DropdownContent>
                <DropdownMenu>
                  <DropdownSubTrigger>
                    <Lucide.Code />
                    JS Framework
                  </DropdownSubTrigger>
                  <DropdownPortal>
                    <DropdownPositioner>
                      <DropdownContent>
                        <DropdownItem value="react">React</DropdownItem>
                        <DropdownItem value="solid">Solid</DropdownItem>
                        <DropdownItem value="vue">Vue</DropdownItem>
                      </DropdownContent>
                    </DropdownPositioner>
                  </DropdownPortal>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownSubTrigger>
                    <Lucide.Puzzle />
                    CSS Framework
                  </DropdownSubTrigger>
                  <DropdownPortal>
                    <DropdownPositioner>
                      <DropdownContent>
                        <DropdownItem value="tailwind">
                          <Lucide.GripHorizontal />
                          Tailwind CSS
                        </DropdownItem>
                        <DropdownItem value="message">
                          <Lucide.GripVertical />
                          Chakra
                        </DropdownItem>
                      </DropdownContent>
                    </DropdownPositioner>
                  </DropdownPortal>
                </DropdownMenu>
              </DropdownContent>
            </DropdownPositioner>
          </DropdownMenu>
        </div>
      );
    };
    return <DropdownComponent />;
  },
};

export const AdvancedShowcase: Story = {
  render: () => {
    const DropdownComponent = () => {
      return (
        <div className="flex h-[200px] items-center justify-center gap-8">
          <DropdownMenu>
            <DropdownTrigger withIcon>Open Menu</DropdownTrigger>
            <DropdownPositioner>
              <DropdownContent>
                <DropdownItemGroup>
                  <DropdownItemGroupLabel>My Account</DropdownItemGroupLabel>
                  <DropdownSeparator />
                  <DropdownItem value="profile">
                    <Lucide.User />
                    Profile
                  </DropdownItem>
                  <DropdownItem value="project">
                    <Lucide.Folder />
                    Project
                  </DropdownItem>
                  <DropdownItem value="organization">
                    <Lucide.Building2 />
                    Organization
                  </DropdownItem>
                </DropdownItemGroup>
                <DropdownMenu>
                  <DropdownSubTrigger>
                    <Lucide.UserPlus />
                    Invite Users
                  </DropdownSubTrigger>
                  <DropdownPortal>
                    <DropdownPositioner>
                      <DropdownContent>
                        <DropdownItem value="invite-email">
                          <Lucide.Mail />
                          Email
                        </DropdownItem>
                        <DropdownItem value="message">
                          <Lucide.MessageSquare />
                          Message
                        </DropdownItem>
                      </DropdownContent>
                    </DropdownPositioner>
                  </DropdownPortal>
                </DropdownMenu>
                <DropdownItemGroup>
                  <DropdownSeparator />
                  <DropdownItem value="signout">
                    <Lucide.LogOut />
                    Sign Out
                  </DropdownItem>
                </DropdownItemGroup>
              </DropdownContent>
            </DropdownPositioner>
          </DropdownMenu>
        </div>
      );
    };
    return <DropdownComponent />;
  },
};
