import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { Link } from '../Link';
import { Space } from '../Space';

export type BreadcrumbProps = ComponentPropsWithoutRef<ElementType> & {
  items: { title: string; href: string; current: boolean }[];
  separator?: string | ReactNode;
};

export const Breadcrumb = ({ items, separator, ...props }: BreadcrumbProps) => {
  return (
    <Space gap="s" align="center" {...props}>
      {items.map((item, index) => (
        <>
          <Link
            css={{
              color: item.current ? '$gray12' : '$gray8',
              '~ span': {
                color: item.current ? '$gray12' : '$gray8',
                fontSize: '14px',
              },
            }}
            active={item.current}
            href={item.href}
          >
            {item.title}
          </Link>
          {index !== items.length - 1 ? <span>{separator}</span> : null}
        </>
      ))}
    </Space>
  );
};
