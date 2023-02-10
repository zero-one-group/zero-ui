import 'package:flutter/material.dart';
import 'package:widgetbook/widgetbook.dart';
import 'package:widgetbook_demo/options/color_options.dart';
import 'package:zero_ui_mobile/zero_ui_mobile.dart';

import '../utils.dart';

WidgetbookComponent navigationDrawerWidgetbookComponent = WidgetbookComponent(
  name: 'Navigation Drawer',
  useCases: [
    WidgetbookUseCase(
      name: 'Navigation Drawer',
      builder: (context) => PreviewWidget(
        child: Scaffold(
          appBar: AppBar(
            title: const Text('Open Drawer from the humberger menu'),
          ),
          drawer: ZeroNavigationDrawer(
            style: ZeroNavigationDrawerStyle(
              separatorDrawer: context.knobs
                  .boolean(label: 'Separator Section', initialValue: true),
              backgroundColor: context.knobs.options(
                label: 'Background Color',
                options: _backgroundOptions,
              ),
              width: context.knobs
                  .number(
                    label: 'Width',
                    description:
                        'Recommendation: minimum width is 300 & by default width is 300',
                    initialValue: 300,
                  )
                  .toDouble(),
            ),
            header: ZeroNavigationDrawerHeader(
              child: Image.network(
                'https://i0.wp.com/www.globalemancipation.ngo/wp-content/uploads/2017/09/github-logo.png?ssl=1',
                height: 32,
              ),
            ),
            children: [
              ZeroNavigationDrawerSection(
                title: const Text('Section Header'),
                menus: [
                  ZeroListTile(
                    title: 'List Item',
                    leftIcon: const Icon(ZeroIcons.alert),
                    rightIcon: const Text('100+'),
                    onTap: () {},
                  ),
                  ZeroListTile(
                    title: 'List Item',
                    leftIcon: const Icon(ZeroIcons.api),
                    rightIcon: const Text('100+'),
                    onTap: () {},
                  ),
                  ZeroListTile(
                    title: 'List Item',
                    leftIcon: const Icon(ZeroIcons.aim),
                    rightIcon: const Text('100+'),
                    onTap: () {},
                  ),
                  ZeroListTile(
                    title: 'List Item',
                    leftIcon: const Icon(ZeroIcons.clear),
                    rightIcon: const Text('100+'),
                    onTap: () {},
                  ),
                ],
              ),
              ZeroNavigationDrawerSection(
                title: const Text('Section Header'),
                menus: [
                  ZeroListTile(
                    title: 'List Item',
                    leftIcon: const Icon(ZeroIcons.alert),
                    rightIcon: const Text('100+'),
                    onTap: () {},
                  ),
                  ZeroListTile(
                    title: 'List Item',
                    leftIcon: const Icon(ZeroIcons.api),
                    rightIcon: const Text('100+'),
                    onTap: () {},
                  ),
                  ZeroListTile(
                    title: 'List Item',
                    leftIcon: const Icon(ZeroIcons.aim),
                    rightIcon: const Text('100+'),
                    onTap: () {},
                  ),
                  ZeroListTile(
                    title: 'List Item',
                    leftIcon: const Icon(ZeroIcons.clear),
                    rightIcon: const Text('100+'),
                    onTap: () {},
                  ),
                ],
              ),
              ZeroNavigationDrawerSection(
                title: const Text('Section Header'),
                menus: [
                  ZeroListTile(
                    title: 'List Item',
                    rightIcon: const Text('100+'),
                    onTap: () {},
                  ),
                  ZeroListTile(
                    title: 'List Item',
                    rightIcon: const Text('100+'),
                    onTap: () {},
                  ),
                  ZeroListTile(
                    title: 'List Item',
                    rightIcon: const Text('100+'),
                    onTap: () {},
                  ),
                  ZeroListTile(
                    title: 'List Item',
                    rightIcon: const Text('100+'),
                    onTap: () {},
                  ),
                ],
              ),
              ZeroNavigationDrawerSection(
                title: const Text('Section Header'),
                menus: [
                  ZeroListTile(
                    title: 'List Item',
                    rightIcon: const Text('100+'),
                    onTap: () {},
                  ),
                  ZeroListTile(
                    title: 'List Item',
                    rightIcon: const Text('100+'),
                    onTap: () {},
                  ),
                  ZeroListTile(
                    title: 'List Item',
                    rightIcon: const Text('100+'),
                    onTap: () {},
                  ),
                  ZeroListTile(
                    title: 'List Item',
                    rightIcon: const Text('100+'),
                    onTap: () {},
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    ),
  ],
);

List<Option<Color>> _backgroundOptions = [
  const Option(label: 'White', value: ZeroColors.white),
  ...colorOptions,
];
