import 'package:flutter/material.dart';
import 'package:widgetbook/widgetbook.dart';
import 'package:zero_ui_mobile/zero_ui_mobile.dart';

import '../utils.dart';

WidgetbookComponent badgeWidgetbookComponent = WidgetbookComponent(
  name: 'Badge',
  useCases: [
    WidgetbookUseCase(
      name: 'Default',
      builder: (context) => PreviewWidget(
        child: ZeroBadge(
          badgeColor: context.knobs.options(
            label: 'Badge Color',
            options: _colorOptions,
          ),
          badgeText: context.knobs.text(label: 'Badge Text'),
          position: context.knobs.options(
            label: 'Position',
            options: _positionOptions,
          ),
          type: context.knobs.options(
            label: 'Type',
            options: _typeOptions,
          ),
          badgeTextColor: context.knobs.options(
            label: 'Badge Text Color',
            options: _textColorOptions,
          ),
          child: const Icon(Icons.mail),
        ),
      ),
    ),
  ],
);

List<Option<Color>> _colorOptions = [
  Option(
    label: 'Primary 7',
    value: ZeroColors.primary[7],
  ),
  Option(
    label: 'Dust Red 7',
    value: ZeroColors.dustRed[7],
  ),
  Option(
    label: 'Polar Green 7',
    value: ZeroColors.polarGreen[7],
  ),
  Option(
    label: 'Sunset Orange 7',
    value: ZeroColors.sunsetOrange[7],
  ),
];

List<Option<Color>> _textColorOptions = [
  const Option(
    label: 'White',
    value: Colors.white,
  ),
  const Option(
    label: 'Black',
    value: Colors.black,
  ),
];

List<Option<ZeroBadgePosition>> _positionOptions = [
  const Option(label: 'Top Left', value: ZeroBadgePosition.topLeft),
  const Option(label: 'Top Right', value: ZeroBadgePosition.topRight),
  const Option(label: 'Bottom Left', value: ZeroBadgePosition.bottomLeft),
  const Option(label: 'Bottom Right', value: ZeroBadgePosition.bottomRight),
];

List<Option<ZeroBadgeType>> _typeOptions = [
  const Option(label: 'Dot', value: ZeroBadgeType.dot),
  const Option(label: 'Standard', value: ZeroBadgeType.standard),
  const Option(label: 'Number', value: ZeroBadgeType.number),
];
